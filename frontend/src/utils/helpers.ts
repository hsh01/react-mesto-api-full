import {ApiError} from "../models/ApiError";

export const json_or_error = async (res: Response) => {
    if (res.ok) {
        return await res.json();
    }
    const err: ApiError = {
        status: res.status,
        statusText: res.statusText,
        body: await res.json() ?? await res.text()
    }
    return Promise.reject(err);
}