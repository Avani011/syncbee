import mongoose, {Schema} from 'mongoose';

const taskHistorySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    date: {
        type: Date,
        required: true,
        index: true
    },
    totalTasks: {
        type: Number,
        default: 0
    },
    completedTasks: {
        type: Number,
        default: 0
    },
    completionPercenttage: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export const TaskHistory = mongoose.model("TaskHistory", taskHistorySchema);