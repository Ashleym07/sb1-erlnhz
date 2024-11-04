import React from 'react';
import Hero from './Hero';
import FeaturedProjects from './FeaturedProjects';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <Testimonials />
    </main>
  );
};

export default Home;