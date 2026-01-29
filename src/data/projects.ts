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

export const projects: Project[] = [
  {
    id: 1,
    title: 'TechEmporium',
    category: 'Web Development',
    image: './images/project1.jpg',
    shortDescription: 'Modern e-commerce platform with seamless shopping experience',
    fullDescription: 'TechEmporium is a cutting-edge e-commerce platform built with React and Node.js. It features a responsive design, real-time inventory management, secure payment processing, and an intuitive admin dashboard. The platform handles thousands of daily transactions with 99.9% uptime.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    roadmap: [
      { phase: 'Phase 1', title: 'Discovery & Planning', description: 'Market research, competitor analysis, and feature prioritization' },
      { phase: 'Phase 2', title: 'UI/UX Design', description: 'Wireframing, prototyping, and user testing' },
      { phase: 'Phase 3', title: 'Frontend Development', description: 'React components, state management, and responsive design' },
      { phase: 'Phase 4', title: 'Backend Development', description: 'API development, database design, and payment integration' },
      { phase: 'Phase 5', title: 'Testing & Launch', description: 'QA testing, performance optimization, and deployment' }
    ],
    liveUrl: 'https://techemporium.demo',
    githubUrl: 'https://github.com/PS1852/techemporium'
  },
  {
    id: 2,
    title: 'Aurora Creative',
    category: 'Graphic Design',
    image: './images/project2.jpg',
    shortDescription: 'Creative portfolio showcasing digital art and interactive experiences',
    fullDescription: 'Aurora Creative is a stunning portfolio website designed for a digital art collective. The project involved creating a visually striking brand identity, custom illustrations, and an immersive web experience that showcases the collective\'s work through smooth animations and interactive galleries.',
    technologies: ['Figma', 'Adobe Illustrator', 'After Effects', 'WebGL'],
    roadmap: [
      { phase: 'Phase 1', title: 'Brand Strategy', description: 'Brand positioning, target audience analysis, and mood boards' },
      { phase: 'Phase 2', title: 'Visual Identity', description: 'Logo design, color palette, and typography selection' },
      { phase: 'Phase 3', title: 'Asset Creation', description: 'Custom illustrations, icons, and graphic elements' },
      { phase: 'Phase 4', title: 'Motion Design', description: 'Animation prototypes and micro-interactions' },
      { phase: 'Phase 5', title: 'Implementation', description: 'Asset delivery and design system documentation' }
    ],
    liveUrl: 'https://auroracreative.demo'
  },
  {
    id: 3,
    title: 'DataViz Pro',
    category: 'Web Development',
    image: './images/project3.jpg',
    shortDescription: 'SaaS analytics dashboard with powerful data visualization',
    fullDescription: 'DataViz Pro is a comprehensive analytics platform that transforms complex data into actionable insights. The dashboard features real-time data streaming, customizable charts, AI-powered predictions, and collaborative reporting tools used by over 500 enterprise clients.',
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'D3.js', 'TensorFlow'],
    roadmap: [
      { phase: 'Phase 1', title: 'Requirements Gathering', description: 'Stakeholder interviews and feature specification' },
      { phase: 'Phase 2', title: 'Data Architecture', description: 'Database schema design and data pipeline setup' },
      { phase: 'Phase 3', title: 'Dashboard UI', description: 'Chart components, filters, and layout design' },
      { phase: 'Phase 4', title: 'AI Integration', description: 'Machine learning models for predictive analytics' },
      { phase: 'Phase 5', title: 'Enterprise Features', description: 'SSO, role management, and audit logs' }
    ],
    liveUrl: 'https://datavizpro.demo',
    githubUrl: 'https://github.com/PS1852/dataviz-pro'
  },
  {
    id: 4,
    title: 'FitLife Mobile',
    category: 'UI/UX Design',
    image: './images/project4.jpg',
    shortDescription: 'Fitness tracking app with personalized workout plans',
    fullDescription: 'FitLife is a comprehensive fitness application designed to help users achieve their health goals. The app features workout tracking, nutrition logging, progress analytics, and social challenges. The UI/UX design focuses on motivation through gamification and community engagement.',
    technologies: ['Figma', 'Principle', 'Adobe XD', 'Maze'],
    roadmap: [
      { phase: 'Phase 1', title: 'User Research', description: 'Surveys, interviews, and competitive analysis' },
      { phase: 'Phase 2', title: 'Information Architecture', description: 'User flows, sitemap, and content strategy' },
      { phase: 'Phase 3', title: 'Wireframing', description: 'Low-fidelity prototypes and usability testing' },
      { phase: 'Phase 4', title: 'Visual Design', description: 'High-fidelity mockups and design system' },
      { phase: 'Phase 5', title: 'Prototype & Test', description: 'Interactive prototype and user validation' }
    ],
    liveUrl: 'https://fitlife.demo'
  },
  {
    id: 5,
    title: 'FlavorFinder',
    category: 'Web Development',
    image: './images/project5.jpg',
    shortDescription: 'Restaurant discovery and food ordering platform',
    fullDescription: 'FlavorFinder connects food lovers with local restaurants through an intuitive web platform. Features include real-time menu updates, online ordering, table reservations, and a review system. The platform serves over 200 restaurants and processes 10,000+ orders monthly.',
    technologies: ['Next.js', 'Firebase', 'Google Maps API', 'Stripe'],
    roadmap: [
      { phase: 'Phase 1', title: 'Market Analysis', description: 'Restaurant industry research and user personas' },
      { phase: 'Phase 2', title: 'Core Features', description: 'Menu management and ordering system' },
      { phase: 'Phase 3', title: 'Location Services', description: 'Map integration and delivery tracking' },
      { phase: 'Phase 4', title: 'Payment System', description: 'Secure checkout and refund handling' },
      { phase: 'Phase 5', title: 'Review Platform', description: 'Rating system and photo uploads' }
    ],
    liveUrl: 'https://flavorfinder.demo',
    githubUrl: 'https://github.com/PS1852/flavorfinder'
  },
  {
    id: 6,
    title: 'HomeBase Realty',
    category: 'Web Development',
    image: './images/project6.jpg',
    shortDescription: 'Real estate platform with advanced property search',
    fullDescription: 'HomeBase Realty revolutionizes property searching with AI-powered recommendations, virtual tours, and comprehensive neighborhood insights. The platform features interactive maps, mortgage calculators, and direct agent communication tools.',
    technologies: ['React', 'Node.js', 'Elasticsearch', 'AWS S3', 'Twilio'],
    roadmap: [
      { phase: 'Phase 1', title: 'Platform Planning', description: 'Feature roadmap and technical architecture' },
      { phase: 'Phase 2', title: 'Search Engine', description: 'Advanced filters and Elasticsearch integration' },
      { phase: 'Phase 3', title: 'Virtual Tours', description: '360° image viewer and video integration' },
      { phase: 'Phase 4', title: 'AI Recommendations', description: 'Machine learning for property matching' },
      { phase: 'Phase 5', title: 'Agent Portal', description: 'CRM tools and lead management system' }
    ],
    liveUrl: 'https://homebase.demo',
    githubUrl: 'https://github.com/PS1852/homebase-realty'
  },
  {
    id: 7,
    title: 'Wanderlust Travel',
    category: 'Graphic Design',
    image: './images/project7.jpg',
    shortDescription: 'Travel booking platform with stunning visual design',
    fullDescription: 'Wanderlust Travel is a visually captivating travel booking platform. The design project included creating a complete brand identity, destination photography curation, iconography, and marketing materials that inspire adventure and wanderlust.',
    technologies: ['Adobe Photoshop', 'Illustrator', 'Figma', 'Lightroom'],
    roadmap: [
      { phase: 'Phase 1', title: 'Brand Discovery', description: 'Brand values, mission, and vision definition' },
      { phase: 'Phase 2', title: 'Logo & Identity', description: 'Logo variations and brand guidelines' },
      { phase: 'Phase 3', title: 'Web Design', description: 'Landing pages and booking flow design' },
      { phase: 'Phase 4', title: 'Marketing Assets', description: 'Social media templates and email designs' },
      { phase: 'Phase 5', title: 'Photography', description: 'Image curation and editing guidelines' }
    ],
    liveUrl: 'https://wanderlust.demo'
  },
  {
    id: 8,
    title: 'EduLearn Platform',
    category: 'Web Development',
    image: './images/project8.jpg',
    shortDescription: 'Online learning platform with interactive courses',
    fullDescription: 'EduLearn is a comprehensive e-learning platform offering live classes, recorded courses, quizzes, and certificates. The platform supports multiple instructors, student progress tracking, and gamified learning experiences with 50,000+ active learners.',
    technologies: ['Angular', 'Django', 'PostgreSQL', 'WebRTC', 'AWS'],
    roadmap: [
      { phase: 'Phase 1', title: 'Learning Model', description: 'Course structure and learning paths design' },
      { phase: 'Phase 2', title: 'Video Platform', description: 'Streaming infrastructure and player development' },
      { phase: 'Phase 3', title: 'Assessment Tools', description: 'Quiz engine and assignment submission' },
      { phase: 'Phase 4', title: 'Live Classes', description: 'WebRTC integration and classroom features' },
      { phase: 'Phase 5', title: 'Certificates', description: 'Automated certificate generation and verification' }
    ],
    liveUrl: 'https://edulearn.demo',
    githubUrl: 'https://github.com/PS1852/edulearn'
  },
  {
    id: 9,
    title: 'SocialPulse',
    category: 'UI/UX Design',
    image: './images/project9.jpg',
    shortDescription: 'Social media management dashboard with analytics',
    fullDescription: 'SocialPulse is a social media management tool designed for marketing teams. The UI/UX project involved creating an intuitive interface for scheduling posts, analyzing engagement metrics, and managing multiple social accounts from a single dashboard.',
    technologies: ['Figma', 'ProtoPie', 'Maze', 'Hotjar'],
    roadmap: [
      { phase: 'Phase 1', title: 'User Interviews', description: 'Marketing team workflow analysis' },
      { phase: 'Phase 2', title: 'Dashboard Layout', description: 'Widget system and customization options' },
      { phase: 'Phase 3', title: 'Analytics Views', description: 'Chart types and data visualization' },
      { phase: 'Phase 4', title: 'Scheduling Flow', description: 'Calendar interface and post composer' },
      { phase: 'Phase 5', title: 'Mobile App', description: 'Responsive design and native app concepts' }
    ],
    liveUrl: 'https://socialpulse.demo'
  },
  {
    id: 10,
    title: 'HealthNet Portal',
    category: 'Web Development',
    image: './images/project10.jpg',
    shortDescription: 'Healthcare patient portal with appointment booking',
    fullDescription: 'HealthNet is a secure healthcare portal connecting patients with providers. Features include appointment scheduling, medical records access, prescription management, and telehealth consultations. The platform is HIPAA compliant and serves 50+ healthcare facilities.',
    technologies: ['React', 'Java Spring', 'MySQL', 'HL7 FHIR', 'Docker'],
    roadmap: [
      { phase: 'Phase 1', title: 'Compliance Planning', description: 'HIPAA requirements and security audit' },
      { phase: 'Phase 2', title: 'Patient Features', description: 'Portal access and medical records view' },
      { phase: 'Phase 3', title: 'Booking System', description: 'Appointment scheduling and reminders' },
      { phase: 'Phase 4', title: 'Telehealth', description: 'Video consultation integration' },
      { phase: 'Phase 5', title: 'Provider Tools', description: 'EHR integration and patient management' }
    ],
    liveUrl: 'https://healthnet.demo',
    githubUrl: 'https://github.com/PS1852/healthnet'
  },
  {
    id: 11,
    title: 'Aurora Exchange',
    category: 'Web Development',
    image: './images/project11.jpg',
    shortDescription: 'Cryptocurrency trading platform with real-time charts',
    fullDescription: 'Aurora Exchange is a professional-grade cryptocurrency trading platform. It features real-time price tracking, advanced charting tools, portfolio management, and secure wallet integration. The platform handles millions in daily trading volume with institutional-grade security.',
    technologies: ['React', 'Go', 'Redis', 'WebSockets', 'Kubernetes'],
    roadmap: [
      { phase: 'Phase 1', title: 'Security Architecture', description: 'Cold wallet setup and encryption protocols' },
      { phase: 'Phase 2', title: 'Trading Engine', description: 'Order matching and execution system' },
      { phase: 'Phase 3', title: 'Charting Tools', description: 'Technical indicators and drawing tools' },
      { phase: 'Phase 4', title: 'Portfolio Tracking', description: 'PnL calculation and performance analytics' },
      { phase: 'Phase 5', title: 'Mobile Trading', description: 'iOS and Android app development' }
    ],
    liveUrl: 'https://auroraexchange.demo',
    githubUrl: 'https://github.com/PS1852/aurora-exchange'
  },
  {
    id: 12,
    title: 'Eventify',
    category: 'UI/UX Design',
    image: './images/project12.jpg',
    shortDescription: 'Event management platform for conferences and meetups',
    fullDescription: 'Eventify is an all-in-one event management solution. The design project covered the entire user journey from event discovery to ticket purchase, including attendee networking features, speaker profiles, and real-time event updates.',
    technologies: ['Figma', 'Adobe After Effects', 'Framer', 'UsabilityHub'],
    roadmap: [
      { phase: 'Phase 1', title: 'Event Research', description: 'Attendee and organizer pain points' },
      { phase: 'Phase 2', title: 'Discovery Flow', description: 'Search, filters, and event cards' },
      { phase: 'Phase 3', title: 'Booking Experience', description: 'Ticket selection and checkout flow' },
      { phase: 'Phase 4', title: 'Event Day', description: 'Check-in, schedule, and networking' },
      { phase: 'Phase 5', title: 'Post-Event', description: 'Feedback collection and certificates' }
    ],
    liveUrl: 'https://eventify.demo'
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
    quote: "Pranjal's design skills are unmatched. He understood our vision and brought it to life beautifully.",
    author: 'Sneha Gupta',
    role: 'Creative Head, Design Studio',
    avatar: 'SG'
  },
  {
    id: 5,
    quote: "Our mobile app UI designed by Pranjal has received amazing feedback from users. Highly recommended!",
    author: 'Vikram Rao',
    role: 'Product Manager, FitLife',
    avatar: 'VR'
  },
  {
    id: 6,
    quote: "Professional, timely, and incredibly talented. Pranjal is our go-to developer for all web projects.",
    author: 'Neha Singh',
    role: 'CTO, DataViz Pro',
    avatar: 'NS'
  },
  {
    id: 7,
    quote: "The dashboard Pranjal created is intuitive and powerful. Our team productivity increased significantly.",
    author: 'Arjun Mehta',
    role: 'Operations Head, HomeBase',
    avatar: 'AM'
  },
  {
    id: 8,
    quote: "From concept to launch, Pranjal handled everything flawlessly. A true professional in every sense.",
    author: 'Kavita Reddy',
    role: 'Founder, EduLearn',
    avatar: 'KR'
  }
];
