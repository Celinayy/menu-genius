import { StarRounded } from "@mui/icons-material";
import {
  Box,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Image, Product } from "@prisma/client";
import NextImage from "next/image";

export type ProductListItemProps = {
  product: Product & {
    image: Image;
  };
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <CardContent>
      <Box display={"flex"} justifyContent={"center"}>
        <NextImage
          src={product.image.data}
          alt={product.name}
          width={product.image.width}
          height={product.image.height}
        />
      </Box>
      <Divider sx={{ margin: "12px" }} />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"column"}>
          <Typography>{product.name}</Typography>
          <Typography>{product.price} EUR</Typography>
        </Stack>
        <IconButton>
          <StarRounded />
        </IconButton>
      </Stack>
    </CardContent>
  );
};

export default ProductListItem;
