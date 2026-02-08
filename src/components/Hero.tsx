import { motion } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://raw.githubusercontent.com/MrFascinate/Productions/claude/redesign-productions-page-2J4R1/ABC.gif"
          alt=""
          className="absolute w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-primary-950/70 to-primary-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/50 via-transparent to-primary-950/50" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block glass rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest text-accent-400">
            Fascinate Media
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white font-display leading-[0.95] mb-6"
        >
          PRODUCTIONS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-body"
        >
          Award-winning media exploring AI, space, neuroscience, and the future
          — produced and hosted by Justin{' '}
          <span className="text-gradient font-semibold">"Mr. Fascinate"</span>{' '}
          Shaifer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#productions" className="btn-gradient-solid flex items-center gap-2">
            <Play size={16} />
            Watch Reel
          </a>
          <a href="#about" className="btn-gradient-border flex items-center gap-2">
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <a href="#productions" className="text-gray-400 hover:text-white transition-colors">
          <ChevronDown size={28} />
        </a>
      </motion.div>
    </section>
  );
}
