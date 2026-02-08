import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const links = [
  { label: 'Productions', href: '#productions' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative bg-primary-950 pt-16 pb-8">
      <div className="section-divider mb-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              MR. <span className="text-gradient">FASCINATE</span>
            </h3>
            <p className="text-sm text-gray-400">
              Award-winning STEM media producer and on-camera talent.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">
              Quick Links
            </p>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* External links */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">
              Connect
            </p>
            <div className="flex flex-col gap-2">
              <motion.a
                href="https://www.justinshaifer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-accent-400 transition-colors inline-flex items-center gap-1"
                whileHover={{ x: 4 }}
              >
                Main Website <ExternalLink size={12} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/jshaifer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-accent-400 transition-colors inline-flex items-center gap-1"
                whileHover={{ x: 4 }}
              >
                LinkedIn <ExternalLink size={12} />
              </motion.a>
              <motion.a
                href="https://vimeo.com/fascinateai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-accent-400 transition-colors inline-flex items-center gap-1"
                whileHover={{ x: 4 }}
              >
                Vimeo <ExternalLink size={12} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Fascinate Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
