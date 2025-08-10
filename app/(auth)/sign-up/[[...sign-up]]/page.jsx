import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <SignUp />
    </div>
  );
}
