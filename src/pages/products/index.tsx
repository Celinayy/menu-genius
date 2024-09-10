import HeaderComponent from "@/components/HeaderComponent";
import ProductListItem from "@/components/ProductListItem";
import { trpc } from "@/trpc/client";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import color from "color";

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

      <Grid container spacing={2}>
        {data?.map((product) => (
          <Grid size={{ xs: 6, md: 4 }}>
            <Card
              variant={"outlined"}
              key={`product-list-item-${product.id}`}
              sx={(theme) => ({
                padding: "8px",
                backgroundColor: color(theme.palette.background.paper)
                  .alpha(0.7)
                  .toString(),
              })}
            >
              <ProductListItem product={product} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;
