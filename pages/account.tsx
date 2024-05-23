import { signOut, useSession } from "next-auth/react";
import Layout from "../ui/Layout";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();
  return (
    <>
      <Layout>
        <button
          onClick={async () => {
            await signOut();
            console.log("PUSH");
            router.replace("/");
          }}
        >
          Sign Out
        </button>
      </Layout>
    </>
  );
}
