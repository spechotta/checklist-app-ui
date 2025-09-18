import React, {ChangeEvent, FormEvent, useState} from "react";
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
    addChecklistItem: (text: string) => Promise<void>;
}

export default function AddChecklistItem({addChecklistItem}: AddChecklistItemProps) {
    const [newItemText, setNewItemText] = useState("");
    const [textIsInvalid, setTextIsInvalid] = useState(false);

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTextIsInvalid(!value);
        setNewItemText(value);
    }

    const saveNewItem = async (event: FormEvent) => {
        event.preventDefault();
        if (newItemText) {
            await addChecklistItem(newItemText);
            setNewItemText("");
        } else {
            setTextIsInvalid(true);
        }
    }

    return (
        <ClickAwayListener onClickAway={() => {setNewItemText(""); setTextIsInvalid(false);}}>
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
                            onChange={handleTextChange}
                            error={textIsInvalid}
                            helperText={textIsInvalid ? "Task/Item Description is Required" : ""}
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