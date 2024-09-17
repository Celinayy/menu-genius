import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Favorite, Image, Product } from "@prisma/client";
import NextImage from "next/image";
import { useState } from "react";
import DeleteFavoriteProductDialog from "./DeleteFavoriteProductDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";

export type FavoritProductListItemProps = {
  favorit: Favorite & {
    product: Product & {
      image: Image;
    };
  };
};

const FavoritProductListItem = ({ favorit }: FavoritProductListItemProps) => {
  const router = useRouter();
  const [openDeleteFavoritDialog, setOpenDeleteFavoritDialog] = useState(false);

  return (
    <Card
      variant={"outlined"}
      key={`favorite-list-item-${favorit.product.id}`}
      sx={{
        padding: "8px",
      }}
    >
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
          <Stack direction={"row"} spacing={2}>
            <Button
              fullWidth
              onClick={() => router.push(`/products/${favorit.product.id}/`)}
              variant="contained"
            >
              Részletek
            </Button>
            <Button
              color="error"
              size="large"
              variant="outlined"
              onClick={() => setOpenDeleteFavoritDialog(true)}
            >
              <DeleteIcon />
            </Button>
          </Stack>
        </Stack>
        <DeleteFavoriteProductDialog
          favorit={favorit}
          open={openDeleteFavoritDialog}
          onClose={() => setOpenDeleteFavoritDialog(false)}
        />
      </CardContent>
    </Card>
  );
};

export default FavoritProductListItem;
