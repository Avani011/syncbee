import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes

import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import subTaskRouter from './routes/subTask.routes.js';
import taskHistoryRouter from "./routes/taskHistory.routes.js";
import noteRouter from "./routes/note.routes.js";
import voiceNoteRouter from "./routes/voiceNote.routes.js"

app.use("/api/v2/user", userRouter)
app.use("/api/v2/task", taskRouter)
app.use("/api/v2/subtask", subTaskRouter)
app.use("/api/v2/taskHistory", taskHistoryRouter)
app.use("/api/vs/note", noteRouter)
app.use("/api/v2/voiceNote", voiceNoteRouter)

export {app}