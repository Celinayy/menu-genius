import ProductListItem from "@/components/ProductListItem";
import { trpc } from "@/trpc/client";
import { Card, Container, Stack } from "@mui/material";

const ProductsPage = () => {
  const { data } = trpc.product.list.useQuery({});

  return (
    <Container>
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
