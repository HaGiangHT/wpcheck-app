import {Box, Button, Container, Stack, Typography, Link} from "@mui/material";
import InfoCard from "../components/InfoCard";
import ResponsiveRow from "../components/ResponsiveRow.tsx";
import checkImage from '../assets/check_blau.png';
import diagrammImage from '../assets/diagramm_blau.png';
import lesezeichenImage from '../assets/lesezeichnen.png';
import schlossImage from '../assets/schloss.png';
import stocksImage from '../assets/stocks.png';
import unternehmenImage from '../assets/unternehmensprofil_blau.png';
import { Link as RouterLink } from 'react-router-dom';


function Home() {

    return (
        <>
            {/* Hero Section */}
            <Box
                sx={{
                    minHeight: '60vh',
                    backgroundImage: 'url("/src/assets/homepage.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    position: 'relative',
                    color: 'white',
                }}
            >

                <Container maxWidth="xl" sx={{padding: 4}}>
                    <Typography variant="h3" gutterBottom color="white" sx={{paddingLeft: 4}}>
                        Wertpapiere analysieren. <br/>
                        Chancen erkennen. <br/>
                        Klar entscheiden. <br/>
                    </Typography>
                    <Typography variant="h6" color="white" sx={{mb: 3, paddingLeft: 4}}>
                        Eine Anwendung zur Unterstützung des Vergleichs und <br/>
                        der Auswahl von Wertpapieren - übersichtlich, <br/>
                        nachvollziehbar und auf den Punkt.
                    </Typography>
                    <Box sx={{textAlign: "left", paddingLeft: 4}}>
                        <Button variant="contained" color="secondary" component={RouterLink} to="/search " onClick={() => {
                            window.scrollTo(0, 0);
                        }}>
                            Sofort lostlegen
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{mt: 6, mb: 4}}>
                <Stack mt={6} spacing={4} alignItems={"stretch"}>
                    <InfoCard
                        title="Wertpapiere strukturiert vergleichen - für fundierte Entscheidungen"
                        text={
                            <>Wertpapier Check unterstützt Sie dabei, Wertpapiere systematisch zu vergleichen und
                                geeignete Anlageentscheidungen zu treffen. Ob Aktien, Anleihen, ETFs oder andere
                                Anlageformen - wir richten uns an Anlegerinnen und Anleger, die nicht auf Spekulation,
                                sondern auf Transparenz, Vergleichbarkeit und sachliche Informationen setzen.
                                <br/>
                                <br/>
                                Anhand objektiver Kriterien wie Risikoklasse Renditekennzahlen, Emittentenprofilen und
                                weiteren Merkmalen können Sie verschiedene Wertpapiere gezielt gegenüberstellen. Jedes
                                Wertpapier ist zusätzlich mit einem kompakten Profil des Unternehmens oder Emittenten
                                verknüpft, um lhnen auch den Hintergrund der Anlage verständlich darzustellen.
                                <br/>
                                <br/>
                                Die Anwendung wurde so gestaltet, dass sie einfach und intuitiv zu bedienen ist. Wir
                                stellen Ihnen sachliche Informationen, Vergleichsmöglichkeiten und kompakte
                                Unternehmensprofile zur Verfügung, damit Sie auf einer verlässlichen Grundlage
                                entscheiden können. Dabei legen wir besonderen Wert auf Übersichtlichkeit,
                                Nachvollziehbarkeit und Werbefreiheit.
                            </>}
                        buttonText="Zur Wertpapiersuche"
                        linkTo="/search"
                        variant="plain"
                    />


                    <ResponsiveRow mt={3} gap={3} flexValues={[1, 1]}>
                        <InfoCard
                            iconTop={<img src={stocksImage} alt="Check Image" style={{width: 150}}/>}
                            backgroundColor="#2C50B3"
                            text={
                                "Beobachten Sie aktuelle Aktienkurse und Entwicklungen – einfach, übersichtlich und ohne Ablenkung."
                            }
                            textColor="#ffffff"
                        />
                        <InfoCard
                            iconTop={<img src={diagrammImage} alt="Check Image" style={{width: 150}}/>}
                            text={
                                "Kurstrends auf einen Blick – mit klaren Liniencharts statt komplexer Darstellungen."
                            }
                        />
                    </ResponsiveRow>

                    <ResponsiveRow mt={3} gap={3} flexValues={[1, 1]}>
                        <InfoCard
                            iconTop={<img src={unternehmenImage} alt="Check Image" style={{width: 150}}/>}
                            text={
                                "Branche, Kennzahlen, Risikoklasse – alle wesentlichen Informationen zum Wertpapier kompakt zusammengefasst."
                            }
                        />
                        <InfoCard
                            iconTop={<img src={lesezeichenImage} alt="Check Image" style={{width: 150}}/>}
                            backgroundColor="#2C50B3"
                            text={
                                "Markieren Sie interessante Wertpapiere und finden Sie sie jederzeit wieder."
                            }
                            textColor="#ffffff"
                        />
                    </ResponsiveRow>
                    <ResponsiveRow mt={3} gap={3} flexValues={[1, 1]}>
                        <InfoCard
                            iconTop={<img src={schlossImage} alt="Check Image" style={{width: 150}}/>}
                            backgroundColor="#2C50B3"
                            text={
                                "Ihre Daten bleiben geschützt. "
                            }
                            textColor="#ffffff"
                        />
                        <InfoCard
                            iconTop={<img src={checkImage} alt="Check Image" style={{width: 150}}/>}
                            text={
                                "Wir setzen auf Transparenz, Verschlüsselung und Werbefreiheit. Klare Informationen, kein Finanz-Hype: Unsere Anwendung setzt auf Transparenz, Neutralität und sachliche Darstellung."
                            }
                        />
                    </ResponsiveRow>
                    <InfoCard
                        variant="plain"
                        title="Wissen, worin man investiert?"
                        text={
                        <Typography variant="body1" color="text.primary">
                            Viele Anlegerinnen und Anleger möchten nicht nur Zahlen vergleichen,
                            sondern auch verstehen, <strong>was hinter einem Wertpapier steht</strong>:<br/>
                            Was genau ist eine Aktie? Was bedeutet ETF? Und was sagt eine Risikoklasse wirklich aus?
                            <br/>
                            <br/>
                            In unserem Wissensbereich finden Sie verständlich aufbereitete Hintergrundinformationen rund
                            um das Thema Wertpapiere - ohne Fachjargon, Schritt für Schritt erklärt.
                            <br/>
                            <br/>
                            Schauen Sie gern einmal
                            {' '}
                            <Link component={RouterLink} to="/knowledge" onClick={() => {
                                window.scrollTo(0, 0);
                            }}>
                                hier
                            </Link>, wenn Sie sich einen Überblick verschaffen möchten.
                        </Typography>
                        }
                    />
                </Stack>
            </Container>
        </>
    );
}

export default Home;
