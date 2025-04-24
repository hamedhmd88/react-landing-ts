import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // درستش اینه
import { HiArrowRight } from 'react-icons/hi';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import { tabsData } from '../data/data';
import type { DesignTab } from '../types/type'; // فرض بر اینکه تایپ‌ها را جدا در فایل `types.ts` تعریف کردی

const DesignSection = () => {
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const progressInterval = useRef<number | null>(null);

  const PROGRESS_DURATION = 10000;
  const UPDATE_INTERVAL = 100;

  useEffect(() => {
    startProgressTimer();
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [activeTab]);

  const startProgressTimer = () => {
    setProgress(0);
    if (progressInterval.current) clearInterval(progressInterval.current);

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          const currentIndex = tabsData.findIndex((tab) => tab.id === activeTab);
          const nextIndex = (currentIndex + 1) % tabsData.length;
          setActiveTab(tabsData[nextIndex].id ?? 'tab1');
          return 0;
        }
        return prev + (UPDATE_INTERVAL / PROGRESS_DURATION) * 100;
      });
    }, UPDATE_INTERVAL);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      const newState = !prev;
      const video = document.querySelector<HTMLVideoElement>(`video[data-tab="${activeTab}"]`);
      if (video) {
        if (newState) {
          video.play();
          startProgressTimer();
        } else {
          video.pause();
          if (progressInterval.current) clearInterval(progressInterval.current);
        }
      }
      return newState;
    });
  };

  return (
    <section className="overflow-hidden py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-[50rem] lg:mb-24 mb-16">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-8">
            Launch pixel-perfect sites
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-between gap-16">
            <div>
              <p className="text-2xl text-gray-300">
                Rethink the web dev cycle with CodeTutor. Give your design and marketing teams the power to launch sophisticated sites quickly — so your dev team can focus on more complex work, not pixel-perfect revisions.
              </p>
              <Link
                to="/dashboard/signup"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mt-8"
              >
                Get started
                <span className="font-normal ml-1">— it's free</span>
              </Link>
            </div>

            <div className="space-y-6">
              {tabsData.map((tab: DesignTab) => (
                <div
                  key={tab.id}
                  className="relative pl-4 cursor-pointer"
                  onClick={() => handleTabClick(tab.id ?? '')}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-800">
                    {activeTab === tab.id && (
                      <div
                        className="absolute top-0 left-0 w-full bg-blue-600 transition-all duration-100"
                        style={{ height: `${progress}%` }}
                      />
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {tab.title}
                  </h3>
                  <p className={`text-gray-400 transition-all duration-300 ${activeTab === tab.id ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                    {tab.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="max-w-[640px] mx-auto">
              {tabsData.map((tab: DesignTab) => (
                <div
                  key={tab.id}
                  className={`transition-opacity duration-500 ${activeTab === tab.id ? 'opacity-100' : 'opacity-0 hidden'}`}
                >
                  <video
                    data-tab={tab.id}
                    src={tab.video}
                    poster={tab.poster}
                    className="w-full rounded-lg"
                    autoPlay
                    muted
                    playsInline
                    loop
                  />
                  <div className="flex items-center justify-between mt-4">
                    <Link
                      to={tab.cta?.link ?? '#'}
                      className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
                    >
                      {tab.cta?.text ?? 'Learn more'}
                      <HiArrowRight className="ml-2" />
                    </Link>
                    <button
                      onClick={togglePlayPause}
                      className="p-2 text-white hover:text-gray-300"
                    >
                      {isPlaying ? <BsPauseFill size={24} /> : <BsPlayFill size={24} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
