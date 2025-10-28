import { getAuthServerSide } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile-form";

export default async function SettingsPage() {
  const user = await getAuthServerSide();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <ProfileForm user={user} profile={null} />
    </div>
  );
}
