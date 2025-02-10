import { createAsyncThunk, createSlice, isAnyOf, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getUserData = createAsyncThunk(
  'slice/getUserData',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      if (response.status !== 200) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch user data');
    }
  }
);

export const getRepos = createAsyncThunk(
  'slice/getRepos',
  async(username:string,{rejectWithValue})=>{
    try{
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await response.json();
      if (response.status !== 200) {
        return rejectWithValue(data.message);
      }
      return data;
    }catch(err){
      return rejectWithValue('Failed to fetch repos')
    }
  }
)

const slice = createSlice({
  name: "slice",
  initialState: {
    userName: '',
    userData: {} as any,
    repos: [] as any[],
    loading: false,
    error: "",
    date: Date.now(),
    immutable: 0
  },
  reducers: {
    getUserName: (state, action) => {
      state.userName = action.payload;
    },
    mutateImmutable: (state)=>{
      console.log("mutating")
      state.immutable+=1;
    },
    listenThis: (state)=>{
      state.immutable +=1
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getUserData.pending, (state) => {
  //       state.loading = true;
  //       state.error = "";
  //     })
  //     .addCase(getUserData.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.userData = action.payload;
  //     })
  //     .addCase(getUserData.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message || "";
  //     })
  //     .addCase(getRepos.pending, (state) => {
  //       state.loading = true;
  //       state.error = "";
  //     })
  //     .addCase(getRepos.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.repos = action.payload;
  //     })
  //     .addCase(getRepos.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message || "";
  //     })
  // },

  //Combining all the addCases using addMatcher for much cleaner code

  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(getUserData, getRepos), 
        (state) => {
          state.loading = true;
          state.error = "";
        }
      )
      .addMatcher(
        isFulfilled(getUserData, getRepos),
        (state, action) => {
          state.loading = false;
          if(action.type === getUserData.fulfilled.type){
            state.userData = action.payload
          }
          if(action.type === getRepos.fulfilled.type){
            state.repos = action.payload
          }
          toast.success("Data fetched successfully!");
        }
      )
      .addMatcher(
        isRejected(getUserData, getRepos),
        (state, action) => {
          state.loading = false;
          state.error = String(action.payload) || "Something went wrong!";
          toast.error(`Error: ${action.payload || "Unknown error"}`);
        }
      )
      .addMatcher(
        isAnyOf(getUserData.fulfilled, getUserData.rejected), 
        (state) => {
          toast.success("The loader is stopped by \"isAnyOf()\" Matcher");
          state.loading = false;
        }
      );
  }
  
});

export const { getUserName, mutateImmutable, listenThis } = slice.actions;
export default slice.reducer;

// Add proper type for the state
export interface RootState {
  slice: {
    userName: string;
    userData: {

      id?: number;
      login?: string;
      avatar_url?: string;
      location?: string;
      name?: string;
      company?: string;
      blog?: string;
      message?: string;
      followers?: number;
      following?: number;
    };
    date?: number;
    readonly immutable: number;
    repos: Array<{
      id: number;

      name: string;
      description: string;
      html_url: string;
    }>;
    loading: boolean;
    error: string;
  }
}
