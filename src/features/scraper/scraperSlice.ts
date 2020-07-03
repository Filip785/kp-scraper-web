import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import axios from 'axios';

interface ScrapedItem {
  fileName: string;
  dateCreated: string;
  timeCreated: string;
  fileSize: string;
  downloadUrl: string;
}

interface ScraperState {
  formError: boolean;
  isFetching: boolean;
  items: ScrapedItem[]
}

const initialState: ScraperState = {
  formError: false,
  isFetching: false,
  items: JSON.parse(localStorage.getItem('scrapedItems')!) || []
};

export const scraperSlice = createSlice({
  name: 'scraper',
  initialState,
  reducers: {
    attemptSubmitFailure(state) {
      state.formError = true;
    },
    attemptSubmitFailureEnd(state) {
      state.formError = false;
    },
    setIsFetching(state) {
      state.isFetching = !state.isFetching;
    },
    setItems(state, action: PayloadAction<ScrapedItem[]>) {
      state.items = action.payload;
    }
  },
});

export const { attemptSubmitFailureEnd } = scraperSlice.actions;

const { setIsFetching, setItems } = scraperSlice.actions;

export const attemptSubmit = (numOfPages: number, minPrice: number, maxPrice: number, catId: string): AppThunk => async dispatch => {
  try {
    dispatch(setIsFetching());

    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/scraper/${catId}/`, { params:{ numOfPages, minPrice, maxPrice } });
    
    // redo
    const currentItems: ScrapedItem[] = JSON.parse(localStorage.getItem('scrapedItems')!) || [];
    currentItems.push(response.data);
    localStorage.setItem('scrapedItems', JSON.stringify(currentItems));
    dispatch(setItems(currentItems));

    dispatch(setIsFetching());
  } catch (err) {
    console.log('Attempt Submit error: ', err.response.data);
    // update frontend with error messages
    //dispatch(attemptSubmitFailure());
  }
};

export const selectFormError = (state: RootState) => state.scraper.formError;
export const selectIsFetching = (state: RootState) => state.scraper.isFetching;
export const selectItems = (state: RootState) => state.scraper.items;

export default scraperSlice.reducer;
