import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api/v1";

export * from "./auth.api";
export * from "./award.api";
