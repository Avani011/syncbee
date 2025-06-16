import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v2/voiceNote";

export const createVoiceNote = async (formData: FormData) => {
    const response = await axios.post(
        `${BASE_URL}/create-VoiceNote`,
        formData,
        {withCredentials: true,
            headers: {
                "Content-Type" : "multipart/form-data",
                Authorization: `Brearer ${localStorage.getItem("token")}`,
            }
        }
    )

    return response.data;
}

export const fetchVoiceNote = async () => {
    const response = await axios.get(
        `${BASE_URL}/fetchAll-VoiceNote`,
        {withCredentials: true}
    )

    return response.data;
}

export const deleteVoiceNote = async (voiceNoteId: string) => {
    const response = await axios.delete(
        `${BASE_URL}/delete-VoiceNote/${voiceNoteId}`,
        {withCredentials: true}
    )

    return response.data;
}

export const updateVoiceNote = async (voiceNoteId: string, data:FormData) => {
    const response = await axios.put(
        `${BASE_URL}/update-VoiceNote/${voiceNoteId}`,
        data,
        {   withCredentials: true,
            headers: {"Content-Type" : "multipart/formdata"},
        }
    )

    return response.data;
}