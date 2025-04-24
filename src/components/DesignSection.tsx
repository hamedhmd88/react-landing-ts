import { useState, useEffect, useRef } from "react"; // ✅ هوک‌های ری‌اکت برای مدیریت state و DOM manipulation
import { Link } from "react-router-dom"; // ✅ برای لینک‌دهی داخلی در اپلیکیشن‌های SPA
import { HiArrowRight } from "react-icons/hi"; // آیکن جهت‌دهی
import { BsPlayFill, BsPauseFill } from "react-icons/bs"; // آیکن کنترل پخش و توقف ویدیو
import { tabsData } from "../data/data"; // ✅ داده‌های مربوط به تب‌ها
import type { DesignTab } from "../types/type"; // ✅ تایپ امن و دقیق برای هر تب

// ✅ کامپوننت اصلی با نام DesignSection
const DesignSection = () => {
  // 🔹 track کردن تب فعال با استفاده از ID
  const [activeTab, setActiveTab] = useState<string>("tab1");

  // 🔹 وضعیت پخش ویدیو: true => پخش، false => توقف
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // 🔹 درصد پیشرفت انیمیشن نوار تب فعال
  const [progress, setProgress] = useState<number>(0);

  // 🔹 ref برای نگهداری شناسه تایمر (setInterval)
  const progressInterval = useRef<number | null>(null);

  // ثابت‌هایی برای کنترل زمان‌بندی انیمیشن
  const PROGRESS_DURATION = 10000; // در 10 ثانیه کامل بشه
  const UPDATE_INTERVAL = 100; // هر 100ms یک‌بار آپدیت بشه

  // ✅ تایمر پیشرفت هر بار که تب تغییر کنه
  useEffect(() => {
    startProgressTimer();

    // cleanup: تایمر قبلی حذف بشه
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [activeTab]);

  // ✅ تابع راه‌اندازی تایمر نوار پیشرفت
  const startProgressTimer = () => {
    setProgress(0);

    if (progressInterval.current) clearInterval(progressInterval.current);

    // راه‌اندازی setInterval برای افزایش progress
    progressInterval.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // وقتی progress کامل شد، بریم به تب بعدی
          const currentIndex = tabsData.findIndex(
            (tab) => tab.id === activeTab
          );
          const nextIndex = (currentIndex + 1) % tabsData.length;
          setActiveTab(tabsData[nextIndex].id ?? "tab1");
          return 0;
        }
        return prev + (UPDATE_INTERVAL / PROGRESS_DURATION) * 100;
      });
    }, UPDATE_INTERVAL);
  };

  // ✅ وقتی کاربر روی تب کلیک کرد، تب رو فعال و تایمر رو ریست کن
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsPlaying(true);
    setProgress(0);
  };

  // ✅ کنترل پخش یا توقف ویدیو (همچنین ریست تایمر اگر پخش شد)
  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      const newState = !prev;

      const video = document.querySelector<HTMLVideoElement>(
        `video[data-tab="${activeTab}"]`
      );

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
        {/* 🔹 عنوان اصلی صفحه */}
        <div className="max-w-[50rem] lg:mb-24 mb-16">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-8">
            Launch pixel-perfect sites
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* 🔹 ستون چپ: توضیحات و تب‌ها */}
          <div className="flex flex-col justify-between gap-16">
            <div>
              <p className="text-2xl text-gray-300">
                Rethink the web dev cycle with CodeTutor...
              </p>
              <Link to="/dashboard/signup" className="...">
                Get started <span>— it's free</span>
              </Link>
            </div>

            {/* ✅ لیست تب‌ها + نوار پیشرفت */}
            <div className="space-y-6">
              {tabsData.map((tab: DesignTab) => (
                <div
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id ?? "")}
                  className="relative pl-4 cursor-pointer"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-800">
                    {activeTab === tab.id && (
                      <div
                        className="absolute top-0 left-0 w-full bg-blue-600"
                        style={{ height: `${progress}%` }}
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {tab.title}
                  </h3>
                  <p
                    className={`... ${
                      activeTab === tab.id
                        ? "opacity-100 text-gray-300"
                        : "opacity-0 h-0 overflow-hidden"
                    }`}
                  >
                    {tab.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 🔹 ستون راست: نمایش ویدیو هر تب */}
          <div className="relative">
            <div className="max-w-[640px] mx-auto">
              {tabsData.map((tab: DesignTab) => (
                <div
                  key={tab.id}
                  className={`transition-opacity duration-500 ${
                    activeTab === tab.id ? "opacity-100" : "opacity-0 hidden"
                  }`}
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
                      to={tab.cta?.link ?? "#"}
                      className="text-white hover:text-gray-300"
                    >
                      {tab.cta?.text ?? "Learn more"}
                      <HiArrowRight className="ml-2" />
                    </Link>
                    <button
                      onClick={togglePlayPause}
                      className="p-2 text-white hover:text-gray-300"
                    >
                      {isPlaying ? (
                        <BsPauseFill size={24} />
                      ) : (
                        <BsPlayFill size={24} />
                      )}
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
