import { ArrowRight, Cpu, Utensils } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Logo/Icon */}
        <div className="mb-4 mt-8 inline-flex items-center justify-center w-24 h-24 bg-[#39E98E] rounded-full shadow-lg relative">
          <Cpu className="w-16 h-16 text-white" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Utensils className="w-6 h-6 text-white" />
          </div>
        </div>
        
        {/* Hero Title */}
        <h1 className="text-7xl md:text-9xl font-bold text-white mb-8 tracking-tight">
          meal bot
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          AI-powered meal planning that transforms your ingredients into delicious, 
          personalized meal plans tailored to your caloric goals.
        </p>
        
        {/* CTA Button */}
        <Link href="/meal-generator/new">
          <Button 
            size="lg" 
            className="text-lg px-8 py-4 h-auto bg-[#39E98E] hover:bg-[#39E98E]/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
        
        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-12 h-12 bg-[#39E98E]/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🥗</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Ingredient Based</h3>
            <p className="text-white/70">Use what you have to create amazing meals</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-[#39E98E]/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Calorie Targeted</h3>
            <p className="text-white/70">Meet your nutritional goals precisely</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-[#39E98E]/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-white mb-2">AI Powered</h3>
            <p className="text-white/70">Smart recommendations in seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
}
