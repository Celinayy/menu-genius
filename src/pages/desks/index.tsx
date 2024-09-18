import DeskCardItem from "@/components/DeskCardItem";
import { trpc } from "@/trpc/client";
import {
  Grid2 as Grid,
  Box,
  Container,
  Divider,
  Typography,
} from "@mui/material";

const DeskListPage = () => {
  const { data, isLoading } = trpc.desk.list.useQuery();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Asztalok
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Grid container spacing={2}>
        {data?.map((desk) => (
          <Grid size={{ xs: 12, md: 6 }}>
            <DeskCardItem desk={desk} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DeskListPage;
