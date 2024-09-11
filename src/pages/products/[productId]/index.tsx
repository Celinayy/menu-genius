import HeaderComponent from "@/components/HeaderComponent";
import { trpc } from "@/trpc/client";
import {
  Box,
  Container,
  Divider,
  Typography,
  Grid2 as Grid,
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import NextImage from "next/image";

const SingleProductPage = () => {
  const router = useRouter();
  const productId = router.query.productId as string;
  const { data: product } = trpc.product.find.useQuery({ productId });

  return (
    <Container>
      <HeaderComponent />
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          {product?.name}
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={(theme) => ({
              padding: "8px",
            })}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="caption" sx={{ fontSize: "24px" }}>
                {product?.name}
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: "12px", marginTop: "12px" }} />

            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={(theme) => ({
              padding: "8px",
            })}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="caption" sx={{ fontSize: "24px" }}>
                Leírás
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: "12px", marginTop: "12px" }} />
            <CardContent>
              <Stack spacing={2} direction={"column"}>
                <Stack direction={"column"} spacing={2}>
                  <Typography>Allergének</Typography>
                  <Typography></Typography>
                </Stack>
                <Typography>{product?.description}</Typography>
                <Stack direction={"row"} spacing={2}>
                  <Button variant="contained" fullWidth color="secondary">
                    Vásárlás
                  </Button>
                  <Button variant="contained" fullWidth>
                    Kosárba
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleProductPage;
