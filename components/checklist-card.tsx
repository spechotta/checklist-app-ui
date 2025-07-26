import React from "react";
import {Checklist} from "@/types/checklist";
import ChecklistRow from "@/components/checklist-row";
import {
    Card,
    CardContent,
    List,
    Paper,
    Typography
} from "@mui/material";

interface ChecklistCardProps {
    checklist: Checklist
}

export default function ChecklistCard({checklist}: ChecklistCardProps) {
    return (
        <Card>
            <CardContent sx={{backgroundColor: '#cbcbcb'}}>
                <Typography sx={{color: 'text.secondary', fontSize: 14, mb: 1}}>
                    {checklist.title}
                </Typography>
                <Paper>
                    <List sx={{color: 'black', backgroundColor: '#f8f8f8'}}>
                        {checklist.items.map((item) => (
                            <ChecklistRow key={item.id} item={item} />
                        ))}
                    </List>
                </Paper>
            </CardContent>
        </Card>
    );
}