import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const signUp = asyncHandler(async () => {
  const { username, firstName, lastName, password } = req.body;

  if (
    [username, firstName, lastName, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    lastName,
    password
  })

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createUser) {
    throw new ApiError(500, "Something went wrong while Signing up the user")
  }

  retrun (res.status(500).json(
    new ApiResponse(200, createUser, "User registered successfully")
  ))

});


export {
  signUp
}
