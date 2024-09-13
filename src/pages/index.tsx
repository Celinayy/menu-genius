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
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import NextImage from "next/image";
import { trpc } from "@/trpc/client";

export default function Home() {
  const { data, isLoading } = trpc.product.list.useQuery({});
  const { data: user } = trpc.user.find.useQuery();

  const randomProduct = data
    ? data[Math.floor(Math.random() * data?.length)]
    : undefined;
  const router = useRouter();

  if (user) {
    return (
      <Container>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography
            textAlign={"center"}
            variant="caption"
            sx={{ fontSize: "36px" }}
          >
            MenuGenius
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography textAlign={"center"} variant="h5">
                  Szia {user.name}!
                </Typography>
                <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
                <Stack direction={"column"} spacing={2}>
                  <Button
                    variant="contained"
                    onClick={() => router.push("/products")}
                    disabled={isLoading}
                    color="secondary"
                  >
                    Irány a kínálat
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => router.push("/cart")}
                    disabled={isLoading}
                    color="primary"
                  >
                    Kosarad
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => router.push("/favorites")}
                    disabled={isLoading}
                    color="primary"
                  >
                    Kedvenceid
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => router.push("/reservations/create")}
                    disabled={isLoading}
                    color="primary"
                  >
                    Foglalás létrehozása
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => router.push("/settings")}
                    disabled={isLoading}
                    color="primary"
                  >
                    Beállítások
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {!!randomProduct && (
              <Card>
                <CardContent>
                  <Box display={"flex"} justifyContent={"center"}>
                    <NextImage
                      src={randomProduct.image.data}
                      alt={randomProduct.name}
                      width={randomProduct.image.width}
                      height={randomProduct.image.height}
                    />
                  </Box>
                  <Divider sx={{ margin: "12px" }} />
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"column"}>
                      <Typography>{randomProduct.name}</Typography>
                      <Typography>{randomProduct.price} EUR</Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Button
                        variant="contained"
                        onClick={() =>
                          router.push(`/products/${randomProduct.id}/`)
                        }
                        disabled={isLoading}
                      >
                        Irány a termék
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography
          textAlign={"center"}
          variant="caption"
          sx={{ fontSize: "36px" }}
        >
          MenuGenius
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography textAlign={"center"} variant="h5">
                Szia Vendég!
              </Typography>
              <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
              <Stack direction={"column"} spacing={2}>
                <Typography textAlign={"center"} variant="h6">
                  Nézd meg a kínálatunk
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => router.push("/products")}
                  disabled={isLoading}
                  color="secondary"
                >
                  Irány a kínálat
                </Button>
                <Typography textAlign={"center"} variant="body2">
                  Ha még nincs felhasználód, akkor regisztrálj be, hogy az
                  összes funkcióhoz hozzáférj!
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => router.push("/auth/register")}
                  disabled={isLoading}
                >
                  Regisztráció
                </Button>
                <Button
                  variant="contained"
                  onClick={() => router.push("/auth/login")}
                  disabled={isLoading}
                >
                  Bejelentkezés
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {!!randomProduct && (
            <Card>
              <CardContent>
                <Box display={"flex"} justifyContent={"center"}>
                  <NextImage
                    src={randomProduct.image.data}
                    alt={randomProduct.name}
                    width={randomProduct.image.width}
                    height={randomProduct.image.height}
                  />
                </Box>
                <Divider sx={{ margin: "12px" }} />
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Stack direction={"column"}>
                    <Typography>{randomProduct.name}</Typography>
                    <Typography>{randomProduct.price} EUR</Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={1}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        router.push(`/products/${randomProduct.id}/`)
                      }
                      disabled={isLoading}
                    >
                      Irány a termék
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
