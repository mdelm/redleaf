import axios from "axios";
import { servicePath } from "../constants/defaultValues";

const instance = axios.create({
    baseURL: servicePath,
    timeout: 150000,
});

export default instance;