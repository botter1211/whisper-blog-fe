import React, { useCallback, useEffect } from "react";
import { Box, Grid, Card, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";
import { fDate } from "../../utils/formatTime";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField, FUploadAvatar } from "../../components/form";
import { fData } from "../../utils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "./userSlice";
import { getSubscription } from "../subscription/subscriptionSlice";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function AccountGeneral() {
  const { user } = useAuth();
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscription(user._id));
  }, [user._id, dispatch]);
  const { subsUser } = useSelector((state) => state.subscription);
  console.log(subsUser);
  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    citizenId: user?.citizenId || "",
    avatarUrl: user?.avatarUrl || "",
    aboutMe: user?.aboutMe || "",
  };
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  if (!subsUser) {
    return;
  }

  const onSubmit = (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
            <FUploadAvatar
              name="avatarUrl"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <FTextField name="name" label="Name" />
              <FTextField name="email" label="Email" disabled />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <FTextField
                name="citizenId"
                label="Citizen ID (used in case forgotten password)"
              />
              <FTextField name="aboutMe" multiline rows={4} label="About Me" />

              {subsUser[0]?.expiredDate && (
                <Typography width="100%" variant="h7" fontWeight={600}>
                  Subscription expired date: {fDate(subsUser[0]?.expiredDate)}
                </Typography>
              )}
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || isLoading}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default AccountGeneral;
