import { A } from "@/app/components/ui/anchor";

const Footer: React.FC = () => (
  <footer className="flex md:flex-row flex-col gap-x-4 text-sm p-1">
    <span>Copyright © 2022 Anthony DePaul Masonry Inc.</span>
    <span className="hidden md:inline-block">|</span>
    <div className="flex justify-center gap-x-4">
      <A href="/">Home</A>
      <span>|</span>
      <A href="/admin">Admin</A>
      <span>|</span>
      <A href="/legal">Legal</A>
    </div>
  </footer>
);

export default Footer;
