import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Tv, Users, Clapperboard } from 'lucide-react';

const highlights = [
  {
    icon: Award,
    label: 'Forbes 30 Under 30',
    detail: 'Science & Technology',
  },
  {
    icon: Tv,
    label: 'LinkedIn Top Voice',
    detail: 'Featured Instructor',
  },
  {
    icon: Users,
    label: '5M+ Reached',
    detail: 'Global Audience',
  },
  {
    icon: Clapperboard,
    label: 'Executive Producer',
    detail: 'Fascinate Media',
  },
];

const collaborators = [
  'LinkedIn',
  'Google',
  'NVIDIA',
  'Intuit',
  'PBS',
  'Discovery',
  'Bill Nye',
  'Al Roker',
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-primary-900">
      <div className="section-divider" />

      {/* Decorative blurs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: highlights grid */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="card-gradient-border p-5 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon size={22} className="text-accent-400" />
                  </div>
                  <h4 className="text-sm font-display font-bold text-white mb-1">
                    {item.label}
                  </h4>
                  <p className="text-xs text-gray-400">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block glass rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400 mb-4">
              About
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white mb-6">
              THE <span className="text-gradient">PRODUCER</span>
            </h2>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                At <span className="text-white font-semibold">Fascinate Media</span>, Justin
                serves as both executive producer and on-camera talent, creating educational
                content about innovation, AI & STEM literacy, and the Future of Work.
              </p>
              <p>
                His team continues ongoing research and development by producing experimental
                media projects using AI tools, such as AI Agents, Unreal Engine, and Virtual
                Reality.
              </p>
            </div>

            {/* Collaborators */}
            <div className="mt-8">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                Past Collaborators
              </p>
              <div className="flex flex-wrap gap-2">
                {collaborators.map((name) => (
                  <span
                    key={name}
                    className="glass rounded-full px-3 py-1.5 text-xs text-gray-300 font-medium"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <motion.a
              href="https://www.justinshaifer.com/bio"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient-border inline-block mt-8 !py-3 !px-6 text-xs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Full Bio
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div className="section-divider mt-16" />
    </section>
  );
}
