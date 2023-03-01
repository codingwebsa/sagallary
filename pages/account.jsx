import GoogleButton from "react-google-button";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { DeleteIcon, DownloadIcon, PrivateIcon, PublicIcon } from "@/icons";
import Masonry from "react-masonry-css";
import Link from "next/link";
import { Triangle } from "react-loader-spinner";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
};

const Account = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/posts", fetcher);

  async function handleDelete(id) {
    const a = confirm("Do you want to delete this post? 🧨");
    if (!a) return;

    try {
      setLoading(true);
      await deleteDoc(doc(db, "posts", id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) {
      const _temp = data?.filter((item) => {
        // console.log(item);
        return item.authorEmail == session.user.email;
      });
      setPosts(_temp);
    }
  }, [data]);

  return (
    <>
      <div className="grid place-content-center">
        {session ? (
          <>
            {isLoading ||
              (loading && (
                <>
                  <div className="fixed inset-0 bg-white/80 grid place-content-center z-[99999]">
                    <Triangle
                      height="160"
                      width="160"
                      color="rgb(79 70 229)"
                      ariaLabel="triangle-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  </div>
                </>
              ))}
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid w-full"
              columnClassName="my-masonry-grid_column"
            >
              <CodingwebsaGiftCard name={session.user.name} />
              {posts?.map((item, index) => (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="custom-post-com rounded-md relative"
                  >
                    <Image
                      src={item.imageurl}
                      width={720}
                      height={1080}
                      className="w-full h-auto mb-3 rounded-md"
                      alt={item.title}
                      draggable={false}
                      key={item.id}
                    />

                    {/* download button*/}
                    <button
                      onClick={() => downloadPhoto(item.imageurl, item.title)}
                      className="custom-button transition-opacity duration-300 absolute top-4 right-4 p-3 rounded-full text-white cursor-pointer bg-sky-700"
                    >
                      <DownloadIcon size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="custom-button transition-opacity duration-300 absolute top-16 right-4 p-3 rounded-full text-white cursor-pointer bg-rose-800"
                    >
                      <DeleteIcon size={20} />
                    </button>

                    {/* author image */}
                    <span className="absolute bottom-3 left-3 p-1 bg-white/40 rounded-full">
                      <Image
                        src={item.authorImage}
                        width={30}
                        height={30}
                        className="rounded-full"
                        alt={item.authorName}
                      />
                    </span>
                    {item.public ? (
                      <span className="absolute bottom-4 right-4 bg-white p-2 rounded-full text-black">
                        <PublicIcon />
                      </span>
                    ) : (
                      <span className="absolute bottom-4 right-4 bg-black p-2 rounded-full text-white">
                        <PrivateIcon />
                      </span>
                    )}
                  </motion.div>
                </>
              ))}
            </Masonry>
          </>
        ) : (
          <div className=" grid place-content-center h-[100svh]">
            <GoogleButton
              onClick={() => {
                signIn("google");
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Account;

const CodingwebsaGiftCard = ({ name }) => (
  <>
    <div className="rounded-md">
      <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0 bg-[#111111]">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          {/* <span className="flex max-h-full max-w-full items-center justify-center text-white">
            {Bridge()}
          </span> */}
          <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
        </div>
        {/* <Logo /> */}
        <span className="text-3xl font-bold uppercase tracking-widest">
          {name}
        </span>
        <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
          2023 Personal Vault
        </h1>
        <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
          Our incredible socio community got together in BD. for our first ever
          in-person conference!
        </p>
        <button
          className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
          onClick={() => signOut()}
        >
          → Sign Out
        </button>
      </div>
    </div>
  </>
);
