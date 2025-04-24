import { features } from "../data/data";

const FeaturesSection = () => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col text-white border-t border-white/20 pt-8"
            >
              <div className="mb-4 text-white" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-gray-500 mb-4 flex-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
