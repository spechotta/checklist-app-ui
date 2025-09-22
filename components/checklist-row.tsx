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
    Tooltip
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

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

    const cancelEdit = () => {
        setEditedText(item.text);
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
            <ListItem
                secondaryAction={
                    <Tooltip title='Delete Task/Item' placement="top">
                        <IconButton onClick={() => deleteItem()}>
                            <ClearIcon/>
                        </IconButton>
                    </Tooltip>
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
                                onBlur={cancelEdit}
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
                        <Tooltip
                            title="Edit Task/Item"
                            placement="right"
                        >
                            <ListItemText
                                onClick={() => setIsEditing(true)}
                                sx={{
                                    color: "text.secondary",
                                    cursor: "text",
                                    borderBottom: "2px solid transparent",
                                    "&:hover": {
                                        borderBottomColor: "gray"
                                    },
                                }}
                            >
                                {item.text}
                            </ListItemText>
                        </Tooltip>
                    )}
                </Box>
            </ListItem>
    );
}