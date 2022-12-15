import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Typography } from "@mui/material";

export default function DetailInfo() {
  return (
    <Box sx={{ width: "100%" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography style={{ fontWeight: "bold" }}>
                Transfer Method
              </Typography>
              <ListItemText style={{ textAlign: "end" }} primary="Relayer" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography>Relayer fee</Typography>
              <ListItemText style={{ textAlign: "end" }} primary="-" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography style={{ fontWeight: "bold" }}>Total</Typography>
              <ListItemText style={{ textAlign: "end" }} primary="-" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
    </Box>
  );
}
