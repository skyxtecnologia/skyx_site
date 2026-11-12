'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { api } from '../../../lib/api';

const translations = {
  PT: {
    title: 'Entre em contato',
    description:
      'Compartilhe sua proposta e vamos construir soluções que contribuam para o desenvolvimento de pessoas, negócios e cidades.',
    emailPlaceholder: 'Seu melhor e-mail',
    submit: 'Enviar mensagem',
    messagePlaceholder: 'Descreva sua ideia, projeto, parceria ou necessidade…',
    successMessage: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    errorMessage: 'Ocorreu um erro ao enviar. Tente novamente.',
  },
  EN: {
    title: 'Get in touch',
    description:
      'Share your proposal and let us build solutions that contribute to the development of people, businesses, and cities.',
    emailPlaceholder: 'Your best email',
    submit: 'Send message',
    messagePlaceholder: 'Describe your idea, project, partnership, or need…',
    successMessage: 'Message sent successfully! We will contact you soon.',
    errorMessage: 'An error occurred while sending. Please try again.',
  },
  ES: {
    title: 'Ponte en contacto',
    description:
      'Comparte tu propuesta y construiremos soluciones que contribuyan al desarrollo de personas, negocios y ciudades.',
    emailPlaceholder: 'Tu mejor correo electrónico',
    submit: 'Enviar mensaje',
    messagePlaceholder: 'Describe tu idea, proyecto, asociación o necesidad…',
    successMessage: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
    errorMessage: 'Se produjo un error al enviar. Inténtalo de nuevo.',
  },
} as const;

interface ContactSectionProps {
  lang?: 'PT' | 'EN' | 'ES';
}

export function ContactSection({ lang = 'PT' }: ContactSectionProps) {
  const t = translations[lang];
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setStatus('loading');
    try {
      await api.post('/api/contact', { email, message });
      setStatus('success');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="contato"
      className="relative w-full min-h-[70vh] py-[55px] md:py-[89px] flex flex-col items-center justify-center overflow-hidden px-4 md:px-6"
      style={{
        background: 'linear-gradient(2deg, #022030 0%, #000D13 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center items-center p-4 gap-5 w-full"
      >
        {/* Cabeçalho */}
        <div className="flex flex-col justify-start items-center gap-2.5 w-full max-w-[520px] text-center">
          <h2
            className="text-white font-zen-dots break-words w-full"
            style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)',
              lineHeight: 1.25,
            }}
          >
            {t.title}
          </h2>
          <p className="text-gray-300 font-roboto font-light text-sm md:text-base leading-relaxed break-words w-full">
            {t.description}
          </p>
        </div>

        {/* Formulário */}
        <form
          className="flex flex-col justify-center items-center gap-[18px] w-full max-w-[520px] mt-2"
          onSubmit={handleSubmit}
        >
          {/* Linha: Email & Botão */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-[16px] w-full">
            <input
              type="email"
              required
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 h-[44px] px-3.5 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#67a7d5] transition-all font-roboto text-sm rounded-[8px] border-2 border-[#032D41]"
              style={{
                background: 'linear-gradient(90deg, #013149 0%, #000D13 100%)',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto px-7 h-[44px] bg-gradient-to-r from-[#013149] to-[#000d13] text-white rounded-[10px] border border-white/10 font-roboto font-normal text-sm md:text-base tracking-[0.48px] hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all duration-300 cursor-pointer disabled:opacity-70"
            >
              {status === 'loading' ? '...' : t.submit}
            </button>
          </div>

          {/* Campo de Mensagem */}
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.messagePlaceholder}
            className="w-full h-[124px] p-3.5 text-white placeholder-white/50 focus:outline-none focus:border-[#67a7d5] resize-none transition-all font-roboto text-sm rounded-[8px] border-2 border-[#032D41]"
            style={{
              background: 'linear-gradient(90deg, #013149 0%, #000D13 100%)',
            }}
          />

          {/* Feedback de Status */}
          {status === 'success' && (
            <p className="text-green-400 text-sm font-roboto text-center">{t.successMessage}</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm font-roboto text-center">{t.errorMessage}</p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
