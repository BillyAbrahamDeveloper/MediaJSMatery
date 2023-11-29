import ProfileHeader from '@/components/Shared/ProfileHeader';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';

import { redirect } from 'next/navigation';
import { profileTabs } from '@/constants/index';

import Image from 'next/image';
import ThreadsTab from '@/components/Shared/ThreadsTab';
import UserCard from '@/components/Cards/UserCard';

interface Props {
  accountId: string;
}

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect('/onboarding');

  // fetch Users

  const result = await fetchUsers({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 25,
  });
  console.log(result);

  return (
    <div>
      <h1 className=' head-text  mb-10'>Search</h1>

      <div className='mt-14 flex flex-col gap-9'>
        {result.users.length === 0 ? (
          <p>No users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
