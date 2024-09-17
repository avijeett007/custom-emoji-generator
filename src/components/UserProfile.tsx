import { UserButton, useUser } from "@clerk/nextjs";

const UserProfile = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center space-x-4">
      <p>Welcome, {user?.firstName}!</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default UserProfile;