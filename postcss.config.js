// O PostCSS é o "motor" que processa o CSS durante o build.
// Ele roda dois plugins, em ordem:
//   1. tailwindcss   -> transforma as classes utilitárias em CSS de verdade
//                       e remove tudo que não foi usado (ver tailwind.config.ts).
//   2. autoprefixer  -> adiciona prefixos de navegador (ex: "-webkit-") só
//                       onde for necessário, sem precisar escrever isso à mão.
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
