import { parseISO, format, subDays, subMonths, subYears } from 'date-fns';

export type KursDatum = {
    date: string;
    kurs: number;
};

function findeEintragAmDatum(data: KursDatum[] | null, datum: Date): KursDatum | undefined {
    if (!data) return undefined;
    const gesuchtesDatum = format(datum, 'yyyy-MM-dd');
    return data.find(k => format(parseISO(k.date), 'yyyy-MM-dd') === gesuchtesDatum);
}

export function berechneVeränderungen(filteredData: KursDatum[] | null, letztesDatum: Date) {
    if (!filteredData || filteredData.length === 0) {
        return {
            letzterPreis: 0,
            veraenderungGestern: 0,
            veraenderungEineWoche: 0,
            veraenderungEinMonat: 0,
            veraenderungSechsMonate: 0,
            veraenderungEinJahr: 0,
        };
    }

    const letzterEintrag = filteredData[filteredData.length - 1];
    const letzterPreis = letzterEintrag.kurs;

    const berechneVeraenderung = (datum: Date) => {
        const eintrag = findeEintragAmDatum(filteredData, datum);
        const preis = eintrag ? eintrag.kurs : letzterPreis;
        return preis !== 0 ? ((letzterPreis - preis) / preis) * 100 : 0;
    };

    return {
        letzterPreis,
        veraenderungGestern: berechneVeraenderung(subDays(letztesDatum, 1)),
        veraenderungEineWoche: berechneVeraenderung(subDays(letztesDatum, 7)),
        veraenderungEinMonat: berechneVeraenderung(subMonths(letztesDatum, 1)),
        veraenderungSechsMonate: berechneVeraenderung(subMonths(letztesDatum, 6)),
        veraenderungEinJahr: berechneVeraenderung(subYears(letztesDatum, 1)),
    };
}
