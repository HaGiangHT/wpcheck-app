import {Typography, Button, Box, Avatar} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import {useNavigate} from 'react-router-dom';
import type {Wertpapier} from "../types/Wertpapier.ts";
import {useLogo} from "../hooks/useLogo.ts";


interface StockCardProps {
    data: Wertpapier;
    isFavorite: boolean;
    toggleFavorite: (wkn: string) => void;
    searchState?: {
        query: string;
        filterTyp: string;
        filterRisiko: string;
        sortBy: 'kurs' | 'risiko';
        sortOrder: 'asc' | 'desc';
    }
}


export default function StockCard({data, isFavorite, toggleFavorite, searchState}: StockCardProps) {
    const navigate = useNavigate();
    const logo = useLogo(data.wkn);

    return (
        <Box
            sx={{
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: 2,
                p: 2,
                cursor: 'pointer',
                '&:hover': {boxShadow: 3},
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
            onClick={() => {
                window.scroll(0,0);
                const params = new URLSearchParams();

                if (searchState?.query) params.set('query', searchState.query);
                if (searchState?.filterTyp) params.set('typ', searchState.filterTyp);
                if (searchState?.filterRisiko) params.set('risiko', searchState.filterRisiko);
                if (searchState?.sortBy) params.set('sort', searchState.sortBy);
                if (searchState?.sortOrder) params.set('order', searchState.sortOrder);

                navigate(`/details/${data.wkn}?${params.toString()}`, {
                    state: {
                        ...searchState,
                        from: window.location.hash.replace('#',''),
                    }
                });
            }}
        >
            {/* Linke Seite*/}
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, minWidth: '200px'}}>
                <Avatar
                    src={logo ?? undefined}
                    alt={data.name}
                    sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#",
                        color: 'primary.main',
                        fontSize: 18,
                    }}
                >
                    {!logo && data?.name?.charAt(0)}
                </Avatar>

                <Box sx={{minWidth: '200px'}}>
                    <Typography variant="h5">{data.name}</Typography>
                    <Typography variant="body1" color="text.secondary">
                        WKN: {data.wkn}
                    </Typography>
                </Box>
            </Box>

            {/*Rechte Seite*/}
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: '2',
                ml: "auto",
                flexWrap: 'wrap',
            }}
            >
                <Box
                    display="flex"
                    flexDirection={{xs: 'column', sm: 'row'}}
                    alignItems={{xs: 'flex-end', sm: 'center'}}
                    gap={6}
                    padding="5px"
                >
                    <Typography variant="body1" sx={{
                        textAlign: 'links',
                        minWidth: '60px',
                        maxWidth: '120px',
                        flexShrink: 1,
                    }}>Risiko: {data.anlagerisiko}
                    </Typography>
                    <Box sx={{ width: '1px', height: '40px', backgroundColor: 'primary.main', mx: 2, display: {
                            xs: 'none', sm: 'block'}}} />
                    <Typography variant="h5" sx={{
                        textAlign: 'right',
                        width: {xs: '60px', sm: '80px', md: '100px'},
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: {xs: '0.9rem', sm: '1rem', md: '1.2rem'}
                    }}>{data.kurs} €
                    </Typography>
                </Box>
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(data.wkn);
                    }}
                    sx={{minWidth: 40}}
                >
                    {isFavorite ? <StarIcon color="warning"/> : <StarBorderOutlinedIcon/>}
                </Button>
            </Box>
        </Box>
    );
}