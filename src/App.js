import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { Search } from "@mui/icons-material";
import Container from "@mui/material/Container";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Link as RouterLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import BlockDetail from "./pages/BlockDetail";
import TransactionDetail from "./pages/TransactionDetail";
import FlexBetween from "./components/FlexBetween";
import AddressDetail from "./pages/AddressDetail";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  //prevent empty submissions
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      onClick(e);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    if (address && Utils.isHexString(address)) {
      navigate(`/address/${address}`);
    } else {
      alert("Not a valid address");
    }
  };

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <RouterLink to="/">KunJon Explorer</RouterLink>
            </Typography>
            <FlexBetween borderRadius="9px">
              <InputBase
                placeholder={"Input Wallet Address"}
                value={address}
                onKeyDown={handleEnter}
                onChange={handleChange}
              />
              <IconButton onClick={onClick}>
                <Search />
              </IconButton>
            </FlexBetween>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Home blockNumber={blockNumber} />} />
              <Route path="/block/:hash" element={<BlockDetail />} />
              <Route path="/address/:hash" element={<AddressDetail />} />
              <Route
                path="/transaction/:hash"
                element={<TransactionDetail />}
              />
            </Routes>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
