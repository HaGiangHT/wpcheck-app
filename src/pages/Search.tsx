import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SearchBar from '../components/SearchBar';
import { Container, Typography } from '@mui/material';

function SearchPage() {
    return (
        <Container
            maxWidth={"xl"}
            sx={{ mt: 8}}
        >
            <Typography variant="h3" gutterBottom align="center">
                Suche nach Wertpapieren <QueryStatsIcon fontSize={"large"}/>
            </Typography>
            <SearchBar/>
        </Container>
    );
}

export default SearchPage;

