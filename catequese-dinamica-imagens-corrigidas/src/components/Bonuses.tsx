import React from 'react';

const bonuses = [
  {
    title: 'Kit de Jogos Bíblicos',
    desc: 'Jogos prontos para tornar o aprendizado bíblico divertido e memorável.',
    image: '/images/bonus-kit-jogos-biblicos.png'
  },
  {
    title: '100 Atividades Bíblicas Católicas',
    desc: 'Atividades complementares para reforçar o conteúdo dos encontros.',
    image: '/images/bonus-100-atividades-catolicas.png'
  },
  {
    title: '100 Mapas Mentais Bíblicos',
    desc: 'Mapas mentais organizados para estudar temas, personagens e livros da Bíblia.',
    image: '/images/bonus-100-mapas-mentais-biblicos.png'
  },
  {
    title: 'Calendário Litúrgico Ilustrado',
    desc: 'Acompanhe o ano litúrgico com ilustrações e explicações acessíveis.',
    image: '/images/bonus-calendario-liturgico.png'
  },
  {
    title: '100 Jogos e Dinâmicas Bíblicas em Grupo',
    desc: 'Atividades coletivas que promovem integração e aprendizado.',
    image: '/images/bonus-100-jogos-dinamicas-grupo.png'
  }
];

export default function Bonuses() {
  return (
    <section className="bg-dark text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#A85B22] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 font-sans uppercase tracking-wider">
            BÔNUS EXCLUSIVOS
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ao Garantir Seu Material, Você Recebe 5 Bônus Exclusivos
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Complementos que potencializam ainda mais seus encontros de catequese.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bonuses.map((bonus, idx) => (
            <div key={idx} className="bg-[#24201A] rounded-xl overflow-hidden border border-[#3A332C] hover:border-primary transition-colors">
              <div className="h-44 bg-[#1F1C18] overflow-hidden">
                <img
                  src={bonus.image}
                  alt={bonus.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-lg mb-2">{bonus.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{bonus.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
