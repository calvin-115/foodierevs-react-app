"use client";
import Link from "next/link";

export default function Landing() {
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="text-center mb-5">
                    <h1 className="display-3 fw-bold">
                        <span className="text-warning">Foodie</span>Revs
                    </h1>
                    <p className="lead text-muted">
                        The ultimate platform for food movie and show reviews
                    </p>
                    <Link
                        href="/foodierevs/home"
                        className="btn btn-warning btn-lg fw-bold mt-3"
                    >
                        Enter Application
                    </Link>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h4>Team Members</h4>
                        <ul className="list-unstyled mb-0">
                            <li className="py-2">
                                <strong>Calvin</strong> — Section 1
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h4>Repositories</h4>
                        <ul className="list-unstyled mb-0">
                            <li className="py-2 border-bottom" style={{ borderColor: "var(--purple-border) !important" }}>
                                <strong>Frontend:</strong>{" "}
                                <a
                                    href="https://github.com/calvin-115/foodierevs-react-app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    github.com/calvin-115/foodierevs-react-app
                                </a>
                            </li>
                            <li className="py-2">
                                <strong>Backend:</strong>{" "}
                                <a
                                    href="https://github.com/calvin-115/foodierevs-node-server-app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    github.com/calvin-115/foodierevs-node-server-app
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h4>About</h4>
                        <p>
                            FoodieRevs is a full-stack web application for discovering and
                            reviewing food-related movies and shows. Whether it&apos;s
                            Ratatouille, The Bear, Chef, or Julie &amp; Julia — find it,
                            review it, and bookmark it. Built with Next.js, Node.js/Express,
                            and MongoDB, integrated with The Movie Database (TMDB) API.
                        </p>
                        <p>
                            Two user roles: <strong>Food Critics</strong> who publish
                            professional reviews, and <strong>Foodies</strong> who bookmark
                            favorites, comment, and follow their favorite critics.
                        </p>
                        <p className="mb-0">
                            <Link href="/foodierevs/privacy">Privacy Policy</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}