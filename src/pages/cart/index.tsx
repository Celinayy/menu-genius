import CartListItem from "@/components/CartListItem";
import HeaderComponent from "@/components/HeaderComponent";
import { withAuthentication } from "@/hoc/WithAuthentication";
import { trpc } from "@/trpc/client";
import {
  Grid2 as Grid,
  Box,
  Container,
  Divider,
  Typography,
  Card,
  Stack,
  CardContent,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

const CartPage = () => {
  const router = useRouter();
  const { data, isLoading } = trpc.cartItem.list.useQuery();

  const totalQuantityDish =
    data?.filter((cartItem) => cartItem.product.isFood).length ?? 0;

  const totalQuantityDrink = (data?.length ?? 0) - totalQuantityDish;

  const totalPrice = data?.reduce((prev, cur) => prev + cur.product.price, 0);

  console.log(data?.length);

  if (data?.length === 0) {
    return (
      <Container>
        <HeaderComponent />
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="caption" sx={{ fontSize: "36px" }}>
            Jelenleg nincs semmi a kosaradban
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
        <Button
          fullWidth
          variant="contained"
          onClick={() => router.push("/products")}
        >
          Irány a kínálat!
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderComponent />
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Kosár tartalma
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            {data?.map((cartItem) => (
              <CartListItem cartItem={cartItem} />
            ))}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" textAlign={"center"}>
                Kosár adatai
              </Typography>
              <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
              <Stack direction={"column"} spacing={2}>
                <Typography variant="overline" sx={{ fontSize: "12px" }}>
                  Étel darabszám
                </Typography>
                <Typography>{totalQuantityDish} db</Typography>
                <Typography variant="overline" sx={{ fontSize: "12px" }}>
                  Ital darabszám
                </Typography>
                <Typography>{totalQuantityDrink} db</Typography>
                <Typography variant="overline" sx={{ fontSize: "12px" }}>
                  Fizetendő összeg
                </Typography>
                <Typography>{totalPrice} EUR</Typography>
                <Button disabled={isLoading} variant="contained">
                  Fizetés
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withAuthentication(CartPage);
