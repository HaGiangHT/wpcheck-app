export interface Wertpapier {
    wkn: string;
    isin: string;
    name: string;
    typ: string;
    kurs: number;
    anlagerisiko: string;
    datum_naechste_hauptversammlung: string;
    emittent: string;
};