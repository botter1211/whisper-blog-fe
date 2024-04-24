import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import ToggleColorMode from "./ToggleColorMode";
import Category from "./Category";
import Logo from "../components/Logo";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Divider, Menu, MenuItem } from "@mui/material";
import useAuth from "../hooks/useAuth";

function Header({ mode, toggleColorMode }) {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user ? user.name : ""}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user ? user.email : ""}
        </Typography>
      </Box>

      <Divider
        sx={{ borderStyle: "dashed", display: { xs: "block", md: "none" } }}
      />
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {!user ? (
          <MenuItem
            variant="outlined"
            color="inherit"
            to="/login"
            component={RouterLink}
            onClick={handleMenuClose}
            sx={{ mx: 1 }}
          >
            Sign Up
          </MenuItem>
        ) : user.role === "reader" ? (
          <MenuItem
            onClick={handleMenuClose}
            variant="outlined"
            color="inherit"
            size="small"
            to="/subscription"
            component={RouterLink}
            sx={{ mx: 1 }}
          >
            Subscribe
          </MenuItem>
        ) : (
          <MenuItem
            variant="outlined"
            color="inherit"
            size="small"
            to="/create"
            component={RouterLink}
            onClick={handleMenuClose}
            sx={{ mx: 1 }}
          >
            Write Blog
          </MenuItem>
        )}
      </Box>
      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to={`/user/${user.slug}`}
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        to="/dashboard"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Dashboard
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        to="/subscription"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Subscription
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/account-setting"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Account Settings
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );
  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 2,
          justifyContent: "space-between",
        }}
        id="back-to-top-anchor"
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {!user ? (
            <Button
              variant="outlined"
              color="inherit"
              to="/login"
              component={RouterLink}
            >
              Sign Up
            </Button>
          ) : user.role === "reader" ? (
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              to="/subscription"
              component={RouterLink}
            >
              Subscribe
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              to="/create"
              component={RouterLink}
            >
              Write Blog
            </Button>
          )}
        </Box>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ m: { md: "0 auto" } }}
        >
          <Logo mode={mode} />
        </IconButton>
        <Box display="flex" alignItems="center">
          {!user ? (
            " "
          ) : (
            <Box sx={{ mx: 2 }}>
              <Avatar
                src={user.avatarUrl}
                alt={user.name}
                onClick={handleProfileMenuOpen}
                sx={{ width: 32, height: 32 }}
              />
            </Box>
          )}

          {renderMenu}
          <ToggleColorMode
            mode={mode}
            toggleColorMode={toggleColorMode}
            sx={{ display: { xs: "none" } }}
          />
        </Box>
      </Toolbar>
      {/* <Category /> */}
    </React.Fragment>
  );
}

export default Header;
