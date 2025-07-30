'use client'

import React, {useEffect, useState} from "react";
import ChecklistCard from '../components/checklist-card'
import {Checklist} from "@/types/checklist";
import {Grid} from "@mui/material";
import {getChecklist, getChecklists} from "@/networking/checklists";

export default function Home() {
    const [checklists, setChecklists] = useState<Checklist[]>([]);

    useEffect(() => {
        fetchChecklists();
    }, []);

    const fetchChecklists = async () => {
        try {
            setChecklists(await getChecklists());
        } catch (error: any) {
            console.log("Failed to fetch checklists.");
        }
    }

    const refreshChecklistById = async (checklistId: number) => {
        try {
            const updatedChecklist = await getChecklist(checklistId);
            setChecklists(prevChecklists =>
                prevChecklists.map(checklist =>
                    checklist.id === checklistId
                        ? updatedChecklist
                        : checklist));
        } catch (error: any) {
            console.log("Failed to refresh checklist.");
        }
    }

    return (
        <Grid container spacing={2} sx={{m: 2}}>
            {checklists.map(checklist => (
                <Grid key={checklist.id} size={{xl: 3, lg: 3, md: 4, sm: 6, xs: 12}}>
                    <ChecklistCard checklist={checklist} refreshChecklist={refreshChecklistById}/>
                </Grid>))}
        </Grid>
    );
}