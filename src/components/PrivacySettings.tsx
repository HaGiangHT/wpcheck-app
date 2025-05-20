import { useState } from 'react';
import {Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button,
    FormControlLabel, Checkbox} from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

function PrivacySettings() {
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState({
        funktional: true,
        statistik: false,
        marketing: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({
            ...settings,
            [event.target.name]: event.target.checked
        });
    };

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    left: 24,
                    zIndex: 1600,
                }}
            >
                <IconButton
                    color="default"
                    onClick={() => setOpen(true)}
                    sx={{
                        color: "white",
                        bgcolor: 'primary.main',
                        boxShadow: 2,
                        '&:hover': { bgcolor: 'primary.main' },
                        p:1,
                    }}
                >
                    <FingerprintIcon sx={{ fontSize: 32 }}/>
                </IconButton>
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Datenschutzeinstellungen</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={1}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={settings.funktional}
                                onChange={handleChange}
                                name="funktional"
                            />
                        }
                        label="Funktionale Cookies"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={settings.statistik}
                                onChange={handleChange}
                                name="statistik"
                            />
                        }
                        label="Statistik-Cookies"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={settings.marketing}
                                onChange={handleChange}
                                name="marketing"
                            />
                        }
                        label="Marketing-Cookies"
                    />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Speichern</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PrivacySettings;
