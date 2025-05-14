import mongoose, {Schema} from 'mongoose';

const focusSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, {timestamps: true})

focusSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });

export const Focus = mongoose.model("Focus", focusSchema); 