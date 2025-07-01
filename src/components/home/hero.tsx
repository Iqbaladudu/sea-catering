import Image from 'next/image'
import HeroImg from '@/public/img/hero.jpg'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="w-full relative min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute w-full h-full z-0 inset-0">
        <Image
          src={HeroImg}
          className="h-full w-full object-cover object-center"
          alt="Fresh healthy meals from SEA Catering"
          priority
          fill
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-white/90 text-xs sm:text-sm font-medium">
            Trusted by 10,000+ customers
          </span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
            <span className="block text-white drop-shadow-2xl">SEA Catering</span>
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-emerald-200 mt-2 sm:mt-3">
              Healthy Meals, Anytime, Anywhere
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-lg px-2">
            Your partner for customizable healthy meals delivered fresh to your door across
            Indonesia.
            <span className="block mt-2 text-emerald-100">
              Nutritious, delicious food tailored to your lifestyle.
            </span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6">
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-h-[48px] w-full sm:w-auto sm:min-w-[180px]"
            asChild
          >
            <Link href="/subscription" className="flex items-center gap-2">
              Start Your Journey
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-2 border-white/30 text-white bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 min-h-[48px] w-full sm:w-auto sm:min-w-[180px]"
            asChild
          >
            <Link href="#features">Learn More</Link>
          </Button>
        </div>

        {/* Features Preview */}
        <div className="pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-xl sm:max-w-2xl mx-auto">
          <div className="flex flex-col items-center space-y-2 p-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
              <span className="text-white font-bold text-base sm:text-lg">🍽️</span>
            </div>
            <span className="text-white/90 text-xs sm:text-sm font-medium text-center">
              Custom Meals
            </span>
          </div>

          <div className="flex flex-col items-center space-y-2 p-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
              <span className="text-white font-bold text-base sm:text-lg">🚚</span>
            </div>
            <span className="text-white/90 text-xs sm:text-sm font-medium text-center">
              Nationwide Delivery
            </span>
          </div>

          <div className="flex flex-col items-center space-y-2 p-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
              <span className="text-white font-bold text-base sm:text-lg">📊</span>
            </div>
            <span className="text-white/90 text-xs sm:text-sm font-medium text-center">
              Nutrition Tracking
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block">
        <div className="animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
