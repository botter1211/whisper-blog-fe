import * as React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { Box, Button } from "@mui/material";
import { capitalCase } from "change-case";

const _ = require("lodash");

function Sidebar({ handleClick }) {
  const categories = [
    { title: "technology", url: "#" },
    { title: "design", url: "#" },
    { title: "culture", url: "#" },
    { title: "art", url: "#" },
    { title: "business", url: "#" },
    { title: "politics", url: "#" },
    { title: "opinion", url: "#" },
    { title: "science", url: "#" },
    { title: "health", url: "#" },
    { title: "style", url: "#" },
    { title: "travel", url: "#" },
    { title: "games", url: "#" },
  ];
  const social = [
    { name: "GitHub", icon: GitHubIcon },
    { name: "X", icon: XIcon },
    { name: "Facebook", icon: FacebookIcon },
  ];
  const slogan = [
    { content: "Happy to see you here, hope you will have a good experience." },
    {
      content:
        "To live is the rarest thing in the world. Most people exist, that is all.",
    },
    {
      content:
        "Good friends, good books, and a sleepy conscience: this is the ideal life.",
    },
    { content: "You only live once, but if you do it right, once is enough." },
    {
      content:
        "Sometimes people are beautiful, not in looks, not in what they say, just in what they are.",
    },
    {
      content: "Life always offers you a second chance. It's called tomorrow.",
    },
    {
      content:
        "Genius is one percent inspiration and ninety-nine percent perspiration",
    },
    {
      content:
        "Life doesn't require that we be the best, only that we try our best",
    },
    {
      content:
        "Be who you are and say what you mean, because those who mind don't matter and those who matter don't mind",
    },
  ];
  const randomSlogan = _.shuffle(slogan);

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={10} sx={{ p: 2, bgcolor: "grey.400" }}>
        <Typography variant="h6" gutterBottom>
          Hi
        </Typography>
        <Typography>Welcome to Whisper Blog! </Typography>
        <Typography>{randomSlogan[0].content}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Categories
      </Typography>
      {categories.map((category) => (
        <Box
          display="inline-flex"
          sx={{ flexWrap: "wrap" }}
          key={category.title}
        >
          <Button
            underline="hover"
            sx={{
              border: "1px solid",
              py: 1,
              px: 2,
              m: 1,
              borderRadius: 4,
            }}
            variant="body1"
            value={category.title}
            onClick={(e) => handleClick(e.target.value)}
            key={category.title}
          >
            {category.title}
          </Button>
        </Box>
      ))}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      <Box
        sx={{
          display: { xs: "flex", md: "block" },
          justifyContent: "space-around",
        }}
      >
        {social.map((network) => (
          <Link
            display="block"
            variant="body1"
            href="#"
            key={network.name}
            sx={{ mb: 0.5 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <network.icon />
              <Typography
                variant="subtitle2"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                {network.name}
              </Typography>
            </Stack>
          </Link>
        ))}
      </Box>
    </Grid>
  );
}

export default Sidebar;
