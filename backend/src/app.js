// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';

// const app = express();

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions)); // Apply CORS globally
// app.options('*', cors(corsOptions)); // ✅ Handle preflight for ALL routes

// // ✅ 2. MIDDLEWARES
// app.use(express.json({ limit: '16kb' }));
// app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// app.use(cookieParser());
// app.use(express.static('public'));

// // ✅ 3. DEBUG LOGGING (optional)
// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.originalUrl}`);
//   next();
// });

// // ROUTES
// import userRouter from './routes/user.routes.js';
// import taskRouter from './routes/task.routes.js';
// import subTaskRouter from './routes/subTask.routes.js';
// import taskHistoryRouter from './routes/taskHistory.routes.js';
// import noteRouter from './routes/note.routes.js';
// import voiceNoteRouter from './routes/voiceNote.routes.js';
// import focusRouter from './routes/focus.routes.js';

// app.use('/api/v2/user', userRouter);
// app.use('/api/v2/task', taskRouter);
// app.use('/api/v2/subtask', subTaskRouter);
// app.use('/api/v2/taskHistory', taskHistoryRouter);
// app.use('/api/v2/note', noteRouter);
// app.use('/api/v2/voiceNote', voiceNoteRouter);
// app.use('/api/v2/focus', focusRouter);

// export { app };

import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// // ✅ 1. MANUAL CORS HEADERS (handle all cases incl. preflight)
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   );
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204); // Preflight OK
//   }
//   next();
// });

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// ✅ 2. MIDDLEWARES
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// ✅ 3. DEBUG LOGGING (optional)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// ✅ 4. ROUTES
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import subTaskRouter from "./routes/subTask.routes.js";
import taskHistoryRouter from "./routes/taskHistory.routes.js";
import noteRouter from "./routes/note.routes.js";
import voiceNoteRouter from "./routes/voiceNote.routes.js";
import focusRouter from "./routes/focus.routes.js";

app.use("/api/v2/user", userRouter);
app.use("/api/v2/task", taskRouter);
app.use("/api/v2/subtask", subTaskRouter);
app.use("/api/v2/taskHistory", taskHistoryRouter);
app.use("/api/v2/note", noteRouter);
app.use("/api/v2/voiceNote", voiceNoteRouter);
app.use("/api/v2/focus", focusRouter);

export { app };
