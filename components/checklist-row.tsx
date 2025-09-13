import React, {FormEvent, useState} from "react";
import {Item} from "@/types/checklist";
import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    TextField,
    ClickAwayListener
} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface ChecklistRowProps {
    item: Item;
    updateChecklistItem: (item: Item) => Promise<void>;
    deleteChecklistItem: (item: Item) => Promise<void>;
}

export default function ChecklistRow({
     item,
     updateChecklistItem,
     deleteChecklistItem
 }: ChecklistRowProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(item.text);

    const toggleEditMode = () => {
        if (isEditing) {
            cancelEdit();
        } else {
            setIsEditing(true);
        }
    }

    const cancelEdit = () => {
        setEditedText("");
        setIsEditing(false);
    }

    const saveEditedText = async (event: FormEvent) => {
        event.preventDefault();
        const trimmedText = editedText.trim();
        //TODO: move logic to trim item text to API service layer

        if (!trimmedText) {
            await deleteChecklistItem(item);
        } else if (trimmedText !== item.text) {
            const editedItem = {...item, text: trimmedText};
            await updateChecklistItem(editedItem);
        }
        setIsEditing(false);
    }

    const updateItemIsComplete = async (item: Item) => {
        const toggledItem = {...item, isComplete: !item.isComplete};
        await updateChecklistItem(toggledItem);
    }

    return (
        <ClickAwayListener onClickAway={cancelEdit}>
            <ListItem
                secondaryAction={
                    <>
                        <IconButton
                            edge="end"
                            onClick={toggleEditMode}
                        >
                            <EditOutlinedIcon/>
                        </IconButton>
                        <IconButton
                            edge="end"
                            onClick={() => deleteChecklistItem(item)}
                        >
                            <DeleteOutlinedIcon/>
                        </IconButton>
                    </>
                }
                disablePadding
            >
                <Box sx={{display: "flex", alignItems: "center", pl: 2}}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={item.isComplete}
                            onChange={() => updateItemIsComplete(item)}
                            disableRipple
                            sx={{
                                "&.Mui-checked": {
                                    color: "gray"
                                }
                            }}
                        />
                    </ListItemIcon>

                    {isEditing ? (
                        <form onSubmit={saveEditedText}>
                            <TextField
                                variant="standard"
                                value={editedText}
                                onChange={(event) => setEditedText(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Escape") {
                                        cancelEdit();
                                    }
                                }}
                                autoFocus
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
                    ) : (
                        <ListItemText
                            primary={item.text}
                            sx={{
                                textDecoration: item.isComplete ? "line-through" : "none",
                                color: item.isComplete ? "gray" : "inherit"
                            }}
                        />
                    )}
                </Box>
            </ListItem>
        </ClickAwayListener>
    );
}