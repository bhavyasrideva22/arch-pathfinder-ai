import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, Users, Zap, Building2, Cloud, Settings } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  const careers = [
    { title: "Solutions Architect", icon: Target },
    { title: "Enterprise Architect", icon: Building2 },
    { title: "Cloud Architect", icon: Cloud },
    { title: "DevOps Architect", icon: Settings },
    { title: "Infrastructure Architect", icon: Zap },
    { title: "Technical Project Lead", icon: Users }
  ];

  const traits = [
    "High-level abstract thinking",
    "Systems-level problem-solving",
    "Strategic decision-making",
    "Communication & stakeholder alignment",
    "Cross-functional collaboration",
    "Balance of technical depth + architectural breadth"
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Pathfinder Assessment
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Should You Become a Systems Architect?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover if you have the technical mindset, cognitive approach, and personality traits suited for a career as a Systems Architect.
            </p>
          </div>

          {/* What Does a Systems Architect Do */}
          <Card className="mb-8 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                What Does a Systems Architect Do?
              </CardTitle>
              <CardDescription>
                A Systems Architect designs, integrates, and oversees end-to-end systems architecture—both hardware and software—for organizations. They map business requirements to technical implementations, ensuring scalability, interoperability, and security.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Typical Careers */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Typical Career Paths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {careers.map((career, index) => {
                    const Icon = career.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{career.title}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Success Traits */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Traits That Succeed in This Role
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {traits.map((trait, index) => (
                    <Badge key={index} variant="secondary" className="justify-start text-left p-3 h-auto">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Info */}
          <Card className="mb-8 shadow-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-center">Assessment Overview</CardTitle>
              <CardDescription className="text-center">
                This comprehensive assessment evaluates your fit across multiple dimensions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Psychological Compatibility</h3>
                  <p className="text-sm text-muted-foreground">Interest scale, personality traits, and work style preferences</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Technical Readiness</h3>
                  <p className="text-sm text-muted-foreground">Aptitude tests and prerequisite knowledge evaluation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-tech-green/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-tech-green" />
                  </div>
                  <h3 className="font-semibold mb-2">WISCAR Analysis</h3>
                  <p className="text-sm text-muted-foreground">Will, Interest, Skill, Cognitive readiness, Ability, Real-world alignment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Start Assessment */}
          <div className="text-center">
            <div className="bg-card border border-primary/20 rounded-lg p-6 shadow-card">
              <h3 className="text-xl font-semibold mb-2">Ready to Begin?</h3>
              <p className="text-muted-foreground mb-6">
                The assessment takes approximately 20-30 minutes to complete. You'll receive detailed feedback and personalized recommendations.
              </p>
              <Button onClick={onStart} size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                Start Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}