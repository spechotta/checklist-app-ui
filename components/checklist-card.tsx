import React from "react";
import {Checklist, Item} from "@/types/checklist";
import ChecklistRow from "./checklist-row";
import AddChecklistItem from "./add-checklist-item";
import {updateChecklist} from "@/networking/checklists";
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
    setChecklistById: (checklist: Checklist) => void;
    openDeleteChecklistDialog: (checklist: Checklist) => void;
    handleError: (message: string) => void;
}

export default function ChecklistCard({
      checklist,
      setChecklistById,
      openDeleteChecklistDialog,
      handleError
    }: ChecklistCardProps) {

    const addChecklistItem = async (newItemText: string) => {
        const newItem: Item = {
            text: newItemText,
            isComplete: false,
            checklistId: checklist.id
        };

        const updatedChecklist: Checklist = {
            ...checklist,
            items: [...checklist.items, newItem as Item]
        };

        await handleUpdateChecklist(updatedChecklist);
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
                                checklist={checklist}
                                handleUpdateChecklist={handleUpdateChecklist}
                            />
                        ))}
                        <AddChecklistItem addChecklistItem={addChecklistItem}/>
                    </List>
                </Paper>
            </CardContent>
        </Card>
    );
}