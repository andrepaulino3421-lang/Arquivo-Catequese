import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Eu passava horas toda semana procurando atividades na internet. Agora tenho tudo pronto e organizado. Meus encontros ficaram muito mais dinâmicos e as crianças adoram!",
    name: "Maria Aparecida",
    role: "Catequista há 8 anos",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "Recomendei para toda a nossa equipe de catequistas. O material é muito bem estruturado e facilita demais a organização dos encontros. Valeu cada centavo.",
    name: "Irmã Conceição",
    role: "Coordenadora de Catequese",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "Comecei a catequizar este ano e não tinha experiência. Esse material me deu segurança para conduzir os encontros. As crianças ficam muito mais participativas.",
    name: "Fernanda Oliveira",
    role: "Catequista voluntária",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "Um material sério, respeitoso e alinhado com a fé católica. Faz diferença ter recursos assim disponíveis para nossas comunidades.",
    name: "Pe. Ricardo Santos",
    role: "Pároco e formador",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "Depois de tantos anos catequizando, achei que já tinha visto tudo. Esse material me surpreendeu com ideias novas e criativas. Renovou meu ânimo!",
    name: "Dona Tereza",
    role: "Catequista há 15 anos",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100"
  },
  {
    quote: "O valor é muito acessível pelo tanto que se recebe. As dinâmicas são práticas e fáceis de adaptar. Super recomendo para qualquer catequista.",
    name: "Lucas Mendes",
    role: "Catequista e seminarista",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-light-alt py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Veja o Que Estão Dizendo
          </h2>
          <p className="text-text text-lg max-w-2xl mx-auto">
            Catequistas de todo o Brasil já estão transformando seus encontros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-text-dark text-sm leading-relaxed mb-6 italic">
                  "{test.quote}"
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <img src={test.image} alt={test.name} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                <div>
                  <h4 className="font-bold text-text-dark text-sm">{test.name}</h4>
                  <p className="text-xs text-text">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
