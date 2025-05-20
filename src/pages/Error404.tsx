import { Box, Typography, Button, Stack } from "@mui/material";
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useNavigate } from "react-router-dom";

export default function NotFound404() {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
            bgcolor="#f5f5f5"
            px={2}
            sx={{ py: 8 }}
        >
            <TrendingDownIcon sx={{ fontSize: 80, color: "#e53935" }} />
            <Typography variant="h2" fontWeight="bold" gutterBottom>
                404 – Kurs nicht gefunden!
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={4}>
                Dieses Wertpapier ist entweder insolvent… oder existiert gar nicht. 😅
            </Typography>

            <Stack spacing={2} direction="row">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/")}
                >
                    Zurück zur Startseite
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => window.location.reload()}
                >
                    Neu laden – vielleicht hilft’s 🤷
                </Button>
            </Stack>

            <Typography variant="body2" mt={5} color="text.secondary">
                Tipp: Frag mal deinen Broker oder deinen Browser.
            </Typography>
        </Box>
    );
}
