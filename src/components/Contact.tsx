import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-primary-950">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block glass rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400 mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-4">
            INTERESTED IN{' '}
            <span className="text-gradient">COLLABORATING?</span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto">
            Whether it&rsquo;s a branded production, educational series, or a speaking
            engagement — let&rsquo;s create something extraordinary together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-gradient-border p-8 sm:p-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="mailto:contact@justinshaifer.com"
              className="btn-gradient-solid flex items-center gap-2 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={16} />
              Send Email
            </motion.a>
            <motion.a
              href="https://www.justinshaifer.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient-border flex items-center gap-2 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              Contact Page
            </motion.a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <motion.a
              href="https://www.linkedin.com/in/jshaifer/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-accent-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
            <motion.a
              href="mailto:contact@justinshaifer.com"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-accent-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Mail size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
