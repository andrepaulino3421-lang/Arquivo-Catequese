import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Guarantee() {
  return (
    <section className="bg-light-alt py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex justify-center items-center w-16 h-16 bg-green-50 rounded-full mb-6 text-green-600">
          <ShieldCheck className="w-8 h-8" />
        </div>
        
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark mb-8">
          Garantia Incondicional de <span className="text-green-700">7 Dias</span>
        </h2>
        
        <div className="bg-green-light border border-green-200 rounded-2xl p-8 mb-6 shadow-sm">
          <p className="text-green-900 text-lg leading-relaxed">
            Se por qualquer motivo você não ficar satisfeito com o material, basta nos enviar um e-mail dentro de 7 dias e devolveremos <strong>100% do seu investimento</strong>. Sem perguntas, sem burocracia.
          </p>
        </div>
        
        <p className="text-sm font-medium text-green-700 flex justify-center items-center">
          <Check className="w-4 h-4 mr-1" /> Risco zero para você — sua satisfação é nossa prioridade
        </p>
      </div>
    </section>
  );
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
