import {
    Card,
    CardContent,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Paper,
    Typography
} from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import React, {useState} from "react";

export default function ChecklistCard() {
    const [checked, setChecked] = useState([0]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Card>
            <CardContent sx={{backgroundColor: '#cbcbcb'}}>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    My Checklist
                </Typography>
                <Paper>
                    <List sx={{ color: 'black', backgroundColor: '#f8f8f8' }}>
                        {[0, 1, 2, 3].map((value) => {
                            const labelId = `checkbox-list-label-${value}`;

                            return (
                                <ListItem
                                    key={value}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="comments">
                                            <DeleteOutlinedIcon />
                                        </IconButton>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={checked.includes(value)}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Paper>

            </CardContent>
        </Card>
    );
}