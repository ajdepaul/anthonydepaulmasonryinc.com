import DimAdjustment from '@/app/components/admin/dimAdjustment';
import ImageTable from '@/app/components/admin/imageTable';
import SlideshowEditor from '@/app/components/admin/slideshowEditor';
import Container from '@/app/components/container';
import ImageBox from '@/app/components/imageBox';
import { buttonVariants } from '@/app/components/ui/button';
import { H } from '@/app/components/ui/header';
import { getData } from '@/app/util/data';
import { getKindeServerSession, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { IoWarning } from 'react-icons/io5';

const AdminPage: React.FC = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData();
  const titleBgImage = data.titleBg ? data.images[data.titleBg] : undefined;
  const exploreBgImage = data.exploreBg ? data.images[data.exploreBg] : undefined;

  return (
    <>
      <H level="1" className="text-center text-4xl">Admin Page</H>

      <Container className="flex flex-row justify-between items-center">
        <div>User: {user.email}</div>
        <LogoutLink className={buttonVariants()}>Log Out</LogoutLink>
      </Container>

      <Container className="items-stretch">
        <H level="2" className="text-3xl self-stretch text-center">Backgrounds</H>
        <div className="grid grid-cols-2">
          {
            [
              { name: 'title' as 'title' | 'explore', image: titleBgImage, dim: data.titleBgDim },
              { name: 'explore' as 'title' | 'explore', image: exploreBgImage, dim: data.exploreBgDim }
            ].map(({ name, image, dim }) => (
              <div key={name} className='flex flex-col items-center h-48 gap-y-2'>
                <H level="3" className="text-2xl">{name === 'title' ? '1st Background' : '2nd Background'}</H>
                <div className="flex gap-x-2">Dim (%):
                  <DimAdjustment initValue={dim * 100} background={name} />
                </div>
                <div className="relative w-64 h-full">
                  {
                    image ? (
                      <>
                        <Link href={`/admin/image/${name === 'title' ? data.titleBg : data.exploreBg}`}>
                          <ImageBox
                            src={`/images/${image?.filename}`}
                            alt="Title background preview"
                            placeholder={image?.placeholder}
                            className="w-full h-full"
                          />
                        </Link>
                        <div className="absolute inset-0 rounded z-10 bg-black pointer-events-none" style={{ opacity: dim }} />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-theme-light-gray border border-theme-dark-gray rounded">
                        <IoWarning className="text-5xl" />
                      </div>
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
      </Container>

      <Container>
        <H level="2" className="text-3xl self-stretch text-center">Front Page Slideshow</H>
        <SlideshowEditor type="featured" idList={data.featuredImages} images={data.images} />
      </Container>

      <Container>
        <H level="2" className="text-3xl self-stretch text-center">Gallery Images</H>
        <SlideshowEditor type="published" idList={data.publishedImages} images={data.images} />
      </Container>

      <Container className="items-center gap-y-4">
        <H level="2" className="text-3xl self-stretch text-center">Manage Images</H>
        <Link href="/admin/upload" className={buttonVariants()}>Upload Images</Link>
        <ImageTable data={data} />
      </Container>
    </>
  );
};

export default AdminPage;
