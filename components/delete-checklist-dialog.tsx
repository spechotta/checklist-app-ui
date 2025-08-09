import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Checklist} from "@/types/checklist";

interface DeleteChecklistDialogProps {
    open: boolean;
    checklist: Checklist | null;
    onClose: () => void;
    onConfirm: (checklistId: number) => void;
    isDeleting: boolean
}

export default function DeleteChecklistDialog({
      open,
      checklist,
      onClose,
      onConfirm,
      isDeleting
    }: DeleteChecklistDialogProps) {
    const [title, setTitle] = useState<string | undefined>('');

    const prepTitle = () => {
        const preppedTitle = checklist?.title.split(' ').map(word => {
            let preppedWord = word.trim();
            return preppedWord.charAt(0).toUpperCase() + preppedWord.slice(1);
        }).join(' ');

        setTitle(preppedTitle);
    }

    useEffect(() => {
        if (open) {
            prepTitle();
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {`Delete ${title} Checklist?`}
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
                    loading={isDeleting}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}