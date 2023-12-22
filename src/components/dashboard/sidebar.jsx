import AppLogo from "@/components/app-logo";
import config from "@/config";
import Link from "next/link";
import Button from "@/components/button";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "@/hooks/useAuth";

/**@type {import("framer-motion").Variants} */
const rootVariants = {
  open: { opacity: 1, width: 280, padding: "1rem", clipPath: "inset(0 0 0 0)" },
  closed: {
    opacity: 1,
    width: 0,
    padding: 0,
    clipPath: "inset(0 100% 0 0)",
    transition: { delay: 0.3 },
  },
};

/**@type {import("framer-motion").Variants} */
const navItemsRootVariants = {
  open: {
    transition: { delayChildren: 0.2, staggerChildren: 0.08 },
  },
  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

/**@type {import("framer-motion").Variants} */
const navItemsVariants = {
  open: { opacity: 1, y: 0, transition: { ease: "easeInOut" } },
  closed: { opacity: 0, y: 40, transition: { ease: "easeInOut" } },
};

const MenuItems = () => {
  const { dashboardNavItems: items } = config;
  const pathname = usePathname();

  return (
    <>
      {items.map(({ path, text }) => (
        <motion.li
          key={text}
          variants={navItemsVariants}
          className={"px-2 py-1 rounded-md  text-lg ".concat(
            pathname === path
              ? "bg-indigo-700"
              : "bg-slate-700 hover:bg-slate-600"
          )}
        >
          <Link className="w-full inline-block" href={path}>
            {text}
          </Link>
        </motion.li>
      ))}
    </>
  );
};

const Sidebar = ({ sidebarOpen }) => {
  const { logOutUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logOutUser().then(() => router.replace("/signin"));
  };

  return (
    <motion.aside
      initial="open"
      variants={rootVariants}
      transition={{ ease: "easeInOut" }}
      animate={sidebarOpen ? "open" : "closed"}
      className="flex flex-col bg-gray-800 text-slate-100 whitespace-nowrap h-screen"
    >
      <div className="mb-4">
        <AppLogo />
      </div>

      <motion.ul
        className="flex flex-col gap-y-2"
        variants={navItemsRootVariants}
      >
        <MenuItems />
      </motion.ul>

      <Button
        onClick={handleLogout}
        style={{ paddingBlock: "0.3em" }}
        className="text-xl mt-auto"
      >
        <IoIosLogOut />
        Logout
      </Button>
    </motion.aside>
  );
};

export default Sidebar;
