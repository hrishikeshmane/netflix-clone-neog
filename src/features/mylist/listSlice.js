import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mylist: [
    {
      title: "Watch History",
      list: [],
    },
    {
      title: "Watch Later",
      list: [],
    },
    {
      title: "Liked Movies",
      list: [],
    },
    {
      title: "Liked TV shows",
      list: [],
    },
  ],
};

export const listSlice = createSlice({
  name: "mylist",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.mylist = [...state.mylist, action.payload];
    },
    appendToList: (state, action) => {
      const { listTitle, movie, category } = action.payload;
      state.mylist.forEach((eachList) => {
        if (eachList.title === listTitle) {
          eachList.list.push({ ...movie, category: category });
        }
      });
    },
    removeFromList: (state, action) => {
      const { listTitle, movie } = action.payload;
      state.mylist.map((eachList) => {
        if (eachList.title === listTitle) {
          return {
            ...eachList,
            list: eachList.list.filter(
              (eachMovie) => eachMovie.id !== movie.id
            ),
          };
        } else {
          return eachList;
        }
      });
    },
  },
});

export const { addList, appendToList, removeFromList } = listSlice.actions;

export const selectList = (state) => state.mylist.mylist;

export default listSlice.reducer;
