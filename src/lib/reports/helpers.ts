import { differenceInCalendarDays, parseISO } from "date-fns";

import type { DailyReportOutput, WeeklyReportOutput, MonthlyReportOutput } from "@/lib/llm/types";

export function userJourneyDay(userCreatedAt: string, referenceDate: string): number {
  return differenceInCalendarDays(parseISO(referenceDate), parseISO(userCreatedAt)) + 1;
}

export function formatDailyReportContent(report: DailyReportOutput): string {
  const sections = [
    report.headline,
    "",
    report.observation,
  ];

  if (report.pattern_signal) {
    sections.push("", report.pattern_signal);
  }

  if (report.insight_lens) {
    sections.push("", report.insight_lens);
  }

  if (report.recommendations.length > 0) {
    sections.push("", "Recommendations");
    for (const item of report.recommendations) {
      sections.push(`• ${item.category}: ${item.text}`);
    }
  }

  sections.push("", report.closing);
  return sections.join("\n").trim();
}

export function formatWeeklyReportContent(report: WeeklyReportOutput): string {
  const sections = [report.week_headline, "", report.week_arc, "", report.grade_analysis];

  if (report.recurring_pattern) {
    sections.push("", report.recurring_pattern);
  }
  if (report.directional_note) {
    sections.push("", report.directional_note);
  }
  if (report.weekly_recommendations.length > 0) {
    sections.push("", "Recommendations");
    for (const item of report.weekly_recommendations) {
      sections.push(`• ${item.category}: ${item.text}`);
    }
  }
  sections.push("", report.question_for_next_week);
  return sections.join("\n").trim();
}

export function formatMonthlyReportContent(report: MonthlyReportOutput): string {
  const sections = [
    report.month_headline,
    "",
    report.month_synthesis,
    "",
    report.primary_pattern.description,
    "",
    report.honest_assessment,
  ];

  if (report.monthly_recommendations.length > 0) {
    sections.push("", "Recommendations");
    for (const item of report.monthly_recommendations) {
      sections.push(`• [${item.priority}] ${item.category}: ${item.text}`);
    }
  }

  sections.push("", report.next_cycle_question);
  return sections.join("\n").trim();
}

export function buildCalibrationNote(params: {
  score: number | null;
  challenge: string | null;
  tensionPoints: string[];
  journeyDay: number;
}): string | null {
  if (params.journeyDay > 7 || params.score === null) {
    return null;
  }

  return [
    "CALIBRATION NOTE (Days 1-7 only):",
    `Self-awareness calibration score: ${params.score}/100.`,
    params.challenge ? `Stated challenge: "${params.challenge}"` : null,
    params.tensionPoints.length
      ? `Key tension points: ${params.tensionPoints.join("; ")}`
      : null,
  ]
    .filter(Boolean)
    .join(" ");
}
