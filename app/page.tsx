'use server';

import Nav from '@/app/components/nav';
import Slideshow from '@/app/components/slideshow';
import TitleSection from '@/app/components/titleSection';
import { buttonVariants } from '@/app/components/ui/button';
import { H } from '@/app/components/ui/header';
import Section from '@/app/components/ui/section';
import { getData } from '@/app/util/data';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export default async function HomePage() {
  const data = await getData();
  const slideShowImages = data.featuredImages.map((id) => data.images[id]);

  return (
    <>
      <TitleSection
        bgDim={data.titleBgDim}
        bgFilename={data.titleBg && data.images[data.titleBg].filename}
        type="primary"
      />

      {/* about */}
      <Section className="flex flex-col items-center md:gap-y-8 gap-y-4 pb-20">
        <Nav page="home" />
        <Slideshow images={slideShowImages} />
        <H level="3" className="text-3xl">- About -</H>
        <p>
          Anthony DePaul is an experienced mason who has been working in the field for over [years] years. His
          commitment to craftsmanship and attention to detail have earned him a reputation for delivering high-quality
          results on every project. Whether you're looking to enhance your home's curb appeal, improve its structural
          integrity, or create a stunning feature, Anthony DePaul has the skills and expertise to bring your vision to
          life.
        </p>
        <p>
          At the heart of Anthony DePaul's work is a dedication to understanding his clients' needs and ensuring their
          satisfaction. Each project is approached with care, precision, and a passion for creating durable, lasting
          results. With [years] years of experience, he has developed a wide range of techniques and a deep
          understanding of materials, ensuring that every job is completed to the highest standard.
        </p>
        <div className="self-stretch flex justify-around">
          <ul className="list-disc">
            <li>Stone</li>
            <li>Concrete</li>
            <li>Brick</li>
            <li>Stucco</li>
            <li>Foundations</li>
          </ul>
          <ul className="list-disc">
            <li>Block</li>
            <li>Pointing</li>
            <li>Fireplaces</li>
            <li>Flagstone</li>
            <li>Waterproofing</li>
          </ul>
        </div>
        <p>
          When you work with Anthony DePaul, you're choosing a mason who is as invested in the success of your project
          as you are. His goal is to combine functionality and beauty to deliver a result that stands the test of time.
        </p>
      </Section>

      {/* Gallery/Contact */}
      <div
        className="bg-center bg-cover bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, ${data.exploreBgDim}), rgba(0, 0, 0, ${data.exploreBgDim})),
          url('/images/${data.exploreBg && data.images[data.exploreBg].filename}')`
        }}
      >
        <Section className="md:grid md:grid-cols-2 flex flex-col md:gap-32 gap-16 md:py-32 py-16">
          <div className="h-full md:pb-64">
            <div className="flex flex-col items-center gap-5 bg-theme-dark-gray text-white shadow-lg p-8 rounded-lg">
              <H level="3" className="text-3xl">- Our Work -</H>
              <p>
                We're proud of the work we've done, and we invite you to see it for yourself. Our gallery showcases a
                wide range of projects, from timeless stone and brickwork to waterproofing and foundation repairs. Each
                project reflects the skill, care, and dedication we bring to every job. Browse our gallery to get
                inspired and see the results we can deliver for you.
              </p>
              <Link href="/gallery" className={twMerge(buttonVariants(), 'border-theme-gold text-theme-gold hover:bg-theme-light-gray/25')}>Gallery</Link>
            </div>
          </div>
          <div className="h-full md:pt-64">
            <div className="flex flex-col items-center gap-5 bg-theme-dark-gray text-white shadow-lg p-8 rounded-lg">
              <H level="3" className="text-3xl">- Free Estimates -</H>
              <p>
                Getting started on your next project is easy with our free estimate service. We believe every great
                project begins with clear communication and upfront planning. Whether you're considering new masonry,
                repairs, or custom designs, we'll provide you with a detailed, no-obligation quote tailored to your
                needs. Reach out today and let's discuss how we can bring your ideas to life.
              </p>
              <Link href="/contact" className={twMerge(buttonVariants(), 'border-theme-gold text-theme-gold hover:bg-theme-light-gray/25')}>Contact</Link>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
