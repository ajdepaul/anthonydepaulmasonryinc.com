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
            backgroundImage: `linear-gradient(rgba(0, 0, 0, ${bgDim}), rgba(0, 0, 0, ${bgDim})),url('/images/${bgFilename}')`
          }}
          className={`absolute -z-10 w-full bg-center bg-cover bg-fixed ${type === 'primary' ? 'h-[132%]' : 'h-[175%]'}`}
        />
        <section className={`flex items-center justify-center ${type === 'primary' ? 'h-[72vh]' : 'h-[30vh]'}`}>
          <div className="flex flex-col items-start gap-y-2">
            <H level="1" className="text-theme-gold text-7xl drop-shadow-lg">Anthony DePaul Masonry Inc.</H>
            <H level="2" className="text-white text-4xl drop-shadow-lg">Montgomery County, PA</H>
          </div>
        </section>
      </div>
    );
  };

export default TitleSection;
