import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

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

export function useGetAllReviews() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getAllReviews();
      return raw.map((r) => ({
        id: String(r.id),
        name: r.name,
        rating: Number(r.rating),
        comment: r.comment,
        timestampNs: r.timestamp,
      }));
    },
    enabled: !!actor && !isFetching,
    // staleTime: 0 — always treat as stale so refetch fires immediately
    staleTime: 0,
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
      if (!actor) throw new Error("Backend unavailable. Please try again.");
      const id = await actor.submitReview(name, BigInt(rating), comment);
      return { id: String(id), name, rating, comment };
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
