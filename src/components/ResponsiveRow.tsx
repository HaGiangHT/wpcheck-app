import { Box } from '@mui/material';
import {Children, type ReactNode} from "react";

type ResponsiveRowProps = {
    children: ReactNode[];
    gap?: number;
    mt?: number;
    flexValues?: number[];
};

export default function ResponsiveRow({ children, gap = 2, mt = 0, flexValues = [] }: ResponsiveRowProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap,
                mt,
            }}
        >
            {Children.map(children, (child, index) => (
                <Box sx={{ flex: flexValues[index] ?? 1 }}>
                    {child}
                </Box>
            ))}
        </Box>
    );
}
