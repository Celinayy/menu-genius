import HeaderComponent from "@/components/HeaderComponent";
import ReservationListCard from "@/components/ReservationListCard";
import { trpc } from "@/trpc/client";
import {
  Grid2 as Grid,
  Container,
  Box,
  Typography,
  Divider,
  Card,
} from "@mui/material";

const ReservationsPage = () => {
  const { data, isLoading } = trpc.reservation.list.useQuery();

  return (
    <Container>
      <HeaderComponent />
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Foglalások
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Grid container spacing={2}>
        {data?.map((reservation) => (
          <Grid size={{ xs: 12 }}>
            <ReservationListCard reservation={reservation} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReservationsPage;
