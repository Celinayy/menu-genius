import HeaderComponent from "@/components/HeaderComponent";
import IngredientSelect from "@/components/IngredientSelect";
import LoadingPage from "@/components/LoadingPage";
import ProductListItem from "@/components/ProductListItem";
import ProductSearchTextField from "@/components/ProductSearchTextField";
import { trpc } from "@/trpc/client";
import {
  Box,
  Container,
  Divider,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ProductsPage = () => {
  const [ingredientIds, setIngredientIds] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = trpc.product.list.useQuery({
    ingredientIds,
    search: {
      name: searchTerm,
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Container>
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
            <ProductListItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;
