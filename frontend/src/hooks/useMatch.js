import { useState, useEffect } from "react";
import { fetchUserEvents, createMatch } from "../services/matchService";

export const useMatch = (userId) => {
    const [events, setEvents] = useState([]);
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