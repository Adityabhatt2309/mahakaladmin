import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isOpen:false,
}

const globalSlice = createSlice({
    name:"globalSlice",
    initialState,
    reducers:{
        openSideBar(state){
            state.isOpen= true;
        },
        closeSideBar(state){
            state.isOpen=false;
        },
        toggleSideBar(state){
            state.isOpen = !state.isOpen;
        }
    }
})

export const {openSideBar,closeSideBar,toggleSideBar} = globalSlice.actions;

export default globalSlice.reducer;

