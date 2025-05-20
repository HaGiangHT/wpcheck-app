import {useParams} from 'react-router-dom';
import data from '../data/data.json';
import StockDetail from '../components/StockDetail';
import type {Wertpapier} from '../types/Wertpapier';
import { Container} from "@mui/material";
import { useFavorites } from '../hooks/FavoriteStorage.ts';

export default function DetailsPage() {
    const {wkn} = useParams();
    const item = data.find((w: Wertpapier) => w.wkn === wkn);
    const { favorites, toggleFavorite } = useFavorites();

    if (!item) {
        return <p>Wertpapier nicht gefunden.</p>;
    }

    return (
        <Container maxWidth="xl"
                   sx={{mt: 1}}>
            <StockDetail data={item} key={item.wkn}
                         isFavorite={favorites.some(fav => fav.wkn === item.wkn)}
                         toggleFavorite={()=>toggleFavorite(item)}/>

        </Container>
    )
}
