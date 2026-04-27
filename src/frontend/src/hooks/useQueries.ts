import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

// ─── LocalStorage persistence (primary store for Vercel deployments) ──────────

const STORAGE_KEY = "raje_di_hatti_reviews";
const MAX_RECENT_REVIEWS = 40;

export function loadReviewsFromStorage(): Review[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as Array<{
      id: string;
      name: string;
      rating: number;
      comment: string;
      timestampNs: string; // stored as string since JSON can't hold bigint
    }>;
    return parsed.map((r) => ({
      ...r,
      timestampNs: BigInt(r.timestampNs),
    }));
  } catch {
    return [];
  }
}

export function saveReviewsToStorage(reviews: Review[]): void {
  try {
    const serialisable = reviews.slice(0, MAX_RECENT_REVIEWS).map((r) => ({
      ...r,
      timestampNs: String(r.timestampNs),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialisable));
  } catch {
    // Silently ignore storage errors (private/incognito may block)
  }
}

// ─── Seed / fallback reviews ──────────────────────────────────────────────────

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

// ─── Frontend Review type ──────────────────────────────────────────────────────

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  /** nanosecond timestamp from Time.now() on the backend (or Date.now()*1_000_000n locally) */
  timestampNs: bigint;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Convert a nanosecond bigint timestamp to a human-readable relative string.
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

// ─── Merge helper (dedup by id) ────────────────────────────────────────────────

function mergeReviews(a: Review[], b: Review[]): Review[] {
  const seen = new Set<string>();
  const result: Review[] = [];
  for (const r of [...a, ...b]) {
    if (!seen.has(r.id)) {
      seen.add(r.id);
      result.push(r);
    }
  }
  return result;
}

// ─── React Query hooks ─────────────────────────────────────────────────────────

/**
 * Fetches recent reviews. Always returns data — never empty, never error state.
 * Priority: IC backend (merged with localStorage) → localStorage only → empty []
 * Seeds/curated reviews are NOT included here — those are handled by the component.
 */
export function useGetAllReviews() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      // Always load localStorage first — it works regardless of backend status
      const stored = loadReviewsFromStorage();

      if (!actor) {
        console.log("[Reviews] Actor not ready, using localStorage reviews");
        return stored;
      }

      // Try IC backend with a 6-second timeout
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("IC backend timeout")), 6000),
        );

        const raw = await Promise.race([actor.getAllReviews(), timeoutPromise]);

        if (!Array.isArray(raw)) return stored;

        const icReviews: Review[] = raw.map((r) => ({
          id: String(r.id),
          name: r.name,
          rating: Number(r.rating),
          comment: r.review,
          timestampNs: r.createdAt,
        }));

        // Merge IC reviews with localStorage (localStorage may have reviews
        // submitted while IC was unreachable)
        const merged = mergeReviews(icReviews, stored);
        merged.sort((a, b) => Number(b.timestampNs - a.timestampNs));
        const capped = merged.slice(0, MAX_RECENT_REVIEWS);

        console.log("[Reviews] Merged IC + localStorage:", capped.length);
        return capped;
      } catch (err) {
        console.warn("[Reviews] IC fetch failed, using localStorage:", err);
        return stored;
      }
    },
    enabled: !isFetching,
    staleTime: 0,
    refetchOnMount: true,
    // Start with localStorage data immediately while fetching
    placeholderData: loadReviewsFromStorage(),
  });
}

/**
 * Submits a review.
 * - Saves to localStorage FIRST (works on Vercel even if IC is unreachable)
 * - Also attempts IC backend (with timeout), silently ignores IC failure
 * - Never throws to the user — always resolves successfully
 */
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
      const localId = `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const nowNs = BigInt(Date.now()) * 1_000_000n;

      // Build the review object we'll return and store locally
      const newReview: Review = {
        id: localId,
        name,
        rating,
        comment,
        timestampNs: nowNs,
      };

      // 1. Save to localStorage immediately (this ALWAYS works)
      const existing = loadReviewsFromStorage();
      // Prevent near-duplicates (same name + comment within 60 seconds)
      const isDuplicate = existing.some(
        (r) =>
          r.name === name &&
          r.comment === comment &&
          Number(nowNs - r.timestampNs) < 60_000 * 1_000_000,
      );
      if (!isDuplicate) {
        const updated = [newReview, ...existing].slice(0, MAX_RECENT_REVIEWS);
        saveReviewsToStorage(updated);
      }

      // 2. Attempt IC backend submission (fire-and-forget with timeout)
      //    We intentionally DON'T await this in a way that blocks the UX
      if (actor) {
        const icSubmitPromise = (async () => {
          try {
            const timeoutPromise = new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error("IC submit timeout")), 8000),
            );
            const icId = await Promise.race([
              actor.submitReview(name, BigInt(rating), comment),
              timeoutPromise,
            ]);
            // Update localStorage entry with the real IC id so we don't duplicate
            // on the next sync
            const stored = loadReviewsFromStorage();
            const updated = stored.map((r) =>
              r.id === localId ? { ...r, id: String(icId) } : r,
            );
            saveReviewsToStorage(updated);
            console.log("[Reviews] IC submit succeeded, id:", icId);
          } catch (err) {
            console.warn(
              "[Reviews] IC submit failed (review saved locally):",
              err,
            );
          }
        })();
        // Don't await — let it run in background
        void icSubmitPromise;
      }

      // Always return success with the local review object
      return newReview;
    },
    onSuccess: async () => {
      // Refresh the reviews list from localStorage + IC
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
