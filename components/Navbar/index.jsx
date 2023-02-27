import { HomeIcon, PlusIcon, UserIcon } from "@/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const { pathname } = useRouter();
  return (
    <>
      <header className="fixed bottom-0 right-0 w-full flex justify-center items-center py-4 z-[9999]">
        <nav className="border border-slate-800 rounded-md">
          <ul className="flex bg-white text-black rounded-md p-2 shadow-custom gap-1">
            {arr.map((item, _i) => (
              <Link href={item.href} key={_i}>
                <li
                  className={`p-4 border-r border-r-slate-400 last:border-none rounded-full cursor-pointer ${
                    pathname == item.href ? "bg-blue-800 text-white" : ""
                  }`}
                >
                  <item.icon size={24} className="" />
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

const arr = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Add",
    href: "/add",
    icon: PlusIcon,
  },
  {
    name: "User",
    href: "/account",
    icon: UserIcon,
  },
];
