import ChangePasswordForm from "@/components/modules/Dashboord/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Change Password</h1>
        <p className="text-muted-foreground">
          Secure your account by updating your login credentials.
        </p>
      </div>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;