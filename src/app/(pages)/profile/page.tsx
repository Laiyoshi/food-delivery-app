import Image from 'next/image';
import { CameraIcon } from '@heroicons/react/24/outline';
import { getAuthenticatedUserId } from '@/app/utils/auth/checkAuth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import AccountSettingsForm from '@/app/components/profile/AccountSettingsForm';

export default async function AccountSettingsPage() {
  const userId = await getAuthenticatedUserId();
  if (!userId) return null;

  const [user] = await db.select().from(users).where(eq(users.id, userId));
  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-50px)] flex flex-col items-center justify-center bg-gray-50 px-4 pt-[25px] pb-10">
      <div className="w-full max-w-[600px] bg-white p-6 sm:p-8 rounded-xl shadow-sm space-y-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center sm:text-left hidden sm:block">
          Настройка аккаунта
        </h1>
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-4">
          <div className="relative w-[92px] h-[92px]">
            <Image
              src="/images/avatar.webp"
              alt="Аватар"
              width={92}
              height={92}
              className="rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition">
              <CameraIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <AccountSettingsForm user={user} />
      </div>
    </div>
  );
}