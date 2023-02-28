import { Alert, AlertTitle, Stack } from "@mui/material"

export const ErrorStack = ({description}) => {
    return (
    <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error" variant="outlined">
            <AlertTitle>Warning</AlertTitle>
            <strong>{description}</strong>
        </Alert>
    </Stack>
    )
}