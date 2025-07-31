import React from "react";
import {Checklist, Item} from "@/types/checklist";
import ChecklistRow from "@/components/checklist-row";
import {updateItem} from "@/networking/checklists";
import {
    Card,
    CardContent,
    List,
    Paper,
    Typography
} from "@mui/material";

interface ChecklistCardProps {
    checklist: Checklist;
    refreshChecklist: (checklistId: number) => Promise<any>;
}

export default function ChecklistCard({checklist, refreshChecklist}: ChecklistCardProps) {

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

    return (
        <Card>
            <CardContent sx={{backgroundColor: '#cbcbcb'}}>
                <Typography sx={{color: 'text.secondary', fontSize: 14, mb: 1}}>
                    {checklist.title}
                </Typography>
                <Paper>
                    <List sx={{color: 'black', backgroundColor: '#f8f8f8'}}>
                        {checklist.items.map((item) => (
                            <ChecklistRow
                                key={item.id}
                                item={item}
                                updateItemIsComplete={updateItemIsComplete}
                                updateItemText={updateItemText}/>
                        ))}
                    </List>
                </Paper>
            </CardContent>
        </Card>
    );
}