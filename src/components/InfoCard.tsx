import {Card, CardContent, CardActions, Typography, Button, Box, Stack,} from '@mui/material';
import { Link } from 'react-router-dom';
import theme from '../theme';

interface InfoCardProps {
    title?: string | React.ReactNode;
    text: string | React.ReactNode;
    buttonText?: string;
    linkTo?: string;
    variant?: 'card' | 'plain';
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    iconTop?: React.ReactNode;
    backgroundColor?: string;
    sx?: object;
    textColor?: string;
}

function InfoCard({title, text, buttonText, linkTo, variant = 'card', iconLeft, iconRight, iconTop,
                      backgroundColor, textColor, sx = {},}: InfoCardProps) {
    const hasButton = Boolean(buttonText && linkTo);

    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: backgroundColor
                    ? backgroundColor
                    : variant === 'plain'
                        ? 'transparent'
                        : '#fefefe',
                boxShadow: variant === 'plain' ? 'none' : 2,
                borderRadius: variant === 'plain' ? 0 : 2,
                padding: 2,
                textAlign: 'left',
                ...sx,
            }}
        >
            <CardContent sx={{ paddingBottom: hasButton ? 0 : undefined, width: '100%' }}>
                {/* Icon oben (zentriert) */}
                {iconTop && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Box sx={{ fontSize: 48, color: textColor || 'primary.main' }}>
                            {iconTop}
                        </Box>
                    </Box>
                )}

                {/* Titel mit optionalem iconLeft/right */}
                {iconLeft || iconRight ? (
                    <Stack direction="row" spacing={2} alignItems="center">
                        {iconLeft && <Box>{iconLeft}</Box>}
                        {title && (
                            <Typography
                                variant="h4"
                                component="h2"
                                sx={{ color: theme.palette.primary.main, marginBottom: 3 }}
                            >
                                <strong>{title}</strong>
                            </Typography>
                        )}
                        {iconRight && <Box>{iconRight}</Box>}
                    </Stack>
                ) : (
                    title && (
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{ color: theme.palette.primary.main, marginBottom: 3 }}
                        >
                            <strong>{title}</strong>
                        </Typography>
                    )
                )}

                {/* Text */}
                <Typography variant="body1" sx={{ color: textColor || 'text.primary' }}>
                    {text}
                </Typography>
            </CardContent>

            {/* Button (falls vorhanden) */}
            {hasButton && (
                <CardActions sx={{ paddingLeft: 2, paddingBottom: 2, marginTop: 2, justifyContent: 'left' }}>
                    <Button
                        variant="contained"
                        component={Link}
                        to={linkTo!}
                        sx={{ textTransform: 'none', borderRadius: 2 }}
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}
                    >
                        {buttonText}
                    </Button>
                </CardActions>
            )}
        </Card>
    );
}

export default InfoCard;
