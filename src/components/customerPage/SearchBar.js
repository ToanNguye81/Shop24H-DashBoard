import { Grid, TextField } from "@mui/material"

export const SearchBar = () => {
    return (
        <Grid container columnSpacing={1}>
            <Grid item xs={8} sm={8} md={8}>
                <TextField fullWidth size="small" label="Find customer by email" onChange={handelChangeName} value={name} />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
                <Button variant="contained" sx={{ p: 1 }} fullWidth onClick={handleClickFind}>Find</Button>
            </Grid>
        </Grid>
    )
}