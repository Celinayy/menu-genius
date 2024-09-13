import FavoritProductListItem from "@/components/FavoritProductListItem";
import HeaderComponent from "@/components/HeaderComponent";
import { trpc } from "@/trpc/client";
import {
  Box,
  Card,
  Grid2 as Grid,
  Container,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

const FavoritesPage = () => {
  const { data } = trpc.favoritProduct.list.useQuery();

  const router = useRouter();

  if (data?.length === 0) {
    return (
      <Container>
        <HeaderComponent />
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="caption" sx={{ fontSize: "36px" }}>
            Jelenleg nincs kedvenc terméked
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
          Kedvenc termékek
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Grid container spacing={2}>
        {data?.map((favorit) => (
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              variant={"outlined"}
              key={`favorite-list-item-${favorit.id}`}
              sx={(theme) => ({
                padding: "8px",
              })}
            >
              <FavoritProductListItem favorit={favorit} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoritesPage;
