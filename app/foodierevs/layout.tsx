"use client";
import { Provider } from "react-redux";
import store from "./store";
import Session from "./account/Session";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "./globals.css";

export default function FoodieRevsLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <Session>
                <Navigation />
                <div className="container mt-4 mb-5">{children}</div>
                <Footer />
            </Session>
        </Provider>
    );
}