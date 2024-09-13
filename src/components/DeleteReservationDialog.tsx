import { trpc } from "@/trpc/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Reservation } from "@prisma/client";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Moment from "moment";

export type DeleteReservationDialogProps = DialogProps & {
  reservation: Reservation;
};

const DeleteReservationDialog = ({
  reservation,
  ...props
}: DeleteReservationDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { mutate, isLoading } = trpc.reservation.delete.useMutation({
    onSuccess: () => {
      enqueueSnackbar("Sikeresen törölted a foglalásod!", {
        variant: "success",
      });
      router.push("/reservations");
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  return (
    <Dialog {...props}>
      <DialogTitle textAlign={"center"}>Foglalás törlése</DialogTitle>
      <Divider
        sx={{
          width: "80%",
          alignSelf: "center",
        }}
      />
      <DialogContent>
        <Stack direction={"column"} spacing={2} justifyContent={"center"}>
          <Typography textAlign={"center"} variant="h6">
            Biztosan törlöd az alábbi dátumon levő foglalásod?
          </Typography>
          <Typography textAlign={"center"}>
            {Moment(reservation.checkInDate).format("YYYY-MM-DD")}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              mutate({
                reservationId: reservation.id,
              })
            }
          >
            Törlés
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteReservationDialog;
