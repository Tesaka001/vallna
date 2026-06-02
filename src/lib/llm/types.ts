export type Tier1Summary = {
  emotional_tone: string;
  themes: string[];
  named_subjects: string[];
  stated_intentions: string[];
  grade_signals: Record<string, string>;
  contradictions: string[];
};

export type DailyReportOutput = {
  headline: string;
  observation: string;
  pattern_signal: string | null;
  insight_lens: string | null;
  recommendations: Array<{ category: string; text: string }>;
  closing: string;
};

export type WeeklyReportOutput = {
  week_headline: string;
  week_arc: string;
  grade_analysis: string;
  recurring_pattern: string | null;
  directional_note: string | null;
  weekly_recommendations: Array<{ category: string; text: string }>;
  question_for_next_week: string;
};

export type MonthlyReportOutput = {
  month_headline: string;
  month_synthesis: string;
  primary_pattern: {
    description: string;
    evidence: string[];
    direction: string;
  };
  secondary_pattern: unknown;
  profile_integration: Record<string, string>;
  honest_assessment: string;
  monthly_recommendations: Array<{
    category: string;
    priority: string;
    text: string;
  }>;
  next_cycle_question: string;
};

export type OnboardingScoreOutput = {
  self_perception_score: number;
  alignment_summary: string;
  tension_points: string[];
};
