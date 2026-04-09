export interface RoadmapItem {
  phase: string;
  title: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  category: 'Web Development' | 'Graphic Design' | 'UI/UX Design';
  image: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  roadmap: RoadmapItem[];
  liveUrl?: string;
  githubUrl?: string;
}

export const owner = {
  name: "Pranjal",
  fullName: "Pranjal",
  brandName: "PWS",
  tagline: "Pranjal Web Studio",
  bio: "Crafting digital experiences that captivate and convert. Specializing in modern web development and stunning graphic design for businesses that want to stand out.",
  email: "pranjalshrivastav5@gmail.com",
  location: "Available Worldwide (Remote)",
  socials: {
    instagram: "https://www.instagram.com/pranjalwebstudio/",
    github: "https://github.com/PS1852"
  },
  stats: [
    { label: "Projects", value: "100", suffix: "+" },
    { label: "Years Exp.", value: "5", suffix: "+" },
    { label: "Satisfaction", value: "99", suffix: "%" }
  ]
};

export const skills = [
  "React", "Node.js", "TypeScript", "Next.js", "Figma", 
  "Tailwind CSS", "GSAP", "Adobe Illustrator", "Three.js", "WebGL"
];

export const experience = [
  {
    company: "Pranjal Web Studio",
    role: "Founder & Lead Developer",
    dates: "2019 - Present",
    description: "Leading digital transformation for over 100+ clients globally. Directing web development, brand identity, and immersive digital experiences."
  },
  {
    company: "Freelance",
    role: "Full Stack Engineer & UI/UX Designer",
    dates: "2018 - 2019",
    description: "Designed and developed scalable web applications for emerging startups, specializing in React and modern CSS."
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'TechEmporium',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=800&q=75&auto=format&fit=crop',
    shortDescription: 'Modern e-commerce platform with seamless shopping experience',
    fullDescription: 'TechEmporium is a cutting-edge e-commerce platform built with React and Node.js. It features a responsive design, real-time inventory management, secure payment processing, and an intuitive admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    roadmap: [],
    liveUrl: 'https://techemporium.demo',
    githubUrl: 'https://github.com/PS1852/techemporium'
  },
  {
    id: 2,
    title: 'Aurora Creative',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&q=75&auto=format&fit=crop',
    shortDescription: 'Creative portfolio showcasing digital art and interactive experiences',
    fullDescription: 'Aurora Creative is a stunning portfolio website designed for a digital art collective. The project involved creating a visually striking brand identity, custom illustrations, and an immersive web experience.',
    technologies: ['Figma', 'Adobe Illustrator', 'After Effects', 'WebGL'],
    roadmap: [],
    liveUrl: 'https://auroracreative.demo'
  },
  {
    id: 3,
    title: 'DataViz Pro',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=75&auto=format&fit=crop',
    shortDescription: 'SaaS analytics dashboard with powerful data visualization',
    fullDescription: 'DataViz Pro is a comprehensive analytics platform that transforms complex data into actionable insights.',
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'D3.js', 'TensorFlow'],
    roadmap: [],
    liveUrl: 'https://datavizpro.demo',
    githubUrl: 'https://github.com/PS1852/dataviz-pro'
  },
  {
    id: 4,
    title: 'FlavorFinder',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=75&auto=format&fit=crop',
    shortDescription: 'Restaurant discovery and food ordering platform',
    fullDescription: 'FlavorFinder connects food lovers with local restaurants through an intuitive web platform. Features include real-time menu updates, online ordering, table reservations.',
    technologies: ['Next.js', 'Firebase', 'Google Maps API', 'Stripe'],
    roadmap: [],
    liveUrl: 'https://flavorfinder.demo',
    githubUrl: 'https://github.com/PS1852/flavorfinder'
  },
  {
    id: 5,
    title: 'Aurora Exchange',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=75&auto=format&fit=crop',
    shortDescription: 'Cryptocurrency trading platform with real-time charts',
    fullDescription: 'Aurora Exchange is a professional-grade cryptocurrency trading platform. It features real-time price tracking, advanced charting tools, portfolio management, and secure wallet integration.',
    technologies: ['React', 'Go', 'Redis', 'WebSockets', 'Kubernetes'],
    roadmap: [],
    liveUrl: 'https://auroraexchange.demo',
    githubUrl: 'https://github.com/PS1852/aurora-exchange'
  }
];

export const testimonials = [
  {
    id: 1,
    quote: "Pranjal delivered beyond our expectations. The website he built increased our conversions by 150%.",
    author: 'Rahul Sharma',
    role: 'CEO, TechStart India',
    avatar: 'RS'
  },
  {
    id: 2,
    quote: "Working with Pranjal was an absolute pleasure. His attention to detail and creative vision transformed our brand.",
    author: 'Priya Patel',
    role: 'Marketing Director, Glow Cosmetics',
    avatar: 'PP'
  },
  {
    id: 3,
    quote: "The e-commerce platform Pranjal built handles thousands of orders daily without any issues. Truly exceptional work!",
    author: 'Amit Kumar',
    role: 'Founder, ShopEase',
    avatar: 'AK'
  },
  {
    id: 4,
    quote: "Professional, timely, and incredibly talented. Pranjal is our go-to developer for all web projects.",
    author: 'Neha Singh',
    role: 'CTO, DataViz Pro',
    avatar: 'NS'
  }
];
