import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPublishedBlogs } from "../blog/blogSlice";
import ProfileBlogCard from "./ProfileBlogCard";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";

function ProfileBlogList({ filterTitle, userId }) {
  const [page, setPage] = useState(1);
  console.log(userId);
  const { currentPageBlogs, blogsById, totalBlogs, isLoading } = useSelector(
    (state) => state.blog
  );
  const blogs = currentPageBlogs.map((blogId) => blogsById[blogId]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getPublishedBlogs({ filterTitle, userId, page }));
  }, [filterTitle, userId, page, dispatch]);
  return (
    <>
      {blogs.map((blog) => (
        <ProfileBlogCard key={blog._id} blog={blog} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalBlogs ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalBlogs) && blogs.length >= totalBlogs}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No Blog Yet</Typography>
        )}
      </Box>
    </>
  );
}

export default ProfileBlogList;
