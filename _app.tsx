import { ClerkProvider } from "@clerk/nextjs";

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} // Use environment variable
      frontendApi="https://arriving-jennet-11.clerk.accounts.dev" // Replace with your frontend API URL
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
