import HeaderComponent from "@/components/HeaderComponent";
import { Container, Box, Typography, Divider } from "@mui/material";

const ReservationsPage = () => {
  return (
    <Container>
      <HeaderComponent />
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Foglalások
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
    </Container>
  );
};

export default ReservationsPage;
