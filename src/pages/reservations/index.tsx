import HeaderComponent from "@/components/HeaderComponent";
import ReservationListCard from "@/components/ReservationListCard";
import { withAuthentication } from "@/hoc/WithAuthentication";
import { userRouter } from "@/server/user/user.router";
import { trpc } from "@/trpc/client";
import {
  Grid2 as Grid,
  Container,
  Box,
  Typography,
  Divider,
  Card,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { Fragment } from "react";

const ReservationsPage = () => {
  const { data } = trpc.reservation.list.useQuery();

  const router = useRouter();

  if (data?.length === 0) {
    router.push("/reservations/create");
    return <Fragment></Fragment>;
  }

  return (
    <Container>
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

export default withAuthentication(ReservationsPage);
