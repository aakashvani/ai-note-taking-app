"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutUserAction } from "@/actions/users";

function LogOutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);

    // Clear sensitive client-side data
    localStorage.clear();
    sessionStorage.clear();

    try {
      const { errorMessage } = await logoutUserAction();

      if (!errorMessage) {
        // Successful logout
        router.push("/");
        toast("Logged out successfully.");
      } else if (
        errorMessage.includes("User from sub claim in JWT does not exist") ||
        errorMessage.includes("Invalid Refresh Token") ||
        errorMessage.includes("Refresh Token Not Found") ||
        errorMessage.includes("Auth session missing")
      ) {
        toast("Session expired. Please log in again.");
        router.push("/login");
        router.refresh();
      } else {
        toast(errorMessage);
      }
    } catch (err) {
      // Catch any unexpected errors
      toast("Unexpected error during logout. Please try again.");
    }

    setLoading(false);
  };

  // const handleLogOut = async () => {
  //   setLoading(true);

  //   const { errorMessage } = await logoutUserAction();

  //   // if (!errorMessage) {
  //   //   router.push("/");
  //   //   // toast("logout");
  //   // } else {
  //   //   toast(errorMessage);
  //   // }

  //   if (
  //     errorMessage &&
  //     errorMessage &&
  //     errorMessage.includes("User from sub claim in JWT does not exist")
  //   ) {
  //     toast("Session expired. Please log in again.");
  //     // Optionally, clear local storage/session here
  //     router.push("/login");
  //   }
  //   setLoading(false);
  // };

  return (
    <Button
      variant="outline"
      onClick={handleLogOut}
      disabled={loading}
      className="w-24"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogOutButton;
