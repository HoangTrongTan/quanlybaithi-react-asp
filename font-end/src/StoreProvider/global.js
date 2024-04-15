import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    danhsachFiles: [],
    theme: false,
    AllRootFiles: []
}
export const GlobalSlice = createSlice({
    name:'global',
    initialState,
    reducers:{
        setDanhSachFiles: (state,action) => {
            state.danhsachFiles = action.payload;
        },
        setTheme: (state,action) => {
            state.theme = action.payload;
        },
        setAllRootFiles: (state,action) => {
            state.AllRootFiles = action.payload;
        },
    }
});

export const { setDanhSachFiles ,setTheme, setAllRootFiles } = GlobalSlice.actions; 
export default GlobalSlice.reducer;