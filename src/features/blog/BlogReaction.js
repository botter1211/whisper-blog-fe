import { IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReaction, sendBlogReaction } from "./blogSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAuth from "../../hooks/useAuth";

function BlogReaction({ blog }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const { blogLikesByBlogId } = useSelector((state) => state.blog);

  useEffect(() => {
    if (blog) {
      dispatch(getReaction({ blogId: blog._id }));
    }
  }, [dispatch, blog]);

  const blogId = blog._id;
  const selectedBlogLikes = blogLikesByBlogId[blogId];
  let didCurrentUserLike;

  if (selectedBlogLikes) {
    didCurrentUserLike = selectedBlogLikes.some(
      (like) => like.author === user._id
    );
  }

  const handleClick = (type) => {
    dispatch(sendBlogReaction({ blogId: blog._id, type }));
  };
  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleClick("like")}>
        {didCurrentUserLike ? (
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
