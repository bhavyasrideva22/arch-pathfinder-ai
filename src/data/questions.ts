import { Question } from "@/types/assessment";

export const assessmentQuestions: Question[] = [
  // Psychometric Section - Interest Scale
  {
    id: "psych_001",
    type: "scale",
    question: "I enjoy abstract, systems-level thinking and seeing how all parts work together.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    category: "psychometric",
    subCategory: "interest",
    weight: 1.0
  },
  {
    id: "psych_002",
    type: "scale",
    question: "I find it exciting to understand how complex systems interact and scale.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    category: "psychometric",
    subCategory: "interest",
    weight: 1.0
  },
  {
    id: "psych_003",
    type: "scale",
    question: "I prefer working on long-term strategic problems rather than quick fixes.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    category: "psychometric",
    subCategory: "personality",
    weight: 1.0
  },
  {
    id: "psych_004",
    type: "scale",
    question: "I am comfortable making decisions with incomplete information.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    category: "psychometric",
    subCategory: "personality",
    weight: 1.0
  },
  {
    id: "psych_005",
    type: "scale",
    question: "I enjoy communicating technical concepts to non-technical stakeholders.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    category: "psychometric",
    subCategory: "workStyle",
    weight: 1.0
  },

  // Technical Section - Prerequisite Knowledge
  {
    id: "tech_001",
    type: "multiple-choice",
    question: "What is the primary purpose of an API gateway in a microservices architecture?",
    options: [
      "To store data permanently",
      "To provide a single entry point for client requests and handle cross-cutting concerns",
      "To compile code faster",
      "To monitor server hardware"
    ],
    category: "technical",
    subCategory: "prerequisite",
    weight: 1.0
  },
  {
    id: "tech_002",
    type: "multiple-choice",
    question: "Which of the following best describes horizontal scaling?",
    options: [
      "Adding more powerful hardware to existing servers",
      "Adding more servers to distribute the load",
      "Reducing the number of servers",
      "Upgrading the operating system"
    ],
    category: "technical",
    subCategory: "prerequisite",
    weight: 1.0
  },
  {
    id: "tech_003",
    type: "multiple-choice",
    question: "What does the CAP theorem state about distributed systems?",
    options: [
      "You can have Consistency, Availability, and Partition tolerance simultaneously",
      "You can only achieve two of: Consistency, Availability, Partition tolerance",
      "Consistency is always more important than Availability",
      "Partition tolerance is optional in distributed systems"
    ],
    category: "technical",
    subCategory: "domain",
    weight: 1.0
  },
  {
    id: "tech_004",
    type: "multiple-choice",
    question: "In an N-tier architecture, what is the primary role of the presentation tier?",
    options: [
      "Store and manage data",
      "Process business logic",
      "Handle user interface and user experience",
      "Manage network security"
    ],
    category: "technical",
    subCategory: "domain",
    weight: 1.0
  },
  {
    id: "tech_005",
    type: "multiple-choice",
    question: "What is the main advantage of using message queues in a distributed system?",
    options: [
      "Faster data processing",
      "Reduced storage requirements",
      "Decoupling of components and improved reliability",
      "Better user interface design"
    ],
    category: "technical",
    subCategory: "domain",
    weight: 1.0
  },

  // WISCAR Framework Questions
  {
    id: "wiscar_w_001",
    type: "scale",
    question: "I have clear long-term career goals in systems architecture.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    category: "wiscar",
    subCategory: "will",
    weight: 1.0
  },
  {
    id: "wiscar_i_001",
    type: "scale",
    question: "I am genuinely passionate about architectural-level thinking and design.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    category: "wiscar",
    subCategory: "interest",
    weight: 1.0
  },
  {
    id: "wiscar_s_001",
    type: "scale",
    question: "I have strong proficiency in systems design and integration patterns.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    category: "wiscar",
    subCategory: "skill",
    weight: 1.0
  },
  {
    id: "wiscar_c_001",
    type: "scale",
    question: "I excel at multi-level reasoning and can think abstractly about complex problems.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    category: "wiscar",
    subCategory: "cognitive",
    weight: 1.0
  },
  {
    id: "wiscar_a_001",
    type: "scale",
    question: "I adapt quickly to new technologies and methodologies.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    category: "wiscar",
    subCategory: "ability",
    weight: 1.0
  },
  {
    id: "wiscar_r_001",
    type: "scale",
    question: "I enjoy working with stakeholders and balancing technical and business requirements.",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    category: "wiscar",
    subCategory: "realWorld",
    weight: 1.0
  }
];

export const correctAnswers: Record<string, number | string> = {
  "tech_001": 1, // API gateway index
  "tech_002": 1, // Horizontal scaling index
  "tech_003": 1, // CAP theorem index
  "tech_004": 2, // N-tier presentation tier index
  "tech_005": 2  // Message queues index
};