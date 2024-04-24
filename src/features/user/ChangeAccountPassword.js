import React, { useCallback, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAuth from "../../hooks/useAuth";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField } from "../../components/form";
import { fData } from "../../utils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "./userSlice";
import { useNavigate } from "react-router-dom";

const UpdateUserSchema = yup.object().shape({
  passwordCurrent: yup.string().required("Current password is required"),
  password: yup.string().required("New password is required"),
  passwordConfirm: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("password")], "Password must match"),
});
function ChangeAccountPassword() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);

  const defaultValues = {
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
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

  const handleLogout = async () => {
    try {
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const dispatch = useDispatch();
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const onSubmit = (data) => {
    dispatch(changePassword({ userId: user._id, ...data })).then(() =>
      handleLogout()
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
            <Typography
              variant="subtitle2"
              sx={{
                mt: 2,
                mx: "auto",
                display: "block",
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              After successfully changing the password, the user will have to
              log in again with the new password
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <FTextField
              name="passwordCurrent"
              label="Password Current"
              type={showPasswordCurrent ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPasswordCurrent(!showPasswordCurrent)
                      }
                      edge="end"
                    >
                      {showPasswordCurrent ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FTextField
              name="password"
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FTextField
              name="passwordConfirm"
              label="Confirm New Password"
              type={showPasswordConfirm ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
                      edge="end"
                    >
                      {showPasswordConfirm ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting || isLoading}
            >
              Save Changes
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default ChangeAccountPassword;
