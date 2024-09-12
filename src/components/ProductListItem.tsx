import { trpc } from "@/trpc/client";
import { StarRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Image, Product } from "@prisma/client";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

export type ProductListItemProps = {
  product: Product & {
    image: Image;
  };
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading } = trpc.favoritProduct.create.useMutation({
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
        <Stack direction={"row"} spacing={1}>
          <IconButton
            onClick={() =>
              mutate({
                productId: product.id,
              })
            }
          >
            <StarRounded />
          </IconButton>
          <Button
            variant="contained"
            onClick={() => router.push(`/products/${product.id}/`)}
          >
            Érdekel
          </Button>
        </Stack>
      </Stack>
    </CardContent>
  );
};

export default ProductListItem;
