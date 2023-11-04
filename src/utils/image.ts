const { VITE_API_BASE_URL, VITE_PROXY_SERVER_URL } = import.meta.env;

export const getImage = (path : string , fileName: string): string => {
    return VITE_PROXY_SERVER_URL + VITE_API_BASE_URL + `/images/${path}/${fileName}`
};
