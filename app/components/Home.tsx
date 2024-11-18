"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "./Footer";
import HomeResources from "./HomeResources";
import TechGrid from "./TechGrid";
import CompanyGrid from "./CompanyGrid";

const AnimatedText = ({ text, delay = 0, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const characters = text.split("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <span className="inline-block overflow-hidden">
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + index * 0.2,
          }}
          onAnimationComplete={() => {
            if (index === characters.length - 1) {
              onComplete?.();
            }
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const Home = () => {
  const [isFirstTextComplete, setIsFirstTextComplete] = useState(false);
  const [isSecondTextComplete, setIsSecondTextComplete] = useState(false);

  return (
    <div>
      <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#e6f4f1]">
        <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-10"></div>
        <div className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#e6f4f1] to-[#f0f7f5]"></div>
        <div className="relative flex min-h-[90vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-800 md:text-5xl lg:text-6xl">
              <div className="flex flex-col items-end">
                <AnimatedText
                  text="Learn Hubで見つける"
                  delay={0}
                  onComplete={() => setIsFirstTextComplete(true)}
                />
                {isFirstTextComplete && (
                  <span className="mt-2 block mb-4">
                    <AnimatedText
                      text="無料で学ぶ"
                      delay={0}
                      onComplete={() => setIsSecondTextComplete(true)}
                    />
                  </span>
                )}
              </div>
            </h1>
            <p className="mb-8 text-xl text-emerald-600 md:text-2xl">
              Database for free tech resources
            </p>
            {isSecondTextComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href="#"
                  className="group inline-flex items-center rounded-full bg-emerald-500 px-8 py-5 text-lg font-medium text-white transition-colors hover:bg-emerald-600"
                >
                  What is Learn Hub
                  <svg
                    className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <CompanyGrid />
      <TechGrid />
      <HomeResources />
      <Footer />
    </div>
  );
};

export default Home;
