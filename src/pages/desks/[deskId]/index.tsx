import { trpc } from "@/trpc/client";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";

const SingleDeskPage = () => {
  const router = useRouter();
  const deskId = router.query.deskId as string;
  const { data: desk } = trpc.desk.find.useQuery({ deskId });

  return (
    <Container>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          {desk?.name} asztal részletei
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
    </Container>
  );
};

export default SingleDeskPage;
