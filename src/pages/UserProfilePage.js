import React, { useEffect, useState } from "react";
import { Container, Tab, Box, Tabs, Grid } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShareIcon from "@mui/icons-material/Share";

import ProfileBlogList from "../features/user/ProfileBlogList";

import ProfileInfoCard from "../features/user/ProfileInfoCard";

import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import SearchInput from "../components/SearchInput";

function UserProfilePage() {
  const [filterName, setFilterName] = useState("");

  const params = useParams();
  const { slug } = params;
  const dispatch = useDispatch();

  useEffect(() => {
    if (slug) {
      dispatch(getUser(slug));
    }
  }, [slug, dispatch]);
  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };
  const { selectedUser, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );
  const { usersById } = useSelector((state) => state.follow, shallowEqual);

  if (!selectedUser) {
    return null;
  }

  const selectedUserFollowStatus = usersById[selectedUser._id];

  const finalSelectedUser = {
    ...selectedUser,
    ...selectedUserFollowStatus,
  };

  console.log(selectedUser);
  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Box
            sx={{
              display: { xs: "block", md: "flex" },
              justifyContent: { md: "flex-end" },
            }}
          >
            <SearchInput
              placeholder="Search by title"
              handleSubmit={handleSubmit}
            />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              {" "}
              {selectedUser && <ProfileInfoCard profile={finalSelectedUser} />}
            </Grid>
            <Grid item xs={12} md={8}>
              <ProfileBlogList
                filterName={filterName}
                userId={selectedUser?._id}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}

export default UserProfilePage;
