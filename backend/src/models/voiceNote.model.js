import mongoose, {Schema} from 'mongoose';

const voiceNoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

export const VoiceNote = mongoose.model("VoiceNote", voiceNoteSchema);