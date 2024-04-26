import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import Menu from "@mui/material/Menu";
import { useDispatch } from "react-redux";

import { deleteBlog } from "../blog/blogSlice";
import ModalEditBlog from "./ModalEditBlog";

function DashboardBlogCard({ blog }) {
  const renderHTML = (rawHTML) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
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
        <ModalEditBlog blog={blog} />

        <Button
          onClick={() => dispatch(deleteBlog(blog._id))}
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
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} margin="auto">
        <Card sx={{ mb: 3 }}>
          <CardHeader
            disableTypography
            avatar={
              <Avatar src={blog?.author?.avatarUrl} alt={blog?.author?.name} />
            }
            title={
              <Link
                variant="subtitle2"
                color="text.primary"
                component={RouterLink}
                sx={{ fontWeight: 600 }}
                to={`/user/${blog.author._id}`}
              >
                {blog?.author?.name}
              </Link>
            }
            subheader={
              <Typography
                variant="caption"
                sx={{ display: "block", color: "text.secondary" }}
              >
                {fDate(blog.createdAt)} ({blog.status})
              </Typography>
            }
            action={
              <>
                <IconButton>
                  <MoreVertIcon
                    sx={{ fontSize: 30 }}
                    onClick={handleProfileMenuOpen}
                  />
                </IconButton>

                {renderMenu}
              </>
            }
          />

          <Stack spacing={2} sx={{ p: 3 }}>
            {blog.coverImage && (
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",

                  "& img": { objectFit: "cover", width: 1, height: 1 },
                }}
              >
                <img src={blog.coverImage} alt="blog" />
              </Box>
            )}
            <Typography variant="h5">{blog.title}</Typography>
            {renderHTML(blog.content)}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DashboardBlogCard;
