"use client";

export default function PrivacyPolicy() {
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <h2 className="mb-4">Privacy Policy</h2>
                <div className="card">
                    <div className="card-body">
                        <p className="text-muted">
                            <em>Last updated: {new Date().toLocaleDateString()}</em>
                        </p>

                        <h5>Information We Collect</h5>
                        <p>
                            When you create an account, we collect your username, email
                            address, first name, and last name. We also store reviews,
                            bookmarks, and follow relationships you create while using the
                            application.
                        </p>

                        <h5>How We Use Your Information</h5>
                        <p>
                            Your information is used solely to provide the FoodieRevs
                            service — a platform for reviewing food-related movies and shows.
                            We display your username and role on reviews you write. Your email
                            and phone number are kept private and only visible to you on your
                            own profile.
                        </p>

                        <h5>Third-Party Services</h5>
                        <p>
                            We use The Movie Database (TMDB) API to provide movie and show
                            information, posters, and trending data. Your search queries are
                            sent to TMDB through our server. We do not share your personal
                            information with TMDB or any other third party.
                        </p>

                        <h5>Data Storage</h5>
                        <p>
                            Your data is stored securely in a MongoDB database. We recommend
                            using a unique password for this application.
                        </p>

                        <h5>Your Rights</h5>
                        <p>
                            You may update your profile information at any time. You may
                            delete your reviews at any time. To request account deletion,
                            please contact the site administrator.
                        </p>

                        <h5>Contact</h5>
                        <p>
                            For questions about this privacy policy, please contact the
                            development team through the GitHub repository.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}