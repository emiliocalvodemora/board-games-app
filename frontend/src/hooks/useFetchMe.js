import { useState, useEffect } from "react";
import { fetchMe } from "../services/userService";

export const useFetchMe = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEvents = async () => {
            const userEvents = await fetchUserEvents(userId);
            setEvents(userEvents);
            setLoading(false);
        };
        loadEvents();
    }, [userId]);

    const handleSubmitMatch = async (matchData) => {
        return await createMatch(matchData, userId);
    };  

    return { events, loading, handleSubmitMatch };
};  