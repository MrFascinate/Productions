export interface Production {
  id: string;
  title: string;
  partner: string;
  description: string;
  category: string;
  videoUrl?: string;
  gifUrl?: string;
}

export const productions: Production[] = [
  {
    id: 'second-home',
    title: 'A Second Home',
    partner: 'Fascinate Media',
    description:
      'Justin breaks down how he used a virtual production workflow to create A Second Home, an immersive educational series hosted by an astrophysicist imagining life on exoplanets.',
    category: 'Virtual Production',
    videoUrl: 'https://player.vimeo.com/video/787498544',
    gifUrl: '/gifs/abc.gif',
  },
  {
    id: 'metaverse',
    title: 'Metaverse Series',
    partner: 'Al Roker Entertainment',
    description:
      'A proof of concept for a series produced by Al Roker Entertainment about the Metaverse and its implications, hosted and co-produced by Justin "Mr. Fascinate" Shaifer.',
    category: 'Series',
    videoUrl: 'https://player.vimeo.com/video/787497906',
    gifUrl: '/gifs/metaverse.gif',
  },
  {
    id: 'linkedin-learning',
    title: 'LinkedIn Learning',
    partner: 'LinkedIn',
    description:
      'Justin works with LinkedIn Learning to engage in a dynamic conversation with an AI about the Future of Work.',
    category: 'Education',
    videoUrl: 'https://player.vimeo.com/video/787493637',
  },
  {
    id: 'attn-mgm',
    title: 'ATTN x MGM',
    partner: 'ATTN',
    description:
      'Justin partners with ATTN and travels across MGM resorts in Las Vegas, discussing how each experience heightens and reduces specific neurotransmitters.',
    category: 'Branded Content',
    videoUrl: 'https://player.vimeo.com/video/787494350',
    gifUrl: '/gifs/mgm-attn.gif',
  },
  {
    id: 'wedu-pbs',
    title: 'WEDU PBS',
    partner: 'WEDU PBS',
    description:
      'Justin works with WEDU PBS in Tampa, FL to discuss innovations for local climate impact reduction. This was filmed immediately before Hurricane Ian made landfall nearby.',
    category: 'Broadcast',
    videoUrl: 'https://player.vimeo.com/video/787495541',
  },
  {
    id: 'chevy-ev',
    title: 'Chevy EV Commercial',
    partner: 'Chevrolet',
    description:
      'Justin hosts a car commercial for Chevy\'s EV, describing "What\'s Cool About Electric" and how sustainable energy sources can empower communities of color.',
    category: 'Commercial',
    videoUrl: 'https://player.vimeo.com/video/787496100',
  },
  {
    id: 'purecycle',
    title: 'PureCycle x MythBusters',
    partner: 'PureCycle / Intuitive Content',
    description:
      'Justin works with MythBusters star Kari Byron and Jenny Buccos to host a show about the past, present, and future of plastics, sponsored by PureCycle and produced in conjunction with Intuitive Content.',
    category: 'Series',
    videoUrl: 'https://player.vimeo.com/video/787496645',
    gifUrl: '/gifs/purecycle.gif',
  },
  {
    id: 'al-roker-space',
    title: 'Space Expeditions',
    partner: 'Al Roker Entertainment',
    description:
      'Justin works with Al Roker Entertainment to host an episode of a dynamic show where he explores the possibility of human-led expeditions to the moon and Mars.',
    category: 'Series',
    videoUrl: 'https://player.vimeo.com/video/787497321',
  },
  {
    id: 'usa-science-fest',
    title: 'USA Science Festival',
    partner: 'USA Science & Engineering Festival',
    description:
      'Justin served as official host and MC for 5 large-scale USA Science Fest Events, engaging thousands of attendees with interactive STEM demonstrations and interviews.',
    category: 'Live Events',
  },
];

export const categories = [
  'All',
  'Virtual Production',
  'Series',
  'Education',
  'Branded Content',
  'Broadcast',
  'Commercial',
  'Live Events',
];
