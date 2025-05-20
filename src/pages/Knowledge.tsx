import {Container, Stack, Typography} from "@mui/material";
import InfoCard from "../components/InfoCard.tsx";


function Knowledge() {
    return (
        <Container maxWidth="xl" sx={{mt: 8, mb: 4}}>
            <Typography variant="h3" component="h1" align="center" sx={{mb: 6}}>
                Wissen
            </Typography>
            <Stack spacing={4} alignItems="center">


                <InfoCard
                    backgroundColor={"#f5faff"}
                    title="Was ist eine Aktie?"
                    text={
                        <>
                            Eine <strong>Aktie</strong> ist ein Anteil an einem Unternehmen. Wer eine Aktie besitzt, ist
                            Miteigentümer – mit dem Recht auf mögliche <strong>Dividenden</strong> (Gewinnausschüttung)
                            und auf <strong>Kursgewinne</strong> (steigender Aktienpreis). <br/><br/>
                            Aktien bieten Chancen, bergen aber auch Risiken. Ihr Wert kann steigen – aber auch fallen.
                        </>
                    }
                />

                <InfoCard
                    variant="plain"
                    title="Was sind Anleihen?"
                    text={<><strong>Anleihen</strong> sind festverzinsliche Wertpapiere, mit denen Unternehmen oder Staaten Geld
                        aufnehmen. Wer eine Anleihe kauft, leiht dem Herausgeber (Emittenten) Geld für eine bestimmte
                        Laufzeit. Im Gegenzug erhält der Anleger regelmäßige Zinszahlungen und am Ende der Laufzeit die
                        Rückzahlung des Nominalbetrags. Anleihen gelten oft als sicherere Geldanlage im Vergleich zu
                        Aktien, da die Rückzahlung meist vertraglich zugesichert ist.
                    </>}/>

                <InfoCard
                    backgroundColor={"#f5faff"}
                    title="Was ist ein ETF?"
                    text={<>
                        Ein <strong>ETF (Exchange Traded Fund)</strong> ist ein börsengehandelter Fonds, der einen Index
                        wie zum Beispiel
                        den DAX oder den MSCI World abbildet. ETFs ermöglichen es Anleger:innen, einfach und
                        kostengünstig in eine Vielzahl von Aktien oder Anleihen zu investieren, ohne einzelne
                        Wertpapiere kaufen zu müssen. Sie sind an der Börse handelbar und bieten dadurch hohe
                        Flexibilität und Transparenz.
                    </>
                    }/>

                <InfoCard
                    variant="plain"
                    title="Was sind Fonds?"
                    text={<> Ein <strong>Fonds</strong> ist ein gemeinsames Anlagevehikel, bei dem viele Anleger:innen
                        ihr Geld bündeln,
                        um professionell verwaltet in verschiedene Wertpapiere wie Aktien, Anleihen oder Immobilien zu
                        investieren. Durch die breite Streuung im Fonds wird das Risiko reduziert. Fonds gibt es in
                        verschiedenen Varianten, z.B. Aktienfonds, Rentenfonds oder Mischfonds, je nach
                        Anlageschwerpunkt und
                        Risikobereitschaft.</>}
                />


            </Stack>
        </Container>
    )
        ;
}

export default Knowledge;
