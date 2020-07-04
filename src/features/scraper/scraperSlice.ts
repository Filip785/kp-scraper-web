import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import axios from 'axios';

export enum ProductTypes {
  gpu = 'gpu',
  cpu = 'cpu',
  ssd = 'ssd'
};

export interface ScrapedItem {
  fileName: string;
  dateCreated: string;
  timeCreated: string;
  fileSize: string;
  downloadUrl: string;
}

export interface ScraperState {
  formError: boolean;
  isFetching: boolean;
  gpuItems: ScrapedItem[],
  cpuItems: ScrapedItem[],
  ssdItems: ScrapedItem[]
}

const initialState: ScraperState = {
  formError: false,
  isFetching: false,
  gpuItems: JSON.parse(localStorage.getItem('gpuItems')!) || [],
  cpuItems: JSON.parse(localStorage.getItem('cpuItems')!) || [],
  ssdItems: JSON.parse(localStorage.getItem('ssdItems')!) || [],
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
      state.gpuItems = action.payload;
    },
    clearItemsReduce(state, action: PayloadAction<ProductTypes>) {
      switch(action.payload) {
        case ProductTypes.gpu:
          state.gpuItems = [];
          break;
        case ProductTypes.cpu:
          state.cpuItems = [];
          break;
        case ProductTypes.ssd:
          state.ssdItems = [];
          break;
      }
    }
  },
});

export const { attemptSubmitFailureEnd } = scraperSlice.actions;

const { setIsFetching, setItems, clearItemsReduce } = scraperSlice.actions;

export const attemptSubmit = (numOfPages: number, minPrice: number, maxPrice: number, searchTerms: Array<string>, partType: ProductTypes): AppThunk => async dispatch => {
  try {
    dispatch(setIsFetching());

    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/scraper/get-part-data`, { params:{ partType, numOfPages, minPrice, maxPrice, searchTerms } });
    
    // redo
    const currentItems: ScrapedItem[] = JSON.parse(localStorage.getItem(`${partType}Items`)!) || [];
    currentItems.push(response.data);
    localStorage.setItem(`${partType}Items`, JSON.stringify(currentItems));
    dispatch(setItems(currentItems));

    dispatch(setIsFetching());
  } catch (err) {
    console.log('Attempt Submit error: ', err.response.data);
    // update frontend with error messages
    //dispatch(attemptSubmitFailure());
  }
};

export const clearItems = (partType: ProductTypes) : AppThunk => async dispatch => {
  localStorage.setItem(`${partType}Items`, '[]');

  dispatch(clearItemsReduce(partType));
};

export const selectFormError = (state: RootState) => state.scraper.formError;
export const selectIsFetching = (state: RootState) => state.scraper.isFetching;

export default scraperSlice.reducer;
