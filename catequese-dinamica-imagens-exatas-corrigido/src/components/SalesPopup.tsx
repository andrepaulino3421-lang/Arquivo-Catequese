import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';

const names = [
  'Ana Carolina', 'João Pedro', 'Maria Rita', 'Carlos Eduardo',
  'Fernanda Gomes', 'Letícia Silva', 'Gabriel Martins', 'Lucas Almeida',
  'Júlia Souza', 'Paula Castro', 'Matheus Correia', 'Thiago Mendes',
  'Aline Moreira', 'Beatriz Santos', 'Bruna Rocha', 'Camila Dias'
];

export default function SalesPopup() {
  const [visible, setVisible] = useState(false);
  const [buyerName, setBuyerName] = useState('');

  useEffect(() => {
    const showPopup = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      setBuyerName(randomName);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 3500); // Visível por 3,5 segundos
    };

    // Mostra o primeiro popup após 5 segundos, e depois a cada 15 segundos
    const initialTimer = setTimeout(() => {
        showPopup();
        
        const interval = setInterval(() => {
            showPopup();
        }, 15000);
        
        // Return clear function for the interval
        return () => clearInterval(interval);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <>
      {visible && (
        <div
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 bg-white rounded-lg shadow-xl border border-gray-100 p-3 flex items-center gap-3 w-72 transition-all duration-300"
        >
          <div className="bg-green-100 p-2 rounded-full text-green-600 flex-shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 leading-tight">
              {buyerName}
            </p>
            <p className="text-xs text-gray-500 leading-tight mt-0.5">
              comprou o Pacote Completo
            </p>
          </div>
          <button 
            onClick={() => setVisible(false)}
            className="text-gray-400 hover:text-gray-600 self-start"
            aria-label="Fechar popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}
