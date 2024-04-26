import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Layout from "../layouts/Layout";
import Sidebar from "../layouts/Sidebar";
import MainFeaturedPost from "../layouts/MainFeaturedPost";
import FeaturedPost from "../layouts/FeaturedPost";
import Main from "../layouts/Main";
import BlogList from "../features/blog/BlogList";
import RefreshIcon from "@mui/icons-material/Refresh";
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

  const handleReset = () => {
    navigate({
      pathname: "/",
    });
  };
  return (
    <div>
      {/* <MainFeaturedPost /> */}
      <Grid display="flex" sx={{ gap: 1 }}>
        <SearchInput
          placeholder="Search by title"
          handleSubmit={handleSubmit}
        />
        <Button variant="outlined" onClick={handleReset}>
          <RefreshIcon />
        </Button>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Sidebar handleClick={handleClick} />
        <HomeBlog
          filterTitle={searchParams.get("filterTitle")}
          category={searchParams.get("category")}
        />

        {/* <Main /> */}
        {/* <FeaturedPost /> */}
        {/* <BlogList /> */}
      </Grid>
    </div>
  );
}
