"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { clearCurrentUser } from "./account/reducer";
import * as accountClient from "./account/client";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    const handleLogout = async () => {
        try {
            await accountClient.logout();
            dispatch(clearCurrentUser());
            router.push("/foodierevs/home");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
                <div className="container">
                    <Link className="navbar-brand fw-bold" href="/foodierevs/home">
                        <span className="text-warning">Foodie</span>Revs
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarMain"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${pathname === "/foodierevs/home" ? "active" : ""}`}
                                    href="/foodierevs/home"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${pathname.startsWith("/foodierevs/search") ? "active" : ""}`}
                                    href="/foodierevs/search"
                                >
                                    Search
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            {currentUser ? (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${pathname === "/foodierevs/profile" ? "active" : ""}`}
                                            href="/foodierevs/profile"
                                        >
                      <span className="badge bg-warning me-1">
                        {currentUser.role}
                      </span>
                                            {currentUser.username}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${pathname === "/foodierevs/account/login" ? "active" : ""}`}
                                            href="/foodierevs/account/login"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${pathname === "/foodierevs/account/register" ? "active" : ""}`}
                                            href="/foodierevs/account/register"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}