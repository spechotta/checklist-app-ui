import React, {ChangeEvent, FormEvent, useState} from "react";
import {Box, ClickAwayListener, TextField, Tooltip, Typography} from "@mui/material";
import {Checklist} from "@/types/checklist";

interface ChecklistTitleProps {
    checklist: Checklist;
    handleUpdateChecklist: (checklist: Checklist) => Promise<boolean>;
}

export default function ChecklistTitle({checklist, handleUpdateChecklist}: ChecklistTitleProps) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [titleIsInvalid, setTitleIsInvalid] = useState(false);

    const cancelEdit = () => {
        setEditedTitle("");
        setIsEditingTitle(false);
    }

    const saveChecklistTitle = async (event: FormEvent) => {
        event.preventDefault();
        if (editedTitle) {
            const editedChecklist = {...checklist};
            editedChecklist.title = editedTitle;
            if (await handleUpdateChecklist(editedChecklist)) {
                setIsEditingTitle(false);
                setEditedTitle("");
            }
        } else {
            setTitleIsInvalid(true);
        }
    }

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTitleIsInvalid(!value);
        setEditedTitle(value);
    }

    return (
        <Box>
            {isEditingTitle ? (
                <ClickAwayListener onClickAway={cancelEdit}>
                    <form onSubmit={saveChecklistTitle}>
                        <TextField
                            variant="standard"
                            value={editedTitle}
                            placeholder={checklist.title}
                            onChange={handleTitleChange}
                            onKeyDown={(event) => {
                                if (event.key === "Escape") {
                                    cancelEdit();
                                }
                            }}
                            autoFocus
                            required
                            error={titleIsInvalid}
                            helperText={titleIsInvalid ? "Title is Required" : ''}
                            sx={{
                                "& .MuiInput-underline:before": {
                                    borderBottomColor: "gray"
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "gray"
                                }
                            }}
                        />
                    </form>
                </ClickAwayListener>
            ) : (
                <Tooltip
                    title="Edit Checklist Title"
                    placement="right"
                >
                    <Typography
                        onClick={() => setIsEditingTitle(true)}
                        sx={{
                            color: "text.secondary",
                            cursor: "text",
                            borderBottom: "2px solid transparent",
                            "&:hover": {
                                borderBottomColor: "gray"
                            },
                        }}
                    >
                        {checklist.title}
                    </Typography>
                </Tooltip>
            )}
        </Box>
    );
}