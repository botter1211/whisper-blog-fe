import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

function Main() {
  const posts = [
    {
      title: "Sample blog post",
      author: "Olivier",
      postDate: "April 1, 2020",
      content: `This blog post shows a few different types of content that are supported and styled with 
    Material styles. Basic typography, images, and code are all supported.
    You can extend these by modifying.
    
    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
    Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
    
    Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
    Nullam id dolor id nibh ultricies vehicula ut id elit.
    
    Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
    Aenean lacinia bibendum nulla sed consectetur.
    
    Heading
    
    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
    Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    
    Sub-heading 1
    
    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    
    Sub-heading 2
    
    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
    sit amet risus.
    
    - Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
    - Donec id elit non mi porta gravida at eget metus.
    - Nulla vitae elit libero, a pharetra augue.
    
    Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.
    
    1. Vestibulum id ligula porta felis euismod semper.
    1. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    1. Maecenas sed diam eget risus varius blandit sit amet non magna.
    
    Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.`,
    },
    {
      title: "Another blog post",
      author: "Matt",
      postDate: "March 23, 2020 ",
      content: `Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
    Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
    
    Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
    Nullam id dolor id nibh ultricies vehicula ut id elit.
    
    Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
    Aenean lacinia bibendum nulla sed consectetur.
    
    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
    Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.`,
    },
    {
      title: "New feature",
      author: "Tom",
      postDate: "March 14, 2020  ",
      content: `Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
    ut fermentum massa justo sit amet risus.
    
    - Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
    - Donec id elit non mi porta gravida at eget metus.
    - Nulla vitae elit libero, a pharetra augue.
    
    Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
    Aenean lacinia bibendum nulla sed consectetur.
    
    Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.`,
    },
  ];
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        From the firehose
      </Typography>
      <Divider />
      {posts.map((post) => (
        <Grid className="markdown" key={post}>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.postDate} by{" "}
            <Link to="/" component={RouterLink}>
              {post.author}
            </Link>
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {post.content}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}

export default Main;
