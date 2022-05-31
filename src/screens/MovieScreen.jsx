import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Checkbox,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "../axios";
import Nav from "../components/Nav";
import "./MovieScreen.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useDispatch, useSelector } from "react-redux";
import {
  addList,
  appendToList,
  removeFromList,
  selectList,
} from "../features/mylist/listSlice";
import { nanoid } from "@reduxjs/toolkit";

const MovieScreen = () => {
  const [movie, setMovie] = useState();
  const mylist = useSelector(selectList);
  const params = useParams();
  const [width, setWidth] = useState(window.innerWidth);
  const location = useLocation();
  const dispatch = useDispatch();
  const [openListDialog, setOpenListDialog] = useState(false);
  const [playlist, setPlaylist] = useState(
    mylist
      .filter(
        (list) =>
          list.title !== "Watch History" &&
          list.title !== "Liked Movies" &&
          list.title !== "Liked TV shows"
      )
      .map((list) => ({ title: list.title, checked: false }))
  );
  const [addListToggle, setAddListToggle] = useState(false);
  const [newListName, setNewListName] = useState("");
  const category = new URLSearchParams(location.search).get("category");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const requests = await axios.get(
        `https://api.themoviedb.org/3/${new URLSearchParams(
          location.search
        ).get("category")}/${params.movieId}?api_key=${
          process.env.REACT_APP_API_KEY
        }&append_to_response=videos`
      );
      setMovie(requests.data);
    }
    fetchData();
  }, [params.movieId, location.search]);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const playhandler = () => {
    dispatch(
      appendToList({
        listTitle: "Watch History",
        movie: movie,
        category: category,
      })
    );
  };

  const likeButtonHandler = () => {
    if (!liked) {
      dispatch(
        appendToList({
          listTitle: category === "movie" ? "Liked Movies" : "Liked TV shows",
          movie: movie,
          category: category,
        })
      );
    } else {
      dispatch(
        removeFromList({
          listTitle: category === "movie" ? "Liked Movies" : "Liked TV shows",
          movie: movie,
        })
      );
    }
    setLiked(!liked);
  };

  const watchLaterButtonHandler = () => {
    dispatch(
      appendToList({
        listTitle: "Watch Later",
        movie: movie,
        category: category,
      })
    );
  };

  const saveToListHandler = (title) => {
    setPlaylist(
      playlist.map((list) => {
        if (list.title === title) {
          return { ...list, checked: !list.checked };
        } else {
          return list;
        }
      })
    );
  };

  const saveHandler = () => {
    playlist.forEach((list) => {
      if (list.checked) {
        const listTitle = list.title;
        const category = new URLSearchParams(location.search).get("category");
        dispatch(appendToList({ listTitle, movie, category }));
      }
    });
    setOpenListDialog(false);
  };

  const addListHandler = () => {
    if (newListName.length > 0) {
      dispatch(
        addList({
          title: newListName,
          list: [],
        })
      );
      setPlaylist([...playlist, { title: newListName, checked: false }]);
      setNewListName("");
      setAddListToggle(false);
    }
  };

  return (
    <div className="video__screen">
      <Nav />
      <Box className="video__player">
        <YouTube
          onPlay={playhandler}
          videoId={movie?.videos?.results[0]?.key}
          opts={{ width: width - 18, height: (width * 5.5) / 16 }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mx: 20, my: 1 }}>
        <Typography variant="h4" sx={{}}>
          {movie?.title || movie?.name || movie?.original_name}
        </Typography>
        <Box sx={{ ml: "auto", mr: 2, color: "white" }}>
          <IconButton onClick={likeButtonHandler} sx={{ p: 1 }}>
            {liked ? (
              <FavoriteIcon sx={{ color: "red" }} fontSize="large" />
            ) : (
              <FavoriteBorderIcon sx={{ color: "white" }} fontSize="large" />
            )}
          </IconButton>
          <IconButton
            onClick={watchLaterButtonHandler}
            sx={{ color: "white", p: 1 }}
          >
            <WatchLaterOutlinedIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => setOpenListDialog(true)}
            sx={{ color: "white", p: 1 }}
          >
            <PlaylistAddIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Typography sx={{ mx: 20 }}>{movie?.overview}</Typography>

      <Dialog
        PaperProps={{ classes: { root: "list__dialog" } }}
        open={openListDialog}
        onClose={() => setOpenListDialog(false)}
      >
        <DialogTitle>Save to</DialogTitle>
        <DialogContent dividers>
          <List>
            {playlist.map((list) => (
              <ListItem key={nanoid()} disablePadding>
                <ListItemButton
                  role={undefined}
                  dense
                  onClick={() => saveToListHandler(list.title)}
                >
                  <ListItemIcon>
                    <Checkbox
                      sx={{ color: "white", p: 0 }}
                      disableRipple
                      checked={list.checked}
                    />
                  </ListItemIcon>
                  <ListItemText id={list.title} primary={list.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          {!addListToggle && (
            <>
              <Button onClick={() => setAddListToggle(true)}>
                + Add a list
              </Button>
              <Button onClick={saveHandler}>Save</Button>
            </>
          )}
          {addListToggle && (
            <>
              <TextField
                sx={{
                  input: { color: "white" },
                }}
                autoFocus={true}
                fullWidth
                label="List name"
                placeholder="Enter list name"
                size="small"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
              <Button onClick={addListHandler}>Add</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieScreen;
