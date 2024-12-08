import HomeButton from "@/app/components/admin/homeButton";
import Section from "@/app/components/ui/section";

export default async function AdminTemplate({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <Section className="relative items-stretch py-8 gap-y-8">
      <HomeButton />
      {children}
    </Section>
  );
}
