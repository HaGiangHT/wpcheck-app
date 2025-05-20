import React, {useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Paper,
    Tabs,
    Tab,
    Stack, Typography, Link,
} from '@mui/material';
import {Link as RouterLink} from "react-router-dom";

export default function AuthPage() {
    const [tab, setTab] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Tabs value={tab} onChange={handleTabChange} centered>
                    <Tab label="Login" />
                    <Tab label="Registrieren" />
                </Tabs>

                {tab === 0 && (
                    <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
                        <Stack spacing={2}>
                            <TextField label="E-Mail" type="email" fullWidth required />
                            <TextField label="Passwort" type="password" fullWidth required />
                            <Button variant="contained" color="primary">Login</Button>
                        </Stack>
                        <Typography variant="body2" align="right" color="text.secondary" sx={{mt:1}}>
                            <Link component={RouterLink} to="/error404" onClick={() => {
                                window.scrollTo(0, 0);
                            }}>
                                Passwort vergessen?
                            </Link>.
                            </Typography>
                    </Box>
                )}

                {tab === 1 && (
                    <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
                        <Stack spacing={2}>
                            <TextField label="Name" fullWidth required />
                            <TextField label="E-Mail" type="email" fullWidth required />
                            <TextField label="Passwort" type="password" fullWidth required />
                            <TextField label="Passwort bestätigen" type="password" fullWidth required />
                            <Button variant="contained" color="primary">Registrieren</Button>
                        </Stack>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}
