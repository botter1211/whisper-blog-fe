import React, { useEffect, useState } from "react";
import { Container, Tab, Box, Tabs } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import GroupsIcon from "@mui/icons-material/Groups";
import SpatialAudioOffIcon from "@mui/icons-material/SpatialAudioOff";
import SpatialTrackingIcon from "@mui/icons-material/SpatialTracking";
import { capitalCase } from "change-case";

import FollowingList from "../features/follow/FollowingList";
import FollowerList from "../features/follow/FollowerList";

import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getCurrentUserProfile } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import DashboardBlogList from "../features/blog/DashboardBlogList";
import AllUsers from "../features/follow/AllUsers";

function ProfilePage() {
  const [currentTab, setCurrentTab] = useState("dashboard_blog");
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user, shallowEqual);

  useEffect(() => {
    if (userId) {
      dispatch(getCurrentUserProfile());
    }
  }, [dispatch, userId]);

  const PROFILE_TABS = [
    {
      value: "dashboard_blog",
      icon: <AccountBoxIcon sx={{ fontSize: 30 }} />,
      component: <DashboardBlogList userId={userId} />,
    },
    {
      value: "following",
      icon: <SpatialAudioOffIcon sx={{ fontSize: 30 }} />,
      component: <FollowingList profile={{}} />,
    },
    {
      value: "follower",
      icon: <SpatialTrackingIcon sx={{ fontSize: 30 }} />,
      component: <FollowerList profile={{}} />,
    },
    {
      value: "all_users",
      icon: <GroupsIcon sx={{ fontSize: 30 }} />,
      component: <AllUsers profile={{}} />,
    },
  ];

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            sx={{ gap: 4, fontWeight: 600 }}
            allowScrollButtonsMobile
            onChange={(e, value) => setCurrentTab(value)}
          >
            {PROFILE_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                sx={{ fontWeight: 600, mx: 1 }}
                label={capitalCase(tab.value)}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Box sx={{ mb: 5 }} />
          {PROFILE_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </>
      )}
    </Container>
  );
}

export default ProfilePage;
