import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex px-10 py-5 justify-center gap-10 bg-gray-700">
      <Link href="/loginPage">Log in</Link>
      <Link href="/createAccount">Sign up</Link>
    </div>
  );
}
