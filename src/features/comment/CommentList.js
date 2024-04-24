import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getComments } from "./commentSlice";
import { COMMENTS_PER_BLOG } from "../../app/config";
import { Pagination, Stack, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import LoadingScreen from "../../components/LoadingScreen";

function CommentList({ blogId }) {
  const {
    commentsByBlog,
    commentsById,
    totalComments,
    isLoading,
    currentPage,
  } = useSelector(
    (state) => ({
      commentsByBlog: state.comment.commentsByBlog[blogId],
      totalComments: state.comment.totalCommentsByBlog[blogId],
      currentPage: state.comment.currentPageByBlog[blogId] || 1,
      commentsById: state.comment.commentsById,
      isLoading: state.comment.isLoading,
    }),
    shallowEqual
  );
  const totalPages = Math.ceil(totalComments / COMMENTS_PER_BLOG);
  const dispatch = useDispatch();

  useEffect(() => {
    if (blogId) dispatch(getComments({ blogId }));
  }, [blogId, dispatch]);

  let renderComments;
  if (commentsByBlog) {
    const comments = commentsByBlog.map((commentId) => commentsById[commentId]);
    renderComments = (
      <Stack spacing={1.5}>
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderComments = <LoadingScreen />;
  }
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalComments > 1
            ? `${totalComments} comments`
            : totalComments === 1
            ? `${totalComments} comment`
            : "No comment"}
        </Typography>
        {totalComments > COMMENTS_PER_BLOG && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => dispatch(getComments({ blogId, page }))}
          />
        )}
      </Stack>
      {renderComments}
    </Stack>
  );
}

export default CommentList;
