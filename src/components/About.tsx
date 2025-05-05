import { useEffect, useRef, useState } from "react"; // هوک‌های ری‌اکت برای مدیریت state و DOM
import { HiArrowRight } from "react-icons/hi"; // آیکن برای لینک
import { aboutFeatures } from "../data/data"; // داده‌هایی شامل ویژگی‌های مختلف بخش درباره‌ی ما

// ✅ تعریف کامپوننت با React.FC که به صورت کامل تایپ شده (Functional Component)
const About = () => {
  // ✅ مدیریت state برای مشخص کردن ویژگی فعال (feature که در حال نمایش ویدیو هست)
  const [activeFeature, setActiveFeature] = useState<number>(0);

  // ✅ رفرنس برای سکشن ویژگی‌ها — می‌تونه برای اسکرول یا انیمیشن استفاده بشه
  const featuresRef = useRef<HTMLDivElement | null>(null);

  // ✅ رفرنس برای نگهداری observer تا بعداً بتونیم disconnect کنیم (برای جلوگیری از memory leak)
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ✅ زمانی که کامپوننت بارگذاری شد، این effect اجرا می‌شه
  useEffect(() => {
    // 🔹 تعریف تنظیمات observer: زمانی فعال بشه که حداقل 50٪ از عنصر دیده بشه
    const options: IntersectionObserverInit = {
      root: null, // یعنی پنجرهٔ مرورگر
      rootMargin: "0px",
      threshold: 0.5,
    };

    // 🔹 ساخت observer برای تشخیص اینکه کدوم ویژگی در viewport قرار داره
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          const index = aboutFeatures.findIndex((feature) => feature.id === id);
          if (index !== -1) {
            setActiveFeature(index); // ✅ مشخص کردن کدوم ویژگی فعاله

            // 🎥 پخش ویدیو مربوط به اون ویژگی
            const video = document.querySelector<HTMLVideoElement>(
              `video[data-feature="${id}"]`
            );
            if (video) video.play();
          }
        }
      });
    }, options);

    // 🔹 ثبت observer روی همه‌ی آیتم‌های ویژگی
    const featureElements =
      document.querySelectorAll<HTMLElement>(".feature-item");
    featureElements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    // 🔚 در زمان cleanup، observer رو غیر فعال کن
    return () => {
      observerRef.current?.disconnect();
    };
  }, []); // فقط یک بار در mount اجرا می‌شه

  return (
    <section className="bg-black text-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 📌 Header اصلی صفحه */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-32 gap-8">
          <div className="md:mb-24">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 max-w-[50rem]">
              AI at CodeTutor
            </h2>
          </div>

          {/* 📄 توضیحاتی در مورد AI در CodeTutor */}
          <div className="mb-24">
            <p className="text-xl text-gray-300 mb-8 max-w-[35rem]">
              Write, edit, and update content — or generate it with the help of
              AI ...
            </p>
            <a
              href="https://webflow.com/ai"
              className="inline-flex items-center text-white hover:text-gray-300 text-lg font-medium transition-colors"
            >
              Discover AI at CodeTutor
              <HiArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-32 gap-8">
          {/* 🎥 بخش چپ: نمایش ویدیو مربوط به ویژگی فعال */}
          <div>
            <div className="sticky top-24">
              <div className="aspect-square rounded-lg overflow-hidden border border-white/20">
                <video
                  key={aboutFeatures[activeFeature].id} // کلید باعث refresh مجدد می‌شه وقتی ویژگی عوض شد
                  data-feature={aboutFeatures[activeFeature].id}
                  src={aboutFeatures[activeFeature].video}
                  poster={aboutFeatures[activeFeature].poster}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  loop
                  autoPlay
                />
              </div>
            </div>
          </div>

          {/* 📋 بخش راست: لیست ویژگی‌ها با scroll detection */}
          <div>
            {/* 🔹 ویژگی ابتدایی ثابت */}
            <div className="md:mb-28 mb-16 md:h-72 border-b border-white/10 pb-16">
              <div className="max-w-[35ch] mb-4">
                <h3 className="text-2xl font-semibold">
                  Generate styled content quickly
                </h3>
              </div>
              <p className="text-xl text-gray-300 mb-8 max-w-[35rem]">
                codetutor's AI tools elevate your web projects ...
              </p>
              <a
                href="https://webflow.com/ai"
                className="inline-flex items-center text-white hover:text-gray-300 text-lg font-medium transition-colors"
              >
                Discover AI at CodeTutor
                <HiArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>

            {/* 🔁 سایر ویژگی‌ها با scroll-detection برای تغییر ویدیو */}
            <div ref={featuresRef} className="space-y-24">
              {aboutFeatures.map((feature) => (
                <div
                  key={feature.id}
                  id={feature.id}
                  className="feature-item scroll-mt-24 md:h-72 border-b border-white/10 pb-16"
                >
                  <div className="max-w-[35ch] mb-4">
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-xl text-gray-300 mb-8 max-w-[35rem]">
                    {feature.description}
                  </p>
                  <a
                    href={feature.link}
                    className="inline-flex items-center text-white hover:text-gray-300 text-lg font-medium transition-colors"
                  >
                    {feature.linkText}
                    <HiArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
