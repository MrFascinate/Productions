import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { productions, categories, type Production } from '../data/productionsData';

function VideoModal({
  production,
  onClose,
}: {
  production: Production;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="video-modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-5xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
        >
          <X size={28} />
        </button>
        <div className="text-white mb-3">
          <h3 className="text-xl font-display font-bold">{production.title}</h3>
          <p className="text-sm text-gray-400">{production.partner}</p>
        </div>
        <div className="video-container bg-primary-900">
          <iframe
            src={`${production.videoUrl}?autoplay=1&title=0&byline=0&portrait=0`}
            allow="autoplay; fullscreen; picture-in-picture"
            title={production.title}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProductionCard({
  production,
  index,
  onPlay,
}: {
  production: Production;
  index: number;
  onPlay: (p: Production) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-gradient-border group cursor-pointer"
      onClick={() => production.videoUrl && onPlay(production)}
    >
      {/* Thumbnail — GIF or styled placeholder, NO Vimeo iframes */}
      <div className="relative aspect-video bg-gradient-to-br from-primary-900 to-primary-800 overflow-hidden">
        {production.gifUrl ? (
          <img
            src={production.gifUrl}
            alt={production.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-accent-500/20 flex items-center justify-center">
            <span className="text-2xl font-display font-bold text-white/20 uppercase tracking-wider text-center px-4">
              {production.title}
            </span>
          </div>
        )}

        {/* Dark overlay that lifts on hover */}
        <div className="absolute inset-0 bg-primary-950/30 group-hover:bg-primary-950/10 transition-all duration-300" />

        {/* Play button on hover */}
        {production.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-14 h-14 rounded-full bg-accent-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <Play size={22} className="text-white ml-1" fill="white" />
            </motion.div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="glass rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-400">
            {production.category}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5">
        <h3 className="text-lg font-display font-bold text-white group-hover:text-gradient transition-all duration-300 mb-1">
          {production.title}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 mb-3">
          {production.partner}
        </p>
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
          {production.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProductionGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState<Production | null>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const filtered =
    activeCategory === 'All'
      ? productions
      : productions.filter((p) => p.category === activeCategory);

  return (
    <section id="productions" className="relative py-24 sm:py-32 bg-primary-950">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block glass rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400 mb-4">
            Featured Work
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white mb-4">
            THE <span className="text-gradient">PRODUCTIONS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From virtual production workflows and immersive educational series to nationally
            broadcast STEM content and branded campaigns.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Productions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((production, index) => (
              <ProductionCard
                key={production.id}
                production={production}
                index={index}
                onPlay={setActiveVideo}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No productions in this category yet.</p>
          </div>
        )}
      </div>

      {/* Video modal — only place Vimeo is used, on click */}
      <AnimatePresence>
        {activeVideo && activeVideo.videoUrl && (
          <VideoModal
            production={activeVideo}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
