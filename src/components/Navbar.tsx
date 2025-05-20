import {AppBar, Toolbar, IconButton, Typography, Button, Stack, Drawer, List, ListItemText,
    useTheme, useMediaQuery, ListItemButton,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {Link} from 'react-router-dom';
import {useState} from 'react';

const navItems = [
    {label: 'Startseite', to: '/'},
    {label: 'Suche', to: '/search'},
    {label: 'Favoriten', to: '/favorites'},
    {label: 'Wissen', to: '/knowledge'},
    {label: 'Über uns', to: '/about'},
    {label: 'Login', to: '/auth'},
];

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // z.B. unter 600px

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <List sx={{width: 200}}>
            {navItems.map(({label, to}) => (
                <ListItemButton key={label} component={Link} to={to} onClick={() => setMobileOpen(false)}>
                    <ListItemText primary={label}/>
                </ListItemButton>
            ))}
        </List>
    );

    return (
        <>
            <AppBar position="fixed" color="default">
            <Toolbar
                sx={{
                    minHeight: { xs: 80, sm: 88, md: 90 }
                }}
            >
                <IconButton size='large' edge={"start"} color={"primary"} sx={{pointerEvents: 'none'}}>
                    {isMobile ? (
                        <ShowChartIcon fontSize="small"/>
                    ) : (
                        <ShowChartIcon/>
                    )}
                </IconButton>

                <Typography
                    variant="h5"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: theme.palette.primary.main,
                    }}
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                >
                    Wertpapier Check
                </Typography>

                {isMobile ? (
                    <IconButton color="inherit" onClick={handleDrawerToggle}>
                        <MenuIcon/>
                    </IconButton>
                ) : (
                    <Stack direction="row" spacing={2}>
                        {navItems.map(({label, to}) => (
                            <Button
                                key={label}
                                color="primary"
                                component={Link}
                                to={to}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        color: 'secondary.main',
                                    },
                                }}
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                }}
                            >
                                {label}
                            </Button>
                        ))}
                    </Stack>
                )}
            </Toolbar>
        </AppBar><Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
        >
            {drawer}
        </Drawer></>

)
    ;
}

export default Navbar;
