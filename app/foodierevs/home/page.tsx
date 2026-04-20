"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Link from "next/link";
import * as searchClient from "../search/client";
import * as reviewClient from "../reviews/client";
import * as bookmarkClient from "../bookmarks/client";

export default function Home() {
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer
    );
    const [foodMovies, setFoodMovies] = useState<any[]>([]);
    const [trending, setTrending] = useState<any[]>([]);
    const [recentReviews, setRecentReviews] = useState<any[]>([]);
    const [myReviews, setMyReviews] = useState<any[]>([]);
    const [myBookmarks, setMyBookmarks] = useState<any[]>([]);

    useEffect(() => {
        const fetchPublic = async () => {
            try {
                const foodData = await searchClient.getFoodMovies();
                setFoodMovies(foodData.results?.slice(0, 6) || []);
            } catch (err) {
                console.error(err);
            }
            try {
                const trendingData = await searchClient.getTrending();
                setTrending(trendingData.results?.slice(0, 6) || []);
            } catch (err) {
                console.error(err);
            }
            try {
                const reviewData = await reviewClient.findAllReviews();
                setRecentReviews(reviewData.slice(0, 5));
            } catch (err) {
                console.error(err);
            }
        };
        fetchPublic();
    }, []);

    useEffect(() => {
        if (!currentUser) return;
        const fetchPersonal = async () => {
            try {
                const revs = await reviewClient.findReviewsByUser(currentUser._id);
                setMyReviews(revs.slice(0, 3));
            } catch (err) {
                console.error(err);
            }
            try {
                const marks = await bookmarkClient.findBookmarksByUser(currentUser._id);
                setMyBookmarks(marks.slice(0, 4));
            } catch (err) {
                console.error(err);
            }
        };
        fetchPersonal();
    }, [currentUser]);

    const MovieRow = ({ movies }: { movies: any[] }) => (
        <div className="row">
            {movies.map((movie: any) => (
                <div key={movie.id} className="col-md-2 col-sm-4 col-6 mb-3">
                    <Link
                        href={`/foodierevs/details/${movie.id}`}
                        className="text-decoration-none"
                    >
                        <div className="card search-result-card h-100">
                            {movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    className="card-img-top movie-poster"
                                    alt={movie.title}
                                />
                            ) : (
                                <div
                                    className="card-img-top d-flex align-items-center justify-content-center"
                                    style={{
                                        height: 200,
                                        backgroundColor: "var(--purple-mid)",
                                    }}
                                >
                                    <span className="text-muted">No Image</span>
                                </div>
                            )}
                            <div className="card-body p-2">
                                <small className="card-title d-block">{movie.title}</small>
                                <small className="text-muted">
                                    <span className="star-filled">★</span>{" "}
                                    {movie.vote_average?.toFixed(1)}
                                </small>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">
                    <span className="text-warning">Foodie</span>Revs
                </h1>
                <p className="lead text-muted">
                    Your home for food movie and show reviews. From kitchen dramas to
                    cooking competitions — discover, review, and bookmark the best food
                    content on screen.
                </p>
                {!currentUser && (
                    <div className="d-flex justify-content-center gap-3 mt-3">
                        <Link
                            href="/foodierevs/search"
                            className="btn btn-warning btn-lg fw-bold"
                        >
                            Find Food Movies
                        </Link>
                        <Link
                            href="/foodierevs/account/register"
                            className="btn btn-outline-dark btn-lg"
                        >
                            Join Now
                        </Link>
                    </div>
                )}
            </div>

            {currentUser && (
                <>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">
                                Welcome back, {currentUser.firstName}!
                            </h5>
                            <p className="card-text text-muted">
                                {currentUser.role === "CRITIC"
                                    ? "Ready to write your next food film review?"
                                    : "Discover new food movies and save your favorites."}
                            </p>
                            <div className="d-flex gap-2">
                                <Link href="/foodierevs/search" className="btn btn-warning">
                                    Search Food Movies
                                </Link>
                                <Link
                                    href="/foodierevs/profile"
                                    className="btn btn-outline-secondary"
                                >
                                    My Profile
                                </Link>
                            </div>
                        </div>
                    </div>

                    {myBookmarks.length > 0 && (
                        <>
                            <h5 className="mb-3">My Bookmarks</h5>
                            <div className="row mb-4">
                                {myBookmarks.map((b: any) => (
                                    <div key={b._id} className="col-md-3 col-6 mb-3">
                                        <Link
                                            href={`/foodierevs/details/${b.movieId}`}
                                            className="text-decoration-none"
                                        >
                                            <div className="card search-result-card h-100">
                                                {b.moviePoster ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w300${b.moviePoster}`}
                                                        className="card-img-top movie-poster"
                                                        alt={b.movieTitle}
                                                    />
                                                ) : (
                                                    <div
                                                        className="card-img-top d-flex align-items-center justify-content-center"
                                                        style={{
                                                            height: 150,
                                                            backgroundColor: "var(--purple-mid)",
                                                        }}
                                                    >
                                                        <span className="text-muted">No Image</span>
                                                    </div>
                                                )}
                                                <div className="card-body p-2">
                                                    <small>{b.movieTitle}</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {myReviews.length > 0 && (
                        <>
                            <h5 className="mb-3">My Recent Reviews</h5>
                            {myReviews.map((r: any) => (
                                <div key={r._id} className="card mb-2">
                                    <div className="card-body py-2">
                                        <div className="d-flex justify-content-between">
                                            <Link
                                                href={`/foodierevs/details/${r.movieId}`}
                                                className="fw-bold text-decoration-none"
                                            >
                                                {r.movieTitle}
                                            </Link>
                                            <span>
                        <span className="star-filled">★</span> {r.rating}/10
                      </span>
                                        </div>
                                        <p className="mb-0 mt-1 small text-muted">
                                            {r.text.substring(0, 100)}...
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <hr style={{ borderColor: "var(--purple-border)" }} className="my-4" />
                        </>
                    )}
                </>
            )}

            <h4 className="mb-3">Featured Food Films</h4>
            <MovieRow movies={foodMovies} />

            <h4 className="mb-3 mt-4">Trending This Week</h4>
            <MovieRow movies={trending} />

            <h4 className="mb-3 mt-4">Recent Reviews</h4>
            {recentReviews.length === 0 && (
                <p className="text-muted">
                    No reviews yet. Be the first to review a food movie!
                </p>
            )}
            {recentReviews.map((review: any) => (
                <div key={review._id} className="card mb-3">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <Link
                                    href={`/foodierevs/details/${review.movieId}`}
                                    className="fw-bold text-decoration-none"
                                >
                                    {review.movieTitle}
                                </Link>
                                <span className="text-muted ms-2">
                  by{" "}
                                    <Link
                                        href={`/foodierevs/profile/${review.userId}`}
                                        className="text-decoration-none"
                                    >
                    {review.username}
                  </Link>
                </span>
                                {review.userRole === "CRITIC" && (
                                    <span
                                        className="badge ms-2"
                                        style={{ backgroundColor: "var(--purple-accent)" }}
                                    >
                    CRITIC
                  </span>
                                )}
                            </div>
                            <span>
                <span className="star-filled">★</span> {review.rating}/10
              </span>
                        </div>
                        <p className="mt-2 mb-0 small">
                            {review.text.substring(0, 150)}...
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}