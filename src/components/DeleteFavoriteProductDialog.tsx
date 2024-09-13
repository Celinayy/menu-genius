import { trpc } from "@/trpc/client";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Favorite, Product } from "@prisma/client";
import router from "next/router";
import { useSnackbar } from "notistack";
import HeaderComponent from "./HeaderComponent";

export type DeleteFavoriteProductDialogProps = DialogProps & {
  favorit: Favorite & {
    product: Product;
  };
};

const DeleteFavoriteProductDialog = ({
  favorit,
  ...props
}: DeleteFavoriteProductDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isLoading } = trpc.favoritProduct.delete.useMutation({
    onSuccess: () => {
      enqueueSnackbar(
        "Sikeresen eltávolítottad a terméket a kedvencek közül!",
        {
          variant: "success",
        }
      );
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
        Termék eltávolítása a kedvencek közül
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
            {favorit.product.isFood ? "Étel" : "Ital"}
          </Typography>
          <Typography variant="h5" textAlign={"center"}>
            {favorit.product.name}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              mutate({
                productId: favorit.id,
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

export default DeleteFavoriteProductDialog;
