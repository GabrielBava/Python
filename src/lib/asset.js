// Prefixa caminhos absolutos de assets (ex.: "/images/foo.jpg") com o base
// path do build atual. Na build de produção normal o base é "/", então isso
// não muda nada; no preview do GitHub Pages (servido de um subcaminho) isso
// garante que as fotos resolvam para o endereço correto.
export function withBase(path) {
  if (!path) return path;
  const base = import.meta.env.BASE_URL;
  if (base === '/') return path;
  return `${base.replace(/\/$/, '')}${path}`;
}
