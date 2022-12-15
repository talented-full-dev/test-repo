import * as React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, TextField, Button } from "@mui/material";

import DetailInfo from "./DetailInfo";
export default function Transfer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
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
      <div
        style={{
          width: "90%",
          background: "#c7c4c4",
          borderRadius: "10px",
          padding: "5px 18px",
          marginTop: "20px",
        }}
      >
        <DetailInfo />
      </div>
      <Button
        variant="outlined"
        color="secondary"
        style={{ marginTop: "20px" }}
        disabled
      >
        Transfer
      </Button>
    </Box>
  );
}
