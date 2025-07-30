import React from "react";
import {Item} from "@/types/checklist";
import {Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface ChecklistRowProps {
    item: Item;
    updateItemIsComplete: (item: Item) => void;
}

export default function ChecklistRow({item, updateItemIsComplete}: ChecklistRowProps) {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end">
                    <DeleteOutlinedIcon/>
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton onClick={() => updateItemIsComplete(item)} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={item.isComplete}
                        tabIndex={-1}
                        disableRipple
                        sx={{
                            "&.Mui-checked": {
                                color: "gray"
                            }
                        }}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={item.text}
                    sx={{
                        textDecoration: item.isComplete ? "line-through" : "none",
                        color: item.isComplete ? "gray" : "inherit"
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
}