import type { PortfolioContent } from '@/types/content';

/**
 * Built-in portfolio content. It is what the site shows when Supabase is not
 * configured or cannot be reached, and it is the source for supabase/seed.sql.
 *
 * The current employer is intentionally shown only as "Private Company" —
 * never add its name, products, clients or URLs here.
 */
export const fallbackContent: PortfolioContent = {
  projects: [
    {
      slug: 'sinag',
      thumbnailUrl: '/images/projects/sinag.webp',
      name: 'SINAG',
      tag: 'Civic platform',
      role: 'Full-Stack Developer',
      year: '2026',
      org: 'Sangguniang Kabataan ng Bulihan',
      tags: ['Civic platform', 'Full-Stack Developer'],
      ar: '16 / 10',
      description: 'Built a digital platform designed to make local youth services and governance more accessible and transparent.',
      stack: ['React 19', 'Express 5', 'MongoDB Atlas', 'Tailwind CSS 4', 'Radix UI', 'JWT'],
    },
    {
      slug: 'ics-alumni',
      name: 'ICS Alumni Tracker',
      tag: 'Alumni relations system',
      role: 'Full-Stack Developer',
      year: '2024',
      org: 'Institute of Computer Science, UP Los Baños',
      tags: ['Alumni relations system', 'Full-Stack Developer'],
      ar: '4 / 3',
      description:
        'Built a centralized alumni platform for profile management, job opportunities, RSVP-based events, alumni search, donations, newsletters, and engagement reporting, with separate Alumni and Admin roles.',
      stack: [],
    },
    {
      slug: 'yses-explorer',
      name: 'YSES Explorer',
      tag: 'Mentorship platform',
      role: 'Frontend Developer',
      year: '2024',
      org: 'Young Software Engineers’ Society, UPLB',
      tags: ['Mentorship platform', 'Frontend Developer'],
      ar: '3 / 2',
      description:
        'Developed a responsive platform connecting YSES members and alumni for career exploration and mentorship with a modular component architecture.',
      stack: ['React', 'Vite', 'Tailwind CSS'],
    },
    {
      slug: 'farm-to-table',
      name: 'Farm to Table',
      tag: 'Marketplace',
      role: 'Full-Stack Developer',
      year: '2024',
      org: 'CMSC 100: Web Programming',
      tags: ['Marketplace', 'Full-Stack Developer'],
      ar: '4 / 3',
      description:
        'Built a full-stack marketplace for agricultural products with customer and administrator roles, authentication, protected routes, inventory tracking, order management, and sales reporting.',
      stack: [],
    },
    {
      slug: 'lolcode',
      thumbnailUrl: '/images/projects/lolcode.webp',
      showFeatures: false,
      name: 'LOLCode Interpreter',
      tag: 'Language interpreter',
      role: 'Developer',
      year: '2024',
      org: 'CMSC 124: Programming Languages',
      tags: ['Language interpreter', 'Developer'],
      ar: '3 / 2',
      description:
        'Developed a functional Python interpreter for LOLCode covering lexical analysis, syntax parsing, and semantic execution, along with formal grammar and lexeme documentation.',
      stack: ['Python'],
    },
    {
      slug: 'slambook',
      name: 'SlamBook',
      tag: 'Mobile app',
      role: 'Mobile Developer',
      year: '2024',
      org: 'CMSC 23: Mobile Development',
      tags: ['Mobile app', 'Mobile Developer'],
      ar: '16 / 10',
      description:
        'Built a Firebase-powered mobile application with user profiles, a digital slam book, Google Sign-In, QR-based friend verification, authentication, storage, and custom UI/UX.',
      stack: ['Firebase', 'Google Sign-In'],
    },
    {
      slug: 'tidy-teens',
      name: 'Tidy Teens',
      tag: '2D game',
      role: 'Game Developer',
      year: '2023',
      org: 'CMSC 22: Object-Oriented Programming',
      tags: ['2D game', 'Game Developer'],
      ar: '4 / 3',
      description:
        'Designed and developed a Bomberman-inspired 2D game while applying object-oriented programming concepts, collision detection, scoring, animation, and scene management.',
      stack: ['Java', 'JavaFX'],
    },
    {
      slug: 'food-info',
      name: 'Food Information System',
      tag: 'Database system',
      role: 'Developer',
      year: '2023',
      org: 'CMSC 127: File Processing and Database Systems',
      tags: ['Database system', 'Developer'],
      ar: '3 / 2',
      description:
        'Built an information system with CRUD functionality for food establishments, items, reviews, and users, including automated ratings, reporting, and database error handling.',
      stack: ['Python', 'SQL'],
    },
  ],
  experience: [
    {
      kind: 'work',
      role: 'Software Development Lead',
      company: 'Private Company',
      dates: '2026',
      place: 'Remote',
      summary:
        'Building and evolving web applications into production-ready web and mobile experiences, working across the full development lifecycle from planning and interface implementation to backend systems, integrations, testing, deployment, and ongoing improvements. I work across frontend and backend development, translate product ideas into working features, troubleshoot production issues, and help shape technical and user-experience decisions as products move from concept to release.',
      bullets: [
        'Develop and maintain full-stack web applications and mobile-ready experiences.',
        'Adapt existing web products for mobile application environments and cross-platform use.',
        'Build user-facing features alongside the APIs, services, and data systems that support them.',
        'Integrate third-party platforms and services into existing product workflows.',
        'Debug application issues across development, testing, and production environments.',
        'Contribute to UI/UX improvements, technical architecture, and product iteration.',
        'Take ownership of features from initial requirements through implementation, testing, and release.',
      ],
      tags: [],
      media: [],
    },
    {
      kind: 'work',
      role: 'Junior Digital Designer',
      company: 'SeekLab Marketing Solutions',
      dates: '2026',
      place: 'Hybrid',
      summary:
        'Creating digital design materials and translating project requirements into clean, user-focused visual experiences. The role allows me to combine design thinking with my technical background, strengthening the way I approach visual communication, interface design, and the overall experience of digital products.',
      bullets: [],
      tags: [],
      media: [],
    },
    {
      kind: 'work',
      role: 'Software Engineer Intern',
      company: 'Limitless Lab',
      dates: '2023',
      place: 'Internship',
      summary:
        'Gained hands-on experience in a professional software-development environment while completing my Computer Science degree. I applied concepts learned in university to real development workflows, collaborated on technical tasks, and gained a better understanding of how digital products move from requirements and implementation to testing and delivery.',
      bullets: [],
      tags: [],
      media: [],
    },
  ],
  leadership: [
    {
      kind: 'leadership',
      role: 'SK Chairperson',
      company: 'Sangguniang Kabataan, Barangay Bulihan',
      dates: '2024',
      place: 'Barangay Bulihan',
      summary:
        'Leading youth-centered programs, community initiatives, and council operations while collaborating with local government offices, organizations, and community stakeholders. The role has strengthened my experience in leadership, project management, decision-making, public service, and developing initiatives designed around the actual needs of young people in the community.',
      bullets: [],
      tags: [],
      media: [],
    },
    {
      kind: 'leadership',
      role: 'President',
      company: 'Rotaract Club of Malolos Capital',
      dates: '2024 – 2026',
      place: 'Malolos, Bulacan',
      summary:
        'Leading service projects, professional-development activities, and youth-empowerment programs under the organization’s “Service Above Self” mission, while promoting civic responsibility and sustainable community impact.',
      bullets: [],
      tags: [],
      media: [],
    },
  ],
  education: [
    {
      kind: 'education',
      role: 'BS Computer Science',
      company: 'University of the Philippines Los Baños',
      dates: 'Batch 2022',
      place: 'Los Baños, Laguna',
      summary: 'Completed degree.',
      bullets: [],
      tags: [],
      media: [],
    },
    {
      kind: 'education',
      role: 'Law',
      company: 'Continuing education',
      dates: 'Ongoing',
      place: 'School · TODO',
      summary: 'Currently studying law — in progress, not yet completed.',
      bullets: [],
      tags: [],
      media: [],
    },
  ],
};
