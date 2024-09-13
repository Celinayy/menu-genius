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
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import NextImage from "next/image";
import { Image, Product } from "@prisma/client";
import { trpc } from "@/trpc/client";
import { StarRounded } from "@mui/icons-material";

export default function Home() {
  const { data, isLoading } = trpc.product.list.useQuery({});

  const randomProduct = data
    ? data[Math.floor(Math.random() * data?.length)]
    : undefined;
  const router = useRouter();

  const { data: product } = trpc.product.find.useQuery({});

  return (
    <Container>
      <HeaderComponent />
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
              <Typography>Szia ... !</Typography>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium quaerat expedita voluptas eos velit aliquam commodi
                labore natus quas vitae sed repellat cupi
              </Typography>
              <Stack direction={"column"} spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => router.push("/auth/register")}
                >
                  Regisztráció
                </Button>
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
