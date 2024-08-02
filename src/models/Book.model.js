import mongoose from "mongoose";
const bookSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    editorial:{
        type: String,
        required: true,
        trim: true
    },
    author:{
        type: String,
        required: true,
        trim: true
    },
    genre:{
        type: String,
        required: true,
        trim: true
    },
    yearOfEdition:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        default: 'active',
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
})

export default mongoose.model('Book', bookSchema)