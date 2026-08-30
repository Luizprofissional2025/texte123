import { SERVICES } from "@/lib/business";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section id="servicos" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-navy">Serviços</h2>
        <p className="mt-2 max-w-xl text-slate-600">
          Tudo o que seu carro precisa, em um só lugar — do kit de GNV à manutenção do dia a dia.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* .map() evita repetir o mesmo JSX 4 vezes — adicionar um novo
              serviço no futuro é só adicionar um item em lib/business.ts */}
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
