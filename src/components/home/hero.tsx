import Image from 'next/image'
import HeroImg from '@/public/img/hero.jpg'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="w-full relative h-screen flex flex-col items-center justify-center px-4 py-12 md:py-20">
      <div className="absolute w-full h-screen z-0 inset-0">
        <Image src={HeroImg} className="h-screen w-screen object-cover" alt="Hero Background" />
        <div className="absolute inset-0 backdrop-blur-xs" />
      </div>
      <div className="max-w-2xl relative text-center space-y-6">
        <h1 className="text-3xl text-shadow-lg text-slate-50 sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          SEA Catering
        </h1>
        <p className="text-lg italic text-shadow-lg sm:text-xl md:text-2xl text-gray-50 font-semibold">
          “Healthy Meals, Anytime, Anywhere”
        </p>
        <p className="text-slate-50 text-base font-semibold sm:text-lg md:text-xl text-shadow-lg">
          Welcome to SEA Catering, your partner for customizable healthy meals delivered fresh to
          your door—anywhere in Indonesia. Enjoy nutritious, delicious food tailored to your needs,
          with convenience and transparency at every step.
        </p>
      </div>
      <div className="relative mt-5">
        <Button variant={'ghost'} asChild className="cursor-pointer ring-1 ring-white text-white">
          <Link href={'#features'}>Our services</Link>
        </Button>
      </div>
    </section>
  )
}
