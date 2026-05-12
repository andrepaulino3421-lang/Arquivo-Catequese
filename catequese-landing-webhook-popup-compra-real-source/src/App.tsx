/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Hero from './components/Hero';
import WhatYouGet from './components/WhatYouGet';
import WhyChoose from './components/WhyChoose';
import Testimonials from './components/Testimonials';
import Bonuses from './components/Bonuses';
import Pricing from './components/Pricing';
import Guarantee from './components/Guarantee';
import FAQ from './components/FAQ';
import SalesPopup from './components/SalesPopup';
import BuyerAccessPopup from './components/BuyerAccessPopup';
import Obrigado from './components/Obrigado';

export default function App() {
  const path = window.location.pathname;

  if (path === '/obrigado') {
    return <Obrigado />;
  }

  return (
    <div className="font-sans antialiased text-text selection:bg-primary/30 selection:text-text-dark">
      <Hero />
      <WhatYouGet />
      <WhyChoose />
      <Testimonials />
      <Bonuses />
      <Pricing />
      <Guarantee />
      <FAQ />
      
      <footer className="bg-dark text-center py-8 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Catequese Dinâmica. Todos os direitos reservados.</p>
      </footer>
      <SalesPopup />
      <BuyerAccessPopup />
    </div>
  );
}
