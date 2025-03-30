import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import React from 'react';

// import Wave1 from "@/icons/Wave1";
import HowItWorks from '@/components/HowItWorks';
import Advantages from '@/components/Advantages';
import Pricing from '@/components/Pricing';
// import Wave2 from "@/icons/Wave2";
import GetStarted from '@/components/GetStarted';
import Footer from '@/components/Footer';
import QuestionsAndAnswers from '@/components/QuestionsAndAnswers';
import RecentBlogPosts from '@/components/RecentBlogPosts';
import Examples from '@/components/Examples';

const Home = () => {
  return (
    <main className="leading-normal tracking-normal text-white gradient">
      <NavBar />
      <Hero />
      {/* <div className="relative -mt-12 lg:-mt-24">
        <Wave1 />
      </div> */}
      <HowItWorks />
      <Advantages />
      <Pricing />
      <Examples />
      {/* <Wave2 /> */}
      <GetStarted
        title="Comece já"
        subtitle="Não perca tempo, crie seu catálogo online e comece a vender"
        cta="Cadastre-se"
      />
      <QuestionsAndAnswers />
      <RecentBlogPosts />
      <GetStarted
        title="Transforme Suas Vendas"
        subtitle="Comece a receber pedidos pelo WhatsApp agora!"
        cta="Experimente Grátis"
      />
      <Footer />
    </main>
  );
};
export default Home;
