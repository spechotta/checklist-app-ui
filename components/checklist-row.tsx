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
    updateItemIsComplete: (item: Item) => Promise<any>;
    updateItemText: (item: Item, editedText: string) => Promise<any>;
}

export default function ChecklistRow({item, updateItemIsComplete, updateItemText}: ChecklistRowProps) {
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
        setEditedText(item.text);
        setIsEditing(false);
    }

    const saveEditedText = async (event: FormEvent) => {
        event.preventDefault();
        const trimmedText = editedText.trim();

        if (!trimmedText) {
            // call delete row function
        } else if (trimmedText !== item.text) {
            await updateItemText(item, trimmedText);
        }
        setIsEditing(false);
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