import Image from 'next/image';
import { getAuthenticatedUserId } from '@/app/utils/auth/checkAuth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import AccountSettingsForm from '@/app/components/profile/AccountSettingsForm';
import AvatarUploadButton from '@/app/components/profile/AvatarUploadButton';

export default async function AccountSettingsPage() {
  const userId = await getAuthenticatedUserId();

  if (!userId) return null;

  const [user] = await db.select().from(users).where(eq(users.id, userId));
  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-75px)] flex flex-col items-center justify-center bg-gray-50 px-4 pt-[25px] pb-10">
      <div className="w-full max-w-[600px] bg-white p-6 sm:p-8 rounded-xl shadow-sm space-y-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center sm:text-left hidden sm:block">
          Настройка аккаунта
        </h1>
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-4">
        <div className="relative w-[88px] h-[88px] rounded-full overflow-hidden border-2 border-gray-300">
          <Image
            src={user.avatar || '/images/avatar.jpg'}
            alt="Аватар"
            width={88}
            height={88}
            className="rounded-full object-cover"
          />
          <AvatarUploadButton />
        </div>
        </div>
        <AccountSettingsForm user={user} />
      </div>
    </div>
  );
}