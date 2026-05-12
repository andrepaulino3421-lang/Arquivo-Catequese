import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Lock, Download, ChevronLeft, Mail, Info, Search, Loader2 } from 'lucide-react';

type PurchaseAccess = {
  basic: boolean;
  complete: boolean;
  activities365: boolean;
  unoDaFe: boolean;
  lifetimeAccess: boolean;
};

const emptyAccess: PurchaseAccess = {
  basic: false,
  complete: false,
  activities365: false,
  unoDaFe: false,
  lifetimeAccess: false,
};

const materiais = [
  {
    id: 'basic',
    titulo: 'Pacote Básico',
    descricao: '+450 Dinâmicas de Catequese em PDF, organizadas por temas e prontas para usar nos encontros.',
    link: 'https://drive.google.com/drive/folders/1bCylZrdTKG8D2gZcVonTBl2kkDTprIXW?usp=drive_link',
  },
  {
    id: 'complete',
    titulo: 'Pacote Completo',
    descricao: 'Tudo do Pacote Básico + Kit de Jogos Bíblicos, 100 Atividades Bíblicas Católicas, 100 Mapas Mentais Bíblicos, Calendário Litúrgico Ilustrado e 100 Jogos e Dinâmicas Bíblicas em Grupo.',
    link: 'https://drive.google.com/drive/folders/1BRlaxDa4GW9DHhirr8h-wVBKNhmQOppn?usp=drive_link',
  },
  {
    id: 'activities365',
    titulo: '365 Atividades Infantis Bíblicas',
    descricao: 'Atividades bíblicas infantis em PDF, prontas para imprimir e aplicar com crianças.',
    link: 'https://drive.google.com/drive/folders/1WZeudaQaiO0HO7ZUdlRAuNcA4P9aNBvO?usp=drive_link',
  },
  {
    id: 'unoDaFe',
    titulo: 'Uno da Fé',
    descricao: 'Jogo bíblico em PDF para imprimir, com cartas, desafios e atividades para catequese.',
    link: 'https://drive.google.com/drive/folders/14xty2lh09_fxcSakZKsVLkgRH0n9kNYw?usp=drive_link',
  },
  {
    id: 'lifetimeAccess',
    titulo: 'Acesso Vitalício — Seu para Sempre',
    descricao: 'Certificado e confirmação do acesso vitalício ao material adquirido.',
    link: 'COLOCAR_LINK_DO_ACESSO_VITALICIO_AQUI',
  },
];

export default function Obrigado() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const initialEmail = params.get('email') || params.get('customer_email') || '';
  const initialCode = params.get('code') || params.get('cpf') || params.get('phone') || '';
  const initialOrderId = params.get('order_id') || params.get('orderId') || params.get('transaction_id') || '';

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState(initialCode);
  const [orderId] = useState(initialOrderId);
  const [purchaseAccess, setPurchaseAccess] = useState<PurchaseAccess>(emptyAccess);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const [found, setFound] = useState(false);

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('catequese_purchase_email');
      if (!initialEmail && savedEmail) setEmail(savedEmail);
    } catch {
      // Evita erro caso o navegador bloqueie localStorage.
    }
  }, [initialEmail]);

  const fetchAccess = async (event?: React.FormEvent) => {
    event?.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    if (!cleanEmail && !orderId) {
      setError('Digite o e-mail usado na compra para liberar seus materiais.');
      return;
    }

    try {
      setLoading(true);
      setSearched(true);

      const query = new URLSearchParams();
      if (cleanEmail) query.set('email', cleanEmail);
      if (cleanCode) query.set('code', cleanCode);
      if (orderId) query.set('order_id', orderId);

      const response = await fetch(`/api/order-access?${query.toString()}`);
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Não foi possível consultar sua compra agora.');
      }

      const nextAccess = data.access || emptyAccess;
      const nextHasAnyAccess = Object.values(nextAccess).some(Boolean);

      setPurchaseAccess(nextAccess);
      setFound(!!data.found);

      if (data.found && nextHasAnyAccess && cleanEmail) {
        try {
          localStorage.setItem('catequese_purchase_email', cleanEmail);
          localStorage.setItem('catequese_verified_purchase', 'true');
        } catch {}
      } else {
        try {
          localStorage.removeItem('catequese_verified_purchase');
        } catch {}
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao consultar sua compra.');
      setPurchaseAccess(emptyAccess);
      setFound(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialEmail || initialOrderId) {
      fetchAccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasAnyAccess = Object.values(purchaseAccess).some(Boolean);

  return (
    <div className="min-h-screen bg-[#F2EFE8] p-4 font-sans text-gray-800 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-[#ECDCC6] bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-[#ECDCC6] p-4">
              <CheckCircle2 className="h-12 w-12 text-[#8c7454]" />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h1 className="text-3xl font-extrabold leading-tight text-[#3F3327] md:text-5xl">
              Compra confirmada! <br className="hidden md:block" /> Seus materiais estão prontos
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Digite o e-mail usado no checkout para liberar os arquivos da sua compra. Os links também serão enviados para o e-mail cadastrado.
            </p>
          </div>

          <form onSubmit={fetchAccess} className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 rounded-2xl border border-[#ECDCC6] bg-[#FFF9F0] p-4 text-left sm:grid-cols-[1fr_170px_auto]">
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#7B6548]">E-mail da compra</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full rounded-xl border border-[#ECDCC6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#BEA983]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#7B6548]">CPF/tel final</span>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="opcional"
                className="w-full rounded-xl border border-[#ECDCC6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#BEA983]"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#BEA983] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#a69270] disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Liberar
            </button>
          </form>

          {error && (
            <p className="mx-auto mt-3 max-w-3xl rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          {searched && !loading && !error && !found && (
            <p className="mx-auto mt-3 max-w-3xl rounded-xl bg-yellow-50 p-3 text-sm font-medium text-yellow-800">
              Ainda não encontramos essa compra. Se você pagou por PIX ou boleto, aguarde alguns minutos e tente novamente. Se já foi aprovado, confira se o e-mail digitado é o mesmo do checkout.
            </p>
          )}

          {searched && !loading && found && hasAnyAccess && (
            <p className="mx-auto mt-3 max-w-3xl rounded-xl bg-green-50 p-3 text-sm font-medium text-green-800">
              Compra localizada. Os materiais liberados para este e-mail aparecem abaixo.
            </p>
          )}

          <div className="mx-auto mt-6 flex max-w-3xl items-start gap-3 rounded-r-xl border-l-4 border-[#BEA983] bg-[#FFF9F0] p-4 text-left text-sm text-gray-700">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#8c7454]" />
            <p>
              <strong className="font-semibold text-[#3F3327]">Aviso importante:</strong> Se você comprou algum bônus e ele ainda não aparece como liberado, aguarde alguns instantes ou confira seu e-mail. A confirmação pode levar alguns minutos dependendo do método de pagamento.
            </p>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="text-center text-2xl font-bold text-[#3F3327] md:text-left">
            Seus materiais
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {materiais.map((material) => {
              const isLiberado = purchaseAccess[material.id as keyof PurchaseAccess];

              return (
                <article
                  key={material.id}
                  className={`flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isLiberado
                      ? 'border-[#BEA983]/40 shadow-md hover:shadow-lg'
                      : 'border-gray-200 opacity-75 shadow-sm grayscale-[20%]'
                  }`}
                >
                  <div className="flex-grow space-y-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold leading-tight text-[#3F3327]">
                        {material.titulo}
                      </h3>

                      {isLiberado ? (
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#ECDCC6]/70 px-3 py-1 text-xs font-semibold text-[#7B6548]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Liberado
                        </span>
                      ) : (
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                          <Lock className="h-3.5 w-3.5" />
                          Não incluído
                        </span>
                      )}
                    </div>

                    <p className="text-sm leading-relaxed text-gray-600">
                      {material.descricao}
                    </p>
                  </div>

                  <div className={`mt-auto border-t p-4 ${isLiberado ? 'bg-[#FAFCFB]' : 'bg-gray-50'}`}>
                    {isLiberado ? (
                      <a
                        href={material.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#BEA983] px-4 py-3 font-bold text-white shadow-sm transition hover:bg-[#a69270]"
                      >
                        <Download className="h-4 w-4" />
                        Acessar material
                      </a>
                    ) : (
                      <button
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-200 px-4 py-3 font-bold text-gray-400"
                      >
                        <Lock className="h-4 w-4" />
                        Não disponível
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="space-y-8 pb-12 pt-8 text-center">
          <div className="space-y-2">
            <p className="text-gray-600">Salve esta página e confira também seu e-mail.</p>
            <p className="flex flex-col items-center justify-center gap-1 text-gray-600 sm:flex-row">
              Em caso de dúvidas, entre em contato com o suporte:
              <a href="mailto:suporte@seudominio.com" className="inline-flex items-center gap-1 font-semibold text-[#8c7454] hover:underline">
                <Mail className="h-4 w-4" /> suporte@seudominio.com
              </a>
            </p>
          </div>

          <a
            href="/"
            className="inline-flex items-center gap-2 font-semibold text-[#3F3327] transition hover:text-[#8c7454]"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar para a página inicial
          </a>
        </div>
      </div>
    </div>
  );
}
