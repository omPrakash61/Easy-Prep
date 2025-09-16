import { UserProfile } from "@clerk/nextjs";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 py-10">
      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-10">
        Manage Your Account
      </h1>

      {/* Profile Wrapper */}
      <div className="w-full max-w-4xl flex justify-center">
        <div className="w-full rounded-2xl">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}

export default Page;
