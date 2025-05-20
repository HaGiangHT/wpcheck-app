import {Container, Typography} from "@mui/material";

function About() {
    return (
        <Container maxWidth="xl" sx={{mt: 8, mb: 4}}>
            <Typography variant="h3" component="h1" align="center" sx={{mb: 6}}>
                Über uns
            </Typography>
        </Container>);
}

export default About;
