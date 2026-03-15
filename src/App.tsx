import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Play, X, ChevronDown, ChevronLeft, ChevronRight, Mail, ExternalLink, Award, Tv, Users, Clapperboard, Menu } from 'lucide-react'

/* ─── Data ─── */

interface Production {
  id: string
  title: string
  partner: string
  description: string
  category: string
  videoUrl?: string
  gifUrl?: string
  thumbnailUrl?: string
}

const productions: Production[] = [
  {
    id: 'second-home',
    title: 'A Second Home',
    partner: 'Fascinate Media',
    description: 'Justin breaks down how he used a virtual production workflow to create A Second Home, an immersive educational series hosted by an astrophysicist imagining life on exoplanets.',
    category: 'Virtual Production',
    videoUrl: 'https://player.vimeo.com/video/787498544',
    gifUrl: '/gifs/ASecondHome2.gif',
  },
  {
    id: 'metaverse',
    title: 'Metaverse Series',
    partner: 'Al Roker Entertainment',
    description: 'A proof of concept for a series produced by Al Roker Entertainment about the Metaverse and its implications, hosted and co-produced by Justin "Mr. Fascinate" Shaifer.',
    category: 'Series',
    videoUrl: 'https://player.vimeo.com/video/787497906',
    gifUrl: '/gifs/metaverse.gif',
  },
  {
    id: 'linkedin-learning',
    title: 'LinkedIn Learning',
    partner: 'LinkedIn',
    description: 'Justin works with LinkedIn Learning to engage in a dynamic conversation with an AI about the Future of Work.',
    category: 'Education',
    videoUrl: 'https://player.vimeo.com/video/787493637',
    gifUrl: '/gifs/LinkedIn Learning.gif',
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
    title: 'WEDU PBS',
    partner: 'WEDU PBS',
    description: 'Justin works with WEDU PBS in Tampa, FL to discuss innovations for local climate impact reduction. This was filmed immediately before Hurricane Ian made landfall nearby.',
    category: 'Broadcast',
    videoUrl: 'https://player.vimeo.com/video/787495541',
    gifUrl: '/gifs/WEDU.gif',
  },
  {
    id: 'chevy-ev',
    title: 'Chevy EV Commercial',
    partner: 'Chevrolet',
    description: 'Justin hosts a car commercial for Chevy\'s EV, describing "What\'s Cool About Electric" and how sustainable energy sources can empower communities of color.',
    category: 'Commercial',
    videoUrl: 'https://player.vimeo.com/video/787496100',
    gifUrl: '/gifs/CHEVY DTU.gif',
  },
  {
    id: 'purecycle',
    title: 'PureCycle x MythBusters',
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

const categories = ['All', 'Virtual Production', 'Series', 'Education', 'Branded Content', 'Broadcast', 'Commercial', 'Live Events', 'AI Video']

const ITEMS_PER_PAGE = 9

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
            {['Productions', 'About', 'Contact'].map(l => (
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
            {['Productions', 'About', 'Contact'].map(l => (
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
            Award-winning media exploring AI, space, neuroscience, and the future
            — produced and hosted by Justin <span className="font-semibold text-white mx-1">Mr. Fascinate</span> Shaifer.
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
      onClick={() => p.videoUrl && onPlay(p)}>

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
  const [page, setPage] = useState(0)
  const [video, setVideo] = useState<Production | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = cat === 'All' ? productions : productions.filter(p => p.category === cat)
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paged = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  const goToPage = (p: number) => {
    setPage(p)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleCategoryChange = (c: string) => {
    setCat(c)
    setPage(0)
  }

  return (
    <section id="productions" className="relative py-24 bg-dark">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Oswald' }}>
            FEATURED <span className="text-gradient">WORK</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">From virtual production workflows and immersive educational series to AI explainers, STEM content, and branded campaigns.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(c => (
            <button key={c} onClick={() => handleCategoryChange(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                cat === c ? 'bg-blue text-white shadow-lg shadow-blue/30' : 'glass text-gray-400 hover:text-white'
              }`}>{c}</button>
          ))}
        </div>

        <div ref={gridRef} className="scroll-mt-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${cat}-${page}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map((p, i) => <ProductionCard key={p.id} p={p} i={i} onPlay={setVideo} />)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button onClick={() => goToPage(page - 1)} disabled={page === 0}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => goToPage(i)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition-all ${
                  page === i ? 'bg-blue text-white shadow-lg shadow-blue/30' : 'glass text-gray-400 hover:text-white'
                }`}>{i + 1}</button>
            ))}
            <button onClick={() => goToPage(page + 1)} disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {video?.videoUrl && <VideoModal production={video} onClose={() => setVideo(null)} />}
      </AnimatePresence>
    </section>
  )
}

/* ─── About ─── */

const highlights = [
  { icon: Award, label: 'Forbes 30 Under 30', detail: 'Science & Technology' },
  { icon: Tv, label: 'LinkedIn Top Voice', detail: 'Featured Instructor' },
  { icon: Users, label: '5M+ Reached', detail: 'Global Audience' },
  { icon: Clapperboard, label: 'Executive Producer', detail: 'Fascinate Media' },
]
const collabs = ['LinkedIn', 'Google', 'NVIDIA', 'Intuit', 'PBS', 'Discovery', 'Bill Nye', 'Al Roker']

function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="about" className="py-24 bg-dark-card">
      <div className="section-divider" />
      <div ref={ref} className="max-w-7xl mx-auto px-4 pt-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <motion.div key={h.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1 }} className="card p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-blue/10 flex items-center justify-center mx-auto mb-3">
                  <h.icon size={22} className="text-cyan" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'Oswald' }}>{h.label}</h4>
                <p className="text-xs text-gray-400">{h.detail}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <span className="inline-block glass rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan mb-4">About</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Oswald' }}>THE <span className="text-gradient">PRODUCER</span></h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              At <span className="text-white font-semibold">Fascinate Media</span>, Justin serves as both executive producer and on-camera talent, creating educational content about innovation, AI & STEM literacy, and the Future of Work.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              His team continues ongoing research and development by producing experimental media projects using AI tools, such as AI Agents, Unreal Engine, and Virtual Reality.
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Past Collaborators</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {collabs.map(c => <span key={c} className="glass rounded-full px-3 py-1.5 text-xs text-gray-300">{c}</span>)}
            </div>
            <a href="https://www.justinshaifer.com/bio" target="_blank" rel="noopener noreferrer"
              className="inline-block border border-blue/40 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-blue/10 transition">Full Bio</a>
          </motion.div>
        </div>
      </div>
      <div className="section-divider mt-16" />
    </section>
  )
}

/* ─── Contact ─── */

function Contact() {
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
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="card p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:contact@justinshaifer.com"
              className="inline-flex items-center gap-2 bg-blue text-white font-semibold text-sm uppercase tracking-wider rounded-full px-8 py-4 hover:-translate-y-0.5 transition shadow-lg shadow-blue/30 w-full sm:w-auto justify-center">
              <Mail size={16} /> Send Email
            </a>
            <a href="https://www.justinshaifer.com/contact" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-blue/40 text-white font-semibold text-sm uppercase tracking-wider rounded-full px-8 py-4 hover:bg-blue/10 transition w-full sm:w-auto justify-center">
              <ExternalLink size={16} /> Contact Page
            </a>
          </div>
        </motion.div>
      </div>
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
          {['Productions', 'About', 'Contact'].map(l => (
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
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
