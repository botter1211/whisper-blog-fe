import Grid from "@mui/material/Grid";
import Sidebar from "../layouts/Sidebar";
import SearchInput from "../components/SearchInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBlogsForGuest } from "../features/blog/blogSlice";
import BlogCard from "../features/blog/BlogCard";
import LoadingScreen from "../components/LoadingScreen";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function GuestPage() {
  const [filterName, setFilterName] = useState("");
  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };
  const [page, setPage] = useState(1);

  const { currentPageBlogs, blogsById, totalBlogs, isLoading } = useSelector(
    (state) => state.blog
  );
  const blogs = currentPageBlogs.map((blogId) => blogsById[blogId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogsForGuest({ filterName, page }));
  }, [filterName, page, dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      alert("You must log in to continue!!");
      navigate("/login");
    }, 10000);
  }, []);

  return (
    <div>
      {/* <MainFeaturedPost /> */}
      <SearchInput placeholder="Search by title" handleSubmit={handleSubmit} />
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Sidebar />
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

        {/* <Main /> */}
        {/* <FeaturedPost /> */}
        {/* <BlogList /> */}
      </Grid>
    </div>
  );
}
