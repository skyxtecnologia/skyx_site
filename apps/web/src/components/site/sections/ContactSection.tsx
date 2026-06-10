'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { api } from '../../../lib/api';

const translations = {
  PT: {
    title: 'Entre em contato',
    description:
      'Compartilhe sua proposta e vamos construir soluções que contribuam para o desenvolvimento de pessoas, negócios e cidades.',
    emailPlaceholder: 'Email',
    submit: 'enviar',
    messagePlaceholder: 'Descreva sua ideia, projeto, parceria ou necessidade…',
    successMessage: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    errorMessage: 'Ocorreu um erro ao enviar. Tente novamente.',
  },
  EN: {
    title: 'Get in touch',
    description:
      'Share your proposal and let us build solutions that contribute to the development of people, businesses, and cities.',
    emailPlaceholder: 'Email',
    submit: 'send',
    messagePlaceholder: 'Describe your idea, project, partnership, or need…',
    successMessage: 'Message sent successfully! We will contact you soon.',
    errorMessage: 'An error occurred while sending. Please try again.',
  },
} as const;

interface ContactSectionProps {
  lang?: 'PT' | 'EN';
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
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="contato"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-6"
      style={{
        background: 'linear-gradient(2deg, #022030 0%, #000D13 100%)',
        paddingTop: 60,
        paddingBottom: 60,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center items-center p-4 gap-4 w-full"
      >
        {/* Cabeçalho */}
        <div className="flex flex-col justify-start items-center gap-2 w-full max-w-[498px]">
          <h2
            className="text-center break-words w-full"
            style={{
              color: 'white',
              fontSize: 'clamp(20px, 5vw, 28px)',
              fontFamily: "'Zen Dots', sans-serif",
              fontWeight: 400,
            }}
          >
            {t.title}
          </h2>
          <p
            className="text-center break-words w-full"
            style={{
              color: 'white',
              fontSize: 'clamp(14px, 4vw, 18px)',
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 300,
              lineHeight: '22px',
            }}
          >
            {t.description}
          </p>
        </div>

        {/* Formulário */}
        <form
          className="flex flex-col justify-center items-center gap-[22px] w-full max-w-[498px] mt-2"
          onSubmit={handleSubmit}
        >
          {/* Linha: Email & Botão */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-[22px] w-full">
            <input
              type="email"
              required
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 h-[44px] px-3 py-1.5 text-white placeholder-white/50 focus:outline-none transition-all"
              style={{
                background: 'linear-gradient(90deg, #013149 0%, #000D13 100%)',
                borderRadius: '6px',
                border: '3px solid #032D41',
                fontSize: 'clamp(12px, 3vw, 14px)',
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 400,
                letterSpacing: '0.36px',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto px-6 py-2.5 hover:brightness-110 hover:shadow-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(85deg, #014263 0%, #67A7D5 100%)',
                borderRadius: '6px',
                color: 'white',
                fontSize: 'clamp(14px, 4vw, 16px)',
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 400,
                lineHeight: '24px',
                letterSpacing: '0.48px',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
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
            className="w-full h-[118px] p-3 text-white placeholder-white/50 focus:outline-none resize-none transition-all"
            style={{
              background: 'linear-gradient(90deg, #013149 0%, #000D13 100%)',
              borderRadius: '6px',
              border: '3px solid #032D41',
              fontSize: 'clamp(12px, 3vw, 14px)',
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 400,
              letterSpacing: '0.36px',
            }}
          />

          {/* Feedback de Status */}
          {status === 'success' && (
            <p className="text-green-400 text-sm mt-2 text-center">{t.successMessage}</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm mt-2 text-center">{t.errorMessage}</p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
