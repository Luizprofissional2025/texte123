import type { Config } from "tailwindcss";

// Este arquivo é o coração do "pré-processador de CSS" do projeto.
// O Tailwind lê todos os arquivos listados em "content" abaixo, ANOTA
// quais classes (ex: "bg-navy", "text-lg") você realmente usou, e gera
// um único arquivo .css contendo SÓ essas classes — todo o resto do
// framework (milhares de classes que você não usou) é descartado.
//
// Resultado prático: em vez de mandar um framework CSS inteiro (ou um
// arquivo .scss compilado sem otimização) para o celular do visitante,
// o site carrega poucos KB de CSS. É exatamente o "menor consumo de
// internet" pedido — só que resolvido no momento do build, não em
// tempo de execução.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta da marca, centralizada aqui. Trocar uma cor da marca no
        // futuro = mudar uma linha aqui, não caçar hexadecimais espalhados
        // pelos componentes.
        navy: {
          DEFAULT: "#0B1E3D",
          light: "#132C55",
        },
        gold: "#D4AF37",
        cyan: "#12B7D6",
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "serif"],
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      // Sombra suave e única, reaproveitada em todos os cartões do site
      // em vez de cada componente inventar a sua.
      boxShadow: {
        card: "0 8px 24px -8px rgba(11, 30, 61, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
