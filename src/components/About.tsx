import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle } from 'lucide-react';

const benefits = [
  'Industry-leading expertise',
  'Dedicated support team',
  'Proven track record',
  'Scalable solutions'
];

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">About Our Company</h2>
            <p className="text-xl text-gray-600 mb-6">
              We're passionate about delivering exceptional digital experiences that drive results. 
              With years of experience and a talented team, we help businesses transform their vision into reality.
            </p>
            <div className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors">
              Learn Our Story
            </button>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1590650589327-3f67c43ad8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjU1MTU2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl mb-2">10+</div>
              <div>Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
