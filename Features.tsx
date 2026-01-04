import { Zap, Shield, Users, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Experience blazing fast performance with optimized technology that scales with your needs.'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Built with security in mind. Your data is protected with industry-leading encryption.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with powerful collaboration tools designed for modern teams.'
  },
  {
    icon: Sparkles,
    title: 'Innovative Solutions',
    description: 'Stay ahead with cutting-edge features and continuous updates to keep you competitive.'
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help you succeed
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-blue-600" size={24} />
              </div>
              <h3 className="mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
