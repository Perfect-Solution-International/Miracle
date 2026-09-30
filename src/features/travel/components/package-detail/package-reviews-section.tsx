"use client";

import { CheckCircle2, MessageSquarePlus, Star, ThumbsUp, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface PackageReview {
  id: string;
  packageSlug: string;
  authorName: string;
  authorLocation: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

const STORAGE_KEY = "miracle_travel_package_reviews";

const DEFAULT_REVIEWS: PackageReview[] = [];

export function PackageReviewsSection({
  packageSlug,
  packageName,
}: {
  packageSlug: string;
  packageName: string;
}) {
  const [reviews, setReviews] = useState<PackageReview[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  // Review Form State
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState("");

  // Load reviews from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setReviews([]);
      } else {
        const allReviews: PackageReview[] = JSON.parse(raw);
        setReviews(allReviews.filter((r) => r.packageSlug === packageSlug));
      }
    } catch {
      setReviews([]);
    }
  }, [packageSlug]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim() || !comment.trim()) {
      setFormError("Please fill in your name, review headline, and feedback.");
      return;
    }

    const newReview: PackageReview = {
      id: `rev-${Date.now()}`,
      packageSlug,
      authorName: name.trim(),
      authorLocation: location.trim() || "Verified Traveler",
      rating,
      title: title.trim(),
      comment: comment.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      verified: true,
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const all: PackageReview[] = raw ? JSON.parse(raw) : DEFAULT_REVIEWS;
      const updated = [newReview, ...all];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setReviews((prev) => [newReview, ...prev]);

      // Reset form
      setName("");
      setLocation("");
      setTitle("");
      setComment("");
      setRating(5);
      setFormError("");
      setIsFormOpen(false);
      toast.success("Thank you! Your review has been added successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <div className="rounded-3xl public-card p-6 sm:p-8 space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-brand-blue">
            <Star className="size-5 text-amber-500 fill-amber-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider">Customer Reviews</h2>
          </div>
          <h3 className="font-heading text-2xl font-extrabold text-ink mt-1">
            Traveller Experiences
          </h3>
        </div>

        <Button
          type="button"
          onClick={() => setIsFormOpen((prev) => !prev)}
          className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs h-10 px-5 rounded-xl shadow-xs gap-2 shrink-0 self-start sm:self-auto"
        >
          <MessageSquarePlus className="size-4" />
          {isFormOpen ? "Cancel Review" : "Write a Review"}
        </Button>
      </div>

      {/* Review Form Drawer/Panel */}
      {isFormOpen ? (
        <form
          onSubmit={handleSubmitReview}
          className="rounded-2xl border border-brand-blue/30 bg-white p-5 sm:p-6 space-y-4 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-navy dark:text-foreground">
              Share Your Experience for {packageName}
            </h4>
            <span className="text-[11px] text-muted-foreground">Rating &amp; Feedback</span>
          </div>

          {formError ? (
            <div className="rounded-lg bg-red-50 border border-red-200 p-2.5 text-xs text-brand-red font-semibold">
              {formError}
            </div>
          ) : null}

          {/* Rating Stars Picker */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-ink">Overall Rating</Label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  aria-label={`Rate ${star} star`}
                >
                  <Star
                    className={`size-6 ${
                      star <= (hoverRating || rating)
                        ? "text-amber-500 fill-amber-500"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-ink">
                {rating === 5
                  ? "5 / 5 (Exceptional)"
                  : rating === 4
                  ? "4 / 5 (Very Good)"
                  : rating === 3
                  ? "3 / 5 (Good)"
                  : `${rating} / 5`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="rev-name" className="text-xs font-bold text-ink">
                Your Full Name <span className="text-brand-red">*</span>
              </Label>
              <Input
                id="rev-name"
                placeholder="e.g. David & Maria"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9.5 text-xs bg-white dark:bg-background"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="rev-loc" className="text-xs font-bold text-ink">
                Country / City
              </Label>
              <Input
                id="rev-loc"
                placeholder="e.g. London, United Kingdom / Sydney, Australia"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-9.5 text-xs bg-white dark:bg-background"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rev-title" className="text-xs font-bold text-ink">
              Review Headline <span className="text-brand-red">*</span>
            </Label>
            <Input
              id="rev-title"
              placeholder="e.g. An incredible 10 days exploring Sri Lanka!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-9.5 text-xs bg-white dark:bg-background"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rev-comment" className="text-xs font-bold text-ink">
              Detailed Experience &amp; Highlights <span className="text-brand-red">*</span>
            </Label>
            <Textarea
              id="rev-comment"
              rows={3}
              placeholder="What were your favorite moments? How was the private chauffeur, hotel stays, and coordination?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="text-xs bg-white dark:bg-background"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsFormOpen(false)}
              className="h-9 text-xs px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-9 text-xs px-6 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold shadow-xs"
            >
              Submit Review
            </Button>
          </div>
        </form>
      ) : null}

      {/* Ratings Overview Summary */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        <div className="text-center sm:border-r border-slate-200 dark:border-border/80 sm:pr-8">
          <div className="font-heading text-4xl sm:text-5xl font-extrabold text-navy dark:text-foreground">
            {avgRating}
          </div>
          <div className="flex items-center justify-center gap-1 my-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-4 text-amber-500 fill-amber-500" />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-muted-foreground">
            Based on {reviews.length} verified review{reviews.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="flex-1 space-y-1.5 text-xs text-muted-foreground w-full">
          <div className="flex items-center gap-3">
            <span className="w-12 font-medium">5 Stars</span>
            <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-muted overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full w-[95%]" />
            </div>
            <span className="w-8 text-right font-bold text-ink">95%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-12 font-medium">4 Stars</span>
            <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-muted overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full w-[5%]" />
            </div>
            <span className="w-8 text-right font-bold text-ink">5%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-12 font-medium">3 Stars</span>
            <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-muted overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full w-[0%]" />
            </div>
            <span className="w-8 text-right font-bold text-ink">0%</span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4 pt-2">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl public-card-clickable space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs shrink-0">
                    {rev.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-navy dark:text-foreground">
                        {rev.authorName}
                      </span>
                      {rev.verified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="size-3" />
                          Verified Traveler
                        </span>
                      ) : null}
                    </div>
                    <span className="text-[11px] text-muted-foreground block">
                      {rev.authorLocation}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="size-3.5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-muted-foreground">{rev.date}</span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-navy dark:text-foreground pt-1">
                {rev.title}
              </h4>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center space-y-2">
          <Star className="size-8 text-slate-300 mx-auto mb-1" />
          <p className="text-xs sm:text-sm font-semibold text-navy dark:text-foreground">
            No reviews yet for this itinerary
          </p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Be the first to leave a review after your journey with Miracle International.
          </p>
          <Button
            size="sm"
            onClick={() => setIsFormOpen(true)}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold mt-2"
          >
            Leave the First Review
          </Button>
        </div>
      )}
    </div>
  );
}
