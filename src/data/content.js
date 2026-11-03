// All site copy lives here so it can be kept in sync with the resume and LinkedIn in one place.

export const profile = {
  name: 'Isaiah Iruoha',
  tagline: 'Software Engineer & Quantitative Developer',
  subtitle: "Computer Engineering at Queen's University, Class of 2027",
  bio: "I'm a final-year Computer Engineering student at Queen's University focused on quantitative development. I've built execution algorithms and market-data tooling on RBC's Global Algorithmic Trading desk, shipped Amazon MWAA monitoring at AWS, and contributed to Apache Airflow. Feel free to reach out!",
  resumeUrl: 'https://drive.google.com/file/d/1n0a8gj1Dlw2YS4qFNtfBll83eLOS51V6/view?usp=sharing',
};

export const contactLinks = [
  { name: 'GitHub', url: 'https://github.com/IsaiahIruoha', icon: 'github' },
  { name: 'Email', url: 'mailto:isaiahiruoha@gmail.com', icon: 'email' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/isaiahiruoha/', icon: 'linkedin' },
];

// Titles follow the resume; dates follow LinkedIn.
export const workExperience = [
  {
    role: 'Software Development Engineering Intern',
    company: 'Amazon Web Services',
    type: 'Internship',
    date: 'Jun 2026 - Sep 2026',
    location: 'Toronto, ON',
    description: 'Amazon MWAA: shipped in-console CloudWatch monitoring and one-click recommended alarms',
    link: 'https://aws.amazon.com/about-aws/whats-new/2026/09/amazon-mwaa-cloudwatch-monitoring/',
    logo: '/assets/logos/aws.webp',
    logoSize: [110, 66],
  },
  {
    role: 'Quantitative Trading Analyst',
    company: 'RBC Capital Markets',
    type: 'Co-op',
    date: 'Sep 2025 - Jun 2026',
    location: 'Toronto, ON',
    description: 'Global Algorithmic Trading: execution algorithms, alpha backtesting and market-data tooling in Python and q',
    logo: '/assets/logos/rbc.webp',
    logoSize: [50, 66],
  },
  {
    role: 'Software Development Engineering Intern',
    company: 'Amazon Web Services',
    type: 'Internship',
    date: 'May 2025 - Aug 2025',
    location: 'Vancouver, BC',
    description: 'Apache Airflow: automated Batch and Lambda executor testing behind a public dashboard',
    link: 'https://aws-mwaa.github.io/',
    logo: '/assets/logos/aws.webp',
    logoSize: [110, 66],
  },
  {
    role: 'Global Markets Summer Analyst',
    company: 'Scotiabank',
    type: 'Internship',
    date: 'Jun 2024 - Sep 2024',
    location: 'Toronto, ON',
    description: 'Rotations across Equity & Credit Derivatives, FX, Diversified Industries and Power & Utilities',
    logo: '/assets/logos/scotiabank.svg',
    logoSize: [66, 66],
  },
  {
    role: 'Software Engineering Intern',
    company: 'GuestLogix',
    type: 'Internship',
    date: 'Apr 2024 - May 2024',
    location: 'Toronto, ON',
    description: 'Production observability: dashboards monitoring 12 APIs across 4 environments',
    logo: '/assets/logos/guestlogix.webp',
    logoSize: [42, 66],
  },
  {
    role: 'Teaching Assistant',
    company: "Queen's University",
    type: 'Contract',
    date: 'Sep 2023 - Dec 2023',
    location: 'Kingston, ON',
    description: 'Computer programming in C for a class of 800 students',
    logo: '/assets/logos/queens.webp',
    logoSize: [52, 66],
  },
  {
    role: 'Software Automation Engineering Intern',
    company: 'Linamar Corporation',
    type: 'Internship',
    date: 'Summers 2022 & 2023',
    location: 'Guelph, ON',
    description: 'Robot monitoring interfaces and manufacturing workflow automation',
    logo: '/assets/logos/linamar.webp',
    logoSize: [74, 66],
  },
];

export const education = [
  {
    school: "Queen's University",
    degree: 'Bachelor of Applied Science, Computer Engineering',
    specialization: 'Concentration in Artificial Intelligence',
    date: 'Sep 2022 - Apr 2027',
    grade: 'GPA: 4.1/4.3',
  },
  {
    school: "Smith School of Business at Queen's University",
    degree: 'Certificate in Business',
    date: 'Sep 2022 - Apr 2027',
  },
  {
    school: 'Bishop P. F. Reding Catholic Secondary School',
    degree: 'High School Diploma',
    date: 'Sep 2018 - Jun 2022',
    grade: 'Grade: 98%',
    activities: 'Varsity Basketball, Soccer, Football, Track & Field',
  },
];

// Current roles first, then by end date, most recent first.
export const extracurriculars = [
  { role: 'Senior Project Manager', organization: 'CREO Solutions', date: 'Mar 2024 - Present' },
  { role: 'Member', organization: 'ColorStack', date: 'Aug 2025 - Present' },
  { role: 'Open-Source Contributor', organization: 'Apache Airflow', date: 'Jun 2025 - Sep 2026' },
  { role: 'Onyx Scholar', organization: 'Onyx Initiative', date: 'Mar 2024 - Sep 2026' },
  { role: 'Member', organization: 'Blackleaf Capital', date: 'Oct 2024 - Sep 2026' },
  { role: 'Member', organization: 'National Society of Black Engineers', date: 'Sep 2023 - Aug 2025' },
  { role: 'Machine Learning Developer', organization: 'QMIND', date: 'Oct 2023 - Apr 2025' },
  { role: 'Quantitative Analyst', organization: 'QUANTT', date: 'Sep 2023 - Apr 2025' },
  { role: 'Capital Markets Analyst', organization: "Queen's University Business and Engineering", date: 'Mar 2023 - Mar 2024' },
  { role: 'Engineering Orientation Leader (FREC)', organization: "Engineering Society of Queen's University", date: 'Mar 2023 - Sep 2023' },
  { role: 'Software Developer', organization: "Queen's Hyperloop Design Team", date: 'Jan 2023 - Apr 2023' },
];

export const projects = [
  {
    title: 'Off-Exchange Short Volume',
    image: '/assets/projects/offexchange.svg',
    link: 'https://github.com/IsaiahIruoha/offexchange-short-volume',
    tech: ['Python', 'pandas', 'Jupyter'],
  },
  {
    title: 'Crypto Arbitrage',
    image: '/assets/projects/cryptoarbitrage.webp',
    imageAvif: '/assets/projects/cryptoarbitrage.avif',
    link: 'https://drive.google.com/file/d/1EHe0314CBGzUaQvjfffCZLVQK2sXhskk/view',
    tech: ['Python', 'PyTorch', 'React', 'D3.js'],
  },
  {
    title: 'ReceiptVault',
    image: '/assets/projects/receipttracking.webp',
    imageAvif: '/assets/projects/receipttracking.avif',
    link: 'https://github.com/IsaiahIruoha/receiptvault',
    tech: ['C++', 'Qt', 'Python'],
  },
  {
    title: 'ForeSights',
    image: '/assets/projects/foresights.webp',
    imageAvif: '/assets/projects/foresights.avif',
    link: 'https://github.com/IsaiahIruoha/hack-the-hill-foresights',
    tech: ['Python', 'OpenCV', 'React'],
  },
  {
    title: 'AudioInsights',
    image: '/assets/projects/mobileapp.webp',
    imageAvif: '/assets/projects/mobileapp.avif',
    link: 'https://github.com/IsaiahIruoha/music-genre-detector-ios',
    tech: ['Swift', 'CoreML', 'Python'],
  },
  {
    title: 'Simple RISC CPU',
    image: '/assets/projects/simple-cpu.svg',
    link: 'https://github.com/IsaiahIruoha/simple-cpu',
    tech: ['Verilog'],
  },
];
