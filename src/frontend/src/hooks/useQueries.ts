import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

// Seed fallback reviews — shown when the backend is unavailable or returns 0 reviews
export const SEED_REVIEWS_FALLBACK = [
  {
    id: "seed1",
    name: "Rajesh Kumar",
    rating: 5,
    comment:
      "Best chole bhature in all of Burari! The kulcha is absolutely mind-blowing. Family has been coming here since 1995.",
    timestampNs: BigInt(0),
  },
  {
    id: "seed2",
    name: "Priya Sharma",
    rating: 5,
    comment:
      "Amazing food and very fast delivery. The dal makhani and butter naan combo is unbeatable. Highly recommend!",
    timestampNs: BigInt(0),
  },
];

// Frontend Review type (normalized from backend bigint types)
export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  /** nanosecond timestamp from Time.now() on the backend */
  timestampNs: bigint;
}

/**
 * Convert a nanosecond bigint timestamp (Internet Computer Time.now()) to a
 * human-readable relative string: "just now", "5 minutes ago", "2 hours ago", etc.
 */
export function relativeTime(timestampNs: bigint): string {
  const nowMs = Date.now();
  const thenMs = Number(timestampNs / 1_000_000n);
  const diffMs = nowMs - thenMs;

  if (diffMs < 0) return "just now";
  if (diffMs < 60_000) return "just now";
  if (diffMs < 3_600_000) {
    const mins = Math.floor(diffMs / 60_000);
    return `${mins} ${mins === 1 ? "minute" : "minutes"} ago`;
  }
  if (diffMs < 86_400_000) {
    const hrs = Math.floor(diffMs / 3_600_000);
    return `${hrs} ${hrs === 1 ? "hour" : "hours"} ago`;
  }
  if (diffMs < 7 * 86_400_000) {
    const days = Math.floor(diffMs / 86_400_000);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
  if (diffMs < 30 * 86_400_000) {
    const weeks = Math.floor(diffMs / (7 * 86_400_000));
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }
  // Older than ~30 days — show a short date
  return new Date(thenMs).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Classify an error into a user-facing message */
export function classifyError(err: unknown): string {
  if (err instanceof TypeError) {
    return "Connection issue. Please try again.";
  }
  if (err instanceof Error) {
    const msg = err.message.toLowerCase();
    if (
      msg.includes("fetch") ||
      msg.includes("network") ||
      msg.includes("failed to fetch")
    ) {
      return "Connection issue. Please try again.";
    }
    if (
      msg.includes("rejected") ||
      msg.includes("ic0503") ||
      msg.includes("ic0504") ||
      msg.includes("500") ||
      msg.includes("server")
    ) {
      return "Server busy. Try again in a moment.";
    }
  }
  return "Could not submit review. Please try again.";
}

export function useGetAllReviews() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) {
        // Actor not ready yet — return fallback so section is never empty
        console.log("[Reviews] Actor not ready, using fallback reviews");
        return SEED_REVIEWS_FALLBACK;
      }
      try {
        const raw = await actor.getAllReviews();
        console.log("[Reviews] API response:", raw);

        if (!Array.isArray(raw) || raw.length === 0) {
          console.log("[Reviews] Empty response from API, using fallback");
          return SEED_REVIEWS_FALLBACK;
        }

        const mapped: Review[] = raw.map((r) => ({
          id: String(r.id),
          name: r.name,
          rating: Number(r.rating),
          // backend field name is 'review' (renamed from 'comment')
          comment: r.review,
          // backend field name is 'createdAt' (renamed from 'timestamp')
          timestampNs: r.createdAt,
        }));

        // Sort newest first, then cap at 20
        mapped.sort((a, b) => Number(b.timestampNs - a.timestampNs));
        const result = mapped.slice(0, 20);

        console.log("[Reviews] Fetched:", result);
        return result;
      } catch (err) {
        console.error("[Reviews] Error fetching:", err);
        // On error, return fallback so the section always has content
        return SEED_REVIEWS_FALLBACK;
      }
    },
    enabled: !isFetching,
    // Always fetch fresh on mount — don't use stale cache
    staleTime: 0,
    refetchOnMount: true,
    // On error, keep previous data or use fallback
    placeholderData: SEED_REVIEWS_FALLBACK,
  });
}

export function useSubmitReview() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      rating,
      comment,
    }: {
      name: string;
      rating: number;
      comment: string;
    }) => {
      if (!actor) throw new Error("Connection issue. Please try again.");

      console.log("[Reviews] Submitting:", { name, rating, review: comment });

      const MAX_ATTEMPTS = 3;
      let lastErr: unknown;

      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
          // Backend method signature: submitReview(name, rating, review)
          const id = await actor.submitReview(name, BigInt(rating), comment);
          return { id: String(id), name, rating, comment };
        } catch (err) {
          lastErr = err;
          console.error(`[Reviews] Submit attempt ${attempt} failed:`, err);
          if (attempt < MAX_ATTEMPTS) {
            // Wait 1 second before retrying
            await new Promise((res) => setTimeout(res, 1000));
          }
        }
      }

      // All attempts exhausted — throw a differentiated error
      throw new Error(classifyError(lastErr));
    },
    onSuccess: async () => {
      // Invalidate to mark stale, then immediately refetch so the new review
      // appears in the list without any delay or manual refresh.
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
      await queryClient.refetchQueries({ queryKey: ["reviews"] });
    },
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      email,
      message,
    }: {
      name: string;
      phone: string | null;
      email: string;
      message: string;
    }) => {
      if (!actor) {
        console.log("Contact form submitted (offline):", {
          name,
          phone,
          email,
          message,
        });
        return;
      }
      await actor.submitContactForm(name, phone, email, message);
    },
  });
}
