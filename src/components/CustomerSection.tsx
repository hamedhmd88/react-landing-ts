import { useState, useRef } from "react"; // ✅ هوک‌های ری‌اکت برای state و DOM ref
import { HiArrowLeft, HiArrowRight } from "react-icons/hi"; // آیکون‌های ناوبری اسلایدر
import { BsPlayFill, BsPauseFill } from "react-icons/bs"; // آیکون‌های کنترل ویدیو
import { customerData } from "../data/data"; // ✅ داده‌هایی شامل ویدیو، لوگو، آمار و نظرات مشتریان

// ✅ تعریف کامپوننت تابعی بدون props
const CustomerSection = () => {
  // 🔹 currentSlide: اسلاید فعال فعلی رو نگه‌داری می‌کنه
  // چون index هست، تایپش عددیه
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // 🔹 isPlaying: کنترل وضعیت پخش ویدیو
  // boolean برای تشخیص پخش یا توقف
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // 🔹 sliderRef: ارجاع به div اصلی اسلایدر برای کنترل دستی اسکرول یا future use
  const sliderRef = useRef<HTMLDivElement>(null);

  // ⏪ اسلاید قبلی — اگر اسلاید اول بود، برگرد به آخرین اسلاید
  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? customerData.length - 1 : prev - 1
    );
  };

  // ⏩ اسلاید بعدی — اگر آخرین اسلاید بود، برگرد به اولین
  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === customerData.length - 1 ? 0 : prev + 1
    );
  };

  // ▶️⏸️ کنترل پخش و توقف ویدیو
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);

    // انتخاب ویدیو فعلی بر اساس id ویژگی
    const video = document.querySelector<HTMLVideoElement>(
      `video[data-customer="${customerData[currentSlide].id}"]`
    );

    // پخش یا توقف ویدیو بر اساس وضعیت فعلی
    if (video) {
      isPlaying ? video.pause() : video.play();
    }
  };

  return (
    <section className="overflow-hidden py-24 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🧠 هدر بخش: متن تبلیغاتی و کنترل ناوبری */}
        <div className="flex justify-between items-center mb-16">
          <div className="max-w-[34rem] text-amber-50">
            <h2 className="text-4xl md:text-5xl font-bold">
              The best startup companies build on here
            </h2>
          </div>

          {/* 🔁 دکمه‌های قبل/بعد فقط در دسکتاپ دیده می‌شن */}
          <div className="hidden md:flex gap-4 ">
            <button
              onClick={handlePrevSlide}
              className="p-4 text-amber-50 hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Previous slide"
            >
              <HiArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextSlide}
              className="p-4 text-amber-50 hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Next slide"
            >
              <HiArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 🎥 اسلایدر ویدیو مشتری‌ها */}
        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* 🔁 نمایش ویدیوهای مشتریان به صورت اسلاید */}
            {customerData.map((customer) => (
              <div key={customer.id} className="w-full flex-shrink-0 relative">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  {/* 🎥 ویدیو مشتری */}
                  <video
                    data-customer={customer.id}
                    src={customer.video}
                    poster={customer.poster}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    loop
                  />

                  {/* 🔳 افکت تیره برای کنتراست متن */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* 📝 محتوای روی ویدیو */}
                  <div className="absolute inset-0 p-8 flex flex-col">
                    {/* 📌 لوگوی مشتری */}
                    <img
                      src={customer.logo}
                      alt=""
                      className="h-12 w-auto mb-auto"
                    />

                    {/* 🧠 متن، آمار و دکمه کنترل پخش */}
                    <div className="sm:grid grid-cols-2 hidden items-end gap-8 text-white">
                      <div>
                        <div className="text-6xl font-bold mb-2">
                          {customer.stat}
                        </div>
                        <div className="text-lg">{customer.statDesc}</div>
                      </div>
                      <div>
                        <p className="text-xl mb-4">{customer.quote}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-lg">{customer.author}</div>
                          <button
                            onClick={togglePlayPause}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                          >
                            {isPlaying ? (
                              <BsPauseFill size={24} />
                            ) : (
                              <BsPlayFill size={24} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSection;
