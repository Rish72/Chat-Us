import mongoose from "mongoose";

const msgSchema = mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text : {
        type : String,
    },
    image : {
        type : String
    }
}, {
    timestamps : true
}
)

const Msg = mongoose.model("Msg", msgSchema)

export default Msg

