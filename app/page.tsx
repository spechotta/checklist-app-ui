'use client'

import React, {useEffect, useState} from "react";
import ChecklistCard from '../components/checklist-card'
import {Grid} from "@mui/material";
import axios from "axios";
import {Checklist} from "@/types/checklist";

export default function Home() {
    const [checklists, setChecklists] = useState<Checklist[]>([]);

    useEffect(() => {
        fetchChecklists();
    }, []);

    const fetchChecklists = async () => {
        try {
            const response = await axios.get("http://localhost:8000/checklists");
            console.log(response);
            setChecklists(response.data);
        } catch (error: any) {
            console.log("Failed to fetch checklists");
        }
    }

    return (
        <Grid container spacing={2} sx={{m: 2}}>
            {checklists.map(checklist => (
                <Grid key={checklist.id} size={{xl: 3, lg: 3, md: 4, sm: 6, xs: 12}}>
                    <ChecklistCard checklist={checklist}/>
                </Grid>))}
        </Grid>
    );
}