import { IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReaction, sendBlogReaction } from "./blogSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAuth from "../../hooks/useAuth";

function BlogReaction({ blog }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const { reaction } = useSelector((state) => state.blog);

  const handleClick = (type) => {
    dispatch(sendBlogReaction({ blogId: blog._id, type }));
    dispatch(getReaction());
  };
  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("like")}>
        {reaction ? (
          <FavoriteIcon sx={{ fontSize: 20, color: "red" }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 20 }} />
        )}
      </IconButton>
      <Typography variant="h6" mr={1}>
        {blog?.likeCount}
      </Typography>
    </Stack>
  );
}

export default BlogReaction;
