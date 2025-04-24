import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  secretKey: "sk_test_1NPtRGSRrEiD2SEVamDKgVaW0V8t6shB4ZCTnjwo2B", // Replace with your secret key
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
