import { useSwiper } from "swiper/react";

export const SlideNextButton = () => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideNext()}
      className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
    >
      ＞
    </button>
  );
};
