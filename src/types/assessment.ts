export interface Question {
  id: string;
  type: 'multiple-choice' | 'scale' | 'boolean';
  question: string;
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
  category: 'psychometric' | 'technical' | 'wiscar';
  subCategory: string;
  weight: number;
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  confidence: number;
  feedback: string[];
  nextSteps: string[];
  alternativePaths?: string[];
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  responses: AssessmentResponse[];
  isComplete: boolean;
  results?: AssessmentResults;
}