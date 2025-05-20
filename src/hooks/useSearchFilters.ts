import { useSearchParams } from 'react-router-dom';

export function useSearchFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query') ?? '';
    const filterTyp = searchParams.get('typ') ?? '';
    const filterRisiko = searchParams.get('risiko') ?? '';
    const sortBy = (searchParams.get('sort') ?? 'kurs') as 'kurs' | 'risiko';
    const sortOrder = (searchParams.get('order') ?? 'desc') as 'asc' | 'desc';

    const setFilter = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === '') {
            newParams.delete(key);
        } else {
            newParams.set(key, value);
        }
        setSearchParams(newParams);
    };

    return {
        query,
        filterTyp,
        filterRisiko,
        sortBy,
        sortOrder,
        setFilter
    };
}
