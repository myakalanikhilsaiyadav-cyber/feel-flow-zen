import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodCheckIn } from "@/components/MoodCheckIn";
import { TrendChart } from "@/components/TrendChart";
import { WellnessRecommendations } from "@/components/WellnessRecommendations";
import { Brain, Heart, TrendingUp, Calendar } from "lucide-react";

const Index = () => {
  const [currentMood, setCurrentMood] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  MindWell
                </h1>
                <p className="text-sm text-muted-foreground">Your wellness companion</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              View History
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            How are you feeling today?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a moment to check in with yourself. Your emotional wellness matters, and we're here to support your journey.
          </p>
        </section>

        {/* Mood Check-In */}
        <section>
          <MoodCheckIn onMoodChange={setCurrentMood} currentMood={currentMood} />
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Visualization */}
          <div className="lg:col-span-2">
            <Card className="shadow-wellness border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Your Wellness Journey</span>
                </CardTitle>
                <CardDescription>
                  Track your emotional patterns over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TrendChart />
              </CardContent>
            </Card>
          </div>

          {/* Today's Summary */}
          <div className="space-y-6">
            <Card className="shadow-mood border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-secondary" />
                  <span>Today's Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-secondary rounded-lg">
                  <div className="text-3xl font-bold text-secondary-foreground">
                    {currentMood ? `${currentMood}/10` : "--"}
                  </div>
                  <p className="text-sm text-secondary-foreground/70">
                    Current Mood
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-semibold text-primary">7</div>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-secondary">5.8</div>
                    <p className="text-xs text-muted-foreground">Avg Mood</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-soft border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Weekly Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Most frequent mood</span>
                  <span className="text-sm font-medium text-accent-foreground">😊 Content</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Best day</span>
                  <span className="text-sm font-medium text-secondary-foreground">Tuesday</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Improvement</span>
                  <span className="text-sm font-medium text-primary">+12% vs last week</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Wellness Recommendations */}
        <section>
          <WellnessRecommendations currentMood={currentMood} />
        </section>
      </main>
    </div>
  );
};

export default Index;