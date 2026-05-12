import React, { useEffect, useState } from 'react';
import { CheckCircle2, Download, X } from 'lucide-react';

type AccessPayload = {
  basic?: boolean;
  complete?: boolean;
  activities365?: boolean;
  unoDaFe?: boolean;
  lifetimeAccess?: boolean;
};

function hasAnyAccess(access?: AccessPayload) {
  if (!access) return false;
  return Object.values(access).some(Boolean);
}

export default function BuyerAccessPopup() {
  const [visible, setVisible] = useState(false);
  const [accessUrl, setAccessUrl] = useState('/obrigado');

  useEffect(() => {
    let cancelled = false;

    const verifyPurchase = async () => {
      const params = new URLSearchParams(window.location.search);
      const queryEmail = params.get('email') || params.get('customer_email') || '';
      const queryOrderId = params.get('order_id') || params.get('orderId') || params.get('transaction_id') || '';

      let savedEmail = '';
      try {
        savedEmail = localStorage.getItem('catequese_purchase_email') || '';
      } catch {
        savedEmail = '';
      }

      const emailToCheck = (queryEmail || savedEmail).trim().toLowerCase();
      const orderIdToCheck = queryOrderId.trim();

      // Importante: não mostramos o pop-up apenas porque a pessoa abriu a página.
      // Ele só aparece se a API confirmar uma compra real salva no Supabase.
      if (!emailToCheck && !orderIdToCheck) return;

      try {
        const query = new URLSearchParams();
        if (emailToCheck) query.set('email', emailToCheck);
        if (orderIdToCheck) query.set('order_id', orderIdToCheck);

        const response = await fetch(`/api/order-access?${query.toString()}`);
        const data = await response.json();

        if (cancelled) return;

        const verified = response.ok && data?.ok && data?.found && hasAnyAccess(data.access);

        if (!verified) {
          try {
            localStorage.removeItem('catequese_verified_purchase');
          } catch {}
          return;
        }

        try {
          localStorage.setItem('catequese_verified_purchase', 'true');
          if (emailToCheck) localStorage.setItem('catequese_purchase_email', emailToCheck);
        } catch {}

        const nextUrl = orderIdToCheck
          ? `/obrigado?order_id=${encodeURIComponent(orderIdToCheck)}`
          : `/obrigado?email=${encodeURIComponent(emailToCheck)}`;

        setAccessUrl(nextUrl);
        const timer = window.setTimeout(() => {
          if (!cancelled) setVisible(true);
        }, 900);

        return () => window.clearTimeout(timer);
      } catch {
        // Se a API falhar, não mostra o pop-up para evitar liberar acesso falso.
      }
    };

    verifyPurchase();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[70] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[390px]">
      <div className="overflow-hidden rounded-2xl border border-[#ECDCC6] bg-white shadow-2xl">
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ECDCC6] text-[#8c7454]">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-[#3F3327]">
                Você já comprou esse material?
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                Sua compra foi encontrada. Acesse novamente seus arquivos liberados, links de download e bônus disponíveis.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setVisible(false)}
              className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              aria-label="Fechar pop-up"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <a
            href={accessUrl}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#BEA983] px-4 py-3 font-bold text-white shadow-sm transition hover:bg-[#a69270]"
          >
            <Download className="h-4 w-4" />
            Acessar meus materiais
          </a>

          <p className="mt-3 text-center text-xs text-gray-500">
            Os links também são enviados para o e-mail usado na compra.
          </p>
        </div>
      </div>
    </div>
  );
}
