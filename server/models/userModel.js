import mongoose,{ Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import Config from '../config.js'
import crypto from 'crypto'
import ErrorHandler from '../handlers/errorHandler.js'

const resetPasswordExpiry = Config.RESET_PASSWORD_EXPIRY;

const sys_name = Config.NAME

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 30,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
          ],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    phonenumber: {
        type: String,
        required: true,
        trim: true

    },
   
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
      },
    bio: {
        type: String,
        maxlength: 300,
        default: 'Welcome to my profile 🤗',
        trim: true
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    subscriptionDue: Boolean,
    subscriptionDueDate: Date,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function(next) {
    try {

        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next()
    } catch (err) {
        next(err)
    }
});


UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password)
    }
    catch (err) {
        throw new ErrorHandler(err.message)
    }
};


UserSchema.methods.generateResetPasswordToken = function() {
    try {

        const resetToken = crypto.randomBytes(20).toString("hex")
        this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')
        this.resetPasswordExpiry = resetPasswordExpiry;


        return resetToken;
    }
    catch (err) {
        throw new ErrorHandler(err.message)
    }
}



const User = mongoose.model('User', UserSchema);

export default User