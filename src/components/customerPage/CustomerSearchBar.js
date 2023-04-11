import { Grid, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { updateCustomerSearchQuery } from "../../actions/customer.actions"

export const CustomerSearchBar = () => {

    const dispatch = useDispatch()
    const { searchQuery } = useSelector(reduxData => reduxData.customerReducers)

    const handleChangeSearchQuery = (searchQuery) => {
        dispatch(updateCustomerSearchQuery(searchQuery))
    }
    return (
        <Grid container columnSpacing={1} mb={2} spacing={2} >
            <Grid item xs={12} sm={12} md={12} >
                <TextField fullWidth type="text" size="small" label={"Find customer .."} value={searchQuery} onChange={(e) => handleChangeSearchQuery(e.target.value)} />
            </Grid>
        </Grid>
    )
}