import axios from "axios";
import Constants from "../utils/constants"
import {Item} from "@/types/checklist";

export async function getChecklists() {
    const response = await axios.get(Constants.checklistAPI.checklists);
    console.log(response);
    return response.data;
}

export async function getChecklist(checklistId: number) {
    const url = Constants.checklistAPI.checklist.replace("{checklist_id}", checklistId.toString());
    const response = await axios.get(url);
    console.log(response);
    return response.data;
}

export async function addItem(checklistId: number, item: { text: string, isComplete: boolean }) {
    const url = Constants.checklistAPI.items.replace("{checklist_id}", checklistId.toString());
    const response = await axios.post(url, item);
    console.log(response);
    return response.data;
}

export async function updateItem(checklistId: number, itemId: number, item: Item) {
    const url = Constants.checklistAPI.item
        .replace("{checklist_id}", checklistId.toString())
        .replace("{item_id}", itemId.toString());

    const response = await axios.put(url, item);
    console.log(response);
    return response.data;
}

export async function deleteItem(checklistId: number, itemId: number) {
    const url = Constants.checklistAPI.item
        .replace("{checklist_id}", checklistId.toString())
        .replace("{item_id}", itemId.toString());

    const response = await axios.delete(url);
    console.log(response);
    return response.data;
}