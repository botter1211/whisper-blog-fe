import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { BLOGS_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { getCurrentUserProfile } from "../user/userSlice";

const initialState = {
  isLoading: false,
  error: null,
  blogsById: {},
  currentPageBlogs: [],
  selectedBlog: null,
  reaction: false,
  // selectedBlogLikes: [],
  blogLikesByBlogId: {},
  blogLikes: [],
};

const slice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetBlogs(state, action) {
      state.blogsById = {};
      state.currentPageBlogs = [];
    },

    getBlogsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { blogs, count } = action.payload;
      blogs.forEach((blog) => {
        state.blogsById[blog._id] = blog;
        if (!state.currentPageBlogs.includes(blog._id))
          state.currentPageBlogs.push(blog._id);
      });
      state.totalBlogs = count;
    },

    getBlogsOfUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { blogs, count } = action.payload;
      blogs.forEach((blog) => {
        state.blogsById[blog._id] = blog;
        if (!state.currentPageBlogs.includes(blog._id))
          state.currentPageBlogs.push(blog._id);
      });
      state.totalBlogs = count;
    },

    createBlogSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newBlog = action.payload;
      if (state.currentPageBlogs.length % BLOGS_PER_PAGE === 0)
        state.currentPageBlogs.pop();
      state.blogsById[newBlog._id] = newBlog;
      state.currentPageBlogs.unshift(newBlog._id);
    },

    editBlogSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newBlog = action.payload;
      console.log(newBlog);

      state.blogsById[newBlog._id].content = newBlog.content;
      state.blogsById[newBlog._id].image = newBlog.image;
    },

    sendBlogReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { blogId, likeCount } = action.payload;
      if (state.selectedBlog) {
        state.selectedBlog.likeCount = likeCount; // <--
      }
      state.blogsById[blogId].likeCount = likeCount;
    },
    getReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      // state.selectedBlogLikes = action.payload;

      const blogId = action.payload.blogId;
      if (blogId) {
        state.blogLikesByBlogId[blogId] = action.payload.data;
      }
    },
    getAllReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.blogLikes = action.payload;
    },
    getSingleBlogSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedBlog = action.payload;
      state.blogsById[action.payload._id] = action.payload;
    },

    deleteBlogSuccess(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      const { blogId } = action.payload;
      console.log(action.payload);
      console.log(state.currentPageBlogs);
      state.currentPageBlogs = state.currentPageBlogs.filter(
        (blog) => blogId !== blog
      );
    },

    getGuestBlogsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { blogs, count } = action.payload;
      blogs.forEach((blog) => {
        state.blogsById[blog._id] = blog;
        if (!state.currentPageBlogs.includes(blog._id))
          state.currentPageBlogs.push(blog._id);
      });
      state.totalBlogs = count;
    },
  },
});

export default slice.reducer;

export const getBlogsOfUser =
  ({ filterTitle, category, userId, page = 1, limit = BLOGS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterTitle) params.title = filterTitle;
      if (category) params.category = category;
      const response = await apiService.get(`/blogs/user/${userId}`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetBlogs());
      dispatch(slice.actions.getBlogsOfUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getHomeBlogs =
  ({ filterTitle, category, userId, page = 1, limit = BLOGS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterTitle) params.title = filterTitle;
      if (category) params.category = category;
      const response = await apiService.get(`/blogs/home/user/${userId}`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetBlogs());
      dispatch(slice.actions.getBlogsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getPublishedBlogs =
  ({ filterTitle, category, userId, page = 1, limit = BLOGS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterTitle) params.title = filterTitle;
      if (category) params.category = category;
      const response = await apiService.get(`/blogs/published/user/${userId}`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetBlogs());
      dispatch(slice.actions.getBlogsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createBlog =
  ({
    title,
    content,
    category,
    coverImage,
    isAllowComment,
    isAllowReaction,
    status,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(coverImage);
      const response = await apiService.post("/blogs", {
        title,
        content,
        category: category !== "none" ? category : "",
        coverImage: imageUrl,
        isAllowComment,
        isAllowReaction,
        status,
      });
      dispatch(slice.actions.createBlogSuccess(response.data));
      toast.success("Create Blog successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateBlog =
  ({
    blogId,
    title,
    content,
    category,
    coverImage,
    isAllowComment,
    isAllowReaction,
    status,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(coverImage);
      const response = await apiService.put(`/blogs/${blogId}`, {
        title,
        content,
        category: category !== "none" ? category : "",
        coverImage: imageUrl,
        isAllowComment,
        isAllowReaction,
        status,
      });
      dispatch(slice.actions.editBlogSuccess({ ...response.data }));
      toast.success("Edit blog successfully");
      dispatch(getCurrentUserProfile());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendBlogReaction =
  ({ blogId, type }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        blogId,
        type,
      });
      dispatch(
        slice.actions.sendBlogReactionSuccess({
          blogId,
          likeCount: response.data.likeCount,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const getReaction =
  ({ blogId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/reactions`, {
        params: {
          blogId: blogId,
        },
      });
      dispatch(
        slice.actions.getReactionSuccess({
          blogId: blogId,
          data: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const getAllReactionOfUser = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/reactions`);
    dispatch(slice.actions.getAllReactionSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getSingleBlog = (slug) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/blogs/${slug}`);
    dispatch(slice.actions.getSingleBlogSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const deleteBlog = (blogId) => async (dispatch) => {
  const confirmed = window.confirm("Do you want to remove this blog ?");
  if (!confirmed) {
    return;
  }
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/blogs/${blogId}`);
    dispatch(slice.actions.deleteBlogSuccess({ ...response.data, blogId }));
    toast.success("Blog Deleted");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getAllBlogsForGuest = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/blogs`);
    dispatch(slice.actions.getGuestBlogsSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
