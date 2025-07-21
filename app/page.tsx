'use client'

import React from "react";
import ChecklistCard from '../components/checklist-card'
import { Grid } from "@mui/material";

export default function Home() {
    const array = [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}, {id: '5'}, {id: '6'}]

    return (
      <Grid container spacing={2} sx={{m: 2}}>
          {array.map(checkList => (
              <Grid key={checkList.id} size={{xl: 3, lg: 3, md: 4, sm: 6, xs: 12}}>
                <ChecklistCard />
              </Grid>))}
      </Grid>
  );
}