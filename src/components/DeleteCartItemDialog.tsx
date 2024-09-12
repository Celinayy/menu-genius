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
import { CartItem, Product } from "@prisma/client";
import { useSnackbar } from "notistack";

export type DeleteCartItemDialogProps = DialogProps & {
  cartItem: CartItem & {
    product: Product;
  };
};

const DeleteCartItemDialog = ({
  cartItem,
  ...props
}: DeleteCartItemDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isLoading } = trpc.cartItem.delete.useMutation({
    onSuccess: () => {
      props.onClose?.({}, "escapeKeyDown");
      enqueueSnackbar("Sikeresen eltávolítottad a terméket a kosárból!", {
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
      <DialogTitle textAlign={"center"}>
        Termék eltávolítása a kosaradból
      </DialogTitle>
      <Divider
        sx={{
          width: "80%",
          alignSelf: "center",
        }}
      />
      <DialogContent>
        <Stack direction={"column"} spacing={2} justifyContent={"center"}>
          <Typography textAlign={"center"}>
            {cartItem.product.isFood ? "Étel" : "Ital"}
          </Typography>
          <Typography variant="h5" textAlign={"center"}>
            {cartItem.product.name}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              mutate({
                productId: cartItem.id,
              })
            }
          >
            Eltávolítás
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCartItemDialog;
