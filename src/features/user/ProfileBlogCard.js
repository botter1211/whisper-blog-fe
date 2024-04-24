import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  Grid,
  Button,
  Menu,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import CommentList from "../comment/CommentList";

import BlogReaction from "../blog/BlogReaction";
import { deleteBlog } from "../blog/blogSlice";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import CommentForm from "../comment/CommentForm";
import ModalEditBlog from "../blog/ModalEditBlog";

function ProfileBlogCard({ blog }) {
  const { user } = useAuth();
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
                Published on {fDate(blog.createdAt)}
              </Typography>
            }
            action={
              user._id === blog?.author?._id && (
                <>
                  <IconButton>
                    <MoreVertIcon
                      sx={{ fontSize: 30 }}
                      onClick={handleProfileMenuOpen}
                    />
                  </IconButton>

                  {renderMenu}
                </>
              )
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
            <Typography>{blog.title}</Typography>
            {renderHTML(blog.content)}
            {blog?.isAllowReaction === true && (
              <Box display="flex" alignItems="center">
                <BlogReaction blog={blog} />
                {/* {blog.likeCount} */}
              </Box>
            )}
            {blog?.isAllowComment === true && (
              <>
                <CommentList blogId={blog._id} />
                <CommentForm blogId={blog._id} />
              </>
            )}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProfileBlogCard;
