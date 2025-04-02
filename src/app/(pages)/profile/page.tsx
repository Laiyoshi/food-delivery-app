import LogoutButton from "@/app/components/profile/LogoutButton";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Профиль</h1>
        <LogoutButton />
      </div>
    </div>
  );
}