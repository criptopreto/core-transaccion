import { UserIcon } from "@heroicons/react/outline";
import { FaHome } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { XIcon } from "@heroicons/react/outline";
import { RiShieldStarFill } from "react-icons/ri";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "../redux/appSlice";
import Image from "next/image";
import logoImg from "../public/assets/images/logo.svg";

const navigation = [
  { name: "Inicio", href: "/home", icon: FaHome },
  { name: "Transacciones", href: "/transactions", icon: BiTransfer },
  {
    name: "Cuentas registradas",
    href: "/accounts",
    icon: MdOutlineAccountBalanceWallet,
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const user = useSelector((state) => state.app.user);
  const sidebarOpen = useSelector((state) => state.app.sidebarOpen);
  const dispatch = useDispatch();
  const handleSidebar = (action) => {
    dispatch(setSidebarOpen(action));
  };
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={handleSidebar}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-slate-700">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => dispatch(setSidebarOpen(false))}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center">
                  <div className="bg-violet-500/50 w-full p-2 flex items-center gap-3">
                    <RiShieldStarFill className="w-16 h-16 text-indigo-100" />
                    <div>
                      <div className="font-semibold text-indigo-200 text-xl">
                        {user.name}
                      </div>
                      <div className="text-indigo-50 font-light">
                        {user.id_card}
                      </div>
                      <div className="text-indigo-50">{user.phone}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? "bg-slate-800 text-white"
                              : "text-slate-100 hover:bg-slate-600",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className="mr-4 flex-shrink-0 h-6 w-6 text-slate-300"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div>
                  <div className="flex justify-between px-4">
                    <span className="text-white text-sm font-semibold">
                      Super Pay
                    </span>
                    <span className="text-white text-sm">0.1.3</span>
                  </div>
                  <div className="px-4">
                    <hr />
                  </div>
                  <div className="px-4"></div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-slate-700 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/">
              <a>
                <Image className="h-8 w-auto" src={logoImg} alt="Workflow" />
              </a>
            </Link>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={classNames(
                      item.current
                        ? "bg-slate-800 text-white"
                        : "text-slate-100 hover:bg-slate-600",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6 text-slate-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
