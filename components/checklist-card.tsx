import React from "react";
import {Checklist, Item} from "@/types/checklist";
import ChecklistRow from "./checklist-row";
import AddChecklistItem from "./add-checklist-item";
import {updateItem, deleteItem, addItem, updateChecklist} from "@/networking/checklists";
import {
    Box,
    Card,
    CardContent,
    IconButton,
    List,
    Paper,
    Tooltip
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import ChecklistTitle from "@/components/checklist-title";

interface ChecklistCardProps {
    checklist: Checklist;
    refreshChecklist: (checklistId: number) => Promise<void>;
    setChecklistById: (checklist: Checklist) => void;
    openDeleteChecklistDialog: (checklist: Checklist) => void;
    handleError: (message: string) => void;
}

export default function ChecklistCard({
      checklist,
      refreshChecklist,
      setChecklistById,
      openDeleteChecklistDialog,
      handleError
    }: ChecklistCardProps) {

    const addChecklistItem = async (checklistId: number, newText: string) => {
        const newItem = {
            "text": newText,
            "isComplete": false
        };
        try {
            await addItem(checklistId, newItem);
            await refreshChecklist(checklistId);
        } catch (error: any) {
            console.log("Failed to add new item.");
        }
    }

    const handleItemUpdate = async (updatedItem: Item) => {
        try {
            await updateItem(updatedItem.checklistId, updatedItem.id, updatedItem);
            await refreshChecklist(updatedItem.checklistId);
        } catch (error: any) {
            console.log("Failed to update item.");
        }
    }

    const updateItemIsComplete = async (item: Item) => {
        const toggledItem = {...item, isComplete: !item.isComplete};
        await handleItemUpdate(toggledItem);
    }

    const updateItemText = async (item: Item, editedText: string) => {
        const editedItem = {...item, text: editedText};
        await handleItemUpdate(editedItem);
    }

    const deleteChecklistItem = async (item: Item) => {
        try {
            await deleteItem(item.checklistId, item.id);
            await refreshChecklist(item.checklistId);
        } catch (error: any) {
            console.log("Failed to update item.");
        }
    }

    const handleUpdateChecklist = async (checklist: Checklist) => {
        try {
            const updatedChecklist = await updateChecklist(checklist);
            setChecklistById(updatedChecklist);
        } catch (error: any) {
            handleError('Error updating checklist: ' + error.message);
        }
    }

    return (
        <Card>
            <CardContent sx={{backgroundColor: '#cbcbcb'}}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1.5
                    }}
                >
                    <ChecklistTitle checklist={checklist} handleUpdateChecklist={handleUpdateChecklist}/>
                    <Tooltip title='Delete Checklist' placement='left'>
                        <IconButton onClick={() => openDeleteChecklistDialog(checklist)}>
                            <ClearIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Paper>
                    <List sx={{color: 'black', backgroundColor: '#f8f8f8'}}>
                        {checklist.items.map((item) => (
                            <ChecklistRow
                                key={item.id}
                                item={item}
                                updateItemIsComplete={updateItemIsComplete}
                                updateItemText={updateItemText}
                                deleteChecklistItem={deleteChecklistItem}
                            />
                        ))}
                        <AddChecklistItem checklistId={checklist.id} addChecklistItem={addChecklistItem}/>
                    </List>
                </Paper>
            </CardContent>
        </Card>
    );
}