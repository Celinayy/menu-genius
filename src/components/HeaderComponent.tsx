import { trpc } from "@/trpc/client";
import {
  AppBar,
  Toolbar,
  Container,
  Grid2 as Grid,
  Typography,
  Stack,
  Button,
  Avatar,
} from "@mui/material";
import { Fragment } from "react";

const HeaderComponent = () => {
  const { data: user } = trpc.user.find.useQuery();

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
                >
                  MenuGeniusLOGO
                </Typography>
                <Button>
                  <Avatar />
                </Button>
              </Stack>
            </Container>
          </Toolbar>
        </AppBar>
        <Toolbar sx={{ paddingBottom: "24px" }} />
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
