import { BUSINESS } from "@/lib/business";
import { IconInstagram, IconPhone, IconMapPin } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-12 text-slate-400">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3 sm:px-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-200">Contato</h3>
          <a
            href={`tel:+55${BUSINESS.phoneDisplay.replace(/\D/g, "")}`}
            className="mt-3 flex items-center gap-2 text-sm hover:text-white"
          >
            <IconPhone className="h-4 w-4" />
            {BUSINESS.phoneDisplay}
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-200">Redes sociais</h3>
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 text-sm hover:text-white"
          >
            <IconInstagram className="h-4 w-4" />
            {BUSINESS.instagram}
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-200">Endereço</h3>
          <p className="mt-3 flex items-start gap-2 text-sm">
            <IconMapPin className="mt-0.5 h-4 w-4 shrink-0" />
            {BUSINESS.address.street} — {BUSINESS.address.neighborhood}, {BUSINESS.address.city} - {BUSINESS.address.state}
          </p>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-slate-500 sm:px-6">
        © {new Date().getFullYear()} {BUSINESS.legalName}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
