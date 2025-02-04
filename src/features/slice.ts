import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserData = createAsyncThunk(
  'slice/getUserData',
  async (username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    return data;
  }
);

export const getRepos = createAsyncThunk(
  'slice/getRepos',
  async(username:string)=>{
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    return data;
  }
)

const slice = createSlice({
  name: "slice",
  initialState: {
    userName: '',
    userData: [],
    repos:[],
    loading: false,
    error: "",
  },
  reducers: {
    getUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(getRepos.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(getRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      
  },
});

export const { getUserName } = slice.actions;
export default slice.reducer;
