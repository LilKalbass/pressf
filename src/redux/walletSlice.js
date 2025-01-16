import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    address: null,
    isLoading: true
};

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        connectWallet: (state, action) => {
            state.address = action.payload;
            state.isLoading = false;
        },
        disconnectWallet: (state) => {
            state.address = null;
            state.isLoading = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { connectWallet, disconnectWallet, setLoading } = walletSlice.actions;
export default walletSlice.reducer;