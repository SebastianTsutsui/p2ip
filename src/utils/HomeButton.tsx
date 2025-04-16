import Link from "next/link";

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="absolute top-4 left-4 rounded-lg bg-[#6A4325] px-4 py-2 text-white font-bold hover:bg-[#5a371f]"
    >
      Home
    </Link>
  );
}