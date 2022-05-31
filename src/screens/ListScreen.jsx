import React from "react";
import Nav from "../components/Nav";
import ListRow from "../components/ListRow";
import "./ListScreen.css";
import { useSelector } from "react-redux";
import { selectList } from "../features/mylist/listSlice";
import { nanoid } from "@reduxjs/toolkit";

const ListScreen = () => {
  const mylist = useSelector(selectList);

  return (
    <>
      <Nav />
      <div className="list__screen">
        <div>
          {mylist &&
            mylist.length > 0 &&
            mylist.map((list) => (
              <ListRow
                key={nanoid()}
                title={list.title}
                movieList={list.list}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ListScreen;
