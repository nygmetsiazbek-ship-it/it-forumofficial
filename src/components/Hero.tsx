import { ArrowRight, Menu } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 px-6 py-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white">Logo</div>
          <div className="hidden md:flex gap-8 text-white">
            <a href="#features" className="hover:opacity-80 transition-opacity">Features</a>
            <a href="#about" className="hover:opacity-80 transition-opacity">About</a>
            <a href="#contact" className="hover:opacity-80 transition-opacity">Contact</a>
          </div>
          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1658552963426-1083cf9c495e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzY1NTA5MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Modern technology background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-6 md:px-12 py-32">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              <h1 className="text-white mb-6">
                Build Something Amazing
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Transform your ideas into reality with our innovative solutions. 
                We help businesses grow and succeed in the digital world.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-blue-900 px-8 py-4 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors">
                  Get Started
                  <ArrowRight size={20} />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
