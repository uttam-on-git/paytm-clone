import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { Account } from "../models/bank.models.js";

const transfer = asyncHandler (async () => {
    const session = await mongoose.startSession()
})


export {
    balance,
    transfer
}