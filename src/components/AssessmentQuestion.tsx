import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question, AssessmentResponse } from "@/types/assessment";
import { useState } from "react";

interface AssessmentQuestionProps {
  question: Question;
  currentResponse?: AssessmentResponse;
  onAnswer: (response: AssessmentResponse) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export function AssessmentQuestion({
  question,
  currentResponse,
  onAnswer,
  onNext,
  onPrevious,
  isFirstQuestion,
  isLastQuestion,
  questionNumber,
  totalQuestions
}: AssessmentQuestionProps) {
  const [selectedValue, setSelectedValue] = useState<string>(
    currentResponse?.value?.toString() || ""
  );

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    const numericValue = question.type === 'scale' || question.type === 'multiple-choice' 
      ? parseInt(value) 
      : value;
    
    onAnswer({
      questionId: question.id,
      value: numericValue
    });
  };

  const canProceed = selectedValue !== "";

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'psychometric':
        return 'text-primary';
      case 'technical':
        return 'text-accent';
      case 'wiscar':
        return 'text-tech-green';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCategoryName = (category: string, subCategory: string) => {
    if (category === 'wiscar') {
      return `WISCAR: ${subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}`;
    }
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {questionNumber} of {totalQuestions}
              </span>
              <span className={`text-sm font-medium ${getCategoryColor(question.category)}`}>
                {getCategoryName(question.category, question.subCategory)}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="shadow-elevated mb-6">
            <CardHeader>
              <CardTitle className="text-lg leading-relaxed">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {question.type === 'multiple-choice' && question.options && (
                <RadioGroup value={selectedValue} onValueChange={handleValueChange}>
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === 'scale' && (
                <div>
                  <RadioGroup value={selectedValue} onValueChange={handleValueChange}>
                    <div className="grid grid-cols-5 gap-4 mb-4">
                      {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
                        <div key={value} className="text-center">
                          <RadioGroupItem 
                            value={value.toString()} 
                            id={`scale-${value}`}
                            className="mx-auto mb-2"
                          />
                          <Label htmlFor={`scale-${value}`} className="text-sm cursor-pointer block">
                            {value}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                  {question.scaleLabels && (
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>{question.scaleLabels.min}</span>
                      <span>{question.scaleLabels.max}</span>
                    </div>
                  )}
                </div>
              )}

              {question.type === 'boolean' && (
                <RadioGroup value={selectedValue} onValueChange={handleValueChange}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                    <RadioGroupItem value="true" id="yes" />
                    <Label htmlFor="yes" className="cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                    <RadioGroupItem value="false" id="no" />
                    <Label htmlFor="no" className="cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isFirstQuestion}
            >
              Previous
            </Button>
            <Button
              onClick={onNext}
              disabled={!canProceed}
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isLastQuestion ? 'Complete Assessment' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}