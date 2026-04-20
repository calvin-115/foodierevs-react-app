"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import * as searchClient from "./client";

function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const criteriaFromUrl = searchParams.get("criteria") || "";

    const [query, setQuery] = useState(criteriaFromUrl);
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setSearched(true);
        router.replace(`/foodierevs/search?criteria=${encodeURIComponent(query)}`);
        try {
            const data = await searchClient.searchMovies(query);
            setResults(data.results || []);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (criteriaFromUrl) {
            setQuery(criteriaFromUrl);
            const fetchResults = async () => {
                setLoading(true);
                setSearched(true);
                try {
                    const data = await searchClient.searchMovies(criteriaFromUrl);
                    setResults(data.results || []);
                } catch (err) {
                    console.error(err);
                }
                setLoading(false);
            };
            fetchResults();
        }
    }, [criteriaFromUrl]);

    return (
        <div>
            <h2 className="mb-2">Search Food Movies &amp; Shows</h2>
            <p className="text-muted mb-4">
                Try searching for &quot;Ratatouille&quot;, &quot;Chef&quot;, &quot;Julie and Julia&quot;, &quot;Burnt&quot;, or &quot;The Hundred-Foot Journey&quot;
            </p>
            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search for food movies, cooking shows, chef films..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button className="btn btn-warning px-4" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {loading && <p className="text-center">Loading...</p>}

            {!loading && searched && results.length === 0 && (
                <p className="text-center text-muted">No results found.</p>
            )}

            <div className="row">
                {results.map((movie: any) => (
                    <div key={movie.id} className="col-md-3 col-sm-6 mb-4">
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
                                            height: 300,
                                            backgroundColor: "var(--purple-mid)",
                                        }}
                                    >
                                        <span className="text-muted">No Image</span>
                                    </div>
                                )}
                                <div className="card-body">
                                    <h6 className="card-title">{movie.title}</h6>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted">
                                            {movie.release_date
                                                ? movie.release_date.substring(0, 4)
                                                : "N/A"}
                                        </small>
                                        <small>
                                            <span className="star-filled">★</span>{" "}
                                            {movie.vote_average?.toFixed(1)}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Search() {
    return (
        <Suspense fallback={<p className="text-center mt-5">Loading...</p>}>
            <SearchContent />
        </Suspense>
    );
}