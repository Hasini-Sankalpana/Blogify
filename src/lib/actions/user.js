import User from '../models/user.model';
import { connect } from '../mongodb/mongoose';

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    await connect();

    // Ensure the email address is taken from the first element in the array, if available
    const email = email_addresses?.[0]?.email || null;

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email, // Corrected email assignment
          username,
        },
      },
      { new: true, upsert: true } // Create or update the user
    );

    console.log('User successfully created or updated:', user);
    return user;
  } catch (error) {
    console.error('Error creating or updating user:', error);
    return { error: 'An error occurred during the operation.' };
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
    console.log('User successfully deleted with Clerk ID:', id);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};