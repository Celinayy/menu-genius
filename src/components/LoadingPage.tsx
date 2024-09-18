import {
  Container,
  Box,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";

const LoadingPage = () => {
  return (
    <Container data-testid="group-list-loader">
      <Box>
        <Stack direction={"column"} spacing={2} sx={{ alignItems: "center" }}>
          <Typography>Az oldal töltődik</Typography>
          <CircularProgress />
        </Stack>
      </Box>
    </Container>
  );
};

export default LoadingPage;
