import React from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Menu,
  Stack,
  Link,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import { useDispatch } from "react-redux";

import { Link as RouterLink } from "react-router-dom";
function BlogCard({ blog }) {
  const renderHTML = (rawHTML) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });

  return (
    <CardActionArea component="a" href={`/blog/${blog.slug}`} sx={{ mb: 2 }}>
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {blog?.title}
          </Typography>
          {/* <Typography variant="subtitle1" color="text.secondary">
                  {post.date}
                </Typography> */}
          <Typography
            variant="subtitle1"
            paragraph
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {renderHTML(blog.content)}
          </Typography>
          <Box
            sx={{
              display: "flex",

              alignItems: "center",
              p: 1,
            }}
          >
            <Avatar alt={blog?.author.name} src={blog?.author.avatarUrl} />
            <Box sx={{ ml: 1 }}>
              <Typography variant="subtitle2">{blog?.author.name}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Published on {fDate(blog.createdAt)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardMedia
          component="img"
          sx={{
            width: 160,

            display: { xs: "none", sm: "block" },
          }}
          image={
            blog?.coverImage
              ? blog.coverImage
              : "https://source.unsplash.com/random?wallpapers"
          }
          alt={blog?.title}
        />
      </Card>
    </CardActionArea>
  );
}

export default BlogCard;
