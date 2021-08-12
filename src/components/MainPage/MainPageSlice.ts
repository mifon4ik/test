/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../app/api';
import { StateType } from '../../app/store';
import { Status } from '../hoc/SwitchStatus';

type CharacterType = {
  id: number,
  name: string,
  status: string,
  species: string,
  image: string
}

type InitialStateType = {
  table: Array<CharacterType>,
  status: Status
}

const initialState: InitialStateType = {
  table: [],
  status: Status.NO_STATUS,
};

export const getCharacter = createAsyncThunk('getCharacter', async (filter?: string) => {
  const response = await axios.get(api.getCharacter(), {
    params: {
      name: filter || '',
    },
  });
  return response.data;
});

export const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharacter.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(getCharacter.fulfilled, (state, action) => {
      state.table = action.payload.results;
      state.status = Status.DONE;
    });
    builder.addCase(getCharacter.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const selectMainPage = (state: StateType): InitialStateType => state.mainPage;

export default mainPageSlice.reducer;
