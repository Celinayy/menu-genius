import FavoritProductListItem from "@/components/FavoritProductListItem";
import HeaderComponent from "@/components/HeaderComponent";
import { withAuthentication } from "@/hoc/WithAuthentication";
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
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Kedvenc termékek
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Grid container spacing={2}>
        {data?.map((favorit) => (
          <Grid size={{ xs: 12, md: 4 }}>
            <FavoritProductListItem favorit={favorit} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default withAuthentication(FavoritesPage);
