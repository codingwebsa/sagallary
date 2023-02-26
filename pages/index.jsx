import { Bridge } from "@/icons";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";

const arr = [
  { imgurl: "/images/1.jpg" },
  { imgurl: "/images/2.png" },
  { imgurl: "/images/3.jpg" },
  { imgurl: "/images/4.png" },
  { imgurl: "/images/5.jpg" },
  { imgurl: "/images/6.png" },
  { imgurl: "/images/7.jpg" },
  { imgurl: "/images/8.png" },
  { imgurl: "/images/9.jpg" },
  { imgurl: "/images/10.jpg" },
  { imgurl: "/images/11.jpg" },
  { imgurl: "/images/12.jpg" },
];

export default function Home() {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 4,
    500: 1,
  };
  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid w-full"
        columnClassName="my-masonry-grid_column"
      >
        <CodingwebsaGiftCard />
        {arr.map((item, index) => (
          <>
            <Image
              src={item.imgurl}
              width={720}
              height={1080}
              className="w-full h-auto mb-3 rounded-md"
              alt={index}
              key={index}
            />
          </>
        ))}
      </Masonry>
    </>
  );
}

const CodingwebsaGiftCard = () => (
  <>
    <div>
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

export async function getStaticProps(ctx) {
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
    props: {},
  };
}