import { H } from "@/app/components/ui/header";

const TitleSection: React.FC<{
  bgFilename?: string,
  bgDim: number,
  type: 'primary' | 'secondary'
}> = ({
  bgFilename,
  bgDim,
  type
}) => {
    return (
      <div className="relative" >
        {/* background */}
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, ${bgDim}), rgba(0, 0, 0, ${bgDim})),url('/images/${bgFilename}')`,
            height: 'calc(100% + 14rem)'
          }}
          className={`absolute -z-10 w-full bg-center bg-cover bg-fixed`}
        />
        <section className={`flex items-center justify-center ${type === 'primary' ? 'h-[72vh]' : 'h-[30vh]'}`}>
          <div className="flex flex-col items-start gap-y-2 px-4">
            <H
              level="1"
              className="text-theme-gold lg:text-7xl md:text-5xl sm:text-4xl text-2xl drop-shadow-lg"
            >
              Anthony&nbsp;DePaul Masonry&nbsp;Inc.
            </H>
            <H
              level="2"
              className="text-white lg:text-4xl md:text-3xl sm:text-2xl text-lg drop-shadow-lg"
            >
              Montgomery County, PA
            </H>
          </div>
        </section>
      </div>
    );
  };

export default TitleSection;
