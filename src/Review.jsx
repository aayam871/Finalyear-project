import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";


const renderStars = (rating) =>
  Array.from({ length: Math.round(rating) }, (_, i) => <span key={i}>⭐</span>);


const customers = [
  {
    name: "Ayush Aryal",
    text: "Fast delivery and the food was hot and fresh! Loved it!",
    rating: 5,
  },
  {
    name: "Prajwal Basnet",
    text: "The app is easy to use and delivery was on time. Great job!",
    rating: 4,
  },
  {
    name: "Prajwal Bikram GC",
    text: "Great service overall. Will definitely order again!",
    rating: 5,
  },
  {
    name: "Madhav Poudel",
    text: "Affordable and tasty food. Very satisfied.",
    rating: 4,
  },
  {
    name: "Beepasa Jung Karki Chhetri",
    text: "Nice packaging and polite delivery person. Thank you!",
    rating: 5,
  },
  {
    name: "Sandesh Bishwokarma",
    text: "Little delay but food was worth the wait. Keep it up!",
    rating: 4,
  },
];

const agents = [
  {
    name: "Aakash Raymajhi",
    text: "Working here has been smooth. Routes are well optimized.",
    rating: 4,
  },
  {
    name: "Prabesh Aryal",
    text: "Payment is always on time. Love the customer interaction.",
    rating: 5,
  },
  {
    name: "Nirmal Pandey",
    text: "App is easy to use for delivery too. Support is good.",
    rating: 4,
  },
  {
    name: "Bimal Ghimire",
    text: "I enjoy delivering food. People are friendly.",
    rating: 5,
  },
];


const ReviewCard = ({ name, text, rating }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-orange-100 p-6 rounded-2xl shadow-md max-w-xl mx-auto"
  >
    <h3 className="text-orange-700 text-lg font-bold mb-2">{name}</h3>
    <p className="text-gray-700 mb-3">"{text}"</p>
    <div className="text-yellow-500 text-xl">{renderStars(rating)}</div>
  </motion.div>
);


const ArrowButtons = ({ swiperRef }) => (
  <div className="relative w-full mt-4">
    <button
      aria-label="Previous slide"
      onClick={() => swiperRef.current?.slidePrev()}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-600 focus:outline-none shadow-md z-10"
    >
      ‹
    </button>
    <button
      aria-label="Next slide"
      onClick={() => swiperRef.current?.slideNext()}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-600 focus:outline-none shadow-md z-10"
    >
      ›
    </button>
  </div>
);

// Main Review Component
const Review = () => {
  const customerSwiperRef = useRef(null);
  const agentSwiperRef = useRef(null);

  const swiperSettings = {
    modules: [Autoplay, Pagination],
    autoplay: {
      delay: 3000, 
      disableOnInteraction: false,
    },
    speed: 1500, 
    pagination: { clickable: true },
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
  };

  return (
    <div className="py-16 px-4 md:px-20 bg-white text-gray-800" id="reviews">
      
      <motion.h2
        className="text-3xl font-bold text-orange-500 text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        What Our Customers Say
      </motion.h2>

      <Swiper
        {...swiperSettings}
        onSwiper={(swiper) => (customerSwiperRef.current = swiper)}
      >
        {customers.map((review, idx) => (
          <SwiperSlide key={idx}>
            <ReviewCard {...review} />
          </SwiperSlide>
        ))}
      </Swiper>
      <ArrowButtons swiperRef={customerSwiperRef} />

     
      <motion.h2
        className="text-3xl font-bold text-orange-500 text-center mt-20 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Reviews from Our Delivery Agents
      </motion.h2>

      <Swiper
        {...swiperSettings}
        onSwiper={(swiper) => (agentSwiperRef.current = swiper)}
      >
        {agents.map((review, idx) => (
          <SwiperSlide key={idx}>
            <ReviewCard {...review} />
          </SwiperSlide>
        ))}
      </Swiper>
      <ArrowButtons swiperRef={agentSwiperRef} />
    </div>
  );
};

export default Review;
