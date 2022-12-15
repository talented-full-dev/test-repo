import * as React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, TextField, Button } from "@mui/material";

export default function Withdraw() {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <TextField
        style={{ width: "100%" }}
        label="Token Amount"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          endAdornment: <InputAdornment position="start">ETH</InputAdornment>,
        }}
        helperText="Wallet balance: 0 MAX"
      />
      <TextField
        style={{ width: "100%" }}
        label="Recipient address"
        id="outlined-start-adornment"
        placeholder="Place recipient address here"
        sx={{ m: 1, width: "25ch" }}
      />
      <Button
        variant="outlined"
        color="secondary"
        style={{ marginTop: "20px" }}
        disabled
      >
        Withdraw
      </Button>
    </Box>
  );
}
