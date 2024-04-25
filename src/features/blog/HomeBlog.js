import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeBlogs } from "../blog/blogSlice";
import BlogCard from "./BlogCard";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import SearchInput from "../../components/SearchInput";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate, createSearchParams } from "react-router-dom";

function HomeBlog({ filterName }) {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { user } = useAuth();
  const userId = user._id;
  const { currentPageBlogs, blogsById, totalBlogs, isLoading } = useSelector(
    (state) => state.blog
  );
  const blogs = currentPageBlogs.map((blogId) => blogsById[blogId]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filterName) {
      dispatch(getHomeBlogs({ filterName, userId, page }));

      navigate({
        pathname: "/",
        search: createSearchParams({ filterName }).toString(),
      });
    } else {
      navigate("/");
      dispatch(getHomeBlogs({ filterName, userId, page }));
    }
  }, [filterName, userId, page, dispatch]);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Grid item xs={12} md={8}>
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
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
        </Grid>
      )}
    </>
  );
}

export default HomeBlog;
