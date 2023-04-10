import { Button, Grid, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateCustomerLoadCondition } from "../../actions/customer.actions"

const SEARCH_KEY = [
    { key: "all", display: "All" },
    { key: "phone", display: "Phone" },
    { key: "email", display: "Email" },
    { key: "country", display: "Country" },
    { key: "address", display: "Address" },
    { key: "city", display: "City" },
    { key: "firstName", display: "Last Name" },
    { key: "lastName", display: "First Name" },
]
export const SearchBar = () => {

    const dispatch = useDispatch()
    const { customerLoadCondition } = useSelector(reduxData => reduxData.customerReducers)
    const [key, setKey] = useState(Object.keys(customerLoadCondition))
    const [value, setValue] = useState(Object.values(customerLoadCondition)[0])
    const handleClickFind = () => {
        console.log(value)
        if (!value.trim()) {
            setKey("all")
            setValue("")
            dispatch(updateCustomerLoadCondition({ all: "all" }))
        }
        else {
            dispatch(updateCustomerLoadCondition({ [key]: value.trim() }))
        }
    }

    return (
        <Grid container columnSpacing={1} mb={2} spacing={2} >
            <Grid item xs={4} sm={8} md={2} >
                <Select fullWidth value={key} size="small" onChange={e => setKey(e.target.value)}>
                    {SEARCH_KEY.map((value, index) => (
                        <MenuItem key={index} value={value.key} >{value.display}</MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={8} sm={8} md={8} >
                <TextField fullWidth type="text" size="small" label={"Find customer with " + key} value={value} onChange={(e) => setValue(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
                <Button variant="contained" sx={{ p: 1 }} fullWidth onClick={handleClickFind}>Find</Button>
            </Grid>
        </Grid>
    )
}