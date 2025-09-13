import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Moon, 
  Music, 
  Leaf, 
  Coffee, 
  Book, 
  Smile,
  MessageCircle,
  Phone,
  ExternalLink 
} from "lucide-react";

interface WellnessRecommendationsProps {
  currentMood: number | null;
}

export const WellnessRecommendations = ({ currentMood }: WellnessRecommendationsProps) => {
  const getRecommendations = () => {
    if (!currentMood) {
      return [
        {
          id: 1,
          title: "Start Your Day with Gratitude",
          description: "Write down three things you're grateful for today",
          category: "Mindfulness",
          icon: Heart,
          duration: "5 min",
          difficulty: "Easy",
          color: "bg-gradient-secondary"
        },
        {
          id: 2,
          title: "Deep Breathing Exercise", 
          description: "Try the 4-7-8 breathing technique to center yourself",
          category: "Wellness",
          icon: Leaf,
          duration: "10 min",
          difficulty: "Easy",
          color: "bg-gradient-primary"
        },
        {
          id: 3,
          title: "Mindful Morning Coffee",
          description: "Savor your morning beverage mindfully, focusing on the taste and warmth",
          category: "Mindfulness",
          icon: Coffee,
          duration: "15 min", 
          difficulty: "Easy",
          color: "bg-gradient-wellness"
        }
      ];
    }

    // Low mood recommendations (1-4)
    if (currentMood <= 4) {
      return [
        {
          id: 1,
          title: "Reach Out to Someone",
          description: "Connect with a friend or family member who makes you smile",
          category: "Connection",
          icon: MessageCircle,
          duration: "Flexible",
          difficulty: "Medium",
          color: "bg-gradient-secondary",
          action: "Call Now"
        },
        {
          id: 2,
          title: "Gentle Movement",
          description: "Take a short walk outside or do some light stretching",
          category: "Movement",
          icon: Heart,
          duration: "10-15 min",
          difficulty: "Easy",
          color: "bg-gradient-primary"
        },
        {
          id: 3,
          title: "Crisis Support",
          description: "If you're in crisis, please reach out for professional help",
          category: "Support",
          icon: Phone,
          duration: "Immediate",
          difficulty: "Important",
          color: "bg-warning/10 border-warning",
          action: "Get Help",
          urgent: true
        }
      ];
    }

    // Medium mood recommendations (5-7)
    if (currentMood <= 7) {
      return [
        {
          id: 1,
          title: "Progressive Muscle Relaxation",
          description: "Relax your body systematically from head to toe",
          category: "Relaxation",
          icon: Leaf,
          duration: "15 min",
          difficulty: "Easy",
          color: "bg-gradient-primary"
        },
        {
          id: 2,
          title: "Listen to Uplifting Music",
          description: "Create or listen to a playlist that boosts your energy",
          category: "Entertainment",
          icon: Music,
          duration: "20-30 min",
          difficulty: "Easy",
          color: "bg-gradient-secondary"
        },
        {
          id: 3,
          title: "Journal Your Thoughts",
          description: "Write about what's on your mind to process your emotions",
          category: "Reflection",
          icon: Book,
          duration: "15-20 min",
          difficulty: "Medium",
          color: "bg-gradient-wellness"
        }
      ];
    }

    // High mood recommendations (8-10)
    return [
      {
        id: 1,
        title: "Share Your Joy",
        description: "Spread positivity by checking in on someone who might need it",
        category: "Connection",
        icon: Smile,
        duration: "Flexible",
        difficulty: "Easy",
        color: "bg-gradient-secondary"
      },
      {
        id: 2,
        title: "Try Something Creative",
        description: "Channel your positive energy into art, writing, or music",
        category: "Creativity",
        icon: Heart,
        duration: "30+ min",
        difficulty: "Medium",
        color: "bg-gradient-primary"
      },
      {
        id: 3,
        title: "Plan Future Joy",
        description: "Schedule something to look forward to this week",
        category: "Planning",
        icon: Book,
        duration: "10 min",
        difficulty: "Easy",
        color: "bg-gradient-wellness"
      }
    ];
  };

  const recommendations = getRecommendations();
  
  const getMoodMessage = () => {
    if (!currentMood) return "Personalized recommendations will appear after you log your mood";
    
    if (currentMood <= 4) return "We're here to support you through this difficult time";
    if (currentMood <= 7) return "Here are some activities that might help boost your wellbeing";
    return "You're feeling great! Here are ways to maintain and share your positive energy";
  };

  return (
    <Card className="shadow-wellness border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-secondary" />
          <span>Personalized Wellness Recommendations</span>
        </CardTitle>
        <CardDescription className="text-base">
          {getMoodMessage()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => {
            const IconComponent = rec.icon;
            return (
              <div
                key={rec.id}
                className={`p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-mood hover:scale-105 ${
                  rec.urgent 
                    ? rec.color
                    : `${rec.color} border-transparent hover:border-primary/20`
                }`}
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div className={`p-2 rounded-full ${
                    rec.urgent ? 'bg-warning/20' : 'bg-white/80'
                  }`}>
                    <IconComponent className={`h-5 w-5 ${
                      rec.urgent ? 'text-warning-foreground' : 'text-primary'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      rec.urgent ? 'text-warning-foreground' : 'text-card-foreground'
                    }`}>
                      {rec.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {rec.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {rec.duration}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className={`text-sm mb-4 ${
                  rec.urgent ? 'text-warning-foreground/80' : 'text-muted-foreground'
                }`}>
                  {rec.description}
                </p>

                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      rec.urgent ? 'border-warning text-warning-foreground' : ''
                    }`}
                  >
                    {rec.difficulty}
                  </Badge>
                  
                  <Button 
                    size="sm" 
                    variant={rec.urgent ? "default" : "outline"}
                    className={rec.urgent ? 'bg-warning text-warning-foreground hover:bg-warning/90' : ''}
                  >
                    {rec.action || "Try Now"}
                    {rec.action === "Get Help" && <ExternalLink className="h-3 w-3 ml-1" />}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {currentMood && currentMood <= 4 && (
          <div className="mt-6 p-4 bg-warning/10 border border-warning/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Phone className="h-4 w-4 text-warning-foreground" />
              <span className="font-medium text-warning-foreground">Crisis Resources</span>
            </div>
            <p className="text-sm text-warning-foreground/80 mb-3">
              If you're having thoughts of self-harm, please reach out immediately:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span>National Suicide Prevention Lifeline:</span>
                <a href="tel:988" className="font-mono font-bold text-warning-foreground hover:underline">
                  988
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span>Crisis Text Line:</span>
                <a href="sms:741741" className="font-mono font-bold text-warning-foreground hover:underline">
                  Text HOME to 741741
                </a>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};