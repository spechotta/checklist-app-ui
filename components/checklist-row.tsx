import React, {ChangeEvent, FormEvent, useState} from "react";
import {Checklist, Item} from "@/types/checklist";
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
    checklist: Checklist;
    handleUpdateChecklist: (checklist: Checklist) => Promise<void>;
}

export default function ChecklistRow({
     item,
     checklist,
     handleUpdateChecklist
 }: ChecklistRowProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(item.text);
    const [textIsInvalid, setTextIsInvalid] = useState(false);

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

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTextIsInvalid(!value);
        setEditedText(value);
    }

    const saveEditedText = async (event: FormEvent) => {
        event.preventDefault();
        if (editedText) {
            const updatedChecklist = {
                ...checklist,
                items: checklist.items.map((currItem) =>
                    currItem.id === item.id ? {...currItem, text: editedText} : currItem
                )
            };
            await handleUpdateChecklist(updatedChecklist);
            setIsEditing(false);
        } else {
            setTextIsInvalid(true);
        }
    }

    const updateItemIsComplete = async (item: Item) => {
        const updatedChecklist = {
            ...checklist,
            items: checklist.items.map((currItem) =>
                currItem.id === item.id ? {...currItem, isComplete: !item.isComplete} : currItem
            )
        };
        await handleUpdateChecklist(updatedChecklist);
    }

    const deleteItem = async () => {
        const updatedChecklist = {
            ...checklist,
            items: checklist.items.filter((currItem) => currItem.id !== item.id),
        };
        await handleUpdateChecklist(updatedChecklist);
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
                            onClick={() => deleteItem()}
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
                                onChange={handleTextChange}
                                error={textIsInvalid}
                                helperText={textIsInvalid ? "Task/Item Description is Required" : ""}
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