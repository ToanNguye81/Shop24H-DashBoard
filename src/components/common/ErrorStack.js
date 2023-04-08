import { Alert, AlertTitle, Stack } from "@mui/material"

export const ErrorStack = ({message}) => {
    return (
    <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error" variant="outlined">
            <AlertTitle>Warning</AlertTitle>
            <strong>{message}</strong>
        </Alert>
    </Stack>
    )
}

