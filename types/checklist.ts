export interface Item {
    id: number;
    text: string;
    isComplete: boolean;
    checklistId: number;
}

export interface ItemCreate {
    text: string,
    isComplete: boolean,
    checklistId: number
}

export interface Checklist {
    id: number;
    title: string;
    items: Item[];
}