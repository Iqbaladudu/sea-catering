import Image from 'next/image'
import HeroImg from '@/public/img/hero.jpg'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="w-full relative min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute w-full h-full z-0 inset-0">
        <Image
          src={HeroImg}
          className="h-full w-full object-cover scale-105"
          alt="Fresh healthy meals from SEA Catering"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-white/90 text-sm font-medium">Trusted by 10,000+ customers</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-white drop-shadow-2xl">SEA Catering</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-green-200 mt-2">
              Healthy Meals, Anytime, Anywhere
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Your partner for customizable healthy meals delivered fresh to your door across
            Indonesia.
            <span className="block mt-2 text-green-100">
              Nutritious, delicious food tailored to your lifestyle.
            </span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-h-[48px] min-w-[180px]"
            asChild
          >
            <Link href="/subscription" className="flex items-center gap-2">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-2 border-white/30 text-gray-900 hover:bg-white/10 hover:text-gray-50 backdrop-blur-sm px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 min-h-[48px] min-w-[180px]"
            asChild
          >
            <Link href="#features">Learn More</Link>
          </Button>
        </div>

        {/* Features Preview */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
            <span className="text-white/90 text-sm font-medium">Custom Meals</span>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-lg">🚚</span>
            </div>
            <span className="text-white/90 text-sm font-medium">Nationwide Delivery</span>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-lg">📊</span>
            </div>
            <span className="text-white/90 text-sm font-medium">Nutrition Tracking</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
