import { NumberField } from "@/components/NumberField";
import { CreateReservationPayloadSchema } from "@/server/reservation/reservation.schema";
import { trpc } from "@/trpc/client";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  Grid2 as Grid,
  Button,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { Moment } from "moment";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";

const CreateReservationPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { mutate, isLoading } = trpc.reservation.create.useMutation({
    onSuccess: () => {
      enqueueSnackbar("Sikeresen létrehoztad a foglalást!", {
        variant: "success",
      });
      router.push("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [date, setDate] = useState<Moment | null>(null);
  const [comment, setComment] = useState("");

  const { success, data } = CreateReservationPayloadSchema.safeParse({
    name: name,
    phone: phone,
    numberOfGuests: numberOfGuests,
    comment: comment,
    checkInDate: date?.toDate(),
  });

  return (
    <Container>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="caption" sx={{ fontSize: "36px" }}>
          Foglalás létrehozása
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: "36px", marginTop: "12px" }} />
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack direction={"column"} spacing={2}>
                <TextField
                  label="Név"
                  disabled={isLoading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Telefonszám"
                  disabled={isLoading}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <NumberField
                  label="Vendégek száma"
                  disabled={isLoading}
                  value={numberOfGuests}
                  onChange={(_, value) => setNumberOfGuests(value)}
                />
                <DateField
                  label="Dátum"
                  disabled={isLoading}
                  value={date}
                  onChange={(value) => setDate(value)}
                />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack direction={"column"} spacing={2}>
                <TextField
                  multiline
                  label="Megjegyzés"
                  minRows={6}
                  disabled={isLoading}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  disabled={isLoading || !success}
                  onClick={() => mutate(data!)}
                >
                  Foglalás létrehozása
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateReservationPage;
