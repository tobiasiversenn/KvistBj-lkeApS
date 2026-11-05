
import { Api } from "@/api/Api.ts";

export const api = new Api({
    baseApiParams: {
        secure: true,
    },

    securityWorker: () => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            return {};
        }

        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    },
});