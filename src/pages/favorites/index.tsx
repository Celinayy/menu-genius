import HeaderComponent from "@/components/HeaderComponent";
import { trpc } from "@/trpc/client";
import {
  Box,
  Card,
  Grid2 as Grid,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

const FavoritesPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading } = trpc.favoritProduct.list.useQuery({});

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
        <Typography></Typography>
        <Grid size={{ xs: 6, md: 4 }}>
          {data?.favoritProduct.map((favorit) => (
            <Grid size={{ xs: 6, md: 4 }}>
              <Card
                variant={"outlined"}
                key={`favorite-list-item-${favorit.id}`}
                sx={(theme) => ({
                  padding: "8px",
                })}
              >
                <Typography></Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FavoritesPage;
