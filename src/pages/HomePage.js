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
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleSubmit = (searchQuery) => {
    let currentSearchParams = {};

    if (searchParams.get("category")) {
      currentSearchParams.category = searchParams.get("category");
    }

    if (searchParams.get("filterTitle")) {
      currentSearchParams.filterTitle = searchParams.get("filterTitle");
    }

    navigate({
      pathname: "/",
      search: createSearchParams({
        ...currentSearchParams,
        filterTitle: searchQuery,
      }).toString(),
    });
  };

  const handleClick = (categoryValue) => {
    let currentSearchParams = {};

    if (searchParams.get("category")) {
      currentSearchParams.category = searchParams.get("category");
    }

    if (searchParams.get("filterTitle")) {
      currentSearchParams.filterTitle = searchParams.get("filterTitle");
    }

    navigate({
      pathname: "/",
      search: createSearchParams({
        ...currentSearchParams,
        category: categoryValue,
      }).toString(),
    });
  };

  return (
    <div>
      {/* <MainFeaturedPost /> */}
      <SearchInput placeholder="Search by title" handleSubmit={handleSubmit} />
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Sidebar />
        <HomeBlog
          filterTitle={searchParams.get("filterTitle")}
          cateogory={searchParams.get("category")}
        />

        {/* <Main /> */}
        {/* <FeaturedPost /> */}
        {/* <BlogList /> */}
      </Grid>
    </div>
  );
}
