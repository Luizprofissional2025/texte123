/**
 * Ícones do site, escritos como SVG puro em vez de instalar uma
 * biblioteca de ícones (como react-icons).
 *
 * Por quê: uma biblioteca de ícones normalmente entrega milhares de
 * ícones no pacote, e mesmo com "tree-shaking" (remover o que não é
 * usado) ela ainda adiciona código de apoio ao bundle. Como este site
 * usa menos de 10 ícones, escrevê-los à mão deixa o JavaScript enviado
 * ao navegador menor — de novo, alinhado com o objetivo de "menor
 * consumo de internet".
 *
 * Todos aceitam `className` para que o Tailwind controle tamanho e cor
 * (ex: <IconGas className="h-6 w-6 text-cyan" />).
 */

type IconProps = { className?: string };

export function IconGas({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 21V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v13M4 21h10M4 11h10M16 8l2.5-2.5M19 5a1.5 1.5 0 1 1 2 2l-1 1v4a1.5 1.5 0 0 1-3 0v-1"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBolt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTools({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="m14.7 6.3 3 3M9 15l-4.5 4.5a1.5 1.5 0 0 0 2 2L11 17m-2.6-8.6a4 4 0 1 1 5.6 5.6L21 21l-2 2-6.9-7A4 4 0 0 1 8.4 8.4Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.6} />
      <path d="m8 12.5 2.5 2.5L16 9.5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5 15 9l7 .9-5.1 4.8L18.2 21 12 17.4 5.8 21l1.3-6.3L2 9.9 9 9l3-6.5Z" />
    </svg>
  );
}

export function IconMapPin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth={1.6} />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.56 3.5.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.19 2.4.56 3.5a1 1 0 0 1-.25 1L6.6 10.8Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth={1.6} />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={1.6} />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconWhatsApp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1-.1.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.4.8-1.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}
