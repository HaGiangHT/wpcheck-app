import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import theme from "../theme.ts";

export default function Footer() {
    return (
        <Box component="footer" sx={{ backgroundColor: theme.palette.primary.main, mt: 'auto', py: 4 }}>
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography variant="body2" color="white">
                        © {new Date().getFullYear()} Webseite von Ha Giang Hoang Tran. Alle Rechte vorbehalten.
                    </Typography>

                    <Stack direction="row" spacing={3}>
                        <Link component={RouterLink} to="/impressum" color="white" underline="hover">
                            Impressum
                        </Link>
                        <Link component={RouterLink} to="/datenschutz" color="white" underline="hover">
                            Datenschutz
                        </Link>
                        <Link component={RouterLink} to="/kontakt" color="white" underline="hover">
                            Kontakt
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
