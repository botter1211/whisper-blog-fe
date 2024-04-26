import React from "react";
import {
  Typography,
  Box,
  Card,
  Stack,
  IconButton,
  Button,
} from "@mui/material";

import useAuth from "../../hooks/useAuth";
import { fDate } from "../../utils/formatTime";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FollowActionButton from "../follow/FollowActionButton";

function ProfileInfoCard({ profile }) {
  const { user } = useAuth();
  const currentUserId = user._id;
  const {
    _id: targetUserId,
    name,
    avatarUrl,
    aboutMe,
    role,
    facebookLink,
    instagramLink,
    githubLink,
    xLink,
    followingCount,
    followerCount,
    createdAt,
    follow,
  } = profile;

  const handleError = (e) => {
    const imgIndex = Math.floor(Math.random() * 8) + 1;
    e.target.src = `/avatar/avatar_${imgIndex}.png`;
    e.target.onError = null;
  };

  const followActionButton = (
    <FollowActionButton
      sx={{
        m: "auto",
        p: 1,
        fontSize: "16px",
        width: "120px",
        borderRadius: 2,
      }}
      currentUserId={currentUserId}
      targetUserId={targetUserId}
      follow={follow}
    />
  );
  return (
    <div>
      <Card
        sx={{
          py: 8,
          px: 5,
          display: { xs: "block" },
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          textAlign: { md: "left", xs: "center" },
          position: { md: "fixed" },
          width: { md: "350px" },
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            overflow: "hidden",

            margin: "auto",
            width: 144,
            height: 144,
            "& img": { objectFit: "cover", width: 1, height: 1 },
          }}
        >
          <img src={avatarUrl} alt={name} onError={handleError} />
        </Box>

        <Stack display="flex" flexDirection="column" textAlign="center" mt={2}>
          <Typography variant="h5" sx={{ alignItems: "center" }}>
            {name} {role === "writer" ? <CheckCircleIcon /> : null}
          </Typography>
          <Typography>
            Following {followingCount} - Follower {followerCount}
          </Typography>
          <Typography variant="subtitle">
            {aboutMe ? aboutMe : "Nothing to read here"}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ display: "block", color: "text.secondary" }}
          >
            Joined on {fDate(createdAt)}
          </Typography>
          <Stack flexDirection="row" m={2}>
            {facebookLink && (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ m: "0 auto" }}
                href={facebookLink}
              >
                <FacebookIcon />
              </IconButton>
            )}
            {instagramLink && (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ m: "0 auto" }}
                href={instagramLink}
              >
                <InstagramIcon />
              </IconButton>
            )}
            {githubLink && (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ m: "0 auto" }}
                href={githubLink}
              >
                <GitHubIcon />
              </IconButton>
            )}
            {xLink && (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ m: "0 auto" }}
                href={xLink}
              >
                <XIcon />
              </IconButton>
            )}
          </Stack>
          {user._id === profile._id && (
            <Button
              variant="outlined"
              sx={{ borderRadius: 10, width: 150, m: "auto" }}
              href="/accountsetting"
            >
              Edit Profile
            </Button>
          )}
          {followActionButton}
        </Stack>
      </Card>
    </div>
  );
}

export default ProfileInfoCard;
