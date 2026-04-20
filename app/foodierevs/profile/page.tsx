"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RootState } from "../store";
import { setCurrentUser } from "../account/reducer";
import * as accountClient from "../account/client";
import * as reviewClient from "../reviews/client";
import * as bookmarkClient from "../bookmarks/client";
import * as followClient from "../follows/client";

export default function Profile() {
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer
    );
    const dispatch = useDispatch();
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [bookmarks, setBookmarks] = useState<any[]>([]);
    const [followers, setFollowers] = useState<any[]>([]);
    const [following, setFollowing] = useState<any[]>([]);

    useEffect(() => {
        if (!currentUser) {
            router.push("/foodierevs/account/login");
            return;
        }
        setProfile({ ...currentUser });
        const fetchData = async () => {
            try {
                const [revs, marks, fwrs, fwing] = await Promise.all([
                    reviewClient.findReviewsByUser(currentUser._id),
                    bookmarkClient.findBookmarksByUser(currentUser._id),
                    followClient.findFollowers(currentUser._id),
                    followClient.findFollowing(currentUser._id),
                ]);
                setReviews(revs);
                setBookmarks(marks);
                setFollowers(fwrs);
                setFollowing(fwing);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [currentUser, router]);

    const handleSave = async () => {
        try {
            const updated = await accountClient.updateProfile(profile);
            dispatch(setCurrentUser(updated));
            setEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    if (!currentUser || !profile) return null;

    return (
        <div>
            <h2 className="mb-4">My Profile</h2>
            <div className="card mb-4">
                <div className="card-body">
                    {!editing ? (
                        <div>
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h4>
                                        {profile.firstName} {profile.lastName}
                                        <span
                                            className="badge ms-2"
                                            style={{ backgroundColor: "var(--purple-accent)" }}
                                        >
                      {profile.role}
                    </span>
                                    </h4>
                                    <p className="text-muted">@{profile.username}</p>
                                </div>
                                <button
                                    className="btn btn-outline-warning btn-sm"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit Profile
                                </button>
                            </div>
                            <p><strong>Email:</strong> {profile.email}</p>
                            {profile.phone && <p><strong>Phone:</strong> {profile.phone}</p>}
                            {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
                        </div>
                    ) : (
                        <div>
                            <h5 className="mb-3">Edit Profile</h5>
                            <div className="row mb-2">
                                <div className="col">
                                    <label className="form-label">First Name</label>
                                    <input
                                        className="form-control"
                                        value={profile.firstName}
                                        onChange={(e) =>
                                            setProfile({ ...profile, firstName: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        className="form-control"
                                        value={profile.lastName}
                                        onChange={(e) =>
                                            setProfile({ ...profile, lastName: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Email</label>
                                <input
                                    className="form-control"
                                    value={profile.email}
                                    onChange={(e) =>
                                        setProfile({ ...profile, email: e.target.value })
                                    }
                                />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Phone</label>
                                <input
                                    className="form-control"
                                    value={profile.phone || ""}
                                    onChange={(e) =>
                                        setProfile({ ...profile, phone: e.target.value })
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Bio</label>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    value={profile.bio || ""}
                                    onChange={(e) =>
                                        setProfile({ ...profile, bio: e.target.value })
                                    }
                                />
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-warning" onClick={handleSave}>
                                    Save
                                </button>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                        setProfile({ ...currentUser });
                                        setEditing(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="profile-section">
                        <h5>My Reviews ({reviews.length})</h5>
                        {reviews.length === 0 && (
                            <p className="text-muted">No reviews yet.</p>
                        )}
                        {reviews.slice(0, 5).map((r: any) => (
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
                                    <p className="mb-0 mt-1 small">{r.text.substring(0, 100)}...</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="profile-section">
                        <h5>Bookmarks ({bookmarks.length})</h5>
                        {bookmarks.length === 0 && (
                            <p className="text-muted">No bookmarks yet.</p>
                        )}
                        {bookmarks.slice(0, 5).map((b: any) => (
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
                        {following.length === 0 && (
                            <p className="text-muted">Not following anyone yet.</p>
                        )}
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
                        {followers.length === 0 && (
                            <p className="text-muted">No followers yet.</p>
                        )}
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