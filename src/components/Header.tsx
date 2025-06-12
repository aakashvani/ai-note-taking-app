import { shadow } from "@/styles/utils";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const user = null;
  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{
        boxShadow: shadow,
      }}
    >
      <Link href={"/"} className="item-end flex gap-2">
        <Image
          src="/goatius.png"
          alt="logo"
          height={60}
          width={60}
          className="rounded-full"
          priority
        />
        <h1 className="flex flex-col pb-1 text-2xl leading-6 font-semibold">
          GOAT <span>Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4">{user ? "Logout" : <> </>}</div>
    </header>
  );
}

export default Header;
