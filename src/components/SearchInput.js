import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput({ handleSubmit, placeholder }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };
  return (
    <form onSubmit={onSubmit}>
      <TextField
        value={searchQuery}
        placeholder={placeholder}
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{
          width: { xs: "100%", md: "300px" },
        }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                aria-label={placeholder}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default SearchInput;
