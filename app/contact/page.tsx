import Container from "@/app/components/container";
import Nav from "@/app/components/nav";
import TitleSection from "@/app/components/titleSection";
import { H } from "@/app/components/ui/header";
import Section from "@/app/components/ui/section";
import ContactForm from "@/app/contact/contactForm";
import { getData } from "@/app/util/data";
import Link from "next/link";

export default async function ContactPage() {
  const data = getData();
  return (
    <>
      <TitleSection
        bgDim={data.titleBgDim}
        bgFilename={data.titleBg && data.images[data.titleBg].filename}
        type="secondary"
      />
      <Section outerClassname="grow" className="flex flex-col items-center gap-y-8 pb-20">
        <Nav page="contact" />
        <Container className="self-stretch grid sm:grid-cols-2 gap-8 p-8">
          <div className="h-full flex items-center">
            <p>
              Have questions or want to discuss your next project? Please fill out the contact form
              and get in touch. Whether you need more information, advice, or are ready to get
              started, we're here to help. Additional contact details, including our phone number
              and email, are listed below for your convenience.
            </p>
          </div>
          <ContactForm />
          {/* </div> */}
        </Container>
        <div className="self-stretch grow flex flex-col items-center justify-center gap-4">
          <H level="3" className="text-3xl">Contact Details</H>
          <div>Phone: <Link href="tel:215-669-6843" className="underline">(215) 669-6843</Link></div>
          <div>Email: <Link href="mailto:ajdmasonry@gmail.com" className="underline">ajdmasonry@gmail.com</Link></div>
        </div>
      </Section>
    </>
  )
}
