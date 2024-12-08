import { A } from "@/app/components/ui/anchor";

const Footer: React.FC = () => (
  <footer className="flex gap-x-4 text-sm p-1">
    <span>Copyright © 2022 Anthony DePaul Masonry Inc.</span>
    <span>|</span>
    <A href="/">Home</A>
    <span>|</span>
    <A href="/admin">Admin</A>
    <span>|</span>
    <A href="/legal">Legal</A>
  </footer>
);

export default Footer;
