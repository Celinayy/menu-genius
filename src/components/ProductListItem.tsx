import { StarRounded } from "@mui/icons-material";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import Image from "next/image";

export type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <CardContent>
      <Typography>{product.name}</Typography>
      <Typography>{product.price} EUR</Typography>
      <Typography>{product.isFood ? "Food" : "Drink"}</Typography>
      <IconButton>
        <StarRounded />
      </IconButton>
    </CardContent>
  );
};

export default ProductListItem;
