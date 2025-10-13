import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { menuItems } from '../data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredMenus = menuItems.slice(0, 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMenus.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMenus.length) % featuredMenus.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0d] via-transparent to-[#0b0b0d]" />
        
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl mb-8 bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Zeduc
          </motion.h1>

          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Une expérience gastronomique exceptionnelle où tradition et innovation se rencontrent
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <button className="px-10 py-4 bg-gradient-to-r from-[#b88b1f] to-[#d4a74a] text-black rounded-2xl hover:shadow-lg hover:shadow-[#b88b1f]/30 transition-all duration-300">
              Découvrir nos menus
            </button>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#b88b1f]/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0b0b0d] to-[#12121a]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-white via-[#b88b1f] to-white bg-clip-text text-transparent mb-4">
              Nos Spécialités
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#b88b1f] to-transparent mx-auto" />
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredMenus.map((menu) => (
                  <div key={menu.id} className="min-w-full px-4">
                    <div className="bg-black/30 backdrop-blur-sm border border-[#b88b1f]/20 rounded-3xl overflow-hidden">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="relative h-96 md:h-auto">
                          <ImageWithFallback
                            src={menu.image}
                            alt={menu.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                          <span className="text-[#b88b1f] text-sm mb-2">{menu.category}</span>
                          <h3 className="text-3xl md:text-4xl mb-4">{menu.name}</h3>
                          <p className="text-gray-400 mb-6 leading-relaxed">{menu.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl text-[#b88b1f]">{menu.price}€</span>
                            <button className="px-6 py-3 bg-[#b88b1f]/20 border border-[#b88b1f]/30 text-[#b88b1f] rounded-2xl hover:bg-[#b88b1f]/30 transition-all duration-300">
                              Commander
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm border border-[#b88b1f]/20 rounded-2xl hover:border-[#b88b1f]/40 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-[#b88b1f]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm border border-[#b88b1f]/20 rounded-2xl hover:border-[#b88b1f]/40 transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-[#b88b1f]" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {featuredMenus.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-8 bg-[#b88b1f]' : 'w-2 bg-[#b88b1f]/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
