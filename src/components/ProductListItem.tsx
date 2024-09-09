import { Card, CardContent, Typography } from "@mui/material";
import { Product } from "@prisma/client";

export type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <Card>
      <CardContent>
        <Typography>{product.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductListItem;
