import tradexImg from "@/assets/Projects/tradex.png";
import wanderlustImg from "@/assets/Projects/wanderlust.png";
// import spotifyImg from "@/assets/Projects/spotify.png";
import aiSqlImg from "@/assets/Projects/ai-sql.png";
// import portfolioImg from "@/assets/Projects/portfolio.png";

const projects = [
  {
    id: "tradex",
    title: "TradeX",
    subtitle: "Full Stack Stock Trading Platform",

    image: tradexImg,

    description:
      "A full-stack stock trading platform built using the MERN stack. It enables users to manage portfolios, monitor stocks, and securely access their investment dashboard through an intuitive and responsive interface.",

    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Chart.js",
    ],

    features: [],

    challenges: "",

    learnings: "",

    github: "",

    live: "",
  },

  {
    id: "wanderlust",
    title: "Wanderlust",
    subtitle: "Travel Booking Platform",

    image: wanderlustImg,

    description:
      "A full-stack travel booking platform where users can explore, create and manage property listings with authentication, image uploads and reviews.",

    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "EJS",
      "Passport.js",
      "Cloudinary",
    ],

    features: [],

    challenges: "",

    learnings: "",

    github: "",

    live: "",
  },

  // {
  //   id: "spotify",
  //   title: "Spotify Clone",
  //   subtitle: "Music Streaming UI",

  //   image: spotifyImg,

  //   description:
  //     "A Spotify-inspired responsive music streaming interface built using React and Tailwind CSS with a modern and interactive user experience.",

  //   technologies: [
  //     "React",
  //     "Tailwind CSS",
  //     "Vite",
  //   ],

  //   features: [],

  //   challenges: "",

  //   learnings: "",

  //   github: "",

  //   live: "",
  // },

  {
    id: "ai-sql",
    title: "AI SQL Generator",
    subtitle: "Natural Language to SQL",

    image: aiSqlImg,

    description:
      "An AI-powered application that converts natural language queries into SQL statements using NLP techniques and executes them on a SQLite database.",

    technologies: [
      "Python",
      "SQLite",
      "Ollama",
      "NLP",
    ],

    features: [],

    challenges: "",

    learnings: "",

    github: "",

    live: "",
  },

  // {
  //   id: "portfolio",
  //   title: "Developer Portfolio",
  //   subtitle: "Personal Portfolio Website",

  //   image: portfolioImg,

  //   description:
  //     "A modern portfolio website showcasing projects, certifications, technical skills and professional experience with elegant animations and responsive design.",

  //   technologies: [
  //     "React",
  //     "Tailwind CSS",
  //     "Framer Motion",
  //     "React Router",
  //   ],

  //   features: [],

  //   challenges: "",

  //   learnings: "",

  //   github: "",

  //   live: "",
  // },
];

export default projects;