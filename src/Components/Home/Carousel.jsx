// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";

export default function Carousel() {
  return (
    <div className="my-10 relative z-0">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image="https://images.unsplash.com/photo-1470093851219-69951fcbb533?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            text="Find Your Furry Friend Today!"
            para="Discover the joy of companionship by adopting a loving pet. Explore our diverse range of animals waiting for their forever home"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="https://images.unsplash.com/photo-1497752531616-c3afd9760a11?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            text="Adopt, Don’t Shop: Save a Life"
            para="Join our mission to provide loving homes for pets in need. Your new best friend is just a click away!"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="https://images.unsplash.com/photo-1558236714-d1a6333fce68?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            text="Bringing Pets and People Together"
            para="Experience the unconditional love of a pet. Start your adoption journey and make a difference in both your lives."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
