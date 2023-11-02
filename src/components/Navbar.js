import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HouseIcon from "@mui/icons-material/House";
import PetsIcon from "@mui/icons-material/Pets";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userLogoutAction,
  userProfileAction,
} from "../redux/actions/userAction";

const pages = ["Home", "Log In"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { loading, isAuthenticated, userInfo } = useSelector(
    (state) => state.signIn
  );

  const { user } = useSelector((state) => state.userProfile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = window.location.pathname;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // log out user
  //log out
  const logOut = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <AppBar position="static">
      <Container>
        {/* principal Menu */}
        <Toolbar disableGutters>
          <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "poppins",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Gembul Cimot
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <HouseIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "poppins",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              marginRight: "30px", // Adjust this value as needed
            }}
          >
            {/* menu desktop */}

            <Typography
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block", mr: 2 }}
            >
              <Link
                to="/"
                style={{ color: "white", textDecoration: "none" }}
                className={path == "/" ? "active" : ""}
              >
                Beranda
              </Link>
            </Typography>

            <Typography
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block", mr: 2 }}
            >
              <Link
                to="/kucing"
                style={{ color: "white", textDecoration: "none" }}
                className={path == "/kucing" ? "active" : ""}
              >
                Kucing
              </Link>
            </Typography>

            {/* <Typography
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block", mr: 2 }}
            >
              <Link
                to="/info"
                style={{ color: "white", textDecoration: "none" }}
                className={path == "/info" ? "active" : ""}
              >
                Artikel
              </Link>
            </Typography> */}

            <Typography
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block", mr: 2 }}
            >
              <Link
                to="/testimoni"
                style={{ color: "white", textDecoration: "none" }}
                className={path === "/testimoni" ? "active" : ""}
              >
                Testimoni
              </Link>
            </Typography>

            <Typography
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block", mr: 2 }}
            >
              <Link
                to="/tentang"
                style={{ color: "white", textDecoration: "none" }}
                className={path === "/tentang" ? "active" : ""}
              >
                Tentang
              </Link>
            </Typography>

            <Typography
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                to="/register"
                style={{ color: "white", textDecoration: "none" }}
                className={path === "/register" ? "active" : ""}
              >
                Daftar
              </Link>
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
                <span
                  style={{
                    color: "white",
                    fontSize: "18px",
                    marginLeft: "10px",
                  }}
                >
                  {userInfo && userInfo.name}
                </span>
              </IconButton>
            </Tooltip>
            <Menu
              PaperProps={{
                sx: {
                  "& 	.MuiMenu-list": {
                    bgcolor: "primary.white",
                    color: "white",
                  },
                },
              }}
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userInfo && userInfo.name ? ( // If user is logged in
                <>
                  {userInfo.role === "admin" ? ( // If user is an admin
                    <>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <Link
                            to="/admin/dashboard"
                            style={{ textDecoration: "none" }}
                          >
                            Admin
                          </Link>
                        </Typography>
                      </MenuItem>
                    </>
                  ) : (
                    // If user is not an admin
                    <>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <Link
                            to="/user/dashboard"
                            style={{ textDecoration: "none" }}
                          >
                            User
                          </Link>
                        </Typography>
                      </MenuItem>
                    </>
                  )}
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link onClick={logOut} style={{ textDecoration: "none" }}>
                        Keluar Akun
                      </Link>
                    </Typography>
                  </MenuItem>
                </>
              ) : (
                // If user is not logged in
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      Login
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
