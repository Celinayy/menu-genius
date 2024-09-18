import HeaderComponent from "@/components/HeaderComponent";
import { trpc } from "@/trpc/client";
import {
  Box,
  Container,
  Divider,
  Typography,
  Grid2 as Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import NextImage from "next/image";
import { useSnackbar } from "notistack";
import { FavoriteIconButton } from "@/components/FavoriteIconButton";
import LoadingPage from "@/components/LoadingPage";

const SingleProductPage = () => {
  const router = useRouter();
  const productId = router.query.productId as string;
  const { data: product, isLoading } = trpc.product.find.useQuery({
    productId,
  });
  const { data: user } = trpc.user.find.useQuery();

  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = trpc.cartItem.create.useMutation({
    onSuccess: () => {
      enqueueSnackbar("Sikeresen hozzáadtad a kosárhoz!", {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!product) {
    return (
      <Container data-testid="group-list-loader">
        <Box>
          <Stack direction={"column"} spacing={2} sx={{ alignItems: "center" }}>
            <Typography>Az oldal töltődik</Typography>
            <CircularProgress />
          </Stack>
        </Box>
      </Container>
    );
  }

  if (user) {
    return (
      <Container>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="caption" sx={{ fontSize: "36px" }}>
            {product.name}
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                padding: "8px",
              }}
            >
              <Box display={"flex"} justifyContent={"center"}>
                <Typography variant="caption" sx={{ fontSize: "24px" }}>
                  {product.name}
                </Typography>
              </Box>
              <Divider sx={{ marginBottom: "12px", marginTop: "12px" }} />

              <CardContent sx={{ textAlign: "center" }}>
                <NextImage
                  src={product.image.data as string}
                  alt={product.image.name as string}
                  width={product.image.width}
                  height={product.image.height}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={(theme) => ({
                padding: "8px",
              })}
            >
              <Box display={"flex"} justifyContent={"center"}>
                <Typography variant="caption" sx={{ fontSize: "24px" }}>
                  {product.isFood ? "Étel" : "Ital"} részletei
                </Typography>
              </Box>
              <Divider sx={{ marginBottom: "12px", marginTop: "12px" }} />
              <CardContent>
                <Stack spacing={2} direction={"column"}>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant="overline">Allergének</Typography>
                    <Stack direction={"row"}>
                      <FavoriteIconButton product={product} />
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} spacing={1}>
                    {product.allergens.map((allergen) => (
                      <Stack direction={"row"}>
                        <Chip
                          label={allergen.name}
                          onClick={() =>
                            window.open(
                              `https://en.wikipedia.org/wiki/${allergen.name}`,
                              "_blank"
                            )
                          }
                        />
                      </Stack>
                    ))}
                  </Stack>
                  <Typography variant="overline">Összetevők</Typography>
                  <Stack direction={"row"} spacing={1}>
                    {product.ingredients.map((ingredient) => (
                      <Stack direction={"row"} justifyContent={"space-between"}>
                        <Chip
                          label={ingredient.name}
                          onClick={() =>
                            window.open(
                              `https://en.wikipedia.org/wiki/${ingredient.name}`,
                              "_blank"
                            )
                          }
                        />
                      </Stack>
                    ))}
                  </Stack>
                  <Typography>{product.description}</Typography>
                  <Stack direction={"row"} spacing={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      color="secondary"
                      disabled={isLoading}
                    >
                      Vásárlás
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={isLoading}
                      onClick={() =>
                        mutate({
                          productId: product.id,
                        })
                      }
                    >
                      Kosárba
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderComponent />
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          {product.name}
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={(theme) => ({
              padding: "8px",
            })}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="caption" sx={{ fontSize: "24px" }}>
                {product.name}
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: "12px", marginTop: "12px" }} />

            <CardContent sx={{ textAlign: "center" }}>
              <NextImage
                src={product.image.data as string}
                alt={product.image.name as string}
                width={product.image.width}
                height={product.image.height}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={(theme) => ({
              padding: "8px",
            })}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="caption" sx={{ fontSize: "24px" }}>
                Részletek
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: "12px", marginTop: "12px" }} />
            <CardContent>
              <Stack spacing={2} direction={"column"}>
                <Typography variant="overline">Allergének</Typography>
                <Stack direction={"row"} spacing={1}>
                  {product.allergens.map((allergen) => (
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Chip
                        label={allergen.name}
                        onClick={() =>
                          window.open(
                            `https://en.wikipedia.org/wiki/${allergen.name}`,
                            "_blank"
                          )
                        }
                      />
                    </Stack>
                  ))}
                </Stack>
                <Typography variant="overline">Összetevők</Typography>
                <Stack direction={"row"} spacing={1}>
                  {product.ingredients.map((ingredient) => (
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Chip
                        label={ingredient.name}
                        onClick={() =>
                          window.open(
                            `https://en.wikipedia.org/wiki/${ingredient.name}`,
                            "_blank"
                          )
                        }
                      />
                    </Stack>
                  ))}
                </Stack>
                <Typography>{product.description}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleProductPage;
