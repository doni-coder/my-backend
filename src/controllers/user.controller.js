import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import { uploadOnColudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // Validation - not empty
  // check if user already exist : user name or email
  // check for images check for avatar
  // upload them to cloudinary , avatar
  // create user object - create entry in DB
  // remove password and refresh token field in response
  // check for user creation
  // return response

  const { fullname, email, username, password } = req.body;
  console.log(fullname, email);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === " ")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "email and username already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avtar file is required");
  }

  const avatar = await uploadOnColudinary(avatarLocalPath);
  const coverImage = await uploadOnColudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avtar file is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while register user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered succesfully"));
});

export { registerUser };
