"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "../../store";
import * as accountClient from "../../account/client";
import * as reviewClient from "../../reviews/client";
import * as bookmarkClient from "../../bookmarks/client";
import * as followClient from "../../follows/client";

export default function PublicProfile() {
    const { userId } = useParams();
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer
    );
    const [user, setUser] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [bookmarks, setBookmarks] = useState<any[]>([]);
    const [followers, setFollowers] = useState<any[]>([]);
    const [following, setFollowing] = useState<any[]>([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await accountClient.findUserById(userId as string);
                setUser(userData);
                const [revs, marks, fwrs, fwing] = await Promise.all([
                    reviewClient.findReviewsByUser(userId as string),
                    bookmarkClient.findBookmarksByUser(userId as string),
                    followClient.findFollowers(userId as string),
                    followClient.findFollowing(userId as string),
                ]);
                setReviews(revs);
                setBookmarks(marks);
                setFollowers(fwrs);
                setFollowing(fwing);
                if (currentUser) {
                    const alreadyFollowing = fwrs.some(
                        (f: any) =>
                            (f.follower._id || f.follower) === currentUser._id
                    );
                    setIsFollowing(alreadyFollowing);
                }
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [userId, currentUser]);

    const handleFollow = async () => {
        try {
            await followClient.followUser(userId as string);
            setIsFollowing(true);
            setFollowers([...followers, { follower: currentUser }]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUnfollow = async () => {
        try {
            await followClient.unfollowUser(userId as string);
            setIsFollowing(false);
            setFollowers(
                followers.filter(
                    (f: any) => (f.follower._id || f.follower) !== currentUser._id
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (!user) return <p className="text-center mt-5">User not found.</p>;

    return (
        <div>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <h3>
                                {user.firstName} {user.lastName}
                                <span
                                    className="badge ms-2"
                                    style={{ backgroundColor: "var(--purple-accent)" }}
                                >
                  {user.role}
                </span>
                            </h3>
                            <p className="text-muted">@{user.username}</p>
                            {user.bio && <p>{user.bio}</p>}
                        </div>
                        {currentUser &&
                            currentUser._id !== userId && (
                                <button
                                    className={`btn ${
                                        isFollowing ? "btn-outline-secondary" : "btn-warning"
                                    }`}
                                    onClick={isFollowing ? handleUnfollow : handleFollow}
                                >
                                    {isFollowing ? "Unfollow" : "Follow"}
                                </button>
                            )}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="profile-section">
                        <h5>Reviews ({reviews.length})</h5>
                        {reviews.length === 0 && (
                            <p className="text-muted">No reviews yet.</p>
                        )}
                        {reviews.map((r: any) => (
                            <div key={r._id} className="card mb-2">
                                <div className="card-body py-2">
                                    <Link
                                        href={`/foodierevs/details/${r.movieId}`}
                                        className="text-decoration-none"
                                    >
                                        <strong>{r.movieTitle}</strong>
                                    </Link>
                                    <span className="float-end">
                    <span className="star-filled">★</span> {r.rating}/10
                  </span>
                                    <p className="mb-0 mt-1 small">
                                        {r.text.substring(0, 100)}...
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="profile-section">
                        <h5>Bookmarks ({bookmarks.length})</h5>
                        {bookmarks.length === 0 && (
                            <p className="text-muted">No bookmarks.</p>
                        )}
                        {bookmarks.map((b: any) => (
                            <div key={b._id} className="card mb-2">
                                <div className="card-body py-2">
                                    <Link
                                        href={`/foodierevs/details/${b.movieId}`}
                                        className="text-decoration-none"
                                    >
                                        {b.movieTitle}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="profile-section">
                        <h5>Following ({following.length})</h5>
                        {following.map((f: any) => (
                            <div key={f._id} className="card mb-2">
                                <div className="card-body py-2">
                                    <Link
                                        href={`/foodierevs/profile/${f.following._id || f.following}`}
                                        className="text-decoration-none"
                                    >
                                        {f.following.firstName
                                            ? `${f.following.firstName} ${f.following.lastName}`
                                            : "User"}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="profile-section">
                        <h5>Followers ({followers.length})</h5>
                        {followers.map((f: any) => (
                            <div key={f._id} className="card mb-2">
                                <div className="card-body py-2">
                                    <Link
                                        href={`/foodierevs/profile/${f.follower._id || f.follower}`}
                                        className="text-decoration-none"
                                    >
                                        {f.follower.firstName
                                            ? `${f.follower.firstName} ${f.follower.lastName}`
                                            : "User"}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}