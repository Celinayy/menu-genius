import HeaderComponent from "@/components/HeaderComponent";
import ProductListItem from "@/components/ProductListItem";
import { trpc } from "@/trpc/client";
import {
  Box,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const ProductsPage = () => {
  const { data } = trpc.product.list.useQuery({});

  return (
    <Container>
      <HeaderComponent />
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Termékek
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />

      <Stack spacing={2}>
        {data?.map((product) => (
          <Card
            variant={"outlined"}
            key={`product-list-item-${product.id}`}
            sx={{ padding: "8px" }}
          >
            <ProductListItem product={product} />
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default ProductsPage;
