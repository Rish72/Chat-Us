import mongoose from "mongoose";
    
const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true,
        unique : true
    },
    fullName : {
        type : String, 
        required : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 12
    },
    profilePic : {
        type : String,
        required : false,
        default : "default-image.jpg"
    }
},
{timestamps : true}
)

const User = mongoose.model("User", userSchema);
export default User;