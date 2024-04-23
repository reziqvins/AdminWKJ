import { Box, Grid, Paper, Typography } from "@mui/material";
import Users from "../Components/Chat/Users";
import Chat from "../Components/Chat/Chat";
import TopBar from "../Components/TopBar";

const ChatPage = () => {
  return (
    <div className="p-4">
      <TopBar title={"Chat"} />
      <Box sx={{}}>
        <Paper
          sx={{
            boxShadow: "none !important",
            borderRadius: "12px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
            p: "20px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <Users />
            </Grid>

            <Grid item xs={12} sm={6} lg={8}>
              <Chat />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default ChatPage;
