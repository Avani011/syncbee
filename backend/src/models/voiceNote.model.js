import mongoose, {Schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

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

voiceNoteSchema.plugin(mongooseAggregatePaginate);

export const VoiceNote = mongoose.model("VoiceNote", voiceNoteSchema);