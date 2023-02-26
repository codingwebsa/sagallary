import { Navbar } from "..";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-nunito",
});

const Layout = ({ children }) => {
  return (
    <>
      <div className={`${nunito.variable} font-nunito mx-auto border-x px-4`}>
        <main className="py-4">
          <div>{children}</div>
        </main>
        <Navbar />
      </div>
    </>
  );
};

export default Layout;
