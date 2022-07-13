import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchJson from "../lib/fetchJson";

export const fetchConfig = createAsyncThunk(
  "app/fetchConfig",
  async ({}, thunkAPI) => {
    const response = await fetchJson("/api/app/config");
    return response;
  }
);

export const fetchUser = createAsyncThunk(
  "app/fetchUser",
  async ({}, thunkAPI) => {
    const response = await fetchJson("/api/user/");
    return response;
  }
);

export const fetchHistory = createAsyncThunk(
  "app/fetchHistory",
  async ({}, thunkAPI) => {
    const response = await fetchJson("/api/journal/history");
    console.log("fetchHistory", response);
    return response;
  }
);

const initialState = {
  sidebarOpen: false,
  pay: {
    payStep: 0,
    destinatary: "",
    user_destinatary: "",
    amount: [],
    result_pay: null,
  },
  config: null,
  user: {
    pay_accounts: [],
  },
  history: [],
  loading: false,
  loading_pay: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setPayStep: (state, action) => {
      state.pay.payStep = action.payload;
    },
    setDestinatary: (state, action) => {
      state.pay.destinatary = action.payload;
    },
    setAmount: (state, action) => {
      state.pay.amount = action.payload;
    },
    setUserDestinatary: (state, action) => {
      state.pay.user_destinatary = action.payload;
    },
    restartPaySteps: (state) => {
      state.pay.payStep = 0;
      state.pay.destinatary = "";
      state.pay.user_destinatary = "";
      state.pay.amount = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingPay: (state, action) => {
      state.loading_pay = action.payload;
    },
    setResultPay: (state, action) => {
      state.pay.result_pay = action.payload;
    },
    resetResultPay: (state) => {
      state.pay.result_pay = null;
    },
    setConfigBalance: (state, action) => {
      state.config.balance = action.payload;
    },
    setPayAccountBalance: (state, action) => {
      state.user.pay_accounts[action.payload.index].balance =
        action.payload.balance;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConfig.fulfilled, (state, action) => {
      state.config = action.payload;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.history = action.payload;
    });
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setPayStep,
  setDestinatary,
  setAmount,
  setUserDestinatary,
  restartPaySteps,
  setLoading,
  setLoadingPay,
  setResultPay,
  resetResultPay,
  setConfigBalance,
  setPayAccountBalance,
} = appSlice.actions;

export default appSlice.reducer;
