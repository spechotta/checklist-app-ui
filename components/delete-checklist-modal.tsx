import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import React from "react";
import {Checklist} from "@/types/checklist";

interface DeleteChecklistModalProps {
    open: boolean;
    checklist: Checklist | null;
    onClose: () => void;
    onConfirm: (checklistId: number) => void;
}

export default function ChecklistCard({open, checklist, onClose, onConfirm}: DeleteChecklistModalProps) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {`Delete ${checklist?.title} Checklist?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Deleting this checklist is a permanent action and cannot be undone. Please click "confirm" to
                    proceed.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={() => checklist && onConfirm(checklist.id)}
                    disabled={!checklist}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}