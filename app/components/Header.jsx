import { useDispatch } from "react-redux";
import { setSidebarOpen } from "../redux/appSlice";
import { CgMenuGridO } from "react-icons/cg";
import { BellIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";
import useSocket from "../config/useSocket.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const socket = useSocket();
  const { user, mutateUser } = useUser({
    redirectTo: "/auth/signin",
  });
  const dispatch = useDispatch();

  const userNavigation = [
    { name: "Perfil", href: "/profile/1", action: null },
    {
      name: "Cerrar Sesión",
      href: "/auth/signout",
      action: async () => {
        socket.disconnect();
        mutateUser(
          await fetchJson("/api/auth/logout", { method: "POST" }),
          false
        );
        sessionStorage.removeItem("socket");
        sessionStorage.removeItem("session_id");
      },
    },
  ];

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-transparent">
      <button
        type="button"
        className="px-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500 md:hidden"
        onClick={() => {
          dispatch(setSidebarOpen(true));
        }}
      >
        <span className="sr-only">Open sidebar</span>
        <CgMenuGridO className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex w-full items-center">
          <div className="text-center mx-auto text-slate-50 text-2xl font-medium">
            <span className="ml-8">Super Pay{"\u00ae"}</span>
          </div>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="bg-transparent p-1 rounded-full text-slate-100 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                <span className="sr-only">Open user menu</span>
                <Image
                  className="h-10 w-10 rounded-full outline-indigo-700"
                  src="/assets/images/profile.svg"
                  alt="profile"
                  width={40}
                  height={40}
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => {
                  return (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link href={item.href}>
                          <a
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
                            )}
                            onClick={item.action}
                          >
                            {item.name}
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  );
                })}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
