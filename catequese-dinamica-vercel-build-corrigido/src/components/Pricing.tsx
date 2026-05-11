import React, { useState, useEffect } from 'react';
import { Check, Clock, ShieldCheck, Star } from 'lucide-react';

export default function Pricing() {
  const [timeLeft, setTimeLeft] = useState(13 * 60 + 53); // 13:53 in seconds
  const today = new Date().toLocaleDateString("pt-BR");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section id="pricing" className="bg-light py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Escolha Seu Pacote
          </h2>
          <p className="text-text text-lg max-w-2xl mx-auto mb-8">
            Invista nos seus encontros de catequese com um valor acessível e tenha acesso imediato ao material.
          </p>
          
          <div className="inline-flex items-center text-red-500 font-medium bg-red-50 px-4 py-2 rounded-lg border border-red-100 mb-4">
            <Clock className="w-4 h-4 mr-2" />
            Oferta expira em {formatTime(timeLeft)}
          </div>
          
          <p className="text-sm text-green-700 font-medium">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
            87 pessoas compraram nas últimas 24h
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center max-w-5xl mx-auto gap-8 items-stretch pt-8 relative">
          
          {/* Basic Package */}
          <div className="flex-1 bg-white rounded-2xl p-8 border border-[#EBE6DC] shadow-sm flex flex-col justify-between max-w-md mx-auto lg:mx-0 w-full lg:mt-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-center text-text-dark mb-6">Pacote Básico</h3>
              <div className="text-center mb-8">
                <span className="text-4xl lg:text-5xl font-bold text-text-dark">R$10,90</span>
                <p className="text-text text-sm mt-1">pagamento único</p>
              </div>
              <ul className="space-y-4 mb-8">
                {['+450 Dinâmicas de Catequese', 'Acesso imediato por e-mail', 'Formato PDF', 'Acesso pelo site', 'Garantia de 7 dias'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-sm text-text-dark">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full py-4 text-primary font-bold border-2 border-primary rounded-xl hover:bg-primary/5 transition-colors uppercase text-sm tracking-wide">
              Quero Esse Pacote
            </button>
          </div>

          {/* Complete Package - Highlighted */}
          <div className="flex-[1.2] bg-white rounded-2xl p-8 border-2 border-primary shadow-xl flex flex-col justify-between max-w-md mx-auto lg:mx-0 w-full relative z-10">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white font-bold text-xs uppercase tracking-wide py-1 px-4 rounded-full flex items-center">
              <Star className="w-3 h-3 mr-1 fill-current" /> Mais Vendido
            </div>
            
            <div>
              <h3 className="font-serif text-2xl font-bold text-center text-text-dark mb-4">Pacote Completo</h3>
              <div className="text-center mb-4">
                <span className="text-lg text-gray-400 line-through mr-2 font-medium">R$97,90</span>
                <span className="text-4xl lg:text-5xl font-bold text-primary">R$27,90</span>
                <p className="text-text text-sm mt-1">pagamento único</p>
              </div>
              
              <div className="bg-green-50 text-green-700 text-xs font-bold text-center py-2 rounded-lg border border-green-100 mb-8 flex justify-center items-center">
                Você economiza R$70,00 (71% OFF)
              </div>
              
              <ul className="space-y-4 mb-2">
                {[
                  'Tudo do pacote básico',
                  'Kit de Jogos Bíblicos',
                  '100 Atividades Bíblicas Católicas',
                  '100 Mapas Mentais Bíblicos',
                  'Calendário Litúrgico Ilustrado',
                  '100 Jogos e Dinâmicas Bíblicas em Grupo',
                  'Formato PDF',
                  'Acesso pelo site',
                  'Acesso imediato por e-mail',
                  'Garantia estendida de 30 dias'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium text-text-dark">{item}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-center text-xs text-text mb-8 mt-6">
                São <strong>6 materiais completos</strong> por apenas <strong className="text-primary">R$4,65 cada</strong>
              </p>
            </div>
            
            <div>
              <div className="flex justify-center mb-4">
                <div className="bg-[#ECDCC6] text-[#3A3024] text-xs font-bold py-2 px-4 rounded-full text-center shadow-sm">
                  Apenas hoje — {today}
                </div>
              </div>
              <button className="w-full py-4 text-white font-bold bg-primary hover:bg-primary-hover rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 uppercase text-sm tracking-wide mb-3">
                Quero A Versão Completa
              </button>
              <div className="flex justify-center items-center text-[10px] text-gray-500">
                <ShieldCheck className="w-3 h-3 mr-1 text-yellow-600" /> Compra segura • Satisfação garantida ou seu dinheiro de volta
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
