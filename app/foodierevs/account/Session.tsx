"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../account/reducer";
import * as accountClient from "../account/client";

export default function Session({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await accountClient.profile();
                dispatch(setCurrentUser(user));
            } catch {
                // not logged in
            }
        };
        fetchProfile();
    }, [dispatch]);

    return <>{children}</>;
}