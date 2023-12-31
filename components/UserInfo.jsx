"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";

export default function UserInfo() {
  const { data: session } = useSession();

  const router = useRouter();
  const { pathname } = router;

  const handleLogout = async () => {
    if (!session && pathname !== "/") {
      // Only redirect to login if not already on the login route
      await router.push("/");
    } else {
      await signOut();
    }
    // Additional logic if needed
  };

  return (
    <div className="grid place-items-center h-screen">
      {session && (
        <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
          <div>
            Name: <span className="font-bold">{session?.user?.name}</span>
          </div>
          <div>
            Email: <span className="font-bold">{session?.user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
          >
            Log Out
          </button>
        </div>
      )}

      {!session && <LoginForm />}
    </div>
  );
}
