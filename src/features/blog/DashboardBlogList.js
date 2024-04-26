import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsOfUser } from "../blog/blogSlice";
import DashboardBlogCard from "./DashboardBlogCard";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import SearchInput from "../../components/SearchInput";

function DashboardBlogList() {
  const [filterTitle, setFilterTitle] = useState("");
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  const { currentPageBlogs, blogsById, totalBlogs, isLoading } = useSelector(
    (state) => state.blog
  );
  const blogs = currentPageBlogs.map((blogId) => blogsById[blogId]);
  const dispatch = useDispatch();

  const handleSubmit = (searchQuery) => {
    setFilterTitle(searchQuery);
  };
  useEffect(() => {
    dispatch(getBlogsOfUser({ userId: user._id, filterTitle, page }));
  }, [filterTitle, user._id, page, dispatch]);
  return (
    <>
      <SearchInput placeholder="Search by title" handleSubmit={handleSubmit} />
      {blogs.map((blog) => (
        <DashboardBlogCard key={blog._id} blog={blog} />
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

export default DashboardBlogList;
