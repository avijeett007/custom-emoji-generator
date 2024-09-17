import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="flex justify-center items-center min-h-screen">
    <SignIn />
  </div>
);

export default SignInPage;