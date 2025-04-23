import React, { useEffect, useRef, useState } from "react";

type Item = {
  id: string;
  text: string;
  image: string;
};

const items: Item[] = [
  {
    id: "item-1",
    text: "Modern web applications require strong visual storytelling...",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
  },
  {
    id: "item-2",
    text: "Responsiveness and accessibility are no longer optional...",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    id: "item-3",
    text: "Design is not just how it looks, but how it works...",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  },
];

const ScrollTriggered: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const markerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateActiveIndex = () => {
      const marker = markerRef.current;
      if (!marker) return;

      const markerY = marker.getBoundingClientRect().top;

      let closestIndex = 0;
      let closestDistance = Infinity;

      document.querySelectorAll(".text-block").forEach((block, index) => {
        const rect = block.getBoundingClientRect();
        const blockMiddle = (rect.top + rect.bottom) / 2;
        const distance = Math.abs(markerY - blockMiddle);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener("scroll", updateActiveIndex);
    return () => window.removeEventListener("scroll", updateActiveIndex);
  }, []);

  return (
    <div className="relative">
      {/* Marker in center of screen */}
      <div
        ref={markerRef}
        className="fixed top-1/2 left-0 w-full h-0 pointer-events-none"
      />

      <div className="flex flex-col lg:flex-row gap-10 p-8">
        {/* Right Column: Sticky Image */}
        <div className="lg:w-1/2 w-full lg:sticky top-24 h-fit">
          <div className="w-full overflow-hidden rounded-xl shadow-2xl transition-all duration-700">
            <img
              key={items[activeIndex].id}
              src={items[activeIndex].image}
              alt={`Visual for ${items[activeIndex].id}`}
              className="w-full h-full object-cover rounded-xl transition-opacity duration-700 opacity-100"
            />
          </div>
        </div>

        {/* Left Column: Text */}
        <div className="lg:w-1/2 w-full space-y-32 md:space-y-40">
          {items.map((item) => (
            <div
              key={item.id}
              data-id={item.id}
              className="text-block text-xl font-medium min-h-[60vh] leading-relaxed border-l-4 border-amber-500 pl-6 rounded-xl shadow-lg bg-white text-black"
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollTriggered;
