import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Drink from "./components/Drink.js";
import DrinkList from "./components/DrinkList.js";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import ReactGA from "react-ga";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const App = () => {
  ReactGA.initialize("G-BNG78G5GB6");

  const [menuVisible, setMenuVisible] = useState(false);

  const RouterRoutes = () => {
    return (
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drinks" element={<DrinkList />} />
          <Route path="/drinks/:id" element={<Drink />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    );
  };

  const Menu = () => {
    return (
      <Container flexDirection="row">
        <Link to={"/"} className="nav-link" aria-current="page">
          Home
        </Link>
        <Link to={"/drinks"} className="nav-link">
          Recipes
        </Link>
        <div className="nav-link disabled">Sign up</div>
        <Link to={"/login"} className="nav-link disabled">
          Login
        </Link>
      </Container>
    );
  };

  const Navbar = () => {
    return (
      <Box
        marginBottom="6.75rem"
        position="sticky"
        overflow="hidden"
        zIndex={99}
      >
        <AppBar className="bg-dark" sx={{ padding: "10px" }}>
          <Toolbar>
            <Typography
              variant="h3"
              component="div"
              backgroundColor="inherit"
              flexGrow={1}
            >
              <Link to={"/"} className="display-4 text-light">
                Black Sheep Barkeep
              </Link>
            </Typography>
            <IconButton
              size="small"
              className="text-light"
              onClick={() => {
                setMenuVisible(!menuVisible);
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          {menuVisible ? Menu() : null}
        </AppBar>
      </Box>
    );
  };

  return (
    <Box>
      {Navbar()}
      {RouterRoutes()}
    </Box>
  );
};

export default App;
