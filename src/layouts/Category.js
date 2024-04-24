import { Toolbar } from "@mui/material";
import Link from "@mui/material/Link";

import React from "react";

function Category() {
  const categories = [
    { title: "Technology", url: "#" },
    { title: "Design", url: "#" },
    { title: "Culture", url: "#" },
    { title: "Business", url: "#" },
    { title: "Politics", url: "#" },
    { title: "Opinion", url: "#" },
    { title: "Science", url: "#" },
    { title: "Health", url: "#" },
    { title: "Style", url: "#" },
    { title: "Travel", url: "#" },
  ];
  return (
    <Toolbar
      component="nav"
      variant="dense"
      sx={{ justifyContent: "space-between", overflowX: "auto" }}
    >
      {categories.map((category) => (
        <Link
          color="inherit"
          noWrap
          key={category.title}
          variant="body2"
          href={category.url}
          sx={{ p: 1, flexShrink: 0 }}
        >
          {category.title}
        </Link>
      ))}
    </Toolbar>
  );
}

export default Category;
