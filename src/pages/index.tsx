import HeaderComponent from "@/components/HeaderComponent";
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Container>
      <HeaderComponent />
      <Typography variant="h4" textAlign={"center"}>
        MenuGenius
      </Typography>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography>Szia ... !</Typography>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium quaerat expedita voluptas eos velit aliquam commodi
                labore natus quas vitae sed repellat cupi
              </Typography>
              <Stack direction={"column"} spacing={2}>
                <Button variant="contained">Regisztráció</Button>
                <Button
                  variant="contained"
                  onClick={() => router.push("/auth/login")}
                >
                  Bejelentkezés
                </Button>
                <Button
                  variant="contained"
                  onClick={() => router.push("/products")}
                >
                  Irány a kínálat
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Blanditiis doloremque quasi magni quisquam fugiat ex. Eveniet,
                sunt perspiciatis. Earum eum pariatur doloremque nemo at vero
                quasi totam repudiandae vel sunt.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
