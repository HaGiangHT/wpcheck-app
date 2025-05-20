import {Box, Typography, Stack, Container, Link} from '@mui/material';
import StockCard from '../components/StockCard';
import {useFavorites} from '../hooks/FavoriteStorage.ts';
import {Link as RouterLink} from "react-router-dom";

export default function FavoritesPage() {
    const {favorites, toggleFavorite} = useFavorites();

    return (
        <Container maxWidth={"xl"}
                   sx={{ mt: 8 }}>
            <Typography variant="h3" gutterBottom align="center">Favoriten</Typography>
            {/* Hinweistext soll verschwinden, falls sich Nutzer anmeldet. */}
            <Typography variant="body2" align="center" color="text.secondary">
                <strong>Hinweis</strong>: Ihre Favoriten sind lokal nur auf diesem Gerät gespeichert. <br/>
                Möchten Sie Ihre Liste auch auf anderen Geräte haben? Dann nutzen Sie das {' '}
                <Link component={RouterLink} to="/auth" onClick={() => {
                window.scrollTo(0, 0);
            }}>
                Login
            </Link>.
            </Typography>
            <Box sx={{mt: 6, px: 2}}>

                {favorites.length === 0 ? (
                    <Typography>Keine Favoriten vorhanden.</Typography>
                ) : (
                    <Stack spacing={2}>
                        {favorites.map(item => (
                            <StockCard
                                key={item.wkn}
                                data={item}
                                isFavorite={true}
                                toggleFavorite={() => toggleFavorite(item)}
                            />
                        ))}
                    </Stack>
                )}
            </Box>
        </Container>
    );
}
