"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import * as searchClient from "../../search/client";
import * as reviewClient from "../../reviews/client";
import * as bookmarkClient from "../../bookmarks/client";

export default function Details() {
    const { movieId } = useParams();
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer
    );
    const [movie, setMovie] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(5);
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieData = await searchClient.getMovieDetails(movieId as string);
                setMovie(movieData);
                const reviewData = await reviewClient.findReviewsByMovie(movieId as string);
                setReviews(reviewData);
                const bookmarkData = await bookmarkClient.isBookmarked(movieId as string);
                setBookmarked(bookmarkData.bookmarked);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [movieId]);

    const handleSubmitReview = async () => {
        if (!reviewText.trim()) return;
        try {
            const newReview = await reviewClient.createReview({
                movieId: movieId as string,
                movieTitle: movie.title,
                moviePoster: movie.poster_path,
                text: reviewText,
                rating,
            });
            setReviews([newReview, ...reviews]);
            setReviewText("");
            setRating(5);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteReview = async (reviewId: string) => {
        try {
            await reviewClient.deleteReview(reviewId);
            setReviews(reviews.filter((r) => r._id !== reviewId));
        } catch (err) {
            console.error(err);
        }
    };

    const handleBookmark = async () => {
        if (!currentUser) return;
        try {
            if (bookmarked) {
                await bookmarkClient.removeBookmark(movieId as string);
                setBookmarked(false);
            } else {
                await bookmarkClient.bookmarkMovie({
                    movieId: movieId as string,
                    movieTitle: movie.title,
                    moviePoster: movie.poster_path || "",
                });
                setBookmarked(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (!movie) return <p className="text-center mt-5">Movie not found.</p>;

    return (
        <div>
            <div className="row mb-4">
                <div className="col-md-4">
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            className="img-fluid movie-poster"
                            alt={movie.title}
                        />
                    ) : (
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                height: 450,
                                backgroundColor: "var(--purple-mid)",
                                borderRadius: 8,
                            }}
                        >
                            <span className="text-muted">No Image</span>
                        </div>
                    )}
                </div>
                <div className="col-md-8">
                    <div className="d-flex justify-content-between align-items-start">
                        <h2>{movie.title}</h2>
                        {currentUser && (
                            <button
                                className={`btn ${bookmarked ? "btn-warning" : "btn-outline-warning"}`}
                                onClick={handleBookmark}
                            >
                                {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
                            </button>
                        )}
                    </div>
                    <div className="d-flex gap-3 mb-3 flex-wrap">
                        {movie.release_date && (
                            <span className="badge bg-secondary">
                {movie.release_date.substring(0, 4)}
              </span>
                        )}
                        {movie.runtime > 0 && (
                            <span className="badge bg-secondary">{movie.runtime} min</span>
                        )}
                        <span>
              <span className="star-filled">★</span>{" "}
                            {movie.vote_average?.toFixed(1)} / 10
            </span>
                        {movie.budget > 0 && (
                            <span className="badge bg-secondary">
                Budget: ${(movie.budget / 1000000).toFixed(0)}M
              </span>
                        )}
                        {movie.revenue > 0 && (
                            <span className="badge bg-secondary">
                Revenue: ${(movie.revenue / 1000000).toFixed(0)}M
              </span>
                        )}
                    </div>
                    {movie.genres && (
                        <div className="mb-3">
                            {movie.genres.map((g: any) => (
                                <span
                                    key={g.id}
                                    className="badge me-1"
                                    style={{ backgroundColor: "var(--purple-accent)" }}
                                >
                  {g.name}
                </span>
                            ))}
                        </div>
                    )}
                    <p>{movie.overview}</p>
                    {movie.credits?.cast && (
                        <div>
                            <h6>Cast</h6>
                            <p className="text-muted">
                                {movie.credits.cast
                                    .slice(0, 8)
                                    .map((c: any) => c.name)
                                    .join(", ")}
                            </p>
                        </div>
                    )}
                    {movie.credits?.crew && (
                        <div>
                            <h6>Director</h6>
                            <p className="text-muted">
                                {movie.credits.crew
                                    .filter((c: any) => c.job === "Director")
                                    .map((c: any) => c.name)
                                    .join(", ") || "N/A"}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <hr style={{ borderColor: "var(--purple-border)" }} />

            <h4 className="mb-3">Reviews ({reviews.length})</h4>

            {currentUser && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h6>
                            Write a Review
                            {currentUser.role === "CRITIC" && (
                                <span
                                    className="badge ms-2"
                                    style={{ backgroundColor: "var(--purple-accent)" }}
                                >
                  CRITIC
                </span>
                            )}
                        </h6>
                        <div className="mb-2">
                            <label className="form-label">Rating</label>
                            <select
                                className="form-select"
                                style={{ width: 100 }}
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                    <option key={n} value={n}>
                                        {n} / 10
                                    </option>
                                ))}
                            </select>
                        </div>
                        <textarea
                            className="form-control mb-2"
                            rows={3}
                            placeholder="Share your thoughts on this movie..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <button className="btn btn-warning" onClick={handleSubmitReview}>
                            Post Review
                        </button>
                    </div>
                </div>
            )}

            {!currentUser && (
                <div className="card mb-4">
                    <div className="card-body text-center">
                        <p className="mb-2">
                            <Link href="/foodierevs/account/login">Sign in</Link> to write a
                            review or bookmark this movie.
                        </p>
                    </div>
                </div>
            )}

            {reviews.length === 0 && (
                <p className="text-muted">No reviews yet. Be the first!</p>
            )}

            {reviews.map((review: any) => (
                <div key={review._id} className="card mb-3">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <Link
                                    href={`/foodierevs/profile/${review.userId}`}
                                    className="fw-bold text-decoration-none"
                                >
                                    {review.username}
                                </Link>
                                {review.userRole === "CRITIC" && (
                                    <span
                                        className="badge ms-2"
                                        style={{ backgroundColor: "var(--purple-accent)" }}
                                    >
                    CRITIC
                  </span>
                                )}
                            </div>
                            <div className="d-flex align-items-center gap-2">
                <span>
                  <span className="star-filled">★</span> {review.rating}/10
                </span>
                                {currentUser &&
                                    (currentUser._id === review.userId ||
                                        currentUser.role === "ADMIN") && (
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDeleteReview(review._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                            </div>
                        </div>
                        <p className="mt-2 mb-1">{review.text}</p>
                        <small className="text-muted">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </small>
                    </div>
                </div>
            ))}
        </div>
    );
}