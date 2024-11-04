import React from 'react';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'The Meridian Estate',
    description: 'Modern luxury meets classic architecture',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
    price: '$2.4M',
    specs: '5 bed • 4 bath • 280 m²'
  },
  {
    id: 2,
    title: 'Azure Bay Residence',
    description: 'Waterfront living at its finest',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    price: '$3.1M',
    specs: '6 bed • 5 bath • 320 m²'
  },
  {
    id: 3,
    title: 'The Highland Retreat',
    description: 'Mountain views with modern comfort',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
    price: '$2.8M',
    specs: '4 bed • 3.5 bath • 245 m²'
  }
];

const FeaturedProjects = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our latest architectural masterpieces, where every detail is crafted to perfection.
            </p>
          </div>
          <button className="hidden md:flex items-center text-gray-900 hover:text-gray-600 transition-colors">
            <span className="mr-2">View All Projects</span>
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-[300px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 p-6 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/90 mb-3">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">{project.price}</span>
                  <span className="text-white/80 text-sm">{project.specs}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        <button className="md:hidden w-full mt-8 flex items-center justify-center text-gray-900 hover:text-gray-600 transition-colors">
          <span className="mr-2">View All Projects</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default FeaturedProjects;