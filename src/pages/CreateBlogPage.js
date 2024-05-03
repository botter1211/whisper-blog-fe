import React, { useCallback } from "react";
import { Grid, Card, Stack, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormProvider,
  FTextField,
  FCheckbox,
  FSelect,
  FUploadImage,
} from "../components/form";

import { useDispatch, useSelector } from "react-redux";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createBlog } from "../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";
import "../ckeditor.css";

const createBlogSchema = yup.object().shape({
  content: yup.string().required("Content is required"),
  title: yup.string().required("Blog Title is required"),
  status: yup
    .string()
    .required("Blog Status is required")
    .oneOf(["draft", "published"]),
});

export default function CreateBlogPage() {
  const { isLoading } = useSelector((state) => state.blog);

  const defaultValues = {
    title: "",
    content: "",
    category: "",
    coverImage: null,
    status: null,
    isAllowComment: true,
    isAllowReaction: true,
  };

  const methods = useForm({
    resolver: yupResolver(createBlogSchema),
    defaultValues,
  });
  const {
    handleSubmit,

    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "coverImage",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    dispatch(createBlog(data)).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
              <FUploadImage
                name="coverImage"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} alignItems="flex-end" sx={{ gap: 2 }}>
                <FTextField name="title" label="Blog Title" />
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  name="content"
                  onInit={(editor) => {
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(value, editor) =>
                    setValue("content", editor.getData())
                  }
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                  onReady={(value, editor) => {
                    editor = "";
                  }}
                />

                <FSelect name="category" label="Category">
                  {[
                    { type: "none", name: "None" },
                    { type: "technology", name: "Technology" },
                    { type: "design", name: "Design" },
                    { type: "culture", name: "Culture" },
                    { type: "art", name: "Art" },
                    { type: "business", name: "Business" },
                    { type: "politics", name: "Politics" },
                    { type: "opinion", name: "Opinion" },
                    { type: "science", name: "Science" },
                    { type: "health", name: "Health" },
                    { type: "style", name: "Style" },
                    { type: "travel", name: "Travel" },
                    { type: "games", name: "Games" },
                  ].map((option) => (
                    <option key={option.type} value={option.type}>
                      {option.name}
                    </option>
                  ))}
                </FSelect>
                <FSelect name="status" label="Blog Status">
                  {[
                    { code: "draft", label: "Draft" },
                    { code: "published", label: "Published" },
                  ].map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </FSelect>
                <Grid item xs={12} md={6}>
                  <FCheckbox label="Allow Comments" name="isAllowComment" />
                  <FCheckbox label="Allow Reactions" name="isAllowReaction" />
                </Grid>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting || isLoading}
                  sx={{ px: 4 }}
                >
                  Post
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
