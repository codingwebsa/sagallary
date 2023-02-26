import GoogleButton from "react-google-button";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const Account = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="grid h-[100svh] place-content-center">
        {session ? (
          <>
            <div className="flex flex-col items-center">
              <Image
                src={session.user.image}
                className="rounded-full mb-4"
                width={100}
                height={100}
                alt={session.user.name}
              />
              <p className="text-xl font-bold mb-8">{session.user.name}</p>
              <button className="font-semibold" onClick={() => signOut()}>
                &#8594; Signout
              </button>
            </div>
          </>
        ) : (
          <GoogleButton
            onClick={() => {
              signIn("google");
            }}
          />
        )}
      </div>
    </>
  );
};

export default Account;
