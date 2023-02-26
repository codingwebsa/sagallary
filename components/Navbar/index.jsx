import { HomeIcon, MenuIcon, UserIcon } from "@/icons";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <header className="fixed bottom-0 right-0 w-full flex justify-center items-center py-4 z-[9999]">
        <nav className="border border-slate-800 rounded-md">
          <ul className="flex bg-white text-black rounded-md py-4 px-2 shadow-custom">
            {arr.map((item, _i) => (
              <Link href={item.href} key={_i}>
                <li className="px-4 py-2 border-r border-r-slate-400 last:border-none cursor-pointer">
                  <item.icon size={24} className="text-slate-700" />
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
    name: "Menu",
    href: "/",
    icon: MenuIcon,
  },
  {
    name: "User",
    href: "/account",
    icon: UserIcon,
  },
];
