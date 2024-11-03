import { useSwiper } from "swiper/react";

export const SlidePrevButton = () => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slidePrev()}
      className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
    >
      ＜
    </button>
  );
};
