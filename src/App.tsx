import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Play, X, ChevronDown, ExternalLink, Menu } from 'lucide-react'

/* ─── Data ─── */

interface Production {
  id: string
  title: string
  partner: string
  description: string
  category: string
  videoUrl?: string
  externalUrl?: string
  gifUrl?: string
  thumbnailUrl?: string
}

const productions: Production[] = [
  {
    id: 'curiosity-theory',
    title: 'Curiosity Theory',
    partner: 'Fascinate Media',
    description: 'An educational science podcast where co-hosts Dr. Dakotah Tyler and Justin Shaifer talk space, science, the future, and culture.',
    category: 'Series',
    externalUrl: 'https://curiositytheorypod.com',
    gifUrl: '/gifs/curiosity theory.gif?v=2',
  },
  {
    id: 'day-on-mars',
    title: 'Day On Mars',
    partner: 'Fascinate Media',
    description: 'Day On Mars is a 3D-Animated short-form series produced in Unreal Engine that showcases how future residents might spend their day on Mars.',
    category: 'Series',
    gifUrl: '/gifs/DayOnMars4k_7_6_24_1(2).gif',
  },
  {
    id: 'chevy-ev',
    title: "What's Cool About Electric",
    partner: 'Chevrolet',
    description: 'Justin hosts a car commercial for Chevy\'s EV, describing "What\'s Cool About Electric" and how sustainable energy sources can empower communities of color.',
    category: 'Commercial',
    videoUrl: 'https://player.vimeo.com/video/787496100',
    gifUrl: '/gifs/CHEVY DTU.gif',
  },
  {
    id: 'linkedin-learning',
    title: 'Chat with AI',
    partner: 'LinkedIn',
    description: 'Justin works with LinkedIn Learning to engage in a dynamic conversation with an AI about the Future of Work.',
    category: 'Branded Content',
    videoUrl: 'https://player.vimeo.com/video/787493637',
    gifUrl: '/gifs/LinkedIn Learning.gif',
  },
  {
    id: 'why-am-i-like-this',
    title: 'Why am I Like This?',
    partner: 'PBS Digital Studios',
    description: 'Justin executive produced an 8 episode series about biology and anthropology starring Dr. Tina Lasisi. His cameo appearances can be found on YouTube!',
    category: 'Series',
    gifUrl: '/gifs/WHYA.gif',
  },
  {
    id: 'intuit-ideas',
    title: 'Intuit IDEAS',
    partner: 'Fascinate Media',
    description: 'A branded content series capturing the progress of business owners as they use Intuit\'s financial technology products such as TurboTax, Mailchimp, and more.',
    category: 'Branded Content',
    gifUrl: '/gifs/Intuit Teaser.gif',
  },
  {
    id: 'second-home',
    title: 'A Second Home',
    partner: 'Fascinate Media',
    description: 'Justin breaks down how he used a virtual production workflow to create A Second Home, an immersive educational series hosted by an astrophysicist imagining life on exoplanets.',
    category: 'Series',
    videoUrl: 'https://player.vimeo.com/video/787498544',
    gifUrl: '/gifs/ASecondHome2.gif',
  },
  {
    id: 'metaverse',
    title: 'On The Verge',
    partner: 'Al Roker Entertainment',
    description: 'A proof of concept for a series produced by Al Roker Entertainment about the Metaverse and its implications, hosted and co-produced by Justin "Mr. Fascinate" Shaifer.',
    category: 'Series',
    videoUrl: 'https://player.vimeo.com/video/787497906',
    gifUrl: '/gifs/metaverse.gif',
  },
  {
    id: 'attn-mgm',
    title: 'ATTN x MGM',
    partner: 'ATTN',
    description: 'Justin partners with ATTN and travels across MGM resorts in Las Vegas, discussing how each experience heightens and reduces specific neurotransmitters.',
    category: 'Branded Content',
    videoUrl: 'https://player.vimeo.com/video/787494350',
    gifUrl: '/gifs/mgm-attn.gif',
  },
  {
    id: 'wedu-pbs',
    title: 'Climate Impact Reduction',
    partner: 'WEDU PBS',
    description: 'Justin works with WEDU PBS in Tampa, FL to discuss innovations for local climate impact reduction. This was filmed immediately before Hurricane Ian made landfall nearby.',
    category: 'Broadcast',
    videoUrl: 'https://player.vimeo.com/video/787495541',
    gifUrl: '/gifs/WEDU.gif',
  },
  {
    id: 'purecycle',
    title: 'Everyday Science',
    partner: 'PureCycle / Intuitive Content',
    description: 'Justin works with MythBusters star Kari Byron and Jenny Buccos to host a show about the past, present, and future of plastics.',
    category: 'Series',
    videoUrl: 'https://player.vimeo.com/video/787496645',
    gifUrl: '/gifs/purecycle.gif',
  },
  {
    id: 'al-roker-space',
    title: 'Forging the Future',
    partner: 'Al Roker Entertainment',
    description: 'Justin works with Al Roker Entertainment to host an episode of a dynamic show where he explores the possibility of human-led expeditions to the moon and Mars.',
    category: 'Series',
    videoUrl: 'https://player.vimeo.com/video/787497321',
    gifUrl: '/gifs/Forging the Future.gif',
  },
  {
    id: 'usa-science-fest',
    title: 'USA Science Festival',
    partner: 'USA Science & Engineering Festival',
    description: 'Justin served as official host and MC for 5 large-scale USA Science Fest Events, engaging thousands of attendees with interactive STEM demonstrations.',
    category: 'Live Events',
    gifUrl: '/gifs/USA Science Fest.gif',
  },
  {
    id: 'stem-success-summit',
    title: 'STEM Success Summit',
    partner: 'STEMedia',
    description: 'Justin co-produced an educational summit with STEMedia for thousands of STEM professionals featuring popular STEM leaders and figures across the globe.',
    category: 'Live Events',
    externalUrl: 'https://www.stemedia.com/experience/stem-success-summit',
    gifUrl: '/gifs/stem success trailer.gif',
  },
  {
    id: 'soul-of-a-nation',
    title: 'Soul of a Nation',
    partner: 'ABC News',
    description: 'Justin weighs in on the importance of STEM with ABC News on Prime Time TV in their 6-part series Soul of a Nation. Justin\'s feature in episode 2 is now available on Hulu.',
    category: 'Broadcast',
    gifUrl: '/gifs/abc.gif',
  },
  {
    id: 'nsf-icorps',
    title: 'NSF iCorps',
    partner: 'NSF / USC',
    description: 'A series of educational explainer videos describing the impact of NSF\'s iCorps program at USC.',
    category: 'Education',
    gifUrl: '/gifs/NSF+ICorps.gif',
  },
  {
    id: 'hood-science',
    title: 'Hood Science',
    partner: 'Fascinate Media',
    description: 'An animated series that explains educational concepts like environmental justice and food deserts.',
    category: 'Series',
    gifUrl: '/gifs/HOOD SCIENCE.gif',
  },
  {
    id: 'ai-cool-things',
    title: '3 Cool Things You Can Do with AI Today',
    partner: 'Fascinate Media',
    description: 'Justin shares three practical and exciting things you can do with AI right now.',
    category: 'AI Video',
    videoUrl: 'https://player.vimeo.com/video/1075550647',
    thumbnailUrl: 'https://vumbnail.com/1075550647.jpg',
  },
  {
    id: 'ai-assistants',
    title: 'AI Assistants and How They Can Help',
    partner: 'Fascinate Media',
    description: 'A breakdown of how AI assistants work and the ways they can boost your productivity.',
    category: 'AI Video',
    videoUrl: 'https://player.vimeo.com/video/1097189159',
    thumbnailUrl: 'https://vumbnail.com/1097189159.jpg',
  },
  {
    id: 'ai-agents',
    title: 'What Are AI Agents?',
    partner: 'Fascinate Media',
    description: 'Justin explains what AI agents are and why they matter for the future of work.',
    category: 'AI Video',
    videoUrl: 'https://player.vimeo.com/video/1074161713',
    thumbnailUrl: 'https://vumbnail.com/1074161713.jpg',
  },
  {
    id: 'ai-headshots',
    title: 'Are AI Headshots Good Enough Today?',
    partner: 'Fascinate Media',
    description: 'Testing whether AI-generated headshots are ready to replace professional photography.',
    category: 'AI Video',
    videoUrl: 'https://player.vimeo.com/video/1154892061',
    thumbnailUrl: 'https://vumbnail.com/1154892061.jpg',
  },
  {
    id: 'ai-social-clips',
    title: 'AI Can Edit Your Social Media Clips',
    partner: 'Fascinate Media',
    description: 'How AI tools can automatically edit and optimize your social media video content.',
    category: 'AI Video',
    videoUrl: 'https://player.vimeo.com/video/1154892200',
    thumbnailUrl: 'https://vumbnail.com/1154892200.jpg',
  },
  {
    id: 'ai-agents-replacing',
    title: 'AI Agents Replacing Assistants',
    partner: 'Fascinate Media',
    description: 'Exploring how AI agents are evolving beyond simple assistants into autonomous workers.',
    category: 'AI Video',
    videoUrl: 'https://player.vimeo.com/video/1154892514',
    thumbnailUrl: 'https://vumbnail.com/1154892514.jpg',
  },
  {
    id: 'ai-jobs-future',
    title: 'AI Enabled Jobs of the Future',
    partner: 'Fascinate Media',
    description: 'A look at the new careers and roles that AI is creating across industries.',
    category: 'AI Video',
    videoUrl: 'https://player.vimeo.com/video/1154892579',
    thumbnailUrl: 'https://vumbnail.com/1154892579.jpg',
  },
  {
    id: 'ai-context-eng',
    title: 'What Is Context Engineering?',
    partner: 'Fascinate Media',
    description: 'Justin breaks down the emerging discipline of context engineering for AI systems.',
    category: 'AI Video',
    videoUrl: 'https://player.vimeo.com/video/1154892831',
    thumbnailUrl: 'https://vumbnail.com/1154892831.jpg',
  },
  {
    id: 'ai-background',
    title: 'Replacing Any Background with AI',
    partner: 'Fascinate Media',
    description: 'How to use AI to seamlessly replace backgrounds in photos and videos.',
    category: 'AI Video',
    videoUrl: 'https://player.vimeo.com/video/1154892954',
    thumbnailUrl: 'https://vumbnail.com/1154892954.jpg',
  },
  {
    id: 'ai-face-upload',
    title: 'Watch This Before Uploading Your Face with AI Tools',
    partner: 'Fascinate Media',
    description: 'Important privacy and safety considerations before using AI face tools.',
    category: 'AI Video',
    videoUrl: 'https://player.vimeo.com/video/1154893086',
    thumbnailUrl: 'https://vumbnail.com/1154893086.jpg',
  },
  {
    id: 'ai-prompt-importance',
    title: "How Does AI Know What's Most Important in Your Prompt?",
    partner: 'Fascinate Media',
    description: 'Understanding how AI models parse and prioritize different parts of your prompts.',
    category: 'AI Video',
    videoUrl: 'https://player.vimeo.com/video/1154893202',
    thumbnailUrl: 'https://vumbnail.com/1154893202.jpg',
  },
]

const categories = ['All', 'Series', 'Education', 'Branded Content', 'Broadcast', 'Commercial', 'Live Events', 'AI Video']


/* ─── Navbar ─── */

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="glass rounded-full flex items-center justify-between px-6 py-3">
          <a href="#" className="flex items-center">
            <img src="/mr_fascinate_logo_transparent_blue.png" alt="Mr. Fascinate" className="h-7 object-contain" />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {['Productions', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-white transition uppercase tracking-wider">{l}</a>
            ))}
            <a href="https://www.justinshaifer.com" target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wider text-white border border-blue/40 rounded-full px-5 py-2 hover:bg-blue/10 transition">
              Main Site
            </a>
          </div>
          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden glass rounded-2xl mt-2 p-5 flex flex-col gap-3">
            {['Productions', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                className="text-sm text-gray-300 hover:text-white uppercase tracking-wider">{l}</a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

/* ─── Hero ─── */

function Hero() {
  const [showReel, setShowReel] = useState(false)
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/gifs/abc.gif" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark" />

        <div className="relative z-10 text-center pt-32 pb-20 px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mb-6">
            <img src="/gifs/f8 media.png" alt="F8 Media" className="h-80 sm:h-96 mx-auto object-contain" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-none mb-6" style={{ fontFamily: 'Oswald' }}>
            PRODUCTIONS
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Award winning educational content about Space, Biology, AI and the future, hosted and executive produced by Justin <span className="font-semibold text-white mx-1">"Mr. Fascinate"</span> Shaifer.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowReel(true)} className="inline-flex items-center justify-center gap-2 bg-blue text-white font-semibold text-sm uppercase tracking-wider rounded-full px-8 py-4 hover:-translate-y-0.5 transition shadow-lg shadow-blue/30">
              <Play size={16} /> Watch Reel
            </button>
            <a href="#about" className="inline-flex items-center justify-center gap-2 border border-blue/40 text-white font-semibold text-sm uppercase tracking-wider rounded-full px-8 py-4 hover:bg-blue/10 transition">
              Learn More
            </a>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <a href="#productions" className="text-gray-400 hover:text-white transition"><ChevronDown size={28} /></a>
        </motion.div>
      </section>

      <AnimatePresence>
        {showReel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center"
            onClick={() => setShowReel(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl mx-4" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowReel(false)} className="absolute -top-12 right-0 text-white/70 hover:text-white"><X size={28} /></button>
              <p className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Oswald' }}>PRODUCTION REEL</p>
              <div className="relative pb-[56.25%] rounded-xl overflow-hidden bg-dark-card">
                <iframe src="https://player.vimeo.com/video/810371279?autoplay=1&title=0&byline=0&portrait=0"
                  allow="autoplay; fullscreen; picture-in-picture" title="Production Reel"
                  className="absolute inset-0 w-full h-full border-0" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Video Modal ─── */

function VideoModal({ production, onClose }: { production: Production; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="relative w-full max-w-5xl mx-4" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white/70 hover:text-white"><X size={28} /></button>
        <p className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Oswald' }}>{production.title}</p>
        <p className="text-gray-400 text-sm mb-3">{production.partner}</p>
        <div className="relative pb-[56.25%] rounded-xl overflow-hidden bg-dark-card">
          <iframe src={`${production.videoUrl}?autoplay=1&title=0&byline=0&portrait=0`}
            allow="autoplay; fullscreen; picture-in-picture" title={production.title}
            className="absolute inset-0 w-full h-full border-0" />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Production Card ─── */

function ProductionCard({ p, i, onPlay }: { p: Production; i: number; onPlay: (p: Production) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="card cursor-pointer group"
      onClick={() => {
        if (p.externalUrl) window.open(p.externalUrl, '_blank', 'noopener,noreferrer')
        else if (p.videoUrl) onPlay(p)
      }}>

      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-dark">
        {(p.gifUrl || p.thumbnailUrl) ? (
          <img src={p.gifUrl || p.thumbnailUrl} alt={p.title} loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card via-dark to-blue/10">
            <span className="text-2xl font-bold text-white/10 uppercase tracking-wider text-center px-6"
              style={{ fontFamily: 'Oswald' }}>{p.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-300" />
        {p.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-blue/90 flex items-center justify-center">
              <Play size={22} className="text-white ml-0.5" fill="white" />
            </div>
          </div>
        )}
        <span className="absolute top-3 left-3 glass rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan">
          {p.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Oswald' }}>{p.title}</h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan mb-3">{p.partner}</p>
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{p.description}</p>
      </div>
    </motion.div>
  )
}

/* ─── Productions Section ─── */

function Productions() {
  const [cat, setCat] = useState('All')
  const [video, setVideo] = useState<Production | null>(null)

  const filtered = cat === 'All' ? productions : productions.filter(p => p.category === cat)

  return (
    <section id="productions" className="relative py-24 bg-dark">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                cat === c ? 'bg-blue text-white shadow-lg shadow-blue/30' : 'glass text-gray-400 hover:text-white'
              }`}>{c}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => <ProductionCard key={p.id} p={p} i={i} onPlay={setVideo} />)}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {video?.videoUrl && <VideoModal production={video} onClose={() => setVideo(null)} />}
      </AnimatePresence>
    </section>
  )
}

/* ─── Contact Modal ─── */

const findSources = ['LinkedIn', 'Instagram', 'YouTube', 'TikTok', 'Google', 'Referral', 'Other']

function ContactModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-blue/30 bg-dark-card p-8"
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition"><X size={24} /></button>
        <h2 className="text-3xl font-bold text-white text-center mb-2" style={{ fontFamily: 'Oswald' }}>
          BOOK <span className="text-gradient">NOW</span>
        </h2>
        <p className="text-gray-400 text-sm text-center mb-8">Fill out the form below and we'll get back to you shortly.</p>
        <form className="space-y-5" onSubmit={e => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold text-white mb-1.5">Name <span className="text-red-400">*</span></label>
            <input type="text" placeholder="Your name" required
              className="w-full rounded-lg border border-white/10 bg-dark px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-1.5">Email <span className="text-red-400">*</span></label>
            <input type="email" placeholder="your@email.com" required
              className="w-full rounded-lg border border-white/10 bg-dark px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-1.5">Phone</label>
            <input type="tel" placeholder="(optional)"
              className="w-full rounded-lg border border-white/10 bg-dark px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-1.5">Subject <span className="text-red-400">*</span></label>
            <input type="text" placeholder="What is this regarding?" required
              className="w-full rounded-lg border border-white/10 bg-dark px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-1.5">Message <span className="text-red-400">*</span></label>
            <textarea placeholder="Tell us about your event..." required rows={5}
              className="w-full rounded-lg border border-white/10 bg-dark px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue transition resize-none" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-1.5">How did you find me? <span className="text-gray-500 font-normal">(optional)</span></p>
            <div className="space-y-2">
              {findSources.map(s => (
                <label key={s} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox"
                    className="w-4 h-4 rounded border-white/10 bg-dark text-blue accent-blue" />
                  <span className="text-sm text-gray-300">{s}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit"
            className="w-full bg-blue text-white font-semibold text-sm uppercase tracking-wider rounded-full px-8 py-4 hover:-translate-y-0.5 transition shadow-lg shadow-blue/30 mt-2">
            Submit
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

/* ─── Contact ─── */

function Contact() {
  const [showForm, setShowForm] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="contact" className="py-24 bg-dark">
      <div ref={ref} className="max-w-3xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <span className="inline-block glass rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan mb-4">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Oswald' }}>
            INTERESTED IN <span className="text-gradient">COLLABORATING?</span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto">Whether it's a branded production, educational series, or a speaking engagement — let's create something extraordinary together.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          <button onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-blue text-white font-semibold text-sm uppercase tracking-wider rounded-full px-8 py-4 hover:-translate-y-0.5 transition shadow-lg shadow-blue/30">
            Contact
          </button>
        </motion.div>
      </div>
      <AnimatePresence>
        {showForm && <ContactModal onClose={() => setShowForm(false)} />}
      </AnimatePresence>
    </section>
  )
}

/* ─── Footer ─── */

function Footer() {
  return (
    <footer className="bg-dark pt-16 pb-8">
      <div className="section-divider mb-12" />
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 mb-12">
        <div>
          <div className="mb-2"><img src="/mr_fascinate_logo_transparent_blue.png" alt="Mr. Fascinate" className="h-6 object-contain" /></div>
          <p className="text-sm text-gray-400">Award-winning STEM media producer and on-camera talent.</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">Quick Links</p>
          {['Productions', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm text-gray-400 hover:text-white transition mb-2">{l}</a>
          ))}
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">Connect</p>
          {[
            { label: 'Main Website', href: 'https://www.justinshaifer.com' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jshaifer/' },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-cyan transition mb-2">
              {l.label} <ExternalLink size={12} />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 pt-6 text-center max-w-7xl mx-auto px-4">
        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Fascinate Media. All rights reserved.</p>
      </div>
    </footer>
  )
}

/* ─── App ─── */

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Productions />
      <Contact />
      <Footer />
    </div>
  )
}
