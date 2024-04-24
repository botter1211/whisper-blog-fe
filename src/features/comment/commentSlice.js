import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { COMMENTS_PER_BLOG } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  commentsByBlog: {},
  totalCommentsByBlog: {},
  currentPageByBlog: {},
  commentsById: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    editCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    getCommentsSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      const { blogId, comments, count, page } = action.payload;

      comments.forEach(
        (comment) => (state.commentsById[comment._id] = comment)
      );
      state.commentsByBlog[blogId] = comments
        .map((comment) => comment._id)
        .reverse();
      state.totalCommentsByBlog[blogId] = count;
      state.currentPageByBlog[blogId] = page;
    },

    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId, blogId } = action.payload;
      state.commentsByBlog[blogId] = state.commentsByBlog[blogId].filter(
        (cId) => commentId !== cId
      );
      state.totalCommentsByBlog[blogId] = state.totalCommentsByBlog[blogId] - 1;
    },
  },
});

export default slice.reducer;

export const getComments =
  ({ blogId, page = 1, limit = COMMENTS_PER_BLOG }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page: page,
        limit: limit,
      };
      const response = await apiService.get(`/blogs/${blogId}/comments`, {
        params,
      });
      dispatch(
        slice.actions.getCommentsSuccess({
          ...response.data,
          blogId,
          page,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createComment =
  ({ blogId, content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", {
        content,
        blogId,
      });
      dispatch(slice.actions.createCommentSuccess(response.data));
      dispatch(getComments({ blogId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const editComment =
  ({ blogId, commentId, content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/comments/${commentId}`, {
        content,
      });
      dispatch(slice.actions.editCommentSuccess(response.data));
      toast.success("Edit Comment successful");
      dispatch(getComments({ blogId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteComment = (commentId, blogId) => async (dispatch) => {
  const confirmed = window.confirm("Do you want to remove this comment ?");
  if (!confirmed) {
    return;
  }
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/comments/${commentId}`);
    dispatch(
      slice.actions.deleteCommentSuccess({
        ...response.data,
        commentId,
        blogId,
      })
    );
    toast.success("Comment Deleted");
    dispatch(getComments({ blogId }));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
