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
import { useSnackbar } from "notistack";

export type DeleteCartDialogProps = DialogProps;

const DeleteCartDialog = ({ ...props }: DeleteCartDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isLoading } = trpc.cart.delete.useMutation({
    onSuccess: () => {
      enqueueSnackbar("Sikeresen törölted a kosarad!", {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  return (
    <Dialog {...props}>
      <DialogTitle textAlign={"center"}>Kosár törlése</DialogTitle>
      <Divider
        sx={{
          width: "80%",
          alignSelf: "center",
        }}
      />
      <DialogContent>
        <Stack direction={"column"} spacing={2}>
          <Typography variant="h6">
            Biztosan törölni szeretnéd a kosarad tartalmát?
          </Typography>
          <Button
            disabled={isLoading}
            variant="contained"
            color="error"
            onClick={() => mutate({})}
          >
            Kosár törlése
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCartDialog;
