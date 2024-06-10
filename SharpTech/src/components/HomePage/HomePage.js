import React from 'react';
import Title from '../Title/Title';
import About from '../About/About';
import Carousel from "../Carousel/Carousel";
import Programs from '../Programs/Programs';
import Testimonials from '../Testimonials/Testimonials';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { countries } from "../Carousel/Data";
import Navbar from '../Navbar/Navbar';
import "./HomePage.css"
import Hero from '../Hero/Hero';

function HomePage({ playState, setPlayState }) {
  return (

    <div className='home-home'>
     
      <Navbar />
       <div className="moving-title">
        <h2 className="animate-left">SHARP</h2>
        <h2 className="animate-up">&nbsp;TECH</h2>
        <h2 className="animate-right"> &nbsp;SYSTEMS</h2>
      </div> 
    


      <Carousel images={countries} />
      {/* <p className='container'> <br />Sharp Tech Systems Pvt Ltd is
        a pioneering company with over 15 years of experience
        specialized in Development Applications.
        As a Technology service provider we also support students in project execution.
        Our Specialized and experienced software developers will provide Software Training.
        We have a dedicated underwriters who support
        our clients in performing Title Search Services and draw Roof Sketches.
      </p> */}<br/> 
      <br/>
     
      
   

      <About setPlayState={setPlayState} />

  
      
      <br/>
      <br/>
      <Title title='Our Services ' />
      <Programs />

      
      <br/>
      <br/>
      <Title title='Sample Reports' subTitle='' />
      <Testimonials />


      <br/>
      <Title title='Contact Us' />
      <Contact />

      <Footer />

      <VideoPlayer playState={playState} setPlayState={setPlayState} />
    </div>

  );
}

export default HomePage;
