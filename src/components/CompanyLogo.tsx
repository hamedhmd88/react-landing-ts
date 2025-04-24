import { logos } from "../data/data";

const CompanyLogo = () => {
  return (
    <div className="relative bg-black overflow-hidden md:py-16 py-8">
      {/* Marquee animation container */}
      <div className="flex animate-marquee">
        {/* Double the logos array for seamless looping */}
        {[logos, logos].map((logosSet, setIndex) => (
          <div
            key={setIndex}
            className="flex flex-shrink-0 min-w-full items-center justify-around px-4"
          >
            {logosSet.map((logo, index) => (
              <img
                key={`${setIndex}-${index}`}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="mx-8  object-contain flex-shrink-0"
                loading="lazy"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-black to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-black to-transparent"></div>
    </div>
  );
};

export default CompanyLogo;
