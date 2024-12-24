import User from '../../../../lib/models/user.model';
import { connect } from '../../../../lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';

export const POST = async (req) => {
  const user = await currentUser();

  try {
    await connect();
    const data = await req.json();

    if (!user.publicMetadata.isAdmin) {
      return new Response('Unauthorized', { status: 401 });
    }

    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.sort === 'asc' ? 1 : -1;
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return new Response(JSON.stringify({ users, totalUsers, lastMonthUsers }), {
      status: 200,
    });
  } catch (error) {
    console.log('Error getting the users :', error);
    return new Response('Error getting the users', { status: 500 });
  }
};