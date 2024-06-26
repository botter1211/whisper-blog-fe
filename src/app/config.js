export const BASE_URL =
  process.env.REACT_APP_BACKEND_API ||
  "https://whisper-blog-be.onrender.com/api";
export const CLOUDINARY_CLOUD_NAME =
  process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dy8t8el0z";
export const CLOUDINARY_UPLOAD_PRESET =
  process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "whisper_blog";
export const COMMENTS_PER_BLOG = 3;
export const BLOGS_PER_PAGE = 5;
