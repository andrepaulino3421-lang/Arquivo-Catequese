import React from 'react';
import { CheckCircle2, Zap, Users, DownloadCloud, Clock, BookOpen } from 'lucide-react';

const reasons = [
  {
    icon: CheckCircle2,
    title: '+450 Dinâmicas Testadas e Aprovadas',
    desc: 'Material já organizado e pensado para facilitar a preparação dos encontros.'
  },
  {
    icon: Zap,
    title: 'Fáceis de Aplicar, Mesmo Para Iniciantes',
    desc: 'Passo a passo simples, com materiais acessíveis e linguagem clara.'
  },
  {
    icon: Users,
    title: 'Adaptáveis Para Diferentes Idades',
    desc: 'Atividades pensadas para engajar catequizandos em diferentes fases.'
  },
  {
    icon: DownloadCloud,
    title: 'Acesso Imediato e 100% Digital',
    desc: 'Recebeu, baixou e já pode começar a usar.'
  },
  {
    icon: Clock,
    title: 'Economize Horas de Preparação',
    desc: 'Pare de passar noites procurando ideias na internet.'
  },
  {
    icon: BookOpen,
    title: 'Conteúdo Alinhado à Fé Católica',
    desc: 'Material pensado com respeito à catequese e à vivência cristã.'
  }
];

export default function WhyChoose() {
  return (
    <section className="bg-light py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EBE6DC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Por Que Escolher Nosso Material?
          </h2>
          <p className="text-text text-lg max-w-2xl mx-auto">
            Chega de perder tempo improvisando. Tenha tudo organizado para
            conduzir encontros mais leves, criativos e participativos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start space-x-4">
                <div className="flex-shrink-0 bg-[#Fdf5eb] p-3 rounded-full text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-dark text-sm mb-2">{reason.title}</h3>
                  <p className="text-text text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
