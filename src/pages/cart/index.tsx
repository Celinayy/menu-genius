import HeaderComponent from "@/components/HeaderComponent";
import { Box, Container, Divider, Typography } from "@mui/material";

const CartPage = () => {
  return (
    <Container>
      <HeaderComponent />
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Kosár tartalma
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro amet
        quaerat doloribus atque aut necessitatibus illum qui animi soluta quod
        obcaecati facilis eaque itaque, quia cum rem. Odit, id ab.
      </Typography>
    </Container>
  );
};

export default CartPage;
