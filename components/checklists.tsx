'use client'

import React, {useEffect, useState} from "react";
import ChecklistCard from '../components/checklist-card';
import DeleteChecklistDialog from "../components/delete-checklist-dialog"
import {Checklist} from "@/types/checklist";
import {Alert, Box, CircularProgress, Grid, Snackbar} from "@mui/material";
import {getChecklist, getChecklists, deleteChecklist} from "@/networking/checklists";
import Delay from "@/components/delay";
import ChecklistsHeader from "@/components/checklists-header";

export default function Checklists() {
    const [isLoading, setIsLoading] = useState(true);
    const [checklists, setChecklists] = useState<Checklist[]>([]);
    const [deleteChecklistDialogOpen, setDeleteChecklistDialogOpen] = useState(false);
    const [checklistToDelete, setChecklistToDelete] = useState<Checklist | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchChecklists();
    }, []);

    const fetchChecklists = async () => {
        try {
            setChecklists(await getChecklists());
        } catch (error: any) {
            console.log("Failed to fetch checklists.");
        } finally {
            setIsLoading(false);
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
            handleError('Error refreshing checklist: ' + error.message);
            throw error;
        }
    }

    const handleDeleteChecklist = async (checklistId: number) => {
        try {
            setIsDeleting(true);
            await deleteChecklist(checklistId);
            await fetchChecklists();
            closeDeleteChecklistDialog();
        } catch (error: any) {
            console.log("Failed to delete checklist.");
        } finally {
            setIsDeleting(false);
        }
    }

    const openDeleteChecklistDialog = (checklist: Checklist) => {
        setChecklistToDelete(checklist);
        setDeleteChecklistDialogOpen(true);
    }

    const closeDeleteChecklistDialog = () => {
        setDeleteChecklistDialogOpen(false);
        setChecklistToDelete(null);
    }

    const handleError = (message: string) => {
        setShowError(true);
        setErrorMessage(message);
    }

    return (
        <>
            <ChecklistsHeader fetchChecklists={fetchChecklists}/>
            {isLoading ? (
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh'}}>
                    <Delay wait={500}>
                        <CircularProgress/>
                    </Delay>
                </Box>
            ) : <Grid container spacing={4} sx={{m: 2}} justifyContent={{xs: 'center', md: 'left'}}>
                {checklists.map(checklist => (
                    <Grid key={checklist.id} size={{xl: 4, lg: 4, md: 6, sm: 9, xs: 12}}>
                        <ChecklistCard
                            checklist={checklist}
                            refreshChecklist={refreshChecklistById}
                            openDeleteChecklistDialog={openDeleteChecklistDialog}
                            handleError={handleError}
                        />
                    </Grid>))}
            </Grid>}
            <DeleteChecklistDialog
                open={deleteChecklistDialogOpen}
                checklist={checklistToDelete}
                onClose={closeDeleteChecklistDialog}
                onConfirm={(id) => handleDeleteChecklist(id)}
                isDeleting={isDeleting}
            />
            <Snackbar
                open={showError}
                autoHideDuration={6000}
                onClose={() => setShowError(false)}
            >
                <Alert
                    onClose={() => setShowError(false)}
                    severity="error"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
}