'use client'

import React, {useEffect, useState} from "react";
import ChecklistCard from '../components/checklist-card';
import AppBar from "../components/app-bar";
import DeleteChecklistModal from "../components/delete-checklist-modal"
import {Checklist} from "@/types/checklist";
import {Grid} from "@mui/material";
import {getChecklist, getChecklists, deleteChecklist} from "@/networking/checklists";

export default function Home() {
    const [checklists, setChecklists] = useState<Checklist[]>([]);
    const [deleteChecklistDialogOpen, setDeleteChecklistDialogOpen] = useState(false);
    const [checkListToDelete, setCheckListToDelete] = useState<Checklist | null>(null);

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

    const handleDeleteChecklist = async (checklistId: number) => {
        try {
            await deleteChecklist(checklistId);
            await fetchChecklists();
            closeDeleteChecklistDialog();
        } catch (error: any) {
            console.log("Failed to delete checklist.");
        }
    }

    const openDeleteChecklistDialog = (checklist: Checklist) => {
        setCheckListToDelete(checklist);
        setDeleteChecklistDialogOpen(true);
    }

    const closeDeleteChecklistDialog = () => {
        setDeleteChecklistDialogOpen(false);
        setTimeout(() => {
            setCheckListToDelete(null);
        }, 100);
    }

    return (
        <>
            <AppBar/>
            <Grid container spacing={4} sx={{m: 2}} justifyContent={{xs: 'center', md: 'left'}}>
                {checklists.map(checklist => (
                    <Grid key={checklist.id} size={{xl: 4, lg: 4, md: 6, sm: 9, xs: 12}}>
                        <ChecklistCard
                            checklist={checklist}
                            refreshChecklist={refreshChecklistById}
                            openDeleteChecklistDialog={openDeleteChecklistDialog}
                        />
                    </Grid>))}
            </Grid>
            <DeleteChecklistModal
                open={deleteChecklistDialogOpen}
                checklist={checkListToDelete}
                onClose={closeDeleteChecklistDialog}
                onConfirm={(id) => handleDeleteChecklist(id)}
            />
        </>
    );
}