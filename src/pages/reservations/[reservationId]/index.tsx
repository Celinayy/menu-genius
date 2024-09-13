import HeaderComponent from "@/components/HeaderComponent";
import { trpc } from "@/trpc/client";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Moment from "moment";

const SingleReservationPage = () => {
  const router = useRouter();
  const reservationId = router.query.reservationId as string;
  const { data: reservation } = trpc.reservation.find.useQuery({
    reservationId,
  });

  if (!reservation) {
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

  return (
    <Container>
      <HeaderComponent />
      <Stack direction={"column"}>
        <Typography
          textAlign={"center"}
          variant="caption"
          sx={{ fontSize: "36px" }}
        >
          Foglalás dátuma
        </Typography>
        <Typography
          textAlign={"center"}
          variant="caption"
          sx={{ fontSize: "36px" }}
        >
          {Moment(reservation.checkInDate).format("YYYY-MM-DD")}
        </Typography>
      </Stack>
      <Divider sx={{ marginBottom: "12px", marginTop: "12px" }} />
      <Stack>
        <Card>
          <CardContent>
            <Typography textAlign={"center"} variant="h4">
              {reservation.numberOfGuests} fő részére
            </Typography>
            <Stack direction={"column"} spacing={1}>
              <Typography textAlign={"center"}>Megjegyzés</Typography>
              <Typography textAlign={"center"}>
                {reservation.comment}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default SingleReservationPage;
