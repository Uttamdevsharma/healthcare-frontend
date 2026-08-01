import MyProfileContent from "@/components/modules/Dashboord/MyProfileContent";

const MyProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View your personal and professional profile information.
        </p>
      </div>
      <MyProfileContent />
    </div>
  );
};

export default MyProfilePage;