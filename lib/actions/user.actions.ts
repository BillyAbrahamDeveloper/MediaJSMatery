'use server';

import { revalidatePath } from 'next/cache';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export const updateUser = async ({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> => {
  console.log(connectToDB);

  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true, maxTimeMS: 30000 }
    );

    if (path === '/profile/edit') {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Faild to create/update user ${error.message}`);
  }
};
