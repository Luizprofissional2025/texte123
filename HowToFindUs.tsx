import { BUSINESS } from "@/lib/business";
import { IconMapPin, IconPhone, IconCheck } from "./Icons";

export default function HowToFindUs() {
  const fullAddress = `${BUSINESS.address.street}, ${BUSINESS.address.neighborhood}, ${BUSINESS.address.city} - ${BUSINESS.address.state}, ${BUSINESS.address.zip}`;

  // Monta uma URL de embed do Google Maps a partir do endereço, sem
  // precisar de chave de API paga — suficiente para um mapa simples com
  // marcador. encodeURIComponent evita que os acentos/espaços do
  // endereço quebrem a URL.
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

  return (
    <section id="como-encontrar" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-3xl font-bold text-navy">Como nos encontrar</h2>
      <p className="mt-2 max-w-xl text-slate-600">
        Estamos no coração de São Cristóvão, com fácil acesso e vaga para deixar o carro.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/*
          "loading=lazy" no iframe faz o navegador só carregar o mapa
          (que pesa bastante) quando esta seção estiver perto de entrar na
          tela — em vez de baixar tudo isso no primeiro carregamento da
          página, mesmo que o visitante nunca role até aqui.
        */}
        <div className="overflow-hidden rounded-2xl shadow-card">
          <iframe
            title={`Mapa até ${BUSINESS.name}`}
            src={mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full border-0 md:h-full"
          />
        </div>

        <div className="rounded-2xl bg-slate-50 p-6">
          <div className="flex items-start gap-3">
            <IconMapPin className="mt-1 h-5 w-5 shrink-0 text-cyan" />
            <p className="text-slate-700">{fullAddress}</p>
          </div>
          <div className="mt-4 flex items-start gap-3">
            <IconPhone className="mt-1 h-5 w-5 shrink-0 text-cyan" />
            <p className="text-slate-700">{BUSINESS.phoneDisplay} — também por WhatsApp</p>
          </div>
          <div className="mt-4 flex items-start gap-3">
            <IconCheck className="mt-1 h-5 w-5 shrink-0 text-cyan" />
            <p className="text-slate-700">Perfil verificado no Google</p>
          </div>

          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Ver rotas no Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
