import { createSlice } from "@reduxjs/toolkit";

const initialState = {
libraryTableData:{},
tableRowData:{},
editProductData:{}
};

export const manageLibrary = createSlice({
  name: "manageLibrary",
  initialState,
  reducers: {
    getmanageLibraryTableData: (state, { payload }) => {
 
      state.libraryTableData = payload;
    },
    getTableRowData: (state, { payload }) => {
      
          state.tableRowData = payload;
        },
    getEditProductData: (state, { payload }) => {
      
          state.editProductData = payload;
        },
        
  },
});

export const { getmanageLibraryTableData ,getTableRowData ,getEditProductData} = manageLibrary.actions;

export default manageLibrary.reducer;
