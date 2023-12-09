import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isAuthenticated: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// const initialState = {
//   isAuthenticated: false,
//   isLoading: false,
// };

export const LoginUser = createAsyncThunk('user/LoginUser', async (user, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/login', {
      email: user.email,
      password: user.password,
    });
    return response.data; // ini akan masuk ke action.payload
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      console.log(message);
    }
  }
});

export const Me = createAsyncThunk('user/getMe', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5000/me');
    return response.data; // Anggap saja response.data mengandung informasi pengguna
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Pengguna tidak terautentikasi
      return null;
    } else {
      // Error lainnya
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching user');
    }
  }
});

export const LogoutUser = createAsyncThunk('user/Logout', async () => {
  await axios.delete('http://localhost:5000/logout');
});

// * ini adalah reducer, punya object state dan action dan menghasilkan state baru
// * kita gunakan function createSlice dari Redux toolkit yang berfungsi untuk membuat function reducer.
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
    // loginUser: (state, action) => {
    //   // ... logika login
    //   state.isAuthenticated = true;
    // },

    // logoutUser: (state) => {
    //   // ... logika logout
    //   state.isAuthenticated = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error.message;
    });

    // Get User Login
    builder.addCase(Me.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Me.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false; // Atur isError ke false setelah berhasil
      state.user = action.payload;
    });
    builder.addCase(Me.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error.message;
    });
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(LoginUser.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(LoginUser.fulfilled, (state, action) => {
  //       state.isAuthenticated = action.payload;
  //       state.isLoading = false;
  //     })
  //     .addCase(LoginUser.rejected, (state) => {
  //       state.isAuthenticated = false;
  //       state.isLoading = false;
  //     });

  //   builder
  //     .addCase(Me.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(Me.fulfilled, (state, action) => {
  //       state.isAuthenticated = action.payload;
  //       state.isLoading = false;
  //     })
  //     .addCase(Me.rejected, (state) => {
  //       state.isAuthenticated = false;
  //       state.isLoading = false;
  //     });
  // },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;

export const { reset } = authSlice.actions;
export default authSlice.reducer;
