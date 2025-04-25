import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";

// Dynamically import SignUp with SSR disabled
const SignUp = dynamic(() => import("@clerk/nextjs").then(mod => mod.SignUp), { ssr: false });

const signUp = () => {
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      // ...existing signup logic...

      // Redirect to the dashboard page after successful signup
      router.push("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className={`w-full h-screen  flex justify-center items-center`}>
      <SignUp />
      <button onClick={handleSignUp}>
        {`Let's get started!`}
      </button>
    </div>
  );
};

export default signUp;
