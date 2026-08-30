"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { leadSchema } from "@/lib/validation";
import { IconClose } from "./Icons";

// Depois de quantos segundos sem clicar em nada o popup aparece sozinho.
const TIME_TRIGGER_MS = 15_000;

// Guardamos no sessionStorage que o popup já apareceu, para não mostrar
// de novo se a pessoa continuar navegando pela mesma aba. sessionStorage
// (diferente de localStorage) some sozinho quando a aba é fechada — ou
// seja, numa próxima visita, o popup pode aparecer de novo.
const STORAGE_KEY = "imperador_lead_popup_shown";

type FormState = { name: string; phone: string; service: string; website: string };
type Status = "idle" | "submitting" | "success" | "error";

const INITIAL_FORM: FormState = { name: "", phone: "", service: "", website: "" };

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const hasTriggeredRef = useRef(false); // evita abrir o popup duas vezes (gatilho de tempo + de saída ao mesmo tempo)

  // --- Decide QUANDO mostrar o popup ---------------------------------------
  useEffect(() => {
    // Se já apareceu nesta aba, não faz nada.
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    function openPopup() {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setIsOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }

    // Gatilho 1: tempo na página.
    const timer = setTimeout(openPopup, TIME_TRIGGER_MS);

    // Gatilho 2: "intenção de saída" — o mouse sai pela borda de cima da
    // janela, um sinal clássico de que a pessoa está indo fechar a aba ou
    // trocar de site. Só faz sentido em telas com mouse (desktop).
    function handleMouseLeave(event: MouseEvent) {
      if (event.clientY <= 0) openPopup();
    }
    document.addEventListener("mouseleave", handleMouseLeave);

    // Limpeza: se o componente sair da tela antes de qualquer gatilho
    // disparar, cancela o timer e remove o listener — evita vazamento de
    // memória e chamadas depois que o componente já não existe mais.
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Fecha com a tecla Esc, um padrão de acessibilidade esperado em modais.
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function updateField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // impede o recarregamento padrão da página ao enviar o form

    // Validação no navegador: mesma regra do servidor (lib/validation.ts),
    // só que aqui é para dar feedback instantâneo, sem esperar a rede.
    const result = leadSchema.safeParse(form);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        name: errors.name?.[0],
        phone: errors.phone?.[0],
        service: errors.service?.[0],
      });
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setServerMessage(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setStatus("error");
        setServerMessage(payload?.error ?? "Não foi possível enviar. Tente novamente.");
        return;
      }

      setStatus("success");
    } catch {
      // Erro de rede (sem internet, servidor fora do ar etc.)
      setStatus("error");
      setServerMessage("Falha de conexão. Verifique sua internet e tente novamente.");
    }
  }

  if (!isOpen) return null;

  return (
    // role="dialog" + aria-modal avisam leitores de tela que isto é uma
    // janela modal, e não apenas mais um bloco de conteúdo da página.
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
      onClick={() => setIsOpen(false)} // clicar fora do cartão fecha o popup
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()} // impede que clicar DENTRO do cartão feche o popup
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Fechar"
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
        >
          <IconClose className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="py-6 text-center">
            <h2 id="lead-popup-title" className="font-display text-xl font-bold text-navy">
              Recebemos seus dados!
            </h2>
            <p className="mt-2 text-slate-600">
              Em breve alguém da Imperador entra em contato para fechar seu orçamento.
            </p>
          </div>
        ) : (
          <>
            <h2 id="lead-popup-title" className="font-display text-xl font-bold text-navy">
              Receba um orçamento rápido
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Deixe seus dados e entramos em contato ainda hoje.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3" noValidate>
              <div>
                <label htmlFor="name" className="sr-only">
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Nome"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-cyan"
                />
                {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Telefone / WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Telefone / WhatsApp"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-cyan"
                />
                {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
              </div>

              <div>
                <label htmlFor="service" className="sr-only">
                  Serviço de interesse
                </label>
                <input
                  id="service"
                  name="service"
                  type="text"
                  placeholder="Serviço de interesse (ex: instalação de GNV)"
                  value={form.service}
                  onChange={(e) => updateField("service", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-cyan"
                />
                {fieldErrors.service && <p className="mt-1 text-xs text-red-600">{fieldErrors.service}</p>}
              </div>

              {/*
                Campo-armadilha (honeypot): escondido de humanos com
                "sr-only"-like inline styles (não usamos "hidden" ou
                "display:none" porque alguns robôs simples ignoram campos
                ocultos dessa forma; isto os esconde só visualmente,
                mantendo o campo "visível" o bastante para enganar bots
                menos sofisticados). tabIndex=-1 impede que alguém
                navegando por teclado caia neste campo sem querer.
              */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Não preencha este campo</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => updateField("website", e.target.value)}
                />
              </div>

              {status === "error" && serverMessage && (
                <p className="text-sm text-red-600">{serverMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-full bg-cyan py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Enviando..." : "Quero meu orçamento"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
