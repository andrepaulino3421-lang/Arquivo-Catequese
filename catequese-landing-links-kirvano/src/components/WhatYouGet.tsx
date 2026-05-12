import React from 'react';

const subjects = [
  {
    title: 'Dinâmicas de Acolhimento',
    description: 'Atividades para criar um ambiente acolhedor e quebrar o gelo logo no início do encontro.',
    image: '/images/dinamicas-acolhimento.png'
  },
  {
    title: 'Dinâmicas sobre a Bíblia',
    description: 'Dinâmicas que ajudam as crianças a conhecer e vivenciar as histórias bíblicas de forma lúdica.',
    image: '/images/dinamicas-biblia.png'
  },
  {
    title: 'Dinâmicas sobre os Sacramentos',
    description: 'Atividades para ensinar sobre Batismo, Eucaristia, Crisma e os demais sacramentos.',
    image: '/images/dinamicas-sacramentos.png'
  },
  {
    title: 'Dinâmicas sobre Valores Cristãos',
    description: 'Propostas que trabalham amor ao próximo, perdão, generosidade e outros valores da fé.',
    image: '/images/dinamicas-valores-cristaos.png'
  },
  {
    title: 'Dinâmicas de Oração',
    description: 'Momentos criativos de oração que conectam as crianças com Deus de forma simples.',
    image: '/images/dinamicas-oracao.png'
  },
  {
    title: 'Dinâmicas de Encerramento',
    description: 'Atividades para finalizar o encontro com reflexão, alegria e envio missionário.',
    image: '/images/dinamicas-encerramento.png'
  }
];

export default function WhatYouGet() {
  return (
    <section id="what-you-get" className="bg-light-alt py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            O Que Você Vai Receber
          </h2>
          <p className="text-text text-lg max-w-2xl mx-auto">
            +450 dinâmicas organizadas por temas e prontas para usar nos seus encontros de catequese
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((item, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="h-48 bg-[#EFE9DF] relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-xl text-text-dark mb-2">{item.title}</h3>
                <p className="text-text text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
