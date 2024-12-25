import mongoose from 'mongoose'

interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    createAt: Date;
    token: string;
}

const userSchema = new mongoose.Schema<IUser>({
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
            validator: function (this: IUser, value: string): boolean {
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

const UserModel: mongoose.Model<IUser> = mongoose.model<IUser>("UserModel", userSchema);

export default UserModel