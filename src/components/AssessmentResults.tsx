import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AssessmentResults } from "@/types/assessment";
import { ProgressBar } from "@/components/ui/progress-bar";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Target, 
  TrendingUp, 
  BookOpen, 
  ArrowRight,
  BarChart3,
  Lightbulb
} from "lucide-react";

interface AssessmentResultsProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export function AssessmentResults({ results, onRestart }: AssessmentResultsProps) {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes':
        return <CheckCircle className="w-6 h-6 text-accent" />;
      case 'maybe':
        return <AlertCircle className="w-6 h-6 text-orange-500" />;
      case 'no':
        return <XCircle className="w-6 h-6 text-destructive" />;
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'Highly Recommended';
      case 'maybe':
        return 'Potentially Suitable';
      case 'no':
        return 'Not Recommended';
    }
  };

  const getRecommendationBadgeVariant = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'default';
      case 'maybe':
        return 'secondary';
      case 'no':
        return 'destructive';
    }
  };

  const wiscarLabels = {
    will: 'Will (Motivation)',
    interest: 'Interest (Passion)',
    skill: 'Skill (Current Ability)',
    cognitive: 'Cognitive Readiness',
    ability: 'Ability to Learn',
    realWorld: 'Real-World Alignment'
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Your Assessment Results
            </h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of your fit for Systems Architecture
            </p>
          </div>

          {/* Overall Recommendation */}
          <Card className="mb-8 shadow-elevated border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                {getRecommendationIcon()}
              </div>
              <CardTitle className="text-2xl mb-2">
                {getRecommendationText()}
              </CardTitle>
              <div className="flex justify-center">
                <Badge variant={getRecommendationBadgeVariant()} className="text-sm px-4 py-2">
                  {results.confidence}% Confidence
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {results.overallScore}%
                </div>
                <p className="text-muted-foreground">Overall Compatibility Score</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Score Breakdown */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Psychometric Fit</span>
                    <span className="text-primary font-semibold">{results.psychometricScore}%</span>
                  </div>
                  <ProgressBar value={results.psychometricScore} showLabel={false} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Technical Readiness</span>
                    <span className="text-accent font-semibold">{results.technicalScore}%</span>
                  </div>
                  <ProgressBar value={results.technicalScore} showLabel={false} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">WISCAR Average</span>
                    <span className="text-tech-green font-semibold">
                      {Math.round(Object.values(results.wiscarScores).reduce((a, b) => a + b) / 6)}%
                    </span>
                  </div>
                  <ProgressBar 
                    value={Object.values(results.wiscarScores).reduce((a, b) => a + b) / 6} 
                    showLabel={false} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* WISCAR Framework */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-tech-green" />
                  WISCAR Analysis
                </CardTitle>
                <CardDescription>
                  Detailed assessment across six key dimensions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(results.wiscarScores).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        {wiscarLabels[key as keyof typeof wiscarLabels]}
                      </span>
                      <span className="text-sm text-tech-green font-semibold">{value}%</span>
                    </div>
                    <ProgressBar value={value} showLabel={false} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Feedback & Insights */}
          <Card className="mb-8 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.feedback.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-accent/20 rounded-lg">
                    <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alternative Paths (if applicable) */}
          {results.alternativePaths && results.alternativePaths.length > 0 && (
            <Card className="mb-8 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  Alternative Career Paths
                </CardTitle>
                <CardDescription>
                  Consider these related roles that may better match your current profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {results.alternativePaths.map((path, index) => (
                    <Badge key={index} variant="outline" className="justify-start p-3 h-auto">
                      {path}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="text-center">
            <Button onClick={onRestart} variant="outline" className="mr-4">
              Retake Assessment
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
              Explore Learning Path
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}