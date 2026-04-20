"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCurrentUser } from "../reducer";
import * as accountClient from "../client";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("FOODIE");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();

    const handleRegister = async () => {
        setError("");
        if (!username || !password || !firstName || !lastName || !email) {
            setError("Please fill in all required fields.");
            return;
        }
        try {
            const user = await accountClient.register({
                username,
                password,
                firstName,
                lastName,
                email,
                role,
            });
            dispatch(setCurrentUser(user));
            router.push("/foodierevs/home");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h3 className="card-title text-center mb-4">Create Account</h3>
                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="reg-first" className="form-label">
                                    First Name *
                                </label>
                                <input
                                    id="reg-first"
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="reg-last" className="form-label">
                                    Last Name *
                                </label>
                                <input
                                    id="reg-last"
                                    type="text"
                                    className="form-control"
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reg-username" className="form-label">
                                Username *
                            </label>
                            <input
                                id="reg-username"
                                type="text"
                                className="form-control"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reg-password" className="form-label">
                                Password *
                            </label>
                            <input
                                id="reg-password"
                                type="password"
                                className="form-control"
                                placeholder="Choose a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reg-email" className="form-label">
                                Email *
                            </label>
                            <input
                                id="reg-email"
                                type="email"
                                className="form-control"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">I am a...</label>
                            <div className="d-flex gap-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="role"
                                        id="role-foodie"
                                        value="FOODIE"
                                        checked={role === "FOODIE"}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="role-foodie">
                                        Foodie
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="role"
                                        id="role-critic"
                                        value="CRITIC"
                                        checked={role === "CRITIC"}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="role-critic">
                                        Food Critic
                                    </label>
                                </div>
                            </div>
                            <small className="text-muted">
                                Food Critics publish professional reviews. Foodies bookmark favorites and follow critics.
                            </small>
                        </div>
                        <button
                            className="btn btn-warning w-100 fw-bold"
                            onClick={handleRegister}
                        >
                            Create Account
                        </button>
                        <p className="text-center mt-3 mb-0">
                            Already have an account?{" "}
                            <Link href="/foodierevs/account/login">Sign in here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}