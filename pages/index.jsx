import { Bridge, DeleteIcon, DownloadIcon } from "@/icons";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import useSWR from "swr";
import { Triangle } from "react-loader-spinner";
import { useEffect, useState } from "react";
import downloadPhoto from "@/utils/downloadPhotos";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
};

export default function Home({ session }) {
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
    const _temp = data?.filter((item) => {
      // console.log(item);
      return item.public;
    });
    setPosts(_temp);
  }, [data]);

  return (
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
        <CodingwebsaGiftCard />
        {posts?.map((item, index) => (
          <>
            <motion.div
              key={item.id}
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
                className="w-full h-auto mb-3 rounded-md cursor-zoom-in"
                alt={item.title}
                draggable={false}
              />

              {/* download button*/}
              <button
                onClick={() => downloadPhoto(item.imageurl, item.title)}
                className="custom-button transition-opacity duration-300 absolute top-4 right-4 p-3 rounded-full text-white cursor-pointer bg-sky-700"
              >
                <DownloadIcon size={20} />
              </button>
              {item.authorEmail == session.user.email ||
                ("codingwebsa@gmail.com" && (
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="custom-button transition-opacity duration-300 absolute top-16 right-4 p-3 rounded-full text-white cursor-pointer bg-rose-800"
                  >
                    <DeleteIcon size={20} />
                  </button>
                ))}
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
            </motion.div>
          </>
        ))}
      </Masonry>
    </>
  );
}

const CodingwebsaGiftCard = () => (
  <>
    <div className="rounded-md">
      <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0 bg-[#111111]">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <span className="flex max-h-full max-w-full items-center justify-center text-white">
            {Bridge()}
          </span>
          <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
        </div>
        {/* <Logo /> */}
        <span className="text-3xl font-bold uppercase tracking-widest">
          Coding SA
        </span>
        <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
          2023 Personal Vault
        </h1>
        <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
          Our incredible socio community got together in BD. for our first ever
          in-person conference!
        </p>
        <Link
          className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
          href="https://www.buymeacoffee.com/codingwebsa"
          target="_blank"
          rel="noreferrer"
        >
          Buy me a ☕
        </Link>
      </div>
    </div>
  </>
);

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
}
