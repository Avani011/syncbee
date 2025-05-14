import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',       // your frontend
  credentials: true,                     // allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],  // necessary
};

app.use(cors(corsOptions));


// ✅ These middlewares should follow after CORS
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// ✅ Don't manually override headers again (let `cors()` do it)

// ROUTES
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';
import subTaskRouter from './routes/subTask.routes.js';
import taskHistoryRouter from './routes/taskHistory.routes.js';
import noteRouter from './routes/note.routes.js';
import voiceNoteRouter from './routes/voiceNote.routes.js';
import focusRouter from './routes/focus.routes.js';

app.use('/api/v2/user', userRouter);
app.use('/api/v2/task', taskRouter);
app.use('/api/v2/subtask', subTaskRouter);
app.use('/api/v2/taskHistory', taskHistoryRouter);
app.use('/api/v2/note', noteRouter);
app.use('/api/v2/voiceNote', voiceNoteRouter);
app.use('/api/v2/focus', focusRouter);

export { app };
