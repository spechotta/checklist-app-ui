export interface Item {
    id: number;
    text: string;
    isComplete: boolean;
}

export interface Checklist {
    id: number;
    title: string;
    items: Item[];
}