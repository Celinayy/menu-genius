import { trpc } from "@/trpc/client";
import {
  CalendarMonthOutlined,
  CalendarMonthRounded,
  LogoutOutlined,
  MenuOutlined,
  ProductionQuantityLimitsRounded,
  RestaurantOutlined,
  SettingsRounded,
  ShoppingCart,
  StarOutline,
  StarRounded,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Container,
  Grid2 as Grid,
  Typography,
  Stack,
  Button,
  MenuItem,
  Menu,
  FormControlLabel,
  Switch,
  Avatar,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Fragment } from "react";
import LogoutDialog from "./LogoutDialog";
import { useSnackbar } from "notistack";

const HeaderComponent = () => {
  const { data: user } = trpc.user.find.useQuery();

  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isLoading } = trpc.user.update.useMutation({
    onSuccess: () => {
      enqueueSnackbar("Sikeres mód váltás!", {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

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
                  <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{ margin: "16px" }}
                    justifyContent={"center"}
                  >
                    <Avatar sizes="small" />
                    <Typography alignSelf={"center"}>
                      Szia {user.name}!
                    </Typography>
                  </Stack>

                  <MenuItem>
                    <FormControlLabel
                      sx={{ alignItems: "center" }}
                      control={
                        <Switch
                          disabled={isLoading}
                          checked={user.darkMode}
                          onClick={() => {
                            mutate({
                              darkMode: !user.darkMode,
                            });
                          }}
                        />
                      }
                      label="Sötét mód"
                    />
                  </MenuItem>
                  <MenuItem
                    sx={{ justifyContent: "space-between" }}
                    onClick={() => router.push("/products")}
                  >
                    <Typography>Kínálat</Typography>
                    <RestaurantOutlined />
                  </MenuItem>
                  <MenuItem
                    sx={{ justifyContent: "space-between" }}
                    onClick={() => router.push("/cart")}
                  >
                    <Typography>Kosár</Typography>
                    <ShoppingCart />
                  </MenuItem>
                  <MenuItem
                    sx={{ justifyContent: "space-between" }}
                    onClick={() => router.push("/reservations")}
                  >
                    <Typography>Foglalások</Typography>
                    <CalendarMonthRounded />
                  </MenuItem>
                  <MenuItem
                    sx={{ justifyContent: "space-between" }}
                    onClick={() => router.push("/favorites")}
                  >
                    <Typography>Kedvenek</Typography>
                    <StarRounded />
                  </MenuItem>
                  <MenuItem
                    sx={{ justifyContent: "space-between" }}
                    onClick={() => router.push("/settings")}
                  >
                    <Typography>Beállítások</Typography>
                    <SettingsRounded />
                  </MenuItem>
                  <MenuItem
                    data-testid="open-logout-dialog"
                    onClick={() => setOpenLogout(true)}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography>Kijelentkezés</Typography>
                    <LogoutOutlined />
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
                  onClick={() => router.push("/")}
                >
                  MenuGeniusLOGO
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar
        sx={{
          paddingBottom: "24px",
        }}
      />
    </Fragment>
  );
};

export default HeaderComponent;
