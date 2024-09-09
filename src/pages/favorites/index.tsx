import HeaderComponent from "@/components/HeaderComponent";
import { Card, CardContent, Container, Typography } from "@mui/material";

const FavoritesPage = () => {
  return (
    <Container>
      <HeaderComponent />
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
