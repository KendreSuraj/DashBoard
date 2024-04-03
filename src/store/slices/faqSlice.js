import { createSlice} from "@reduxjs/toolkit";
import { fetchFAQ } from "../actions/faq.action";

const initialState = {
    faqList: [],
    isLoading: false,
    error: null,
  };

const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder.addCase(fetchFAQ.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFAQ.fulfilled, (state, action) => {
      state.isLoading = false;
      state.faqList = action.payload;
    });
    builder.addCase(fetchFAQ.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default faqSlice.reducer;
