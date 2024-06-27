import React from 'react';
import Navbar from '../components/Navbar';
import ImageCarousel from '../components/ImageCarousel';
import Welcome from '../components/Welcome';
import TopCategories from '../components/TopCategories';
import RecentPosts from '../components/RecentPosts';
import ContactForm from '../components/ContactForm';

function HomePage() {
  return (
    <>
      <Navbar />
      
      <div className="container">
        <div className="p-5">
            <Welcome/>
        </div>
        <TopCategories/>
        <RecentPosts/>
        <ContactForm/>
        
      </div>
      

     
    </>
  );
}

export default HomePage;
