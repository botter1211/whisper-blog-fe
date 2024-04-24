import * as React from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Avatar, Box } from "@mui/material";

function FeaturedPost() {
  const featuredPosts = [
    {
      title: "Featured post",
      // date: "Nov 12",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
      imageLabel: "Image Text",
      date: "14 days ago",
      author: "Author 1",
    },
    {
      title: "Post title",
      // date: "Nov 11",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
      imageLabel: "Image Text",
      date: "14 days ago",
      author: "Author 1",
    },
    {
      title: "Post title",
      // date: "Nov 11",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
      imageLabel: "Image Text",
      date: "14 days ago",
      author: "Author 1",
    },
    {
      title: "Post title",
      // date: "Nov 11",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random?wallpapers",
      imageLabel: "Image Text",
      date: "14 days ago",
      author: "Author 1",
    },
  ];
  return (
    <Grid item xs={12} md={8} sx={{}}>
      {featuredPosts.map((post) => (
        <CardActionArea component="a" href="#" sx={{ mb: 2 }} key={post}>
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {post.title}
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
                {post.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",
                  p: 1,
                }}
              >
                <Avatar alt={post.author} src={post.avatarUrl} />
                <Box sx={{ ml: 1 }}>
                  <Typography variant="subtitle2">{post.author}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {post.date}
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
              image={post.image}
              alt={post.imageLabel}
            />
          </Card>
        </CardActionArea>
      ))}
    </Grid>
  );
}

export default FeaturedPost;
