import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFollow, createFollow } from "./followSlice";

function FollowActionButton({ currentUserId, targetUserId, follow, sx }) {
  const dispatch = useDispatch();

  if (currentUserId === targetUserId) return null;

  const btnFollow = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      onClick={() => dispatch(createFollow(targetUserId))}
    >
      Follow
    </Button>
  );

  if (!follow) return btnFollow;

  const btnUnfollow = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      color="error"
      onClick={() => dispatch(removeFollow(targetUserId))}
    >
      Unfollow
    </Button>
  );
  if (
    follow.followerId === currentUserId &&
    follow.followingId === targetUserId
  ) {
    return btnUnfollow;
  }
  return btnFollow;
}

export default FollowActionButton;
