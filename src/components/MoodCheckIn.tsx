import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Smile, MessageCircle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MoodCheckInProps {
  onMoodChange: (mood: number) => void;
  currentMood: number | null;
}

export const MoodCheckIn = ({ onMoodChange, currentMood }: MoodCheckInProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(currentMood);
  const [moodNote, setMoodNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const moodEmojis = [
    { value: 1, emoji: "😢", label: "Terrible", color: "text-red-500" },
    { value: 2, emoji: "😟", label: "Bad", color: "text-red-400" },
    { value: 3, emoji: "😐", label: "Poor", color: "text-orange-500" },
    { value: 4, emoji: "😕", label: "Below Average", color: "text-yellow-500" },
    { value: 5, emoji: "😊", label: "Okay", color: "text-yellow-400" },
    { value: 6, emoji: "🙂", label: "Good", color: "text-green-400" },
    { value: 7, emoji: "😄", label: "Very Good", color: "text-green-500" },
    { value: 8, emoji: "😁", label: "Great", color: "text-green-600" },
    { value: 9, emoji: "🤗", label: "Amazing", color: "text-blue-500" },
    { value: 10, emoji: "🌟", label: "Perfect", color: "text-purple-500" },
  ];

  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood);
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onMoodChange(selectedMood);
    
    // Store in localStorage for now (until Supabase is connected)
    const moodEntry = {
      mood: selectedMood,
      note: moodNote,
      timestamp: new Date().toISOString(),
    };
    
    const existingEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    existingEntries.push(moodEntry);
    localStorage.setItem("moodEntries", JSON.stringify(existingEntries));
    
    toast({
      title: "Mood recorded!",
      description: `Thank you for checking in. Your mood (${selectedMood}/10) has been saved.`,
    });
    
    setIsSubmitting(false);
    setMoodNote("");
  };

  return (
    <Card className="shadow-mood border-border/50 bg-gradient-wellness/10">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-xl">
          <Smile className="h-6 w-6 text-primary" />
          <span>Daily Mood Check-In</span>
        </CardTitle>
        <CardDescription className="text-base">
          Rate how you're feeling on a scale of 1-10
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Scale */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Select your mood:</Label>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
            {moodEmojis.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-300 hover:shadow-soft ${
                  selectedMood === mood.value
                    ? "border-primary bg-primary-soft/50 shadow-mood scale-110"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <span className="text-2xl sm:text-3xl mb-1">{mood.emoji}</span>
                <span className="text-xs text-center font-medium text-muted-foreground">
                  {mood.value}
                </span>
                <span className="text-xs text-center hidden sm:block text-muted-foreground">
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
          
          {selectedMood && (
            <div className="text-center p-4 bg-primary-soft/20 rounded-lg border border-primary/20">
              <p className="text-lg font-medium text-primary-foreground">
                You selected: <span className="font-bold">{selectedMood}/10</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {moodEmojis.find(m => m.value === selectedMood)?.label}
              </p>
            </div>
          )}
        </div>

        {/* Mood Note */}
        {selectedMood && (
          <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
            <Label htmlFor="mood-note" className="flex items-center space-x-2 text-base font-medium">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span>What's on your mind? (optional)</span>
            </Label>
            <Textarea
              id="mood-note"
              placeholder="Share what's affecting your mood today..."
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              className="min-h-20 resize-none border-primary/20 focus:border-primary"
            />
          </div>
        )}

        {/* Submit Button */}
        {selectedMood && (
          <div className="flex justify-center pt-4 animate-in slide-in-from-bottom-2 duration-300">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-2 bg-gradient-primary hover:shadow-soft transition-all duration-300"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Mood</span>
                </div>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};