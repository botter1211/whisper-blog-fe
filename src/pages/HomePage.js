import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Layout from "../layouts/Layout";
import Sidebar from "../layouts/Sidebar";
import MainFeaturedPost from "../layouts/MainFeaturedPost";
import FeaturedPost from "../layouts/FeaturedPost";
import Main from "../layouts/Main";
import BlogList from "../features/blog/BlogList";

import HomeBlog from "../features/blog/HomeBlog";
import SearchInput from "../components/SearchInput";
import { useState } from "react";

export default function HomePage() {
  const [filterTitle, setFilterTitle] = useState("");
  const handleSubmit = (searchQuery) => {
    setFilterTitle(searchQuery);
  };
  return (
    <div>
      {/* <MainFeaturedPost /> */}
      <SearchInput placeholder="Search by title" handleSubmit={handleSubmit} />
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Sidebar />
        <HomeBlog filterTitle={filterTitle} />

        {/* <Main /> */}
        {/* <FeaturedPost /> */}
        {/* <BlogList /> */}
      </Grid>
    </div>
  );
}
