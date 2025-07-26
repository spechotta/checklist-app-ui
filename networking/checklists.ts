import axios from "axios";
import Constants from "../utils/constants"

export async function getChecklists() {
    const response = await axios.get(Constants.checklistAPI.checklists);
    console.log(response);
    return response.data;
}