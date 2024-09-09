import HeaderComponent from "@/components/HeaderComponent";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";

const FavoritesPage = () => {
  return (
    <Container>
      <HeaderComponent />
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Kedvenc termékek
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Card>
        <CardContent>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            officiis ratione hic laudantium sed libero, dolorem nostrum,
            deserunt iusto quaerat voluptate soluta deleniti doloribus quam
            praesentium in dolor natus quibusdam.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FavoritesPage;
