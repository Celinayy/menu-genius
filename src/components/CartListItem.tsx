import {
  Box,
  Button,
  CardContent,
  CardProps,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { CartItem, Product } from "@prisma/client";
import { Image } from "@prisma/client";
import NextImage from "next/image";

export type CartListItemProps = CardProps & {
  cartItem: CartItem & {
    product: Product & {
      image: Image;
    };
  };
};

const CartListItem = ({ cartItem }: CartListItemProps) => (
  <CardContent>
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Typography variant="h5" sx={{}}>
        {cartItem.product.name}
      </Typography>
      <Typography variant="overline" sx={{ fontSize: "18px" }}>
        {cartItem.product.price} EUR
      </Typography>
    </Stack>
    <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
    <Stack direction={"column"} spacing={2}>
      <Box display={"flex"} justifyContent={"center"}>
        <NextImage
          src={cartItem.product.image.data}
          alt={cartItem.product.name}
          width={cartItem.product.image.width}
          height={cartItem.product.image.height}
        />
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Button variant="contained" color="error">
          Eltávolítás
        </Button>
      </Box>
    </Stack>
  </CardContent>
);

export default CartListItem;
