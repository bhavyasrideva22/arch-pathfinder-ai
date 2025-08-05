import { useState } from "react";
import { AssessmentIntro } from "./AssessmentIntro";
import { AssessmentQuestion } from "./AssessmentQuestion";
import { AssessmentResults } from "./AssessmentResults";
import { assessmentQuestions } from "@/data/questions";
import { calculateResults } from "@/utils/assessmentLogic";
import type { AssessmentState, AssessmentResponse } from "@/types/assessment";

type AppPhase = 'intro' | 'assessment' | 'results';

export function AssessmentApp() {
  const [phase, setPhase] = useState<AppPhase>('intro');
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    responses: [],
    isComplete: false
  });

  const handleStart = () => {
    setPhase('assessment');
  };

  const handleAnswer = (response: AssessmentResponse) => {
    setAssessmentState(prev => {
      const existingIndex = prev.responses.findIndex(r => r.questionId === response.questionId);
      const newResponses = [...prev.responses];
      
      if (existingIndex >= 0) {
        newResponses[existingIndex] = response;
      } else {
        newResponses.push(response);
      }
      
      return {
        ...prev,
        responses: newResponses
      };
    });
  };

  const handleNext = () => {
    if (assessmentState.currentQuestion < assessmentQuestions.length - 1) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      // Complete assessment
      const results = calculateResults(assessmentState.responses);
      setAssessmentState(prev => ({
        ...prev,
        isComplete: true,
        results
      }));
      setPhase('results');
    }
  };

  const handlePrevious = () => {
    if (assessmentState.currentQuestion > 0) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  };

  const handleRestart = () => {
    setAssessmentState({
      currentSection: 0,
      currentQuestion: 0,
      responses: [],
      isComplete: false
    });
    setPhase('intro');
  };

  if (phase === 'intro') {
    return <AssessmentIntro onStart={handleStart} />;
  }

  if (phase === 'results' && assessmentState.results) {
    return (
      <AssessmentResults 
        results={assessmentState.results} 
        onRestart={handleRestart} 
      />
    );
  }

  // Assessment phase
  const currentQuestion = assessmentQuestions[assessmentState.currentQuestion];
  const currentResponse = assessmentState.responses.find(
    r => r.questionId === currentQuestion.id
  );

  return (
    <AssessmentQuestion
      question={currentQuestion}
      currentResponse={currentResponse}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
      isFirstQuestion={assessmentState.currentQuestion === 0}
      isLastQuestion={assessmentState.currentQuestion === assessmentQuestions.length - 1}
      questionNumber={assessmentState.currentQuestion + 1}
      totalQuestions={assessmentQuestions.length}
    />
  );
}