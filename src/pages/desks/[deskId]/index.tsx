import { trpc } from "@/trpc/client";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  Grid2 as Grid,
  Stack,
  Rating,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import NextImage from "next/image";
import { DeskTwoTone } from "@mui/icons-material";
import LoadingPage from "@/components/LoadingPage";

const SingleDeskPage = () => {
  const router = useRouter();
  const deskId = router.query.deskId as string;
  const { data: desk, isLoading } = trpc.desk.find.useQuery({ deskId });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!desk) {
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
  }

  return (
    <Container>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          {desk.name} asztal részletei
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Grid container spacing={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box display={"flex"} justifyContent={"center"}>
                <Stack spacing={2}>
                  <NextImage
                    src={desk.image.data as string}
                    alt={desk.image.name as string}
                    width={desk.image.width}
                    height={desk.image.height}
                  />
                  <Typography textAlign={"center"} variant="h5">
                    {desk.capacity} férőhelyes
                  </Typography>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" textAlign={"center"}>
                Jellemzői
              </Typography>
              <Divider sx={{ marginBottom: "8px", marginTop: "8px" }} />
              <Typography>{desk.description}</Typography>
              <Divider sx={{ marginBottom: "8px", marginTop: "8px" }} />
              <Box display={"flex"} justifyContent={"center"}>
                <Stack>
                  <Typography component="legend" textAlign={"center"}>
                    Értékelés
                  </Typography>
                  <Rating
                    max={10}
                    size="medium"
                    value={desk.rating ?? 0}
                    readOnly
                  />
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleDeskPage;
