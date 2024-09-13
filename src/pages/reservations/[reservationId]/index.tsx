import HeaderComponent from "@/components/HeaderComponent";
import { trpc } from "@/trpc/client";
import {
  Box,
  Button,
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
import DeleteReservationDialog from "@/components/DeleteReservationDialog";
import { useState } from "react";
import { withAuthentication } from "@/hoc/WithAuthentication";

const SingleReservationPage = () => {
  const router = useRouter();
  const reservationId = router.query.reservationId as string;
  const { data: reservation, isLoading } = trpc.reservation.find.useQuery({
    reservationId,
  });

  const [openDeleteReservationDialog, setOpenDeleteReservationDialog] =
    useState(false);

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
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                disabled={isLoading}
                onClick={() => setOpenDeleteReservationDialog(true)}
              >
                Foglalás törlése
              </Button>
            </Stack>
            <DeleteReservationDialog
              reservation={reservation}
              open={openDeleteReservationDialog}
              onClose={() => setOpenDeleteReservationDialog(false)}
            />
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default withAuthentication(SingleReservationPage);
