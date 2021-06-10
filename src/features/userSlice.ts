import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

declare type User = {
	email: string;
	password: string;
}

interface UserState {
	user: User;
}

const initialState: UserState = {
	user: {
		email: "",
		password: ""
	}
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = {
				email: "",
				password: ""
			};
		},
	},
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state : RootState) => state.user.user;

export default userSlice.reducer;