import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myProfile: [],
  profile: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMyProfile: (state, action) => {
      return { ...state, myProfile: action.payload }; 
    },
    setProfile: (state, action) => {
      return { ...state, profile: action.payload };
    },
    
  }
});

export const { setMyProfile, setProfile} = userSlice.actions;

export default userSlice.reducer;
