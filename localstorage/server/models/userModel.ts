import mongoose from "mongoose";

// Create schema
const userSchema = new mongoose.Schema({
  username: String,
  passwd: String,
});

// Modify the returned data
userSchema.set("toJSON", {
  transform: (_document, returnedUser) => {
    returnedUser.id = returnedUser._id.toString();
    delete returnedUser._id;
    delete returnedUser.__v;
  },
});

const UserModel = mongoose.model("User", userSchema);

export { UserModel };
