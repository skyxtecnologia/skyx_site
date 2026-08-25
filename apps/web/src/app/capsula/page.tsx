import Link from 'next/link';

export default function CapsulaPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 bg-white flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <Link href="/" className="text-sm text-[#014263] hover:underline mb-8 inline-block">
          &larr; Voltar para Home
        </Link>
        <h1 className="font-zen-dots text-4xl md:text-5xl text-[#014263] mb-6">Cápsula Imersiva</h1>
        <p className="text-xl text-gray-600 font-roboto font-light leading-relaxed mb-12">
          Página dedicada aos robôs e à Cápsula: informações técnicas, usos e contratação (contato).
        </p>

        <div className="space-y-12">
          <section className="bg-gradient-to-r from-[#014263] to-[#012538] p-8 rounded-3xl text-white">
            <h2 className="font-zen-dots text-2xl mb-4 text-white">A Cápsula e Robótica</h2>
            <p className="font-roboto font-light leading-relaxed opacity-90">
              Descrever o funcionamento da cápsula imersiva. Exibir imagens e especificações
              técnicas sobre como os robôs são integrados.
            </p>
          </section>

          <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="font-zen-dots text-2xl text-[#014263] mb-4">Casos de Uso</h2>
            <ul className="list-disc list-inside text-gray-600 font-roboto leading-relaxed space-y-2">
              <li>Treinamento de alto risco em VR</li>
              <li>Imersão educacional para escolas e universidades</li>
              <li>Eventos corporativos interativos</li>
              <li>Simulações complexas de engenharia</li>
            </ul>
          </section>

          <section className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
            <h2 className="font-zen-dots text-2xl text-[#014263] mb-4">Contratação & Contato</h2>
            <p className="text-gray-600 font-roboto leading-relaxed mb-6">
              Quer levar a Cápsula Imersiva para o seu evento ou empresa? Entre em contato com nossa
              equipe comercial.
            </p>
            <button
              type="button"
              className="px-6 py-3 bg-[#014263] text-white rounded-full font-roboto hover:bg-[#012538] transition-colors"
            >
              Solicitar Orçamento
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
