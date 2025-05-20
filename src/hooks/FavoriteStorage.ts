import { useState, useEffect } from 'react';
import type { Wertpapier } from '../types/Wertpapier.ts';

const FAVORITES_STORAGE_KEY = 'favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Wertpapier[]>(() => {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (item: Wertpapier) => {
        setFavorites(prev => {
            const exists = prev.find(fav => fav.wkn === item.wkn);
            return exists
                ? prev.filter(fav => fav.wkn !== item.wkn)
                : [...prev, item];
        });
    };

    return { favorites, toggleFavorite };
}
