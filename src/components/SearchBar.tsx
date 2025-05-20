import { useState, useEffect } from 'react';
import {Box, Typography, Divider, Stack, TextField, Select, MenuItem,
    FormControl, InputLabel, Button} from '@mui/material';
import data from '../data/data.json';
import StockCard from "./StockCard.tsx";
import type { Wertpapier } from '../types/Wertpapier';
import { useFavorites } from '../hooks/FavoriteStorage.ts';
import { useSearchFilters } from '../hooks/useSearchFilters';

type CategoryMap = Record<string, Wertpapier[]>;

const TOP_COUNT = 5;

function SearchBar() {
    const [filtered, setFiltered] = useState<Wertpapier[]>([]);
    const [zeigeTop5, setZeigeTop5] = useState(false);
    const { favorites, toggleFavorite } = useFavorites();
    const { query, filterTyp, filterRisiko, sortBy, sortOrder, setFilter } = useSearchFilters();

    const searchState = { query, filterTyp, filterRisiko, sortBy, sortOrder };

    const topWertpapiere = [...data]
        .sort((a, b) => b.kurs - a.kurs)
        .slice(0, TOP_COUNT);

    const filterAktiv =
        query.trim() !== '' || filterTyp !== '' || filterRisiko !== '';

    useEffect(() => {
        let result = data.filter(item =>
            [item.name, item.wkn, item.isin].some(field =>
                field.toLowerCase().includes(query.toLowerCase())
            )
        );

        if (filterTyp) {
            result = result.filter(item =>
                item.typ.toLowerCase() === filterTyp.toLowerCase()
            );
        }

        if (filterRisiko) {
            result = result.filter(item =>
                item.anlagerisiko.toLowerCase() === filterRisiko.toLowerCase()
            );
        }

        result = result.sort((a, b) => {
            if (sortBy === 'kurs') {
                return sortOrder === 'asc' ? a.kurs - b.kurs : b.kurs - a.kurs;
            } else {
                if (a.anlagerisiko < b.anlagerisiko) return sortOrder === 'asc' ? -1 : 1;
                if (a.anlagerisiko > b.anlagerisiko) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            }
        });

        setFiltered(result);
    }, [query, filterTyp, filterRisiko, sortBy, sortOrder]);

    const displayedItems = zeigeTop5 && !filterAktiv ? topWertpapiere : filtered.length > 0 || filterAktiv ? filtered : data;

    const groupedResults: CategoryMap = displayedItems.reduce((category, item) => {
        const key = item.typ.toUpperCase();
        if (!category[key]) category[key] = [];
        category[key].push(item);
        return category;
    }, {} as CategoryMap);

    return (
        <Box sx={{ mt: 6, px: 2 }}>
            <TextField
                fullWidth
                variant="outlined"
                label="Wertpapier suchen (Name, WKN, ISIN)"
                value={query}
                onChange={(e) => setFilter('query', e.target.value)}
                sx={{ mb: 2 }}
            />

            {/* Filter */}
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Typ filtern</InputLabel>
                    <Select
                        value={filterTyp}
                        label="Typ filtern"
                        onChange={(e) => setFilter('typ', e.target.value)}
                    >
                        <MenuItem value="">Alle</MenuItem>
                        <MenuItem value="Aktie">Aktie</MenuItem>
                        <MenuItem value="ETF">ETF</MenuItem>
                        <MenuItem value="Anleihe">Anleihe</MenuItem>
                        <MenuItem value="Fonds">Fonds</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Risiko filtern</InputLabel>
                    <Select
                        value={filterRisiko}
                        label="Risiko filtern"
                        onChange={(e) => setFilter('risiko', e.target.value)}
                    >
                        <MenuItem value="">Alle</MenuItem>
                        <MenuItem value="Niedrig">Niedrig</MenuItem>
                        <MenuItem value="Mittel">Mittel</MenuItem>
                        <MenuItem value="Hoch">Hoch</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Sortieren nach</InputLabel>
                    <Select
                        value={sortBy}
                        label="Sortieren nach"
                        onChange={(e) => setFilter('sort', e.target.value as 'kurs' | 'risiko')}
                    >
                        <MenuItem value="kurs">Kurs</MenuItem>
                        <MenuItem value="risiko">Risiko</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Sortierreihenfolge</InputLabel>
                    <Select
                        value={sortOrder}
                        label="Sortierreihenfolge"
                        onChange={(e) => setFilter('order', e.target.value as 'asc' | 'desc')}
                    >
                        <MenuItem value="asc">Aufsteigend</MenuItem>
                        <MenuItem value="desc">Absteigend</MenuItem>
                    </Select>
                </FormControl>
                {/* Top5-Umschaltbutton */}
                {!filterAktiv && (
                    <Box textAlign="center" my={2}>
                        <Button
                            variant="outlined"
                            onClick={() => setZeigeTop5(prev => !prev)}
                        >
                            {zeigeTop5 ? "Alle anzeigen" : "Top 5 anzeigen"}
                        </Button>
                    </Box>
                )}
            </Stack>



            {displayedItems.length === 0 && (
                <Typography sx={{ mt: 2 }} color="text.secondary">
                    Keine Ergebnisse gefunden.
                </Typography>
            )}

            {Object.entries(groupedResults).map(([category, items]) => (
                <Box key={category} sx={{ mt: 6, px: 2, padding: 0 }}>
                    <Typography variant="h6" gutterBottom>
                        {category}
                    </Typography>
                    <Divider />
                    <Stack spacing={2} mt={2}>
                        {items.map((item) => (
                            <StockCard
                                key={item.wkn}
                                data={item}
                                isFavorite={favorites.some(fav => fav.wkn === item.wkn)}
                                toggleFavorite={() => toggleFavorite(item)}
                                searchState={searchState}
                            />
                        ))}
                    </Stack>
                </Box>
            ))}
        </Box>
    );
}

export default SearchBar;
