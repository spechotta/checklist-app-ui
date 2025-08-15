import React, {FormEvent, useState} from "react";
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
    const [newItemText, setNewItemText] = useState("");

    const saveNewItem = async (event: FormEvent) => {
        event.preventDefault();
        const trimmedText = newItemText.trim();
        //TODO: move logic to trim item text to API service layer

        if (!trimmedText) {
            //TODO:add logic to display error message to user if trimmed text is empty
        } else {
            await addChecklistItem(checklistId, trimmedText);
        }
        setNewItemText("");
    }

    return (
        <ClickAwayListener onClickAway={() => setNewItemText("")}>
            <ListItem disablePadding>
                <form onSubmit={saveNewItem}>
                    <Box sx={{display: "flex", alignItems: "center", pl: 2}}>
                        <ListItemIcon>
                            <IconButton
                                edge="start"
                                disabled={!newItemText}
                                type="submit"
                            >
                                <AddIcon/>
                            </IconButton>
                        </ListItemIcon>

                        <TextField
                            variant="standard"
                            placeholder="New item..."
                            value={newItemText}
                            onChange={(event) => setNewItemText(event.target.value)}
                            sx={{
                                "& .MuiInput-underline:before": {
                                    borderBottomColor: "gray",
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "gray",
                                },
                            }}
                        />
                    </Box>
                </form>
            </ListItem>
        </ClickAwayListener>
    );
}