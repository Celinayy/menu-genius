import { OpenInNewRounded } from "@mui/icons-material";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Desk } from "@prisma/client";

export type DeskCardItemProps = {
  desk: Desk;
};

const DeskCardItem = ({ desk }: DeskCardItemProps) => {
  return (
    <Card>
      <CardContent>
        <Stack direction={"column"} spacing={2}>
          <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            <Typography variant="h6">{desk.name}</Typography>
            <IconButton>
              <OpenInNewRounded color="primary" />
            </IconButton>
          </Stack>
          <Typography>Helyek száma: {desk.capacity}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DeskCardItem;
