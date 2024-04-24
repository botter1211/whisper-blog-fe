import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const blogPosts = [
  {
    title: "Title 1",
    description: "Description for blog post 1",
    author: "Author 1",
    imageUrl: "https://via.placeholder.com/150",
    avatarUrl: "https://via.placeholder.com/150",
    date: "14 days ago",
  },
  {
    title: "Title 2",
    description: "Description for blog post 2",
    author: "Author 2",
    imageUrl: "https://via.placeholder.com/150",
    avatarUrl: "https://via.placeholder.com/150",
    date: "14 days ago",
  },
];

export default function BlogList() {
  return (
    <Container>
      <Box sx={{ my: 5, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Blog
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          We share our best ideas in our blog
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {blogPosts.map((post, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={post.imageUrl}
                alt={post.title}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="h5" variant="h5">
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {post.description}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                  <Avatar alt={post.author} src={post.avatarUrl} />
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="subtitle2">{post.author}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {post.date}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
