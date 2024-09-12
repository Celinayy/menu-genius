import HeaderComponent from "@/components/HeaderComponent";
import IngredientSelect from "@/components/IngredientSelect";
import ProductListItem from "@/components/ProductListItem";
import ProductSearchTextField from "@/components/ProductSearchTextField";
import { trpc } from "@/trpc/client";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import color from "color";
import { useState } from "react";

const ProductsPage = () => {
  const [ingredientIds, setIngredientIds] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const { data } = trpc.product.list.useQuery({
    ingredientIds,
    search: {
      name: searchTerm,
    },
  });

  return (
    <Container>
      <HeaderComponent />
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Kínálatunk
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Stack sx={{ marginBottom: "24px" }} direction={"row"} spacing={2}>
        <ProductSearchTextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IngredientSelect
          value={ingredientIds}
          onChange={(e) =>
            setIngredientIds(
              Array.isArray(e.target.value) ? e.target.value : [e.target.value]
            )
          }
        />
      </Stack>
      <Grid container spacing={2}>
        {data?.map((product) => (
          <Grid size={{ xs: 6, md: 4 }}>
            <Card
              variant={"outlined"}
              key={`product-list-item-${product.id}`}
              sx={(theme) => ({
                padding: "8px",
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
