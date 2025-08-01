import React, {FormEvent, useRef, useState} from "react";
import {
    Box,
    ClickAwayListener,
    IconButton,
    ListItem,
    ListItemIcon,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddChecklistItemProps {
    checklistId: number;
    addChecklistItem: (checklistId: number, text: string) => Promise<void>;
}

export default function AddChecklistItem({checklistId, addChecklistItem}: AddChecklistItemProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [newItemText, setNewItemText] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const toggleAddItemMode = () => {
        if (isAdding) {
            cancelAddItem();
        } else {
            setIsAdding(true);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }

    const cancelAddItem = () => {
        setIsAdding(false);
        setNewItemText("");
    }

    const saveNewItem = async (event: FormEvent) => {
        event.preventDefault();
        const trimmedText = newItemText.trim();

        if (!trimmedText) {
            //TODO:add logic to display error message to user if trimmed text is empty
        } else {
            await addChecklistItem(checklistId, trimmedText);
        }
        setIsAdding(false);
        setNewItemText("");
    }

    return (
        <ClickAwayListener onClickAway={cancelAddItem}>
            <ListItem disablePadding>
                <Box sx={{display: "flex", alignItems: "center", pl: 2}}>
                    <ListItemIcon>
                        <IconButton
                            edge="start"
                            onClick={toggleAddItemMode}
                        >
                            <AddIcon/>
                        </IconButton>
                    </ListItemIcon>

                    <form onSubmit={saveNewItem}>
                        <TextField
                            variant="standard"
                            placeholder="New item..."
                            value={newItemText}
                            onChange={(event) => setNewItemText(event.target.value)}
                            onClick={() => {
                                if (!isAdding) {
                                    toggleAddItemMode();
                                }
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Escape") {
                                    cancelAddItem();
                                }
                            }}
                            inputRef={inputRef}
                            autoFocus={isAdding}
                            slotProps={{
                                input: {
                                    readOnly: !isAdding
                                }
                            }}
                            sx={{
                                "& .MuiInputBase-input": {
                                    cursor: isAdding ? "text" : "default",
                                    color: isAdding ? "inherit" : "gray",
                                },
                                "& .MuiInput-underline:before": {
                                    borderBottomColor: "gray",
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "gray",
                                },
                            }}
                        />
                    </form>
                </Box>
            </ListItem>
        </ClickAwayListener>
    );
}