import { OpenInNewRounded } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Desk } from "@prisma/client";
import { useRouter } from "next/router";

export type DeskCardItemProps = {
  desk: Desk;
};

const DeskCardItem = ({ desk }: DeskCardItemProps) => {
  const router = useRouter();

  return (
    <Card>
      <CardContent>
        <Stack direction={"column"} spacing={2}>
          <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            <Typography variant="h6">{desk.name}</Typography>
            <IconButton onClick={() => router.push(`/desks/${desk.id}`)}>
              <OpenInNewRounded color="primary" />
            </IconButton>
          </Stack>
          <Divider />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography>Helyek száma: {desk.capacity}</Typography>
            <Rating max={10} size="medium" value={desk?.rating} readOnly />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DeskCardItem;
