import { AssessmentResponse, AssessmentResults } from "@/types/assessment";
import { assessmentQuestions, correctAnswers } from "@/data/questions";

export function calculateResults(responses: AssessmentResponse[]): AssessmentResults {
  const responseMap = new Map(responses.map(r => [r.questionId, r.value]));
  
  // Calculate psychometric score (based on scale questions in psychometric category)
  const psychometricQuestions = assessmentQuestions.filter(q => q.category === 'psychometric');
  const psychometricTotal = psychometricQuestions.reduce((sum, q) => {
    const response = responseMap.get(q.id);
    if (typeof response === 'number') {
      return sum + (response / 5) * 100; // Convert 1-5 scale to 0-100
    }
    return sum;
  }, 0);
  const psychometricScore = psychometricTotal / psychometricQuestions.length;

  // Calculate technical score (based on correct answers)
  const technicalQuestions = assessmentQuestions.filter(q => q.category === 'technical');
  const technicalCorrect = technicalQuestions.reduce((sum, q) => {
    const response = responseMap.get(q.id);
    const correctAnswer = correctAnswers[q.id];
    if (response === correctAnswer) {
      return sum + 1;
    }
    return sum;
  }, 0);
  const technicalScore = (technicalCorrect / technicalQuestions.length) * 100;

  // Calculate WISCAR scores
  const wiscarCategories = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
  const wiscarScores = wiscarCategories.reduce((scores, category) => {
    const categoryQuestions = assessmentQuestions.filter(q => 
      q.category === 'wiscar' && q.subCategory === category
    );
    const categoryTotal = categoryQuestions.reduce((sum, q) => {
      const response = responseMap.get(q.id);
      if (typeof response === 'number') {
        return sum + (response / 5) * 100;
      }
      return sum;
    }, 0);
    scores[category as keyof typeof scores] = categoryTotal / Math.max(categoryQuestions.length, 1);
    return scores;
  }, {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability: 0,
    realWorld: 0
  });

  // Calculate overall score (weighted average)
  const wiscarAverage = Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6;
  const overallScore = (
    psychometricScore * 0.25 +
    technicalScore * 0.25 +
    wiscarAverage * 0.25 +
    ((psychometricScore + technicalScore + wiscarAverage) / 3) * 0.25
  );

  // Determine recommendation
  let recommendation: 'yes' | 'maybe' | 'no';
  let confidence: number;
  let feedback: string[] = [];
  let nextSteps: string[] = [];
  let alternativePaths: string[] = [];

  if (overallScore >= 75 && technicalScore >= 60 && psychometricScore >= 70) {
    recommendation = 'yes';
    confidence = Math.min(overallScore, 95);
    feedback = [
      "Excellent alignment with Systems Architect role requirements!",
      "Strong technical foundation and psychological fit.",
      "High motivation and learning ability detected."
    ];
    nextSteps = [
      "Study design patterns and architectural frameworks (TOGAF)",
      "Pursue cloud architecture certifications (AWS/Azure Solutions Architect)",
      "Build portfolio projects showcasing system design skills",
      "Practice stakeholder communication and presentation skills"
    ];
  } else if (overallScore >= 55 || (psychometricScore >= 70 && wiscarScores.will >= 70)) {
    recommendation = 'maybe';
    confidence = overallScore;
    feedback = [
      "Good potential for Systems Architecture with some development needed.",
      technicalScore < 50 ? "Technical knowledge needs strengthening." : "Solid technical foundation.",
      psychometricScore < 60 ? "Consider if this role truly aligns with your preferences." : "Good psychological fit for the role."
    ];
    nextSteps = [
      "Focus on foundational IT and software architecture concepts",
      "Take courses in distributed systems and cloud computing",
      "Gain experience with enterprise integration patterns",
      "Develop business analysis and stakeholder management skills"
    ];
  } else {
    recommendation = 'no';
    confidence = 100 - overallScore;
    feedback = [
      "Current profile suggests better alignment with other technical roles.",
      "Consider building foundational skills before pursuing architecture roles."
    ];
    nextSteps = [
      "Explore related roles that match your current skills better",
      "Consider foundational education in IT and software development"
    ];
    alternativePaths = [
      "Software Developer (Backend/Frontend)",
      "DevOps Engineer",
      "Technical Product Manager",
      "Business Analyst",
      "Network Engineer"
    ];
  }

  return {
    psychometricScore: Math.round(psychometricScore),
    technicalScore: Math.round(technicalScore),
    wiscarScores: {
      will: Math.round(wiscarScores.will),
      interest: Math.round(wiscarScores.interest),
      skill: Math.round(wiscarScores.skill),
      cognitive: Math.round(wiscarScores.cognitive),
      ability: Math.round(wiscarScores.ability),
      realWorld: Math.round(wiscarScores.realWorld)
    },
    overallScore: Math.round(overallScore),
    recommendation,
    confidence: Math.round(confidence),
    feedback,
    nextSteps,
    alternativePaths
  };
}