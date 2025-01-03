import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    allCategory: [],
    subCategory: [],
    product: [],

}
const productSlice = createSlice({
    name: "product",
    initialState: initialValue,
    reducers: {
        setAllCategory: (state, action) => {
            state.allCategory = [...action.payload];

        },
        addCategory: (state, action) => {
            state.allCategory = [...state.allCategory, action.payload];
        },
        editAllCategory: (state, action) => {
            state.allCategory = state.allCategory.map((item) =>
                item._id === action.payload._id ? action.payload : item
            );
        },
        deleteCategoryId: (state, action) => {
            state.allCategory = state.allCategory.filter((item) => item._id !== action.payload._id)
        },
        setAllSubCategory: (state, action) => {
            state.subCategory = [...action.payload]
        },
        addSubCategory: (state, action) => {
            state.subCategory = [...state.subCategory, action.payload]
        },
        editSubCategory: (state, action) => {
            state.subCategory = state.subCategory.map((item) =>
                item._id === action.payload._id ? action.payload : item)
        },
        deleteSubCategoryID: (state, action) => {
            state.subCategory = state.subCategory.filter((item) => item._id !== action.payload._id)

        }

    }
})


export const { setAllCategory, addCategory, editAllCategory, deleteCategoryId, setAllSubCategory, editSubCategory, addSubCategory, deleteSubCategoryID } = productSlice.actions;
export default productSlice.reducer