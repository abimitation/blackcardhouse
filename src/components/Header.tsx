import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Nav from "./Nav";

export default function Header() {
  // const isClient = useIsClient();

  return (
    <header className="py-2 ps-6 pe-2 xl:px-0 xl:py-4">
      <div className="container mx-auto flex items-center gap-x-10 xl:max-w-7xl">
        <Logo />
        {/* {isClient && <Nav className="ms-auto max-xl:hidden" />} */}
        <Nav className="ms-auto max-xl:hidden" />
        <LocaleSwitcher />
        <MobileMenu />
      </div>
    </header>
  );
}
