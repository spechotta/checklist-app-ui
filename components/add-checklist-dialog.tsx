import React, {ChangeEvent, FormEvent, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Checklist, Item} from "@/types/checklist";


interface AddChecklistDialogProps {
    onClose: () => void;
    onSubmit: (checklist: Checklist) => void;
}

export default function AddChecklistDialog({onClose, onSubmit}: AddChecklistDialogProps) {
    const [title, setTitle] = useState("");
    const [items, setItems] = useState<Item[]>([]);
    const [newItemText, setNewItemText] = useState("");
    const [titleIsInvalid, setTitleIsInvalid] = useState(false);

    const handleAddItem = (event: FormEvent) => {
        event.preventDefault();
        if (newItemText) {
            const newItem: Item = {
                text: newItemText,
                isComplete: false
            };
            setItems([...items, newItem]);
            setNewItemText("");
        }
    }

    const handleItemToggle = (index: number) => {
        const newItems = [...items]
        const item = newItems[index];
        item.isComplete = !item.isComplete;
        setItems(newItems);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (title) {
            const checklist: Checklist = {
                id: -1,
                title: title,
                items: items
            };
            onSubmit(checklist);
            handleClose();
        } else {
            setTitleIsInvalid(true);
        }
    }

    const handleClose = () => {
        setTitle("");
        setItems([]);
        setNewItemText("");
        onClose();
    }

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTitleIsInvalid(!value);
        setTitle(value);
    }

    const generateItemsList = () => {
        return items.map((item, index) => (
            <ListItem key={index} disablePadding>
                <Box sx={{display: "flex", alignItems: "center", pl: 2}}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={item.isComplete}
                            onChange={() => handleItemToggle(index)}
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
                </Box>
            </ListItem>
        ))

    }

    return (
        <Dialog
            open={true}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth

            disableRestoreFocus
        >
            <DialogTitle>Add Checklist</DialogTitle>
            <DialogContent>
                <Card sx={{backgroundColor: '#cbcbcb'}}>
                    <CardContent>
                        <TextField
                            variant="standard"
                            placeholder="Title*"
                            value={title}
                            onChange={handleTitleChange}
                            fullWidth
                            error={titleIsInvalid}
                            autoFocus
                            required
                            helperText={titleIsInvalid ? "Title is Required" : ''}
                            sx={{
                                "& .MuiInput-underline:before": {
                                    borderBottomColor: "gray",
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "gray",
                                },
                                color: 'text.secondary',
                                fontsize: 14,
                                mb: 3
                            }}
                        />
                        <Paper sx={{color: 'black', backgroundColor: '#f8f8f8', pt: 1, pb: 1}}>
                            <List sx={{mb: -1}}>
                                {generateItemsList()}
                            </List>

                            <form onSubmit={handleAddItem}>
                                <Box sx={{display: "flex", alignItems: "center", pl: 2, pr: 2}}>
                                    <IconButton
                                        edge="start"
                                        disabled={!newItemText}
                                        type="submit"
                                    >
                                        <AddIcon/>
                                    </IconButton>

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
                                            width: '90%',
                                            pl: 3.5
                                        }}
                                    />
                                </Box>
                            </form>
                        </Paper>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                >
                    Create Checklist
                </Button>
            </DialogActions>
        </Dialog>
    );
}