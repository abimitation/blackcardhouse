import logoImg from "@public/img/logo-plain.png";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function Logo() {
  return (
    <Link href="/">
      <Image className="rounded-[10px]" src={logoImg} width={96} height={32} alt="BlackCardHouse logo" quality={100} />
    </Link>
  );
}
