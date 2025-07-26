import React from "react";
import {Item} from "@/types/checklist";
import {Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface ChecklistRowProps {
    item: Item
}

export default function ChecklistRow({item}: ChecklistRowProps) {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end">
                    <DeleteOutlinedIcon/>
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={item.isComplete}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText primary={item.text}/>
            </ListItemButton>
        </ListItem>
    );
}