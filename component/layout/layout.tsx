import { cookies } from "next/headers";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

const menuItems = [
  {
    href: "/",
    title: "Homepage",
  },
  {
    href: "/about",
    title: "About",
  },
  {
    href: "/contact",
    title: "Contact",
  },
];

export async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return (
      <div className="flex flex-row">
        <div className="bg-gray-100 dark:bg-gray-900 flex-1">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <Sidebar />

      <div className="bg-gray-100 dark:bg-gray-900 flex-1">
        <Navbar />

        <div className="px-4 flex">{children}</div>
      </div>
    </div>
  );
}
