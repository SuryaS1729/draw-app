import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div>
    draw app frontend
    <Link href={"/signin"}>
    <button>SIGNIN</button></Link>
    <Link href={"/signup"}>
    <button>SIGNUP</button></Link>
    
    
   </div>
  );
}
