import React from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";

import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditComment from "./EditComment";

function CommentCard({ comment }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editcomment, setEditcomment] = React.useState("off");
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box display="flex" flexDirection="column" sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={() => [
            setEditcomment((prev) => (prev === "off" ? "on" : "off")),
            handleMenuClose(),
          ]}
          sx={{ width: "100px" }}
          variant="outlined"
        >
          Edit
        </Button>

        <Button
          onClick={() => [
            dispatch(deleteComment(comment._id, comment.blogId)),
            handleMenuClose(),
          ]}
          sx={{ width: "100px" }}
          variant="outlined"
          color="error"
        >
          Delete
        </Button>
      </Box>
    </Menu>
  );
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {comment.content}
          </Typography>
          <IconButton>
            <MoreVertIcon
              sx={{ fontSize: 30 }}
              onClick={handleProfileMenuOpen}
            />
          </IconButton>
        </Stack>

        {renderMenu}
        {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() =>
              setEditcomment((prev) => (prev === "off" ? "on" : "off"))
            }
          >
            Edit
          </Button>
          <Button
            onClick={() => dispatch(deleteComment(comment._id, comment.blogId))}
          >
            Delete
          </Button>
        </Box> */}
        {editcomment === "on" && (
          <EditComment comment={comment} setEditcomment={setEditcomment} />
        )}
      </Paper>
    </Stack>
  );
}

export default CommentCard;
