import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArtistProduct = createAsyncThunk(
    "fetch-artist-product",
    async ({ name }) => {
        const apiUri =   `https://wicked-red-skunk.cyclic.app/api/products?artist=${name}`;
        const response = await axios.get(apiUri);
        return response.data;
    }
);

const artistProductSlice = createSlice({
    name: "artistProduct",
    initialState: {
        data: [],
        fetchStatus: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtistProduct.fulfilled, (state, action) => {
                state.data = action.payload;
                state.fetchStatus = "success";
            })
            .addCase(fetchArtistProduct.pending, (state) => {
                state.fetchStatus = "loading";
            })
            .addCase(fetchArtistProduct.rejected, (state) => {
                state.fetchStatus = "error";
            });
    },
});

export default artistProductSlice;
