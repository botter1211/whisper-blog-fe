import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { deleteBlog, getSingleBlog } from "../features/blog/blogSlice";
import { useParams } from "react-router-dom";
import {
  Container,
  Button,
  Menu,
  Grid,
  Card,
  CardHeader,
  Avatar,
  Link,
  Box,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";

import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import CommentList from "../features/comment/CommentList";
import CommentForm from "../features/comment/CommentForm";
import BlogReaction from "../features/blog/BlogReaction";
import useAuth from "../hooks/useAuth";
import ModalEditBlog from "../features/blog/ModalEditBlog";

function BlogDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const { slug } = params;
  const dispatch = useDispatch();
  const { selectedBlog } = useSelector((state) => state.blog, shallowEqual);

  useEffect(() => {
    if (slug) {
      dispatch(getSingleBlog(slug));
    }
  }, [slug, dispatch]);

  const renderHTML = (rawHTML) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });

  const [anchorEl, setAnchorEl] = React.useState(null);

  if (!selectedBlog) {
    return <LoadingScreen />;
  }

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
        <ModalEditBlog blog={selectedBlog} />

        <Button
          onClick={() => dispatch(deleteBlog(selectedBlog._id))}
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
    <>
      <Helmet>
        <title>{selectedBlog?.title}</title>
        <meta property="og:title" content={selectedBlog?.title} />
        <meta property="og:content" content={selectedBlog?.content} />
        <meta
          property="og:image"
          itemProp="thumbnailUrl"
          content={selectedBlog?.coverImage}
        />
        <meta name="twitter:title" content={selectedBlog?.title} />
        <meta name="twitter:content" content={selectedBlog?.content} />
      </Helmet>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} margin="auto">
            <Card sx={{ mb: 3 }}>
              <CardHeader
                disableTypography
                avatar={
                  <Avatar
                    src={selectedBlog?.author.avatarUrl}
                    alt={selectedBlog?.author.name}
                  />
                }
                title={
                  <Link
                    variant="subtitle2"
                    color="text.primary"
                    component={RouterLink}
                    sx={{ fontWeight: 600 }}
                    to={`/user/${selectedBlog?.author.slug}`}
                  >
                    {selectedBlog?.author.name}
                  </Link>
                }
                subheader={
                  <Typography
                    variant="caption"
                    sx={{ display: "block", color: "text.secondary" }}
                  >
                    Published on{" "}
                    {selectedBlog ? fDate(selectedBlog?.createdAt) : ""}
                  </Typography>
                }
                action={
                  user._id === selectedBlog?.author._id && (
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
                {selectedBlog?.coverImage && (
                  <Box
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",

                      "& img": { objectFit: "cover", width: 1, height: 1 },
                    }}
                  >
                    <img src={selectedBlog?.coverImage} alt="selectedBlog" />
                  </Box>
                )}
                <Typography variant="h3">{selectedBlog?.title}</Typography>
                {renderHTML(selectedBlog?.content)}
                {selectedBlog?.isAllowReaction === true && (
                  <Box display="flex" alignItems="center">
                    <BlogReaction blog={selectedBlog} />
                    {/* {selectedBlog?.likeCount} */}
                  </Box>
                )}
                {selectedBlog?.isAllowComment === true && (
                  <>
                    <CommentList blogId={selectedBlog?._id} />
                    <CommentForm blogId={selectedBlog?._id} />
                  </>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default BlogDetailPage;
