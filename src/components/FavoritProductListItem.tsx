import { trpc } from "@/trpc/client";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Favorite, Image, Product } from "@prisma/client";
import NextImage from "next/image";
import { useState } from "react";
import DeleteFavoriteProductDialog from "./DeleteFavoriteProductDialog";

export type FavoritProductListItemProps = {
  favorit: Favorite & {
    product: Product & {
      image: Image;
    };
  };
};

const FavoritProductListItem = ({ favorit }: FavoritProductListItemProps) => {
  const [openDeleteFavoritDialog, setOpenDeleteFavoritDialog] = useState(false);

  return (
    <CardContent>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h5">{favorit.product.name}</Typography>
        <Typography variant="overline" sx={{ fontSize: "18px" }}>
          {favorit.product.price} EUR
        </Typography>
      </Stack>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Stack direction={"column"} spacing={2}>
        <Box display={"flex"} justifyContent={"center"}>
          <NextImage
            src={favorit.product.image.data}
            alt={favorit.product.name}
            width={favorit.product.image.width}
            height={favorit.product.image.height}
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenDeleteFavoritDialog(true)}
          >
            Eltávolítás
          </Button>
        </Box>
      </Stack>
      <DeleteFavoriteProductDialog
        favorit={favorit}
        open={openDeleteFavoritDialog}
        onClose={() => setOpenDeleteFavoritDialog(false)}
      />
    </CardContent>
  );
};

export default FavoritProductListItem;
