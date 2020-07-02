import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface ScraperState {
  formError: boolean;
}

const initialState: ScraperState = {
  formError: false
};

export const scraperSlice = createSlice({
  name: 'scraper',
  initialState,
  reducers: {
    attemptSubmitReduce(state) {

    },
    attemptSubmitFailure(state) {
      state.formError = true;
    },
    attemptSubmitFailureEnd(state) {
      state.formError = false;
    }
  },
});

export const { attemptSubmitFailureEnd } = scraperSlice.actions;

export const attemptSubmit = (numOfPages: number, minPrice: number, maxPrice: number): AppThunk => async dispatch => {
  try {
    console.log('dispatching', numOfPages, minPrice, maxPrice);
    //const response = await axios.get('http://localhost:5000/api/{cat}/', { inputData: { numOfPages, minPrice, maxPrice } });

    // update table with response
  } catch (err) {
    console.log('Attempt Submit error: ', err.response.data);
    // update frontend with error messages
    //dispatch(attemptSubmitFailure());
  }
};

export const selectFormError = (state: RootState) => state.scraper.formError;

export default scraperSlice.reducer;
