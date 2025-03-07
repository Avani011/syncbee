import mongoose, {Schema} from 'mongoose';

const noteSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pictures: [{
        type: String
    }],
    checklist: [
        {
            item: {
                type: String,
                required: true
            },
            isTicked: {
                type: Boolean,
                default: false
            }
        }
    ]
}, {timestamps: true})

export const Note = mongoose.model("Note", noteSchema); 