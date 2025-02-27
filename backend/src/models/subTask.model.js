import mongoose, {Schema} from 'mongoose';

const subTaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    mainTask: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true,
        index: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {timesamps: true})

export const SubTask = mongoose.model("SubTask", subTaskSchema);