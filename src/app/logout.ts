import axios from "axios"
import { removeValue, USER_TOKEN } from "./localStorage"

export const logout = () => {
    removeValue(USER_TOKEN);
}