import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-blue-400 px-4 py-3 md:px-8">
      <Link href="/">
        <div className="text-white font-bold text-lg md:text-xl cursor-pointer">
          Gongbu
        </div>
      </Link>
      <div className="hidden md:flex space-x-4">
        <NavLink href="/checkLogin">Lists</NavLink>
        <NavLink href="/playGame">Play Game</NavLink>
        <NavLink href="/login">Login</NavLink>
        <NavLink href="/register">Register</NavLink>

      </div>
      <div className="md:hidden">
        <MobileMenuButton />
      </div>
    </nav>
  );
}

const NavLink = ({ href, children }) => (
  <Link href={href}>
    <div className="text-white hover:bg-skyblue px-2 py-1 rounded-md transition duration-300 cursor-pointer">
      {children}
    </div>
  </Link>
);

const MobileMenuButton = () => (
  <button className="text-white focus:outline-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-8 h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  </button>
);
