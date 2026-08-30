/**
 * Dados reais da empresa, centralizados em UM lugar.
 *
 * Por quê isso importa: se o telefone ou o endereço mudar um dia, você
 * edita uma linha aqui e o site inteiro (header, rodapé, seção de mapa,
 * botão de WhatsApp) atualiza sozinho — em vez de precisar caçar o mesmo
 * texto espalhado em vários componentes.
 */
export const BUSINESS = {
  name: "Imperador Auto GNV",
  legalName: "Imperador Auto 2 GNV",
  tagline: "Especialistas em GNV, atendimento de alto nível, homologado pelo INMETRO",
  address: {
    street: "Rua Francisco Eugênio, 398",
    neighborhood: "São Cristóvão",
    city: "Rio de Janeiro",
    state: "RJ",
    zip: "20921-080",
  },
  phoneDisplay: "(21) 97279-4004",
  instagram: "@imperador_autognv",
  instagramUrl: "https://www.instagram.com/imperador_autognv",
  rating: 4.5,
  reviewCount: 31,
  yearsInBusiness: 20,
} as const;

export const SERVICES = [
  {
    icon: "gas" as const,
    title: "Instalação de GNV",
    description: "Kits homologados pelo INMETRO, com laudo e garantia.",
  },
  {
    icon: "bolt" as const,
    title: "Injeção eletrônica",
    description: "Diagnóstico e reparo com equipamento especializado.",
  },
  {
    icon: "tools" as const,
    title: "Mecânica leve",
    description: "Revisões, freios, suspensão e manutenção preventiva.",
  },
  {
    icon: "check" as const,
    title: "Manutenção do kit GNV",
    description: "Revisão periódica exigida para manter a homologação.",
  },
] as const;
