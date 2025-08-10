import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const Banner = () => {
  const slides = [
    {
      image: "https://i.ibb.co/6RCGyDkk/Variety-fruits-vegetables.webp",
      title: "🥕 Root Vegetables & Tuber",
      description:
        "Root vegetables and tubers grow underground and are rich in nutrients, fiber, and energy. Common examples include carrots, potatoes, sweet potatoes, radishes, turnips, yams, beets, taro, and parsnips. They are versatile, used in soups, stews, fries, and curries.",
    },
    {
      image:
        "https://i.ibb.co/Vcr0tdhS/percision-blog-header-junk-food-102323.jpg",
      title: "🍔 Junk food",
      description:
        "🍔 Junk food includes burgers, 🍟 fries, 🍕 pizza, 🍫 chocolates, and 🥤 soft drinks.Junk food refers to food that is high in calories from fat, sugar, and/or salt, but low in essential nutrients like vitamins and minerals.",
    },
    {
      image:
        "https://i.ibb.co/KxbqcMKb/SES-chicken-biryani-recipe-7367850-hero-A-ed211926bb0e4ca1be510695c15ce111.jpg",
      title: "🍛 Biriyani",
      description:
        "🍛 Biriyani is a delicious, aromatic rice dish cooked with flavorful spices, tender meat 🍗 or vegetables 🥦, and fragrant basmati rice 🍚. It's a popular festive meal enjoyed worldwide. 😋 ",
    },
    {
      image:
        "https://i.ibb.co/TDDrs37M/gettyimages-1318273747-20241209193727425.jpg",
      title: "🥤 Sugary drinks",
      description:
        "Sugary drinks are beverages with added sugars or sweeteners, including sodas, fruit drinks, sports drinks, and sweetened teas and coffees.",
    },
  ];

  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 10000 }}
        loop={true}
        slidesPerView={1}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-[300px] md:h-[500px]">
              {/* 🖼 Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-md"
              />

              {/* 🧾 Overlay Content */}
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="bg-white/90 dark:bg-gray-800/90 p-6 border-4 border-amber-600 dark:border-amber-500 rounded-2xl max-w-xl text-center backdrop-blur-sm transition-colors duration-300">
                  <h2 className="text-xl md:text-4xl font-bold text-black dark:text-white mb-2 animate-fade-in-up transition-colors duration-300">
                    {slide.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-300 font-medium text-sm md:text-lg animate-fade-in-up delay-200 transition-colors duration-300">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Banner;
