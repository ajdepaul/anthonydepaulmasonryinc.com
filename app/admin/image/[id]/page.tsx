import ImageForm from "@/app/admin/image/[id]/imageForm";
import Container from "@/app/components/container";
import ImageBox from "@/app/components/imageBox";
import { H } from "@/app/components/ui/header";
import { getData } from "@/app/util/data";
import { notFound } from "next/navigation";

export default async function ImagePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const data = await getData();
  const imageData = data.images[id];
  if (imageData === undefined) { notFound(); }

  return (
    <div className="flex flex-col items-stretch gap-y-8">
      <H level="1" className="text-center text-4xl">Edit Image</H>

      <Container>
        <div className="w-full px-16 py-4">
          <ImageBox
            src={`/images/${imageData.filename}`}
            alt="Image preview"
            className="w-full h-96"
            placeholder={imageData.placeholder}
          />
        </div>

        <ImageForm
          id={id}
          imageData={imageData}
          publishedImages={data.publishedImages}
          featuredImages={data.featuredImages}
          titleBg={data.titleBg}
          exploreBg={data.exploreBg}
        />
      </Container>
    </div>
  );
}
