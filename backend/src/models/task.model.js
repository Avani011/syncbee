import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    dueDate:{
        type: Date,
        required: true,
        index: true
    },
    color: {
        type: String,
        default: "#ffffff"
    },
    category: {
        type: String,
        enum: ["work", "personal", "other"],
        required: true
    },
    priority: {
        type: String,
        enum: ["high", "medium", "low"],
        required: true,
        default: "medium"
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["active", "completed", "incomplete", "upcoming"],
        default: "active",
        index: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    } 
}, {
    timestamps: true
   }
)

taskSchema.pre("save", function(next){
    if(this.isModified("dueDate") || this.isNew){
        const now = new Date()
        const due = new Date(this.dueDate)

        if(this.isCompleted){
            this.status = "completed"
        }else if(due < now){
            this.status = "incomplete"
        }else{
            this.status = "upcoming"
        }
    }
    next()
})

taskSchema.plugin(mongooseAggregatePaginate);

export const Task = mongoose.model("Task", taskSchema);