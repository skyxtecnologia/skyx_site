import Link from 'next/link';

export default function EmpresaPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 bg-white flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <Link href="/" className="text-sm text-[#014263] hover:underline mb-8 inline-block">
          &larr; Voltar para Home
        </Link>
        <h1 className="font-zen-dots text-4xl md:text-5xl text-[#014263] mb-6">A Empresa</h1>
        <p className="text-xl text-gray-600 font-roboto font-light leading-relaxed mb-12">
          História da SkyX, valores, quem fundou, o porquê, soluções e missões que buscamos, o que
          queremos para nossa sociedade.
        </p>

        <div className="space-y-12">
          <section className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
            <h2 className="font-zen-dots text-2xl text-[#014263] mb-4">Nossa História</h2>
            <p className="text-gray-600 font-roboto leading-relaxed">
              Aqui contaremos como a SkyX foi criada, os desafios iniciais e a visão de transformar
              o mundo através de soluções imersivas e engenharia de software de ponta.
            </p>
          </section>

          <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="font-zen-dots text-2xl text-[#014263] mb-4">Missão e Valores</h2>
            <p className="text-gray-600 font-roboto leading-relaxed">
              Detalhar a missão de entregar tecnologia com excelência. Listar os valores que movem o
              time todos os dias: inovação, transparência, foco no resultado.
            </p>
          </section>

          <section className="bg-blue-900 text-white p-8 rounded-3xl">
            <h2 className="font-zen-dots text-2xl mb-4">Impacto Social</h2>
            <p className="font-roboto font-light leading-relaxed opacity-90">
              Descrever o que queremos para nossa sociedade. Como nossas aplicações e soluções em
              educação e imersão empresarial mudam a vida das pessoas.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
