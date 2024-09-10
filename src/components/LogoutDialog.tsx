import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

export type LogoutDialogProps = DialogProps;

const LogoutDialog = ({ ...props }: LogoutDialogProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <Dialog {...props}>
      <DialogTitle textAlign={"center"} variant="h4">
        Biztosan ki szeretnél jelentkezni?
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack direction={"column"} spacing={2}>
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              localStorage.removeItem("accessToken");
              queryClient.clear();
              router.replace("/");
            }}
          >
            Kijelentkezés
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
