import { EditOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Reservation } from "@prisma/client";
import { useRouter } from "next/router";
import Moment from "moment";
import { useMemo } from "react";
import moment from "moment";
import color from "color";

export type ReservationListCardProps = {
  reservation: Reservation;
};

const ReservationListCard = ({ reservation }: ReservationListCardProps) => {
  const router = useRouter();

  const status = useMemo(() => {
    if (moment(reservation.checkInDate).isSame(moment(), "date")) {
      return "TODAY";
    } else if (moment(reservation.checkInDate).isBefore(moment(), "date")) {
      return "EXPIRED";
    } else {
      return "UPCOMING";
    }
  }, [reservation.checkInDate]);

  return (
    <Card>
      <CardContent
        sx={(theme) => ({
          backgroundColor: color(
            status === "TODAY"
              ? theme.palette.warning.main
              : status === "EXPIRED"
              ? theme.palette.error.main
              : theme.palette.success.main
          )
            .alpha(0.4)
            .toString(),
        })}
      >
        <Stack direction={"column"} spacing={2}>
          <Stack
            direction={"row"}
            spacing={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="h5" textAlign={"center"}>
              {reservation.name} foglalása
            </Typography>
            <IconButton
              onClick={() => router.push(`/reservations/${reservation.id}`)}
            >
              <EditOutlined color="primary" />
            </IconButton>
          </Stack>
          <Divider
            sx={{
              marginBottom: "36px",
              marginTop: "12px",
              width: "80%",
              alignSelf: "center",
            }}
          />
          <Typography textAlign={"center"} variant="h4">
            {reservation.numberOfGuests} fő
          </Typography>
          <Stack direction={"column"} spacing={1}>
            <Typography textAlign={"center"}>Megjegyzés</Typography>
            <Typography textAlign={"center"}>{reservation.comment}</Typography>
          </Stack>
          <Divider
            sx={{
              width: "50%",
              alignSelf: "center",
            }}
          />
          <Box display={"flex"} justifyContent={"center"}>
            <Typography>
              Időpont: {Moment(reservation.checkInDate).format("YYYY-MM-DD")}
            </Typography>
            {!!reservation.checkOutDate && (
              <Typography>
                {reservation.checkOutDate?.toLocaleString()}
              </Typography>
            )}
          </Box>
          <Typography
            variant="overline"
            sx={{ fontSize: "18px", textAlign: "center" }}
          >
            Elérhetőség: {reservation.phone}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReservationListCard;
