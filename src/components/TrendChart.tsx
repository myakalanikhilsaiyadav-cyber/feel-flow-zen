import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp } from "lucide-react";

interface MoodEntry {
  mood: number;
  note: string;
  timestamp: string;
}

export const TrendChart = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [timeFrame, setTimeFrame] = useState<"week" | "month">("week");

  useEffect(() => {
    // Load mood entries from localStorage
    const stored = localStorage.getItem("moodEntries");
    if (stored) {
      setMoodEntries(JSON.parse(stored));
    }
  }, []);

  // Generate sample data if no real data exists
  const generateSampleData = () => {
    const days = timeFrame === "week" ? 7 : 30;
    const data = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString("en-US", { 
          month: "short", 
          day: "numeric" 
        }),
        mood: Math.floor(Math.random() * 4) + 6, // Random mood between 6-9
        fullDate: date.toISOString().split('T')[0]
      });
    }
    return data;
  };

  // Process real mood entries into chart data
  const processRealData = () => {
    const days = timeFrame === "week" ? 7 : 30;
    const today = new Date();
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Find mood entry for this date
      const entry = moodEntries.find(e => 
        e.timestamp.split('T')[0] === dateStr
      );

      data.push({
        date: date.toLocaleDateString("en-US", { 
          month: "short", 
          day: "numeric" 
        }),
        mood: entry ? entry.mood : null,
        fullDate: dateStr,
        hasEntry: !!entry
      });
    }
    return data;
  };

  const chartData = moodEntries.length > 0 ? processRealData() : generateSampleData();
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-wellness">
          <p className="font-medium text-card-foreground">{label}</p>
          <p className="text-primary">
            Mood: <span className="font-bold">{payload[0].value}/10</span>
          </p>
          {!data.hasEntry && moodEntries.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">No entry recorded</p>
          )}
        </div>
      );
    }
    return null;
  };

  const averageMood = chartData.reduce((sum, entry) => sum + (entry.mood || 0), 0) / chartData.length;

  return (
    <div className="space-y-4">
      {/* Time Frame Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>Average: {averageMood.toFixed(1)}/10</span>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={timeFrame === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFrame("week")}
          >
            7 Days
          </Button>
          <Button
            variant={timeFrame === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFrame("month")}
          >
            30 Days
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              domain={[1, 10]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="mood"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fill="url(#moodGradient)"
              connectNulls={false}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: "hsl(var(--primary))", stroke: "white", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          {moodEntries.length > 0 
            ? `Showing ${chartData.filter(d => d.mood !== null).length} recorded entries`
            : "Sample data shown - start logging your mood to see your personal trends!"
          }
        </p>
      </div>
    </div>
  );
};