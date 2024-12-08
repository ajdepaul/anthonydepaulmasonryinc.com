import GallerySlideshow from "@/app/components/gallerySlideshow";
import Nav from "@/app/components/nav";
import TitleSection from "@/app/components/titleSection";
import Section from "@/app/components/ui/section";
import { getData } from "@/app/util/data";

export default async function GalleryPage() {
  const data = getData();
  const galleryImages = data.publishedImages.map((id) => data.images[id]);

  return (
    <>
      <TitleSection
        bgDim={data.titleBgDim}
        bgFilename={data.titleBg && data.images[data.titleBg].filename}
        type="secondary"
      />
      <Section className="flex flex-col items-center gap-y-8 pb-20">
        <Nav page="gallery" />
        <GallerySlideshow images={galleryImages} />
      </Section>
    </>
  )
}
