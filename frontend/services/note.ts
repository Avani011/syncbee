import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v2/note";

export const createNote = async (formData: FormData) => {
    const response = await axios.post(
        `${BASE_URL}/create-note`,
        formData,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    )

    return response.data;
}
