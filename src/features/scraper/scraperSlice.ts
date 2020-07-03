import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import axios from 'axios';

interface ScraperState {
  formError: boolean;
  download: string;
  isFetching: boolean;
}

const initialState: ScraperState = {
  formError: false,
  download: '',
  isFetching: false
};

export const scraperSlice = createSlice({
  name: 'scraper',
  initialState,
  reducers: {
    setDownloadUrl(state, action: PayloadAction<string>) {
      state.download = action.payload;
    },
    attemptSubmitFailure(state) {
      state.formError = true;
    },
    attemptSubmitFailureEnd(state) {
      state.formError = false;
    },
    setIsFetching(state) {
      state.isFetching = !state.isFetching;
    }
  },
});

export const { attemptSubmitFailureEnd } = scraperSlice.actions;

const { setDownloadUrl, setIsFetching } = scraperSlice.actions;

export const attemptSubmit = (numOfPages: number, minPrice: number, maxPrice: number, catId: string): AppThunk => async dispatch => {
  try {
    dispatch(setIsFetching());
    dispatch(setDownloadUrl(''));
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/scraper/${catId}/`, { params:{ numOfPages, minPrice, maxPrice } });
    
    dispatch(setDownloadUrl(response.data.downloadUrl));
    dispatch(setIsFetching());
  } catch (err) {
    console.log('Attempt Submit error: ', err.response.data);
    // update frontend with error messages
    //dispatch(attemptSubmitFailure());
  }
};

export const selectFormError = (state: RootState) => state.scraper.formError;
export const selectDownload = (state: RootState) => state.scraper.download;
export const selectIsFetching = (state: RootState) => state.scraper.isFetching;

export default scraperSlice.reducer;
