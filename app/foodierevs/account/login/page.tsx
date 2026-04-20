"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCurrentUser } from "../reducer";
import * as accountClient from "../client";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async () => {
        setError("");
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }
        try {
            const user = await accountClient.login({ username, password });
            dispatch(setCurrentUser(user));
            router.push("/foodierevs/home");
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid credentials.");
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h3 className="card-title text-center mb-4">Sign In</h3>
                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="login-username" className="form-label">
                                Username
                            </label>
                            <input
                                id="login-username"
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="login-password" className="form-label">
                                Password
                            </label>
                            <input
                                id="login-password"
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="btn btn-warning w-100 fw-bold"
                            onClick={handleLogin}
                        >
                            Sign In
                        </button>
                        <p className="text-center mt-3 mb-0">
                            Don&apos;t have an account?{" "}
                            <Link href="/foodierevs/account/register">Register here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}