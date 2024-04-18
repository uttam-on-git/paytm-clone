import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required:true,
            unique: true,
            trim: trim,
            lowercase: true,
            minLength: 6,
            maxLength: 20
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        lastName: {
            type: String,
            trim: true,
            maxLength: 50
        },
        password: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
)

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
}) 
  
userSchema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function() {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expressIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expressIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.Model('User', userSchema)
