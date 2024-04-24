import React, { useState } from "react";

import { Stack, Avatar, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { editComment } from "./commentSlice";

function EditComment({ comment, setEditcomment }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const defaultValues = {
    content: comment?.content,
  };
  const [content, setContent] = useState(defaultValues.content);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editComment({ commentId: comment._id, content, blogId: comment.blogId }),
      setEditcomment("off")
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center">
        <Avatar src={user.avatarUrl} alt={user.name} />
        <TextField
          fullWidth
          size="small"
          value={content}
          placeholder={defaultValues.content}
          onChange={(event) => setContent(event.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: (theme) =>
                `${theme.palette.grey[500_32]} !important`,
            },
          }}
        />
        <IconButton type="submit">
          <SendIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>
    </form>
  );
}

export default EditComment;
