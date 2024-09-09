import { trpc } from "@/trpc/client";
import { router } from "@/trpc/server";
import {
  LogoutRounded,
  MenuOutlined,
  SettingsRounded,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Container,
  Grid2 as Grid,
  Typography,
  Stack,
  Button,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Fragment } from "react";
import LogoutDialog from "./LogoutDialog";

const HeaderComponent = () => {
  const { data: user } = trpc.user.find.useQuery();
  const router = useRouter();
  const [openLogout, setOpenLogout] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openMenu = Boolean(anchorEl);

  if (user) {
    return (
      <Fragment>
        <AppBar>
          <Toolbar>
            <Container>
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Typography
                  variant="h3"
                  sx={{
                    cursor: "pointer",
                    alignContent: "center",
                  }}
                  onClick={() => router.push("/")}
                >
                  MenuGeniusLOGO
                </Typography>
                <Button variant="outlined" onClick={handleClick}>
                  <MenuOutlined fontSize="large" sx={{ color: "white" }} />
                </Button>
                <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
                  <MenuItem sx={{ justifyContent: "space-between" }}>
                    <Typography>Beállítások</Typography>
                    <SettingsRounded />
                  </MenuItem>
                  <MenuItem
                    data-testid="open-logout-dialog"
                    onClick={() => setOpenLogout(true)}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography>Kijelentkezés</Typography>
                    <LogoutRounded />
                  </MenuItem>
                </Menu>
              </Stack>
            </Container>
          </Toolbar>
        </AppBar>
        <Toolbar sx={{ paddingBottom: "24px" }} />
        <LogoutDialog open={openLogout} onClose={() => setOpenLogout(false)} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <Container>
            <Grid container justifyContent={"center"}>
              <Grid>
                <Typography
                  variant="h3"
                  sx={{
                    cursor: "pointer",
                    alignContent: "center",
                  }}
                >
                  MenuGeniusLOGO
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ paddingBottom: "24px" }} />
    </Fragment>
  );
};

export default HeaderComponent;
