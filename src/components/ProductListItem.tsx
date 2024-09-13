import { trpc } from "@/trpc/client";
import { StarRounded } from "@mui/icons-material";
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

  const { data: user } = trpc.user.find.useQuery();

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

  if (user) {
    return (
      <Card
        variant={"outlined"}
        key={`product-list-item-${product.id}`}
        sx={(theme) => ({
          padding: "8px",
        })}
      >
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
      </Card>
    );
  }

  return (
    <Card
      variant={"outlined"}
      key={`product-list-item-${product.id}`}
      sx={(theme) => ({
        padding: "8px",
      })}
    >
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
            <Button
              variant="contained"
              onClick={() => router.push(`/products/${product.id}/`)}
            >
              Érdekel
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductListItem;
