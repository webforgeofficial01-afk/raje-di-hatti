import { CheckCircle, Loader2, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Review } from "../hooks/useQueries";
import {
  relativeTime,
  useGetAllReviews,
  useSubmitReview,
} from "../hooks/useQueries";

const FEATURED_REVIEWS = [
  {
    id: "f1",
    name: "Rajesh Kumar",
    rating: 5,
    comment:
      "Amazing quality and taste! The Chole Bhature here is truly the best in Burari. Been coming here for years and the flavour never disappoints.",
    source: "Verified",
  },
  {
    id: "f2",
    name: "Priya Sharma",
    rating: 5,
    comment:
      "Fast delivery, fresh food, and very good pricing. My family orders every week! The Amritsari Kulcha is always crispy and perfectly made.",
    source: "Verified",
  },
  {
    id: "f3",
    name: "Amit Verma",
    rating: 5,
    comment:
      "The Amritsari Kulcha is heavenly. Best breakfast spot near Sant Nagar! The desi ghee aroma and authenticity is unmatched anywhere in Delhi.",
    source: "Verified",
  },
];

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

function ReviewCard({
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
}

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

function SubmitReviewForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const mutation = useSubmitReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment.");
      return;
    }
    try {
      await mutation.mutateAsync({
        name: name.trim(),
        rating,
        comment: comment.trim(),
      });
      toast.success("Thank you for your review! 🙏");
      setName("");
      setRating(0);
      setComment("");
    } catch {
      toast.error("Failed to submit review. Please try again.");
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
      <form onSubmit={handleSubmit} className="space-y-5">
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
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={inputStyle}
            className="px-4 py-3 text-sm placeholder:text-white/20"
            data-ocid="reviews.name.input"
          />
        </div>
        <div>
          <label
            htmlFor="review-rating"
            style={{ color: "#f5f0e8", fontFamily: "Poppins, sans-serif" }}
            className="block text-sm font-semibold mb-2"
          >
            Your Rating *
          </label>
          <div
            id="review-rating"
            className="flex gap-2"
            data-ocid="reviews.rating.select"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={`rate-${star}`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110 focus:outline-none"
                data-ocid={`reviews.star.${star}`}
              >
                <Star
                  size={30}
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
        </div>
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
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience..."
            rows={4}
            style={{ ...inputStyle, resize: "vertical" }}
            className="px-4 py-3 text-sm placeholder:text-white/20"
            data-ocid="reviews.comment.textarea"
          />
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

  if (!reviews || reviews.length === 0) return null;

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
        Recent Customer Reviews
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
        {(reviews as Review[]).map((review, i) => (
          <div
            key={review.id}
            className="flex-shrink-0"
            style={{ minWidth: "280px", maxWidth: "340px", width: "75vw" }}
          >
            <ReviewCard
              name={review.name}
              rating={review.rating}
              comment={review.comment}
              timestamp={review.timestampNs}
              delay={i * 100}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
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

        {/* Featured review cards — horizontal scroll row */}
        <div
          className="flex flex-row gap-3 sm:gap-5 overflow-x-auto pb-3"
          data-ocid="reviews.list"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{".reviews-scroll::-webkit-scrollbar{display:none}"}</style>
          {FEATURED_REVIEWS.map((rev, i) => (
            <div
              key={rev.id}
              className="flex-shrink-0"
              style={{ minWidth: "280px", maxWidth: "340px", width: "75vw" }}
            >
              <ReviewCard
                name={rev.name}
                rating={rev.rating}
                comment={rev.comment}
                badge={rev.source}
                delay={i * 100}
              />
            </div>
          ))}
        </div>

        <SubmitReviewForm />
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
