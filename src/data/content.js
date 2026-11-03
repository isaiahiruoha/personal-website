// All site copy lives here so it can be kept in sync with the resume and LinkedIn in one place.

export const profile = {
  name: 'Isaiah Iruoha',
  tagline: 'Software Engineer & Quantitative Developer',
  subtitle: "Computer Engineering at Queen's University, Class of 2027",
  bio: "I'm a final-year Computer Engineering student at Queen's University focused on quantitative development. I've built execution algorithms and market-data tooling on RBC's Global Algorithmic Trading desk, shipped Amazon MWAA monitoring at AWS, and contributed to Apache Airflow. Feel free to reach out!",
  resumeUrl: 'https://drive.google.com/file/d/1n0a8gj1Dlw2YS4qFNtfBll83eLOS51V6/view?usp=sharing',
};

export const contactLinks = [
  { name: 'GitHub', url: 'https://github.com/IsaiahIruoha', icon: 'fab fa-github', className: 'github' },
  { name: 'Email', url: 'mailto:isaiahiruoha@gmail.com', icon: 'fas fa-envelope', className: 'email' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/isaiahiruoha/', icon: 'fab fa-linkedin-in', className: 'linkedin' },
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
    logo: '/assets/logos/aws.png',
  },
  {
    role: 'Quantitative Trading Analyst',
    company: 'RBC Capital Markets',
    type: 'Co-op',
    date: 'Sep 2025 - Jun 2026',
    location: 'Toronto, ON',
    description: 'Global Algorithmic Trading: execution algorithms, alpha backtesting and market-data tooling in Python and q',
    logo: '/assets/logos/rbc.png',
  },
  {
    role: 'Software Development Engineering Intern',
    company: 'Amazon Web Services',
    type: 'Internship',
    date: 'May 2025 - Aug 2025',
    location: 'Vancouver, BC',
    description: 'Apache Airflow: automated Batch and Lambda executor testing behind a public dashboard',
    link: 'https://aws-mwaa.github.io/',
    logo: '/assets/logos/aws.png',
  },
  {
    role: 'Global Markets Summer Analyst',
    company: 'Scotiabank',
    type: 'Internship',
    date: 'Jun 2024 - Sep 2024',
    location: 'Toronto, ON',
    description: 'Rotations across Equity & Credit Derivatives, FX, Diversified Industries and Power & Utilities',
    logo: '/assets/logos/scotiabank.svg',
  },
  {
    role: 'Software Engineering Intern',
    company: 'GuestLogix',
    type: 'Internship',
    date: 'Apr 2024 - May 2024',
    location: 'Toronto, ON',
    description: 'Production observability: dashboards monitoring 12 APIs across 4 environments',
    logo: '/assets/logos/guestlogix.png',
  },
  {
    role: 'Teaching Assistant',
    company: "Queen's University",
    type: 'Contract',
    date: 'Sep 2023 - Dec 2023',
    location: 'Kingston, ON',
    description: 'Computer programming in C for a class of 800 students',
    logo: '/assets/logos/queens.svg',
  },
  {
    role: 'Software Automation Engineering Intern',
    company: 'Linamar Corporation',
    type: 'Internship',
    date: 'Summers 2022 & 2023',
    location: 'Guelph, ON',
    description: 'Robot monitoring interfaces and manufacturing workflow automation',
    logo: '/assets/logos/linamar.png',
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

export const skills = [
  { group: 'Languages', items: ['Python', 'C/C++', 'kdb+/q', 'JavaScript/TypeScript', 'SQL', 'Java', 'Bash', 'Verilog'] },
  { group: 'Data & ML', items: ['Polars', 'pandas', 'NumPy', 'scikit-learn', 'PyTorch', 'Matplotlib'] },
  { group: 'Cloud & Tools', items: ['AWS (CloudWatch, Lambda, CDK, CloudFormation, EC2, RDS)', 'Docker', 'Git', 'Grafana', 'React', 'Node.js', 'Unix'] },
];

export const techIcons = {
  Python: { icon: 'devicon-python-plain', color: '#3776AB' },
  Jupyter: { icon: 'devicon-jupyter-plain', color: '#F37626' },
  pandas: { icon: 'devicon-pandas-plain', color: '#150458' },
  React: { icon: 'devicon-react-original', color: '#61DAFB' },
  'D3.js': { icon: 'devicon-d3js-plain', color: '#F9A03C' },
  Swift: { icon: 'devicon-swift-plain', color: '#FA7343' },
  CoreML: { icon: 'devicon-apple-original', color: '#000000' },
  'C++': { icon: 'devicon-cplusplus-plain', color: '#00599C' },
  Qt: { icon: 'devicon-qt-original', color: '#41CD52' },
  PyTorch: { icon: 'devicon-pytorch-original', color: '#EE4C2C' },
  OpenCV: { icon: 'devicon-opencv-plain', color: '#5C3EE8' },
  Verilog: { icon: 'devicon-verilog-plain', color: '#1A348F' },
};

export const projects = [
  {
    title: 'Off-Exchange Short Volume',
    link: 'https://github.com/IsaiahIruoha/offexchange-short-volume',
    tech: ['Python', 'pandas', 'Jupyter'],
  },
  {
    title: 'Crypto Arbitrage',
    image: '/assets/cryptoarbitrage.png',
    link: 'https://drive.google.com/file/d/1EHe0314CBGzUaQvjfffCZLVQK2sXhskk/view',
    tech: ['Python', 'PyTorch', 'React', 'D3.js'],
  },
  {
    title: 'ReceiptVault',
    image: '/assets/receipttracking.png',
    link: 'https://github.com/IsaiahIruoha/receiptvault',
    tech: ['C++', 'Qt', 'Python'],
  },
  {
    title: 'ForeSights',
    image: '/assets/foresights.png',
    link: 'https://github.com/IsaiahIruoha/hack-the-hill-foresights',
    tech: ['Python', 'OpenCV', 'React'],
  },
  {
    title: 'AudioInsights',
    image: '/assets/mobileapp.png',
    link: 'https://github.com/IsaiahIruoha/music-genre-detector-ios',
    tech: ['Swift', 'CoreML', 'Python'],
  },
  {
    title: 'Simple RISC CPU',
    link: 'https://github.com/IsaiahIruoha/simple-cpu',
    tech: ['Verilog'],
  },
];
