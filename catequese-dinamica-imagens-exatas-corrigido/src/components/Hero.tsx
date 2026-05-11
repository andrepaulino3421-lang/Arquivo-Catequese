import React from 'react';
import { ChevronDown, Star, Users, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-light pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
      <div className="inline-block bg-[#EEDCC7] text-[#9A6234] text-xs font-bold px-4 py-1.5 rounded-full mb-8 font-sans uppercase tracking-wider">
        Material Exclusivo Para Catequistas
      </div>
      
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-dark font-bold leading-tight max-w-4xl mx-auto mb-6">
        Pare de improvisar na catequese e tenha <span className="text-primary italic font-normal">+450 dinâmicas prontas</span> para encontros mais criativos e participativos
      </h1>
      
      <p className="text-text text-lg md:text-xl max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
        Um material completo, organizado por temas e fácil de aplicar para
        transformar seus encontros de catequese, prender mais a atenção
        das crianças e economizar horas de preparação.
      </p>

      <div className="relative w-full max-w-5xl mx-auto mb-6">
        <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
          <img 
            src="/images/hero-catequese.png" 
            alt="Catequista ensinando crianças em um encontro de catequese" 
            className="w-full h-auto object-cover aspect-[16/9]"
            loading="eager"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs font-medium text-text-dark">
          <div className="flex items-center bg-[#EEDCC7] px-3 py-1 rounded-full">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            +500 catequistas
          </div>
          <div className="flex items-center bg-[#EEDCC7] px-3 py-1 rounded-full">
            <Download className="w-3.5 h-3.5 mr-1.5" />
            +1.200 downloads
          </div>
          <div className="flex items-center bg-[#EEDCC7] px-3 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 mr-1.5 fill-current text-primary" />
            4.9/5 avaliação
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <p className="text-text-dark mb-2 text-sm">a partir de <span className="text-xl font-bold">R$10,90</span></p>
        <button 
          className="bg-primary hover:bg-primary-hover transition-colors text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
        >
          QUERO COMEÇAR AGORA
        </button>
      </div>

      <div className="mt-12 animate-bounce cursor-pointer text-gray-400" onClick={() => document.getElementById('what-you-get')?.scrollIntoView({ behavior: 'smooth' })}>
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
}
