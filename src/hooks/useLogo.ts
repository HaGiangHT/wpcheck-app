import { useEffect, useState } from 'react';

export function useLogo(wkn: string): string | null {
    const [logo, setLogo] = useState<string | null>(null);

    useEffect(() => {
        import(`../assets/${wkn}.png`)
            .then((module) => setLogo(module.default))
            .catch(() => setLogo(null)); // Fallback: null bei fehlendem Bild
    }, [wkn]);

    return logo;
}
