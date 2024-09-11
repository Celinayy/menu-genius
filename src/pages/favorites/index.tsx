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
import { useRouter } from "next/router";

const FavoritesPage = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const { data: user } = trpc.user.find.useQuery();

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
        {/* <Grid size={{ xs: 6, md: 4 }}>
          {user?..map(() => (
            <Grid size={{ xs: 6, md: 4 }}>
              <Card
                variant={"outlined"}
                key={`favorite-list-item-${product.id}`}
                sx={(theme) => ({
                  padding: "8px",
                })}
              >
                <Typography></Typography>
              </Card>
            </Grid>
          ))}
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default FavoritesPage;
