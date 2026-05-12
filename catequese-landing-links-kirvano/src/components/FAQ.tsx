import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'O material é digital ou físico?',
    a: 'O material é 100% digital. Você receberá o link para baixar os arquivos em formato PDF no e-mail cadastrado após a confirmação do pagamento.'
  },
  {
    q: 'Posso usar com qualquer faixa etária?',
    a: 'Sim! As dinâmicas foram pensadas para serem facilmente adaptáveis. Há indicações no material de como simplificar para os menores ou aprofundar para os jovens.'
  },
  {
    q: 'Como funciona a garantia?',
    a: 'Se você não gostar do material, basta enviar um e-mail para o nosso suporte em até 7 dias após a compra, e devolveremos 100% do valor pago. Simples assim.'
  },
  {
    q: 'Preciso de materiais especiais para aplicar as dinâmicas?',
    a: 'Não. A maioria das dinâmicas exige apenas materiais simples e fáceis de encontrar, como papel, caneta, Bíblia ou objetos cotidianos.'
  },
  {
    q: 'Qual a diferença entre o Pacote Básico e o Completo?',
    a: 'O Pacote Básico inclui apenas o e-book com as +450 dinâmicas. O Pacote Completo inclui as dinâmicas além de 5 Bônus Exclusivos (Jogos, Atividades, Mapas Mentais, Calendário e mais dinâmicas em grupo), por uma pequena diferença de valor.'
  },
  {
    q: 'Como recebo os materiais após a compra?',
    a: 'Para pagamentos via Pix ou Cartão de Crédito, o link dos PDFs é enviado na mesma hora para o e-mail cadastrado na compra. Se for boleto, pode levar até 3 dias úteis após a compensação.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    if (openIndex === idx) {
      setOpenIndex(null);
    } else {
      setOpenIndex(idx);
    }
  };

  return (
    <section className="bg-light py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-text-dark mb-12">
          Perguntas Frequentes
        </h2>
        
        <div className="space-y-4 mb-12">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-[#EBE6DC] pb-2">
              <button 
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
              >
                <span className="font-serif font-bold text-lg text-text-dark">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === idx ? 'transform rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="pb-4 text-text leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            className="bg-primary hover:bg-primary-hover transition-colors text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl uppercase tracking-wide inline-block"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            GARANTIR MEU MATERIAL
          </button>
        </div>
      </div>
    </section>
  );
}
