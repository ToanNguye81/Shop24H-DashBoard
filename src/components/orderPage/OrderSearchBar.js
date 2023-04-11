import { Grid, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { updateOrderSearchQuery } from "../../actions/order.actions"

export const OrderSearchBar = () => {

    const dispatch = useDispatch()
    const { searchQuery } = useSelector(reduxData => reduxData.orderReducers)

    const handleChangeSearchQuery = (searchQuery) => {
        dispatch(updateOrderSearchQuery(searchQuery))
    }
    return (
        <Grid container columnSpacing={1} mb={2} spacing={2} >
            <Grid item xs={12} sm={12} md={12} >
                <TextField fullWidth type="text" size="small" label={"Find order .."} value={searchQuery} onChange={(e) => handleChangeSearchQuery(e.target.value)} />
            </Grid>
        </Grid>
    )
}