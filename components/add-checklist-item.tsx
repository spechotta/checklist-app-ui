import React, {useRef, useState} from "react";
import {
    Box,
    ClickAwayListener,
    IconButton,
    ListItem,
    ListItemIcon,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddChecklistItem() {
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

                    <TextField
                        variant="standard"
                        placeholder="New item..."
                        value={newItemText}
                        onChange={(event) => setNewItemText(event.target.value)}
                        onClick={toggleAddItemMode}
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
                </Box>
            </ListItem>
        </ClickAwayListener>
    );
}