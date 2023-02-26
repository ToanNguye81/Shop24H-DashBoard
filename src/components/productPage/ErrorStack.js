import { Alert, AlertTitle, Stack } from "@mui/material"

export const ErrorStack = () => {
    return (
    <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error" variant="outlined">
            <AlertTitle>Warning</AlertTitle>
            <strong>You do not have permission to access this data</strong>
        </Alert>
    </Stack>
    )
}