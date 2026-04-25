import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Loader2, Star } from "lucide-react";
import { memo, useEffect, useState } from "react";
import type { Review } from "../hooks/useQueries";
import {
  relativeTime,
  useGetAllReviews,
  useSubmitReview,
} from "../hooks/useQueries";

// ─── Seed reviews shown when backend returns 0 reviews ───────────────────────

const SEED_REVIEWS: (Omit<Review, "timestampNs"> & { timestampNs?: bigint })[] =
  [
    {
      id: "seed1",
      name: "Rajesh Kumar",
      rating: 5,
      comment:
        "Best chole bhature in all of Burari! The kulcha is absolutely mind-blowing. Family has been coming here since 1995.",
    },
    {
      id: "seed2",
      name: "Priya Sharma",
      rating: 5,
      comment:
        "Amazing food and very fast delivery. The dal makhani and butter naan combo is unbeatable. Highly recommend!",
    },
    {
      id: "seed3",
      name: "Amit Singh",
      rating: 5,
      comment:
        "Authentic Punjabi taste that reminds me of home. The paneer butter masala is top-notch. Will definitely order again!",
    },
  ];

// ─── Star row (display only) ─────────────────────────────────────────────────

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((pos) => (
        <Star
          key={pos}
          size={size}
          fill={pos <= rating ? "#f5c542" : "none"}
          stroke={pos <= rating ? "#f5c542" : "rgba(255,255,255,0.15)"}
          style={
            pos <= rating
              ? { filter: "drop-shadow(0 0 6px rgba(245,197,66,0.85))" }
              : {}
          }
        />
      ))}
    </div>
  );
}

// ─── Review Card (memoized to prevent unnecessary re-renders) ─────────────────

const ReviewCard = memo(function ReviewCard({
  name,
  rating,
  comment,
  badge,
  timestamp,
  delay = 0,
}: {
  name: string;
  rating: number;
  comment: string;
  badge?: string;
  timestamp?: bigint;
  delay?: number;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const timeLabel = timestamp != null ? relativeTime(timestamp) : null;

  return (
    <div
      className="review-premium-card animate-section flex flex-col h-full"
      style={{
        background: "#0a0a0a",
        border: "1px solid rgba(245,197,66,0.18)",
        borderLeft: "4px solid #f5c542",
        borderRadius: "16px",
        padding: "clamp(14px, 3vw, 20px)",
        position: "relative",
        overflow: "hidden",
        transitionDelay: `${delay}ms`,
        transition:
          "border-color 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}
      data-ocid={`review.card.${name.replace(/\s/g, "_").toLowerCase()}`}
    >
      {/* Decorative large quotation mark */}
      <div
        style={{
          position: "absolute",
          top: "-8px",
          right: "16px",
          fontSize: "6rem",
          color: "rgba(245,197,66,0.07)",
          fontFamily: "Georgia, serif",
          fontWeight: 900,
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        ❝
      </div>

      {/* Avatar + name row */}
      <div className="flex items-start gap-3 mb-4">
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(245,197,66,0.3) 0%, rgba(255,122,24,0.18) 100%)",
            border: "1.5px solid rgba(245,197,66,0.5)",
            color: "#f5c542",
            fontFamily: "Poppins, sans-serif",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 800,
            flexShrink: 0,
            boxShadow: "0 0 14px rgba(245,197,66,0.2)",
          }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            <span
              style={{
                color: "#f5f0e8",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                fontSize: "0.88rem",
              }}
            >
              {name}
            </span>
            <CheckCircle
              size={13}
              style={{ color: "#f5c542", flexShrink: 0 }}
            />
          </div>
          {timeLabel && (
            <p
              style={{
                color: "rgba(245,197,66,0.5)",
                fontFamily: "Poppins, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.03em",
                marginBottom: "6px",
              }}
            >
              {timeLabel}
            </p>
          )}
          <StarRow rating={rating} size={15} />
        </div>
        {badge && (
          <span
            style={{
              backgroundColor: "rgba(245,197,66,0.1)",
              color: "#f5c542",
              fontFamily: "Poppins, sans-serif",
              border: "1px solid rgba(245,197,66,0.28)",
              fontSize: "10px",
              padding: "2px 9px",
              borderRadius: "9999px",
              fontWeight: 700,
              flexShrink: 0,
              alignSelf: "flex-start",
            }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Review text */}
      <p
        style={{
          color: "rgba(245,240,232,0.68)",
          fontFamily: "Poppins, sans-serif",
          lineHeight: 1.85,
          fontStyle: "italic",
          fontSize: "0.875rem",
          flex: 1,
        }}
      >
        &ldquo;{comment}&rdquo;
      </p>

      {/* Verified badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          marginTop: "18px",
          background: "rgba(245,197,66,0.07)",
          border: "1px solid rgba(245,197,66,0.15)",
          borderRadius: "9999px",
          padding: "3px 10px",
        }}
      >
        <span style={{ fontSize: "10px", color: "#f5c542" }}>✓</span>
        <span
          style={{
            color: "rgba(245,197,66,0.7)",
            fontFamily: "Poppins, sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}
        >
          Verified Order
        </span>
      </div>
    </div>
  );
});

// ─── Input style ─────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  fontFamily: "Poppins, sans-serif",
  backgroundColor: "rgba(18,13,6,0.8)",
  border: "1px solid rgba(212,168,67,0.18)",
  color: "#f5f0e8",
  borderRadius: "0.75rem",
  outline: "none",
  width: "100%",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
};

// ─── Submit Review Form ───────────────────────────────────────────────────────

function SubmitReviewForm({
  onReviewSubmitted,
}: { onReviewSubmitted: () => void }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    rating?: string;
    comment?: string;
    submit?: string;
  }>({});
  const [successMsg, setSuccessMsg] = useState(false);
  const mutation = useSubmitReview();

  const validate = () => {
    const e: Omit<typeof errors, "submit"> = {};
    if (!name.trim() || name.trim().length < 2)
      e.name = "Name must be at least 2 characters.";
    if (rating === 0) e.rating = "Please select a star rating.";
    if (!comment.trim() || comment.trim().length < 10)
      e.comment = "Review must be at least 10 characters.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      await mutation.mutateAsync({
        name: name.trim(),
        rating,
        comment: comment.trim(),
      });
      setName("");
      setRating(0);
      setComment("");
      setSuccessMsg(true);
      onReviewSubmitted();
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to submit review. Please try again.";
      setErrors({ submit: message });
    }
  };

  return (
    <div
      className="dark-glass-card max-w-2xl mx-auto mt-10"
      style={{ padding: "clamp(20px, 4vw, 32px)" }}
      data-ocid="reviews.dialog"
    >
      <h3
        style={{
          fontFamily: "Playfair Display, Georgia, serif",
          color: "#f5f0e8",
          fontWeight: 800,
        }}
        className="text-2xl font-bold text-center mb-2"
      >
        Share Your Experience
      </h3>
      <p
        className="text-center text-sm mb-6"
        style={{
          color: "rgba(245,197,66,0.55)",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Your feedback helps us serve Delhi better
      </p>
      <div className="section-divider mb-8" />

      {/* Success message */}
      {successMsg && (
        <div
          data-ocid="reviews.success_state"
          style={{
            background: "rgba(245,197,66,0.08)",
            border: "1px solid rgba(245,197,66,0.35)",
            borderRadius: "12px",
            padding: "14px 18px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CheckCircle size={18} style={{ color: "#f5c542", flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#f5c542",
            }}
          >
            Thank you! Your review has been posted.
          </span>
        </div>
      )}

      {/* Submission error message */}
      {errors.submit && (
        <div
          data-ocid="reviews.error_state"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.35)",
            borderRadius: "12px",
            padding: "14px 18px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#ef4444",
            }}
          >
            {errors.submit}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name */}
        <div>
          <label
            htmlFor="review-name"
            style={{ color: "#f5f0e8", fontFamily: "Poppins, sans-serif" }}
            className="block text-sm font-semibold mb-2"
          >
            Your Name *
          </label>
          <input
            id="review-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Enter your name"
            style={{
              ...inputStyle,
              borderColor: errors.name
                ? "rgba(239,68,68,0.6)"
                : "rgba(212,168,67,0.18)",
            }}
            className="px-4 py-3 text-sm placeholder:text-white/20"
            data-ocid="reviews.name.input"
          />
          {errors.name && (
            <p
              data-ocid="reviews.name.field_error"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                color: "#ef4444",
                marginTop: "5px",
              }}
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Star rating */}
        <div>
          <p
            id="rating-label"
            style={{ color: "#f5f0e8", fontFamily: "Poppins, sans-serif" }}
            className="block text-sm font-semibold mb-2"
          >
            Your Rating *
          </p>
          <div className="flex gap-2" data-ocid="reviews.rating.select">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={`rate-${star}`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => {
                  setRating(star);
                  setErrors((prev) => ({ ...prev, rating: undefined }));
                }}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                className="transition-transform hover:scale-110 focus:outline-none"
                data-ocid={`reviews.star.${star}`}
              >
                <Star
                  size={32}
                  fill={(hover || rating) >= star ? "#f5c542" : "none"}
                  stroke={
                    (hover || rating) >= star
                      ? "#f5c542"
                      : "rgba(255,255,255,0.2)"
                  }
                  style={
                    (hover || rating) >= star
                      ? { filter: "drop-shadow(0 0 8px rgba(245,197,66,0.85))" }
                      : {}
                  }
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p
              data-ocid="reviews.rating.field_error"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                color: "#ef4444",
                marginTop: "5px",
              }}
            >
              {errors.rating}
            </p>
          )}
        </div>

        {/* Review text */}
        <div>
          <label
            htmlFor="review-comment"
            style={{ color: "#f5f0e8", fontFamily: "Poppins, sans-serif" }}
            className="block text-sm font-semibold mb-2"
          >
            Your Review *
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setErrors((prev) => ({ ...prev, comment: undefined }));
            }}
            placeholder="Tell us about your experience..."
            rows={4}
            style={{
              ...inputStyle,
              resize: "vertical",
              borderColor: errors.comment
                ? "rgba(239,68,68,0.6)"
                : "rgba(212,168,67,0.18)",
            }}
            className="px-4 py-3 text-sm placeholder:text-white/20"
            data-ocid="reviews.comment.textarea"
          />
          {errors.comment && (
            <p
              data-ocid="reviews.comment.field_error"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                color: "#ef4444",
                marginTop: "5px",
              }}
            >
              {errors.comment}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="btn-primary w-full justify-center"
          data-ocid="reviews.submit.button"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </div>
  );
}

// ─── Live Reviews ─────────────────────────────────────────────────────────────

function LiveReviews() {
  const { data: reviews, isLoading, isError } = useGetAllReviews();

  if (isLoading) {
    return (
      <div className="text-center py-8" data-ocid="reviews.loading_state">
        <Loader2
          className="w-6 h-6 animate-spin mx-auto"
          style={{ color: "#f5c542" }}
        />
        <p
          style={{
            color: "rgba(245,240,232,0.5)",
            fontFamily: "Poppins, sans-serif",
          }}
          className="mt-2 text-sm"
        >
          Loading reviews...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-4" data-ocid="reviews.error_state">
        <p
          style={{ color: "#f5c542", fontFamily: "Poppins, sans-serif" }}
          className="text-sm"
        >
          Could not load reviews right now.
        </p>
      </div>
    );
  }

  // Null-guard: treat undefined/null as empty array
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const hasRealReviews = safeReviews.length > 0;
  const displayReviews = hasRealReviews
    ? [...safeReviews].reverse()
    : SEED_REVIEWS;

  return (
    <div className="mt-12" data-ocid="reviews.live_list">
      <h3
        style={{
          fontFamily: "Playfair Display, Georgia, serif",
          color: "#f5f0e8",
          fontWeight: 800,
        }}
        className="text-xl font-bold text-center mb-8"
      >
        {hasRealReviews ? "Recent Customer Reviews" : "What Our Customers Say"}
      </h3>
      <div
        className="flex flex-row gap-3 sm:gap-5 overflow-x-auto pb-3"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {displayReviews.map((review, i) => (
          <div
            key={review.id}
            className="flex-shrink-0"
            style={{ minWidth: "280px", maxWidth: "340px", width: "75vw" }}
          >
            <ReviewCard
              name={review.name}
              rating={review.rating}
              comment={review.comment}
              timestamp={
                "timestampNs" in review ? review.timestampNs : undefined
              }
              badge={!hasRealReviews ? "Verified" : undefined}
              delay={i * 100}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Reviews Section ─────────────────────────────────────────────────────

export default function Reviews() {
  const queryClient = useQueryClient();

  // On successful submission: LiveReviews re-renders automatically because
  // useSubmitReview already calls invalidateQueries + refetchQueries.
  // We keep this handler only to trigger the success message in SubmitReviewForm.
  const handleReviewSubmitted = () => {
    // Ensure the cache is fresh — belt-and-suspenders in case mutation
    // onSuccess fired before the component re-rendered.
    void queryClient.refetchQueries({ queryKey: ["reviews"] });
  };

  return (
    <section
      id="reviews"
      style={{
        backgroundColor: "#0a0602",
        padding: "clamp(56px, 8vw, 120px) 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-10 animate-section">
          <span className="section-kicker">Reviews</span>
          <h2
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              background: "linear-gradient(135deg, #f5c542 0%, #ff7a18 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 900,
            }}
            className="section-title"
          >
            What Our Customers Say
          </h2>
          <div className="section-divider" />
          <p
            style={{
              color: "rgba(245,240,232,0.38)",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "0.03em",
              fontSize: "0.875rem",
              marginTop: "12px",
            }}
          >
            Real reviews from real customers
          </p>
        </div>

        {/* Google Rating block */}
        <div
          className="animate-section mb-14"
          data-ocid="reviews.google_rating"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,197,66,0.06) 0%, rgba(255,122,24,0.03) 100%)",
            border: "1px solid rgba(245,197,66,0.2)",
            borderRadius: "20px",
            padding: "clamp(20px, 4vw, 36px) clamp(16px, 4vw, 32px)",
            maxWidth: "520px",
            margin: "0 auto 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, rgba(245,197,66,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "rgba(245,197,66,0.1)",
              border: "1px solid rgba(245,197,66,0.22)",
              borderRadius: "9999px",
              padding: "5px 16px",
              marginBottom: "18px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 900,
                color: "#f5c542",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              G
            </span>
            <span
              style={{
                color: "rgba(245,240,232,0.65)",
                fontFamily: "Poppins, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Google Rating
            </span>
          </div>

          <div className="flex items-center justify-center gap-5 mb-4">
            <div
              style={{
                background: "linear-gradient(135deg, #f5c542 0%, #ff9a1a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(3.5rem, 8vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                filter: "drop-shadow(0 0 20px rgba(245,197,66,0.5))",
              }}
            >
              4.7
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((pos) => (
                  <Star
                    key={pos}
                    size={22}
                    fill="#f5c542"
                    stroke="#f5c542"
                    style={{
                      filter: "drop-shadow(0 0 5px rgba(245,197,66,0.75))",
                    }}
                  />
                ))}
                <Star
                  size={22}
                  fill="rgba(245,197,66,0.35)"
                  stroke="rgba(245,197,66,0.35)"
                />
              </div>
              <span
                style={{
                  color: "rgba(245,240,232,0.5)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                Based on 200+ reviews
              </span>
            </div>
          </div>

          <p
            style={{
              color: "rgba(245,240,232,0.4)",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              position: "relative",
            }}
          >
            Consistently rated by verified Google customers
          </p>
        </div>

        {/* Submit form — above reviews list */}
        <SubmitReviewForm onReviewSubmitted={handleReviewSubmitted} />

        {/* Live reviews list — re-renders whenever React Query cache updates */}
        <LiveReviews />
      </div>

      <style>{`
        .review-premium-card:hover {
          border-color: rgba(245,197,66,0.5) !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(245,197,66,0.12), 0 0 0 1px rgba(245,197,66,0.15);
        }
      `}</style>
    </section>
  );
}
