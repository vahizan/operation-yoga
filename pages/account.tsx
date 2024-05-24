import { signOut, useSession } from "next-auth/react";
import Layout from "../ui/Layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Account() {
  const [isRedirectToHome, setRedirectToHome] = useState(false);
  const [signOutError, setSignOutError] = useState();
  useEffect(() => {
    if (isRedirectToHome) {
      router.push("/");
    }
  }, [isRedirectToHome]);
  const router = useRouter();
  const session = useSession();
  return (
    <>
      <Layout>
        {session.data?.user ? (
          <button
            onClick={() => {
              signOut()
                .then(() => {
                  setRedirectToHome(true);
                })
                .catch((e) => setSignOutError(e.message));
            }}
          >
            Sign Out
          </button>
        ) : (
          <button onClick={() => router.push("/login")}>Login</button>
        )}
        {signOutError && <div>{signOutError}</div>}
      </Layout>
    </>
  );
}
