import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (value) {
                return this.password === value;
            },
            message: "Passwords must match.",
        },
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    token: {
        type: String,
    },
});
//const userSchema = mongoose.Schema(userSchemaRules);
const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
