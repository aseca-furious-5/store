import axios from "axios";
import {CONTROL_TOWER_URL} from "./constant";

export const getAllItems = async () => {
    try{
        const response = await axios.get(`${CONTROL_TOWER_URL}/item/all`);
        return response.data;
    } catch (error){
        console.error("Error while fetching items", error);
    }

};

export const postOrder = async (order) => {
    try{
        const response = await axios.post(`${CONTROL_TOWER_URL}/order`, order);
        return response.data;
    } catch (error){
        console.error("Error while posting order", error);
    }
};