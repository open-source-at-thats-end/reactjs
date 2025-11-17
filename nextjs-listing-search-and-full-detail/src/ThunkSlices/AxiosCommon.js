import axios from 'axios';
import { API_URL } from "../constant";

const api = axios.create();
const cancelTokenSource = axios.CancelToken.source();

api.defaults.baseURL = API_URL;
api.defaults.cancelToken = cancelTokenSource.token;
api.defaults.headers = {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Access-Control-Allow-Origin":"*"
                        }

export { api, cancelTokenSource };
