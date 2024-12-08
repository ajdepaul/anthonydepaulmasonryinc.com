import Container from "@/app/components/container";
import { buttonVariants } from "@/app/components/ui/button";
import { H } from "@/app/components/ui/header";
import Section from "@/app/components/ui/section";
import { readFile } from "fs/promises";
import Link from "next/link";
import path from "path";
import { IoArrowBack } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default async function LegalPage() {
  const attributionsPath = path.join(process.cwd(), 'oss-attribution/attribution.txt');
  const attributions = await readFile(attributionsPath, 'utf-8');

  return (
    <Section className="relative items-center py-8 gap-y-8">
      <H level="1" className="text-3xl sm:text-5xl">Copyright and Open Source Notices</H>
      <Link href="/" className={twMerge(buttonVariants(), 'flex items-center gap-x-2 hover:bg-theme-dark-gray/25')}>
        <IoArrowBack />
        Home
      </Link>

      <Container className="self-stretch flex flex-col items-stretch font-mono text-sm whitespace-pre-wrap gap-0">
        <div>
          {`anthonydepaulmasonryinc.com
Copyright © 2024 Anthony DePaul Masonry Inc.
All rights reserved.
https://github.com/ajdepaul/anthonydepaulmasonryinc.com


******************************

${attributions}`}
        </div>
      </Container>
    </Section>
  )
}
