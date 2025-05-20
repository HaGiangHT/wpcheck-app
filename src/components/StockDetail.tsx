import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Box, Typography, CircularProgress, ToggleButtonGroup, ToggleButton, Avatar, Button, Divider} from '@mui/material';
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,} from 'recharts';
import {format, parseISO, subDays, subMonths, subYears} from 'date-fns';
import type {Wertpapier} from "../types/Wertpapier.ts";
import * as React from "react";
import {useLogo} from '../hooks/useLogo';
import InfoCard from "./InfoCard.tsx";
import headerImage from '../assets/DetailHeader2.svg';
import useInfo from '../data/informationen.json';
import ResponsiveRow from "./ResponsiveRow.tsx";
import useKennzahlen from '../data/kennzahlen.json';
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import {type KursDatum, berechneVeränderungen } from '../utils/kursUtils';

interface StockDetailsProps  {
    isFavorite: boolean;
    data: Wertpapier
    toggleFavorite: (wkn: string) => void;
}

export default function StockDetails({data, isFavorite, toggleFavorite}: StockDetailsProps) {
    const [kursdaten, setKursdaten] = useState<KursDatum[] | null>(null);
    const [filteredData, setFilteredData] = useState<KursDatum[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [zeitraum, setZeitraum] = useState('MAX');
    const logo = useLogo(data.wkn);
    const infos = useInfo.find(item => item.wkn == data.wkn);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const from = location.state?.from;
    const kennzahlen = useKennzahlen.find(item => item.wkn === data.wkn);
    const text = infos?.profil || (() => {
        switch (data.typ) {
            case "Aktie":
                return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aktienmärkte schwanken, und Investoren sollten langfristige Strategien verfolgen. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
            case "ETF":
                return "Lorem ipsum dolor sit amet, ETF-basierte Anlagen bieten eine breite Diversifikation bei gleichzeitig niedrigen Kosten. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
            case "Fonds":
                return "Lorem ipsum dolor sit amet, aktiv verwaltete Fonds zielen darauf ab, den Markt durch gezielte Auswahl zu übertreffen. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
            case "Anleihe":
                return "Lorem ipsum dolor sit amet, Anleihen bieten regelmäßige Zinserträge und gelten als risikoärmeres Investment. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
            default:
                return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Informationen zu diesem Wertpapiertyp sind derzeit nicht verfügbar.";
        }
    })();


    const isFromFavorites = from?.startsWith('/favorites');

    const backTarget = isFromFavorites
        ? '/favorites'
        : `/search?${searchParams.toString()}`;

    const letztesDatum = filteredData && filteredData.length > 0
        ? parseISO(filteredData[filteredData.length - 1].date)
        : new Date();

    const {
        letzterPreis,
        veraenderungGestern,
        veraenderungEineWoche,
        veraenderungEinMonat,
        veraenderungSechsMonate,
        veraenderungEinJahr,
    } = berechneVeränderungen(filteredData, letztesDatum);


    const kursDatenLoader = import.meta.glob('../data/kursverlauf*.json');
    useEffect(() => {
        async function fetchKursdaten() {
            setLoading(true);
            setError(null);

            const useFineData = zeitraum === '1T' || zeitraum === '1W';
            const fileName = useFineData
                ? `../data/kursverlauf_fine_${data.wkn}.json`
                : `../data/kursverlauf_${data.wkn}.json`;

            const loadKursdaten = kursDatenLoader[fileName];
            if (!loadKursdaten) {
                setError('Kursverlauf nicht verfügbar');
                setLoading(false);
                return;
            }

            try {
                const module = await loadKursdaten();
                const typedModule = module as { default: KursDatum[] };
                setKursdaten(typedModule.default);
            } catch {
                setError('Kursverlauf nicht verfügbar');
            } finally {
                setLoading(false);
            }
        }

        fetchKursdaten();
    }, [data.wkn, zeitraum]);


    useEffect(() => {
        if (!kursdaten) return;

        const now = new Date();
        let cutoffDate: Date | null = null;

        switch (zeitraum) {
            case '1T':
                cutoffDate = subDays(now, 1);
                break;
            case '1W':
                cutoffDate = subDays(now, 7);
                break;
            case '1M':
                cutoffDate = subMonths(now, 1);
                break;
            case '6M':
                cutoffDate = subMonths(now, 6);
                break;
            case '1J':
                cutoffDate = subYears(now, 1);
                break;
            default:
                cutoffDate = null;
        }

        const gefiltert = cutoffDate
            ? kursdaten.filter((d) => {
                return parseISO(d.date) >= cutoffDate;
            })
            : kursdaten;

        setFilteredData(gefiltert);
    }, [kursdaten, zeitraum]);

    const lineColor = React.useMemo(() => {
        if (!filteredData || filteredData.length === 0) return '#1976d2'; // Blau als Default

        const firstKurs = filteredData[0].kurs;
        const lastKurs = filteredData[filteredData.length - 1].kurs;

        return lastKurs < firstKurs ? '#d32f2f' : '#388e3c';
    }, [filteredData]);


    const eintraege = [
        { label: "Name", value: data.name },
        { label: "Typ", value: data.typ },
        { label: "Risikoklasse", value: data.anlagerisiko },
        { label: "Emittent", value: data.emittent },
        { label: "Nächste Hauptversammlung", value: format(parseISO(data.datum_naechste_hauptversammlung), 'dd.MM.yyyy') },
        { label: "ISIN", value: data.isin },
        { label: "WKN", value: data.wkn }
    ];

    const spezifischeEintraege: { label: string; value: React.ReactNode | string }[] = [];


    if (kennzahlen && data.typ === "Aktie") {
        spezifischeEintraege.push(
            { label: "Branche", value: kennzahlen.branche },
            { label: "Sitz", value: kennzahlen.sitz },
            { label: "Dividendenrendite", value: kennzahlen.dividendenRendite },
            { label: "letzte Dividende", value: kennzahlen.letzteDividende },
            { label: "Gewinn je Aktie", value: kennzahlen.gewinnJeAktie },
        );
    } else if (kennzahlen && data.typ === "ETF") {
        spezifischeEintraege.push(
            { label: "Index", value: kennzahlen.index },
            { label: "Fondvolumen", value: kennzahlen.fondvolumen },
            { label: "Ausschüttungsart", value: kennzahlen.ausschuettungsart },
            { label: "Dividende", value: kennzahlen.dividende },
            { label: "Listingdatum", value: kennzahlen.listingdatum },
            { label: "waehrung", value: kennzahlen.waehrung },
            { label: "Gebühren", value: kennzahlen.gebuehren },
        );
    } else if (kennzahlen && data.typ === "Fonds") {
        spezifischeEintraege.push(
            { label: "Fondart", value: kennzahlen.fondart },
            { label: "Fondvolumen", value: kennzahlen.fondvolumen },
            { label: "Ausschüttungsart", value: kennzahlen.ausschuettungsart },
            { label: "Gebühren", value: kennzahlen.gebuehren },
        );
    }else if (kennzahlen && data.typ === "Anleihe") {
        spezifischeEintraege.push(
            { label: "Kuponzins", value: kennzahlen.kuponzins },
            { label: "Fälligkeitsdatum", value: kennzahlen.faelligkeitsdatum },
            { label: "Laufzeit", value: kennzahlen.laufzeit },
            { label: "waehrung", value: kennzahlen.waehrung },
        );
    }

    const news = [
        {
            titel: "Dividendenwachstum bei " + data.name,
            datum: "2025-05-15",
            inhalt: "Das Unternehmen hat eine höhere Dividende angekündigt, was bei Anlegern gut ankommt.",
        },
        {
            titel: data.name + " mit starkem Quartalsergebnis",
            datum: "2025-05-10",
            inhalt: "Die jüngste Bilanz zeigt deutliche Umsatzsteigerungen im Vergleich zum Vorjahr.",
        },
        {
            titel: "Analysten empfehlen " + data.name,
            datum: "2025-05-05",
            inhalt: "Mehrere Analysten stufen das Papier auf 'Kaufen' hoch.",
        },
    ];

    return (

        <Box sx={{mx: 'auto', p: 2}}>
            <Button
                size="small"
                sx={{fontSize: "0.9rem"}}
                onClick={() => navigate(backTarget)}
            >
                Zurück zur Übersicht
            </Button>
            <Box sx={{position: 'relative', mb: 10}}>
                <Box
                    sx={{
                        minHeight: '16vh',
                        width: '100%',
                        backgroundImage: `url(${headerImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        backgroundRepeat: 'no-repeat',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative',
                        color: 'white',
                    }}
                />
                <hr/>
                <Avatar
                    src={logo ?? undefined}
                    alt="Profilbild"
                    sx={{
                        width: {
                            xs: 60, sm: 80, md: 100, lg: 120,
                        },
                        height: {
                            xs: 60, sm: 80, md: 100, lg: 120,
                        },
                        fontSize: {
                            xs: 24, sm: 32, md: 40, lg: 48,
                        },
                        position: 'absolute',
                        bottom: {
                            xs: -30, sm: -40, md: -50,
                        },
                        left: {
                            xs: 20, sm: 40, md: 80,
                        },
                        border: '3px solid darkgray',
                        backgroundColor: 'white',
                        color: (theme) => theme.palette.primary.main,
                    }}
                >
                    {!logo && data?.name?.charAt(0)}
                </Avatar>
            </Box>

            <ResponsiveRow>
                <Box sx={{p: 2}}>
                    <Typography variant="h5" gutterBottom align="left">
                        <strong>{data.name}</strong>
                    </Typography>
                    <Typography variant="h5" align="left" mt={-2}>
                        {data.kurs.toFixed(2)} €
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'right', flex: 1 }}>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(data.wkn);
                        }}
                        sx={{minWidth: 40}}
                    >
                        {isFavorite ? <StarIcon color="warning" fontSize={"large"}/> : <StarBorderOutlinedIcon fontSize={"large"}/>}
                    </Button>
                </Box>

            </ResponsiveRow>

            <ResponsiveRow gap={2} flexValues={[2.5, 1.5]}>
                <Box>
                    <ToggleButtonGroup
                        value={zeitraum}
                        exclusive
                        onChange={(_, value) => value && setZeitraum(value)}
                        sx={{mb: 2, display: 'flex', justifyContent: 'left'}}
                    >
                        <ToggleButton value="1T" size="small" sx={{fontSize: "1rem"}}>1T</ToggleButton>
                        <ToggleButton value="1W" size="small" sx={{fontSize: "1rem"}}>1W</ToggleButton>
                        <ToggleButton value="1M" size="small" sx={{fontSize: "1rem"}}>1M</ToggleButton>
                        <ToggleButton value="6M" size="small" sx={{fontSize: "1rem"}}>6M</ToggleButton>
                        <ToggleButton value="1J" size="small" sx={{fontSize: "1rem"}}>1J</ToggleButton>
                        <ToggleButton value="MAX" size="small" sx={{fontSize: "1rem"}}>Max</ToggleButton>
                    </ToggleButtonGroup>
                    {loading && <CircularProgress/>}
                    {error && <Typography color="error">{error}</Typography>}

                    {filteredData && (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={filteredData}>
                                <XAxis
                                    dataKey="date"
                                    padding={{right: 20}}
                                    tickFormatter={(dateStr) => {
                                        const dt = parseISO(dateStr);
                                        if (zeitraum === '1T' || zeitraum === '1W') {
                                            // Bei stündlichen Daten: Tag + Stunde
                                            return format(dt, 'dd.MM HH:mm');
                                        }
                                        if (zeitraum === '1M' || zeitraum === '6M' || zeitraum === '1J') {
                                            // Bei stündlichen Daten: Tag + Stunde
                                            return format(dt, 'dd.MM.yyyy');
                                        }
                                        // Sonst Tag + Monat
                                        return format(dt, 'MM.yyyy');
                                    }}
                                    minTickGap={zeitraum === '1T' ? 40 : 30}
                                />
                                <YAxis
                                    orientation="right"
                                    domain={[
                                        (dataMin: number) => dataMin * 0.98, // etwas unter dem Minimum
                                        (dataMax: number) => dataMax * 1.02, // etwas über dem Maximum
                                    ]}
                                    tickFormatter={(v) => `${v.toFixed(1)} €`}
                                />
                                <Tooltip
                                    formatter={(value: number) => [`${value.toFixed(2)} €`, 'Kurs']}
                                    labelFormatter={(label: string) => {
                                        const dt = parseISO(label);
                                        if (zeitraum === '1T' || zeitraum === '1W') {
                                            return `Datum: ${format(dt, 'dd.MM.yyyy HH:mm')}`;
                                        }
                                        return `Datum: ${format(dt, 'dd.MM.yyyy')}`;
                                    }}
                                />
                                <Line type="linear" dataKey="kurs" stroke={lineColor} dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </Box>

                <InfoCard text={
                    <>
                        <Typography variant="body1" color="text.secondary" textAlign={"right"}>
                            {format(letztesDatum, 'dd.MM.yy')}
                        </Typography>
                        <Box display="flex" mt={1}>
                            <Box sx={{ textAlign: 'left', flex: 1 }}>
                                {[
                                    'Letzter Preis',
                                    'Entwicklung 1T',
                                    'Entwicklung 1W',
                                    'Entwicklung 1M',
                                    'Entwicklung 6M',
                                    'Entwicklung 1J'
                                ].map((label, index) => (
                                    <React.Fragment key={index}>
                                        <Typography variant="body1" color="text.secondary">{label}</Typography>
                                        {index < 5 && <Divider sx={{ my: 1 }} />}
                                    </React.Fragment>
                                ))}
                            </Box>

                            <Box sx={{ textAlign: 'right', flex: 1 }}>
                                {[
                                    `${letzterPreis.toFixed(2)} €`,
                                    `${veraenderungGestern.toFixed(2)} %`,
                                    `${veraenderungEineWoche.toFixed(2)} %`,
                                    `${veraenderungEinMonat.toFixed(2)} %`,
                                    `${veraenderungSechsMonate.toFixed(2)} %`,
                                    `${veraenderungEinJahr.toFixed(2)} %`
                                ].map((value, index) => {
                                    const color = [
                                        veraenderungGestern,

                                        veraenderungEineWoche,
                                        veraenderungEinMonat,
                                        veraenderungSechsMonate,
                                        veraenderungEinJahr
                                    ][index] < 0 ? 'error.main' : 'success.main';

                                    return (
                                        <React.Fragment key={index}>
                                            <Typography variant="body1" color={color}>{value}</Typography>
                                            {index < 5 && <Divider sx={{ my: 1 }} />}
                                        </React.Fragment>
                                    );
                                })}
                            </Box>
                        </Box>

                    </>
                }>
                </InfoCard>
            </ResponsiveRow>
            <ResponsiveRow mt={3} gap={3} flexValues={[1, 1]}>
                <InfoCard title={'Informationen zu ' + data.name} text={
                    <Box>
                        {eintraege.map(({ label, value }, idx) => (
                            <Box key={label}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                    <Typography variant="body1"><strong>{label}:</strong></Typography>
                                    <Typography variant="body1">{value}</Typography>
                                </Box>
                                {idx < eintraege.length - 1 && <Divider />}
                            </Box>
                        ))}
                    </Box>
                }/>
                <InfoCard title="Weitere Kennzahlen" text={
                    <Box>
                        {spezifischeEintraege.map(({ label, value }, idx) => (
                            <Box key={label}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                                    <Typography variant="body1"><strong>{label}:</strong></Typography>
                                    <Typography variant="body1">{value}</Typography>
                                </Box>
                                {idx < spezifischeEintraege.length - 1 && <Divider />}
                            </Box>
                        ))}
                    </Box>
                } />
            </ResponsiveRow>

            <Box mt={3} width={"100%"}>
                <InfoCard title={"Informationen"} text={text}/>
            </Box>
            <Box mt={3} width="100%">
                <InfoCard title="News" text={
                    <Box>
                        {news.map((item, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold">{item.titel}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {format(parseISO(item.datum), 'dd.MM.yyyy')}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 0.5 }}>{item.inhalt}</Typography>
                                {idx < news.length - 1 && <Divider sx={{ mt: 2 }} />}
                            </Box>
                        ))}
                    </Box>}>
                </InfoCard>
            </Box>


        </Box>
    );
}
