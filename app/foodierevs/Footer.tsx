"use client";
import Link from "next/link";

export default function Footer() {
    return (
        <footer
            className="text-center py-3 mt-5"
            style={{ borderTop: "1px solid var(--purple-border)" }}
        >
            <small className="text-muted">
                FoodieRevs &copy; {new Date().getFullYear()} |{" "}
                <Link href="/foodierevs/privacy" className="text-decoration-none">
                    Privacy Policy
                </Link>{" "}
                |{" "}
                <Link href="/foodierevs/landing" className="text-decoration-none">
                    About
                </Link>
            </small>
        </footer>
    );
}