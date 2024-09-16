import { trpc } from "@/trpc/client";
import { StarOutlineRounded, StarRounded } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";
import { Product } from "@prisma/client";
import { useSnackbar } from "notistack";
import { useMemo } from "react";

export type FavoriteIconButtonProps = IconButtonProps & {
  product: Product;
};

export const FavoriteIconButton = ({
  product,
  ...rest
}: FavoriteIconButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { data: favProducts } = trpc.favoritProduct.list.useQuery();
  const { mutate: addFav, isLoading } = trpc.favoritProduct.create.useMutation({
    onSuccess: () => {
      enqueueSnackbar("Sikeres kedvencekhez adás!", {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const { mutate: deleteFav } = trpc.favoritProduct.delete.useMutation({
    onSuccess: () => {
      enqueueSnackbar("Sikeres eltávolítottad a kedvencek közül!", {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const isFavorite = useMemo(
    () =>
      favProducts?.some((favorite) => favorite.productId === product.id) ??
      false,
    [favProducts, product]
  );

  if (isFavorite) {
    return (
      <IconButton
        disabled={isLoading}
        onClick={() =>
          deleteFav({
            productId: product.id,
          })
        }
        {...rest}
      >
        <StarRounded />
      </IconButton>
    );
  } else {
    return (
      <IconButton
        disabled={isLoading}
        onClick={() =>
          addFav({
            productId: product.id,
          })
        }
      >
        <StarOutlineRounded />
      </IconButton>
    );
  }
};
