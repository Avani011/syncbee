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

export const getAllNotes = async () => {
    const response = await axios.get(
        `${BASE_URL}/get-all-notes`,
        {
            withCredentials: true
        }
    )
    return response.data;
}

export const updateNoteApi = async (noteId: string, data: FormData) => {
    return await axios.put(
      `${BASE_URL}/update-note/${noteId}`,
      data,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
  };
  
export const deleteNoteApi = (noteId: string) =>
    axios.delete(`${BASE_URL}/delete-note/${noteId}`,{
        withCredentials: true,
});

export const toggleChecklistApi = async (noteId: string, checklistIndex: number) => {
  return await axios.patch(
    `${BASE_URL}/update-checklist/${noteId}/${checklistIndex}`,
    {},
    { withCredentials: true }
  );
};
