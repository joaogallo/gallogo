import Image from "next/image";
import Link from "next/link";
import galloLogo from "@/media/avatar/gallo-logo.png";
import galloMascot from "@/media/avatar/gallo-mascot.png";
import galloExplorer from "@/media/avatar/gallo-explorer.png";
import galloAdventurer from "@/media/avatar/gallo-adventurer.png";
import galloHacker from "@/media/avatar/gallo-hacker.png";

const AGE_PROFILES = [
  {
    id: "6-8",
    title: "Explorador",
    age: "6 a 8 anos",
    image: galloExplorer,
    description:
      "Interface colorida e divertida com elementos grandes, perfeita para os primeiros passos na programação.",
    color: "bg-yellow-400/20 border-yellow-400/40",
  },
  {
    id: "8-10",
    title: "Aventureiro",
    age: "8 a 10 anos",
    image: galloAdventurer,
    description:
      "Visual equilibrado com estética de game, ideal para quem já conhece o básico e quer explorar mais.",
    color: "bg-teal-400/20 border-teal-400/40",
  },
  {
    id: "10-14",
    title: "Hacker",
    age: "10 a 14 anos",
    image: galloHacker,
    description:
      "Tema escuro com estética de terminal, para quem quer se sentir um programador de verdade.",
    color: "bg-green-400/20 border-green-400/40",
  },
];

const FEATURES = [
  {
    icon: "~>",
    title: "Terminal Interativo",
    description:
      "Digite comandos e veja a tartaruga executar em tempo real. Histórico, autocomplete e syntax highlighting inclusos.",
  },
  {
    icon: "[]",
    title: "Lições Guiadas",
    description:
      "5 módulos com mais de 25 lições progressivas, desde os primeiros passos até fractais e recursão.",
  },
  {
    icon: "/\\",
    title: "Canvas Animado",
    description:
      "Veja seus desenhos ganharem vida com animações suaves. Exporte como PNG e compartilhe na galeria.",
  },
  {
    icon: "PT",
    title: "100% em Português",
    description:
      "Todos os comandos funcionam em português: pf, vd, repita, aprenda, faça e muito mais.",
  },
  {
    icon: "**",
    title: "Gamificação",
    description:
      "Ganhe pontos, suba de nível, conquiste badges e dispute o ranking com outros programadores.",
  },
  {
    icon: "<>",
    title: "Adaptativo por Idade",
    description:
      "A interface se adapta automaticamente — cores, tamanhos e complexidade mudam conforme a faixa etária.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-16 md:flex-row md:py-24">
          <div className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
            <Image
              src={galloLogo}
              alt="GalloGo — Aprenda a Programar"
              width={360}
              className="w-72 md:w-[360px]"
              priority
            />
            <p className="max-w-lg text-lg text-content-secondary">
              Uma plataforma educacional onde crianças aprendem a programar
              controlando uma tartaruga que desenha na tela, usando a linguagem
              Logo — em português!
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-[var(--radius-md)] bg-primary px-6 py-3 text-base font-bold text-white shadow-lg hover:bg-primary-dark transition-colors"
              >
                Começar Agora
              </Link>
              <Link
                href="/playground"
                className="rounded-[var(--radius-md)] border-2 border-primary px-6 py-3 text-base font-bold text-primary hover:bg-primary/10 transition-colors"
              >
                Experimentar
              </Link>
            </div>
          </div>
          <div className="flex flex-1 justify-center">
            <Image
              src={galloMascot}
              alt="Gallo — o mascote tartaruga"
              width={380}
              className="w-64 drop-shadow-2xl md:w-[380px]"
              priority
            />
          </div>
        </div>
      </section>

      {/* O que é o GalloGo */}
      <section className="border-t border-border bg-surface-secondary py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold text-content md:text-3xl">
            O que é o GalloGo?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-content-secondary">
            GalloGo é uma plataforma web inspirada na linguagem Logo, criada nos
            anos 1960 por Seymour Papert. A filosofia é simples:{" "}
            <strong className="text-content">
              crianças aprendem melhor construindo
            </strong>
            . Aqui, elas dão instruções para uma tartaruga que se move e desenha
            na tela — aprendendo lógica, geometria e pensamento computacional
            brincando.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
            <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5">
              <div className="text-3xl font-bold text-primary">25+</div>
              <div className="mt-1 text-sm text-content-secondary">
                Lições progressivas em 5 módulos
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5">
              <div className="text-3xl font-bold text-primary">40+</div>
              <div className="mt-1 text-sm text-content-secondary">
                Comandos com aliases em português
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5">
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="mt-1 text-sm text-content-secondary">
                Perfis de idade com temas adaptados
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfis por Idade */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold text-content md:text-3xl">
            Uma experiência adaptada para cada idade
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-content-secondary">
            A interface, as cores, o tamanho da fonte e a complexidade do
            conteúdo se ajustam automaticamente ao perfil escolhido.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {AGE_PROFILES.map((profile) => (
              <div
                key={profile.id}
                className={`flex flex-col items-center gap-4 rounded-[var(--radius-xl)] border-2 p-6 text-center transition-transform hover:scale-[1.02] ${profile.color}`}
              >
                <Image
                  src={profile.image}
                  alt={`Perfil ${profile.title}`}
                  width={200}
                  className="h-48 w-auto drop-shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-content">
                    {profile.title}
                  </h3>
                  <span className="text-sm font-medium text-primary">
                    {profile.age}
                  </span>
                </div>
                <p className="text-sm text-content-secondary">
                  {profile.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="border-t border-border bg-surface-secondary py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold text-content md:text-3xl">
            Tudo que você precisa para aprender
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="rounded-[var(--radius-lg)] border border-border bg-surface p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-primary/10 font-mono text-sm font-bold text-primary">
                  {feat.icon}
                </div>
                <h3 className="mt-3 text-base font-bold text-content">
                  {feat.title}
                </h3>
                <p className="mt-1 text-sm text-content-secondary">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-2xl font-bold text-content md:text-3xl">
            Como funciona?
          </h2>
          <div className="mt-10 space-y-8">
            {[
              {
                step: "1",
                title: "Crie sua conta e escolha sua idade",
                text: "O tema da interface se adapta automaticamente — de colorido e divertido para os menores até estética de terminal para os mais velhos.",
              },
              {
                step: "2",
                title: "Siga as lições ou vá direto para o playground",
                text: "As lições ensinam passo a passo, dos movimentos básicos (pf, vd) até procedures, recursão e fractais. Ou explore livremente no playground!",
              },
              {
                step: "3",
                title: "Digite comandos e veja a tartaruga desenhar",
                text: "A tela é dividida em 3 painéis: instruções, terminal e canvas. Digite comandos como 'repita 4 [pf 100 vd 90]' e veja um quadrado aparecer.",
              },
              {
                step: "4",
                title: "Ganhe pontos, suba de nível e conquiste badges",
                text: "Complete desafios, mantenha seu streak diário e suba no ranking. São 10 níveis de Tartaruga Iniciante a Arquiteto Digital!",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-content">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-content-secondary">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-border bg-surface-secondary py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <h2 className="text-2xl font-bold text-content md:text-3xl">
            Pronto para começar?
          </h2>
          <p className="text-content-secondary">
            Junte-se à plataforma e comece sua jornada como programador. É
            gratuito, divertido e 100% em português!
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-[var(--radius-md)] bg-primary px-8 py-3 text-base font-bold text-white shadow-lg hover:bg-primary-dark transition-colors"
            >
              Criar Conta Grátis
            </Link>
            <Link
              href="/login"
              className="rounded-[var(--radius-md)] border-2 border-border px-8 py-3 text-base font-bold text-content-secondary hover:bg-surface transition-colors"
            >
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-content-muted">
          GalloGo — Plataforma educacional de programação com Logo. Inspirado na
          filosofia de Seymour Papert.
        </div>
      </footer>
    </div>
  );
}
