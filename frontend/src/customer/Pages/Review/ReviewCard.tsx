import { Delete } from "@mui/icons-material";
import { Avatar, Box, IconButton, Rating } from "@mui/material";
import { red } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import React from "react";

const ReviewCard = () => {
  return (
    <div className="flex justify-between ">
      <Grid container spacing={9}>
        <Grid size={{ xs: 1 }}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
            >
              Z
            </Avatar>
          </Box>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">Zosh</p>
              <p className="opacity-70">2025-05-05</p>
            </div>
          </div>
          <Rating readOnly value={4} precision={1}></Rating>
          <p>Value for money product, great product</p>
          <div className="mt-2">
            <img
              src="https://picsum.photos/200/300"
              alt=""
              className="w-24 h-24 object-cover"
            />
          </div>
        </Grid>
      </Grid>
      <div>
        <IconButton>
          <Delete sx={{ color: red[700] }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ReviewCard;
