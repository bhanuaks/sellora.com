import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// User schema with username and password
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Method to compare passwords using bcrypt
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare the entered password with the hashed password
};

// Export the User model
export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
