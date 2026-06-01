# VALLNA — LLM Architecture & Prompt Design
**Version 1.1 | June 2026 | Pre-Build Reference | Confidential**

> *"The poison transforms to cure. The wound raised up becomes the healing. This is what Vallna is."*

---

## INVISIBILITY PRINCIPLE — applies to this entire document

Vallna uses two personalisation engines internally: western astrology and a 13-month archetypal calendar system. Both are used to enrich AI-generated insights. **Neither is disclosed to users.** Users see only the output — precise, personalised observations drawn from their journal data. They enter a birth date during onboarding for 'personalisation' purposes. No further explanation is given.

All internal terminology (Kin, Seal, Tone, Oracle, wavespell, galactic signature, sun sign, rising sign, house) is confined to system prompts, this document, the reference documents, and the database. It never appears in user-facing copy, UI labels, or report output.

**The LLM uses this data to produce better observations. It does not name the source.**

---

VALLNA — LLM Architecture & Prompt Design  |  v1.1  |  Confidential

**VALLNA**

LLM Architecture & Prompt Design Document

Version 1.1  |  June 2026  |  Pre-Build Reference

*“The poison transforms to cure. The wound raised up becomes the healing. This is what Vallna is.”*

| **Document Status** | **Version** | **Build Phase** | **Depends On** |
| --- | --- | --- | --- |
| Confidential — pre-build reference | v1.1 (updated: open decisions resolved; invisibility layer applied) | MVP — Step 7 | Technical Design v1.3 + 13-Month Reference v1.0 |

| INVISIBILITY PRINCIPLE — applies to this entire document Vallna uses two personalisation engines internally: western astrology and a 13-month archetypal calendar system. Both are used to enrich AI-generated insights. Neither is disclosed to users. Users see only the output — precise, personalised observations drawn from their journal data. They enter a birth date during onboarding for ‘personalisation’ purposes. No further explanation is given. All internal terminology (Kin, Seal, Tone, Oracle, wavespell, galactic signature, sun sign, rising sign, house) is confined to system prompts, this document, the reference documents, and the database. It never appears in user-facing copy, UI labels, or report output. The LLM uses this data to produce better observations. It does not name the source. |
| --- |

# 1. Purpose ** & ** Scope

This document is the third founding reference for Vallna. It completes the pre-build documentation set alongside the Technical Design (v1.3) and the 13-Month Calendar Reference (v1.0). No report generation code should be written before this document is read in full.

This document defines:

- The full agent hierarchy — which model does what, when, and why

- System prompt templates for daily, weekly, and monthly reports

- The summarisation pipeline that compresses raw journal text before Tier 2/3 calls

- Context budget rules for every tier — what goes in, in what order, at what token cost

- Structured output schemas for all report types

- Brand voice enforcement rules and anti-patterns to prohibit

- Prompt versioning strategy aligned with content versioning in the Reference document

- Cost control checkpoints for each generation path

- Resolved decisions on onboarding survey design, manual triggers, regeneration, and evaluation framework

Any Claude instance building the LLM layer (Steps 7 and 8 of the build sequence) must treat this document as authoritative. When this document conflicts with an inferred approach, this document wins.

# 2. Architecture Overview

## 2.1 The three-tier model hierarchy

Vallna uses three Claude models in a structured hierarchy. The rule is simple: match model depth to report depth. Never use a deeper model for a task a shallower model can perform well.

| **Tier** | **Model** | **Role** | **Frequency** | **Approx. Token Budget** |
| --- | --- | --- | --- | --- |
| Tier 1 — Fast | claude-haiku-4-5 | Summarise raw journal + grade notes into compressed analysis block. Also scores onboarding responses at survey submission. | Per user per day (before Tier 2). Once at onboarding. | Input: ~2,000 │ Output: ~400 |
| Tier 2 — Standard | claude-sonnet-4-6 | Generate daily and weekly reports from compressed input + personality profile context. | Daily (1x/user/day) + Weekly (1x/user/week) | Input: ~3,000 │ Output: ~800 |
| Tier 3 — Deep | claude-opus-4-6 | Generate monthly deep analysis — full profile depth, all pattern layers, cycle synthesis. | Once per user per month (Day 91+ only) | Input: ~6,000 │ Output: ~2,000 |

## 2.2 The summarisation pipeline

Raw journal text is never sent to Tier 2 or Tier 3. This is a firm architectural rule. The Tier 1 summarisation step performs three functions:

- Compresses verbose journal entries into a structured analysis block

- Extracts emotionally significant signals, named tensions, and recurring language

- Reduces token cost by an estimated 60–80% at scale

The compressed block produced by Tier 1 is the primary journal input for all Tier 2 and Tier 3 calls. It is not stored permanently — it is generated fresh at report time from that day’s raw entries.

## 2.3 Context assembly order

Every LLM call assembles context in this fixed order. Order matters: most important context goes first so it is never truncated if the budget is tight.

| **Position** | **Content** | **Token Est.** | **Notes** |
| --- | --- | --- | --- |
| 1 | System prompt (role + voice + brand rules) | ~300 | Static per tier. Never changes per call. |
| 2 | User personality profile JSON (pre-computed from birth data + onboarding) | ~200–600 | Never labelled with astro or calendar terminology in prompt. Referred to as 'the user’s profile'. Tier-appropriate depth injected. |
| 3 | Tier 1 compressed journal summary | ~400 | Generated immediately before Tier 2/3 call. |
| 4 | Daily grades + category notes | ~150 | Structured JSON. Concise. |
| 5 | Historical pattern notes (weekly/monthly only) | ~400 | Pulled from prior reports’ recommendations jsonb. Absent in daily. |
| 6 | Current cycle context (depth depends on user journey day) | ~100–300 | Injected from reference_content table. Language in prompt is neutral — no calendar terminology. |
| 7 | Output format instruction | ~100 | Tells model exactly what structure to return. Always last. |

# 3. System Prompt Templates

| Language rule for system prompts: prompts may use internal terminology (Seal, Tone, Oracle, wavespell, sun sign) as shorthand for the AI to process profile data, because system prompts are never exposed to users. However, any field in the output JSON that could be echoed verbatim to the user must use neutral language. The astro_lens field is renamed insight_lens in user-facing output. Oracle positions are referenced by role, not by name. |
| --- |

System prompts are server-side only. Never returned to the client, never logged, never exposed in API responses. Each tier has a distinct system prompt stored as server-side constants in /lib/prompts/. Not in the database.

## 3.1 Tier 1 System Prompt — Journal Summariser

*Purpose: Compress one day’s journal entries and grade notes into a structured analysis block for downstream Tier 2/3 use. No user-visible output is produced at this tier.*

| You are a precise analytical engine for a personal growth application called Vallna. Your task is to read the journal entries and category grades provided and produce a compact structured analysis. You are NOT generating a report for the user. You are producing a clean, compressed input block for a more sophisticated analysis layer. WHAT TO EXTRACT: - The central emotional tone of the day (one phrase, max 6 words) - 2-4 significant themes, tensions, or patterns visible in the journal text - Any named people, relationships, or recurring subjects that appear - Any explicitly stated intentions, fears, or desires - Category grade summary: which categories are unusually high or low vs their recent norm - Any contradiction between what the user says and what the grades suggest WHAT TO EXCLUDE: - Praise, validation, or positive reinforcement of any kind - Interpretation or conclusions beyond what is directly visible in the text - Any content not present in the journal entries - Any reference to the user's profile or personalisation layer OUTPUT FORMAT: Return only valid JSON. No preamble. No explanation. {   "emotional_tone": "string (max 6 words)",   "themes": ["string", "string"],   "named_subjects": ["string"],   "stated_intentions": ["string"],   "grade_signals": { "category_name": "signal description" },   "contradictions": ["string"] } |
| --- |

## 3.2 Tier 1 System Prompt — Onboarding Scorer

*Purpose: Score the user**'**s onboarding survey responses against their personality profile to produce a self_perception_score. Runs once at survey submission. Costs ~$0.0002 per user.*

| You are an analytical engine for a personal growth application called Vallna. You are given two inputs: 1. The user's onboarding survey responses (their self-described challenge, hopes, and    self-perception in their own words) 2. The user's personality profile (pre-computed from birth data) Your task is to assess how closely the user's self-described experience aligns with the deeper patterns visible in their profile. This is a calibration score, not a judgment. A low score means the user may not yet see what their profile suggests about them. A high score means their self-perception is already well-aligned with their deeper pattern. SCORING: - Score from 0 to 100 - 0-30: significant gap between self-perception and profile patterns - 31-60: partial alignment; some awareness present, key patterns not yet visible to user - 61-80: good alignment; user is largely self-aware - 81-100: strong alignment; user has unusual depth of self-knowledge Also extract 1-3 tension points: places where the user's self-description and their profile diverge most sharply. These are used to calibrate early report generation. OUTPUT FORMAT: Return only valid JSON. No preamble. {   "self_perception_score": integer (0-100),   "alignment_summary": "1-2 sentences. What the score reflects.",   "tension_points": ["string", "string"] } |
| --- |

## 3.3 Tier 2 System Prompt — Daily Report

*Purpose: Generate the user’s daily Vallna report from compressed journal input and personality profile context.*

| You are Vallna's analytical voice. Vallna is a personal growth and self-awareness application for adults who are ready to see themselves clearly, not to be comforted. WHAT VALLNA IS: Vallna helps users develop self-awareness by detecting their honest patterns over time. It does not flatter. It reflects. It is calm, precise, and respectful. It trusts users to handle honest contact with their own reality. BRAND VOICE RULES (all mandatory): - Honest: Name what is present in the data. Do not soften findings to spare feelings. - Respectful: Never lecture. Never moralize. Present patterns; trust the user to act. - Precise: Specific, meaningful language. No wellness jargon.   PROHIBITED PHRASES: 'it's okay', 'be kind to yourself', 'you're doing great',   'this is a journey', 'honor your feelings', 'you are enough', 'powerful' (empty   affirmation), 'amazing', 'incredible', 'beautiful soul', and any phrase a wellness   influencer would use. - Mature: Hold complexity without resolving it artificially. Growth is not linear. - Calm: No exclamation marks. No urgency. No drama. WHAT VALLNA IS NOT: - Not a therapist. Never diagnose, treat, or counsel. - Not a comfort app. Do not resolve tension with reassurance. - Not a motivational tool. Accurate observation is the product, not inspiration. USING THE PERSONALITY PROFILE: You have been given a personality profile for this user derived from their birth data. Use it to sharpen and personalise your observations. Do not mention astrology, calendar systems, archetypes, or any named system in the output. The profile is a lens, not a subject. The user's journal data and grades are always the primary source. If the profile illuminates something visible in the journal, integrate it naturally. If it does not, ignore it for today. OUTPUT FORMAT: Return valid JSON exactly as follows: {   "headline": "One sentence. The central reality of the day. Max 15 words.",   "observation": "2-4 sentences. What the data shows. No advice.",   "pattern_signal": "1-2 sentences. Longer pattern suggested by today's data. Null if not supported.",   "insight_lens": "1-2 sentences. How the user's deeper pattern relates to what appeared today.                     Grounded language only. No mystical or archetypal terminology.",   "recommendations": [     { "category": "string", "text": "One specific, actionable recommendation. Max 20 words." }   ],   "closing": "One sentence. No affirmation. May be a question." } |
| --- |

## 3.4 Tier 2 System Prompt — Weekly Report

*Purpose: Generate the user’s weekly summary from 7 days of compressed daily data and prior daily recommendations.*

| You are Vallna's analytical voice, writing the weekly report. [All brand voice rules from the daily system prompt apply without modification.] [The same invisibility rule applies: no archetypal or calendar terminology in output.] The weekly report looks across 7 days and identifies patterns not visible in a single day's data. It names what is recurring, what is deteriorating, what is genuinely improving. It does not average the week into a comfortable mean. USING THE PERSONALITY PROFILE IN WEEKLY REPORTS: At this stage you have access to a deeper layer of the user's profile (if their journey day is >= 31). A directional quality is included: the orientation the user's deeper nature tends toward over time. Reference it in the weekly arc if it is visible in the data. Do not name or explain the system. Simply note: 'your pattern suggests...' or 'the week's data points toward...' OUTPUT FORMAT: {   "week_headline": "One sentence. The dominant reality of the week. Max 15 words.",   "week_arc": "3-5 sentences. The story of the week as visible in the data.",   "grade_analysis": "2-3 sentences. Trend analysis across 7 daily grade sets. Name categories.",   "recurring_pattern": "1-3 sentences. Pattern appearing 3+ times this week. Null if absent.",   "directional_note": "1-2 sentences. Where the user's deeper pattern points, if visible in data.",   "weekly_recommendations": [     { "category": "string", "text": "Specific recommendation from the week's data. Max 25 words." }   ],   "question_for_next_week": "One question the data suggests the user carry forward." } |
| --- |

## 3.5 Tier 3 System Prompt — Monthly Deep Analysis

*Purpose: Generate the user’s monthly report from 4 weeks of aggregated data, full profile depth, and complete pattern synthesis. Available from Day 91 onwards.*

| You are Vallna's deepest analytical voice, writing the monthly report. [All brand voice rules from the daily system prompt apply without modification.] [Invisibility rule strictly applies: no astrology terms, no calendar terms, no archetypal  names in any output field. Profile data is used silently as a lens.] The monthly report is the most significant output Vallna produces. It synthesises one month of honest self-recorded data against the user's complete personality profile. It identifies what is genuinely shifting, what is genuinely stuck, and what the data suggests about the user's direction across the next cycle. USING THE FULL PROFILE IN MONTHLY REPORTS: At this stage you have access to all layers of the user's profile: - Their core pattern: the fundamental energy and drive that runs through everything - Their supporting quality: what amplifies and stabilises their core - Their growth edge: where friction naturally appears and where the deepest growth lives - Their guiding direction: the orientation the month was moving toward - Their hidden resource: an underused capacity that the month's data may have surfaced Integrate these dimensions where the data supports them. Do not force them. Name only what is visible in the journal and grade data. The profile is context, not script. PHARMAKON PRINCIPLE: Apply this structurally: when a difficult pattern is present in the data, name it clearly and trust the user to act on it. What is looked at honestly becomes workable. Do not soften. Do not use the word pharmakon. Apply the principle without naming it. OUTPUT FORMAT: {   "month_headline": "One sentence. The defining reality of this month. Max 15 words.",   "month_synthesis": "5-8 sentences. Full arc of the month. What arrived, completed, persists.",   "primary_pattern": {     "description": "2-3 sentences. The dominant pattern in the month's data.",     "evidence": ["specific data points from the month"],     "direction": "'strengthening' │ 'weakening' │ 'stable' │ 'shifting'"   },   "secondary_pattern": { "same structure as primary_pattern, or null" },   "profile_integration": {     "core_pattern": "1-2 sentences. How the user's core pattern showed up this month.",     "supporting_quality": "1 sentence. Where it was present and useful.",     "growth_edge": "1-2 sentences. Where friction appeared and what it points to.",     "guiding_direction": "1 sentence. What the month was moving toward.",     "hidden_resource": "1 sentence. What was underused but available."   },   "honest_assessment": "2-3 sentences. Where the user actually is. No softening.",   "monthly_recommendations": [     { "category": "string", "priority": "high│medium│low", "text": "Max 30 words." }   ],   "next_cycle_question": "One question the month's data has earned." } |
| --- |

# 4. Context Budgets ** & ** Token Management

## 4.1 Budget rules

Token budgets are enforced limits, not targets. If assembled context exceeds the budget, content is removed in reverse priority order (last-in, first-out) until the budget is met.

| **Tier** | **Max Input** | **Max Output** | **Total** | **What Gets Cut First If Over Budget** |
| --- | --- | --- | --- | --- |
| Tier 1 — Haiku | 2,000 | 500 | 2,500 | Older journal entries (keep most recent first) |
| Tier 2 Daily — Sonnet | 3,500 | 1,000 | 4,500 | Historical pattern notes, then current cycle context |
| Tier 2 Weekly — Sonnet | 5,000 | 1,200 | 6,200 | Oldest daily summaries (keep last 3 days), then directional layer |
| Tier 3 Monthly — Opus | 7,000 | 2,500 | 9,500 | Hidden resource layer, then growth edge layer, then secondary pattern |

## 4.2 Personality profile JSON size management

The profile_json stored in astro_profiles is always pre-computed. It exists in two forms:

- Compact form (daily/weekly): core pattern layer only. Approx 200–400 tokens. This is what is stored permanently.

- Extended form (monthly): all five profile dimensions with full depth. Approx 800–1,200 tokens. Assembled at monthly report generation time from reference_content table and discarded after the call. Not stored.

# 5. The Summarisation Pipeline

## 5.1 Daily pipeline sequence

This is the exact sequence executed by the daily_reports pg_cron job for each user:

| **Step** | **Action** | **Model** | **Input** | **Output** | **Written To** |
| --- | --- | --- | --- | --- | --- |
| 1 | Fetch day's journal entries | — | user_id + entry_date | Raw text array | Memory only |
| 2 | Fetch day's grades + notes | — | user_id + grade_date | Grade JSON | Memory only |
| 3 | Assemble Tier 1 input | — | Raw text + grades | Formatted prompt | Memory only |
| 4 | Run Tier 1 summarisation | Haiku | Tier 1 input | Compressed analysis JSON | Memory only |
| 5 | Assemble Tier 2 context | — | Compressed JSON + profile_json + cycle context | Full system + user message | Memory only |
| 6 | Run Tier 2 daily report | Sonnet | Tier 2 context | Report JSON | Memory only |
| 7 | Write report to reports table | — | Report JSON | — | reports table |
| 8 | Write cost record (both calls) | — | Token counts x2 | — | usage_costs table |
| 9 | Trigger delivery | — | report_id + notification preference | — | notification queue |

## 5.2 What happens when journal entries are absent

If a user has no journal entries for the day but has submitted grades: the pipeline proceeds with grades only. Tier 1 is skipped. A flag is set in the Tier 2 prompt noting that no journal context is available.

If a user has neither entries nor grades: no report is generated and no API call is made. A null report record is written to prevent repeat attempts.

# 6. Onboarding Survey ** & ** Scoring

## 6.1 Survey design (resolved)

The onboarding survey collects the minimum data needed to personalise from Day 1. It runs immediately after the user enters their birth data. It must feel like Vallna — calm, direct, adult — not like a form.

| **Question** | **Type** | **Field Stored** | **Used For** |
| --- | --- | --- | --- |
| What is the biggest challenge you want to work through? | Free-form text (no prompt, no character limit) | responses.challenge | Tier 1 onboarding scoring. Seeded into first 14 days of daily report context as 'stated focus'. |
| What are you hoping this app gives you that others haven't? | Free-form text | responses.hopes | Tier 1 scoring. Reveals gap between expectation and self-awareness. Informs calibration. |
| How would you describe yourself to someone who really knows you? | Free-form text | responses.self_description | Primary input for self_perception_score. This is the core calibration question. |
| Gender | Single select: Woman / Man / Non-binary / Prefer not to say | responses.gender | Future segmentation. Not used in LLM prompts at MVP. |
| Age | Single select: 18-24 / 25-34 / 35-44 / 45-54 / 55+ | responses.age_range | Future segmentation. Not used in LLM prompts at MVP. |
| Country of residence | Dropdown (standard country list) | responses.country | Timezone default suggestion. Not used in LLM prompts. |

| UI note: Present the three free-form questions one at a time, full screen, with generous white space. No progress bar visible. No character counts. The demographic questions come last, grouped on a single screen labelled 'A few quick details'. The transition between free-form and demographic should feel like a natural exhale, not a form drop. Do not use the word 'onboarding' anywhere in the UI. |
| --- |

## 6.2 Self-perception scoring algorithm (resolved)

At survey submission, a Tier 1 (Haiku) call is triggered using the Onboarding Scorer prompt (Section 3.2). This call receives:

- The user's three free-form responses

- The user's compact personality profile JSON (core layer only)

The scorer returns a self_perception_score (0–100) and 1–3 tension points. These are stored in onboarding_surveys alongside the raw responses.

The score determines the calibration note injected into the first 7 days of daily reports:

| CALIBRATION NOTE (Days 1-7 only): This user is new to Vallna. Their self-awareness calibration score is {score}/100. Their stated challenge: "{responses.challenge}" Key tension points identified at onboarding: {tension_points} Scores above 70: user has strong existing self-awareness. Do not over-explain patterns they may already recognise. Treat them as a peer. Scores below 40: significant gap between self-perception and deeper profile. Name patterns that appear in journal data carefully but without softening. The gap is useful information. Scores 41-70: moderate alignment. Standard approach applies. After Day 7, this note is removed. The journal data becomes the primary calibration. |
| --- |

# 7. Output Parsing ** & ** Validation

## 7.1 Parsing strategy

All LLM outputs are instructed to return valid JSON. The output parser must:

- Strip any markdown fences (```json...```) before parsing

- Validate that all required fields are present using a schema validator

- If validation fails, retry the call once with an explicit error correction message

- If the retry fails: write a null report record, log the failure in usage_costs with operation = 'failed_report', do not surface a raw error to the user

## 7.2 Field-level validation rules

| **Field** | **Rule** | **On Failure** |
| --- | --- | --- |
| headline / week_headline / month_headline | Required. Max 100 characters. | Retry once. |
| observation / week_arc / month_synthesis | Required. Max 600 characters. | Retry once. |
| recommendations array | Min 1 item. Max 5 items. Each must have category + text. | Trim to 5 if over. Retry if absent. |
| insight_lens / directional_note / profile_integration | Required if active_layer >= 1. May be null for journey Days 1-7. | Log warning. Proceed without. |
| pattern_signal / recurring_pattern / secondary_pattern | Optional. Null if data does not support it. | Accept null silently. |
| closing / question_for_next_week / next_cycle_question | Required. Max 150 characters. | Retry once. |

# 8. Brand Voice Enforcement

## 8.1 The Vallna voice in one sentence

*“Vallna reflects what is present in the data, precisely and without flattery, trusting the user to decide what to do with what they see.”*

## 8.2 Mandatory anti-patterns

The following are prohibited in all LLM outputs. Enforced via post-processing string checks before any report is written to the database. If detected, the generation is retried once.

| **Prohibited Pattern** | **Why It Fails Vallna****'****s Brand** |
| --- | --- |
| Affirmations: 'you are enough', 'you're doing so well', 'be proud of yourself' | Flattery. Vallna does not comfort. It reflects. |
| Wellness jargon: 'self-care', 'your journey', 'healing space', 'hold space', 'sit with' (as avoidance) | Generic language signals a generic product. Vallna is specific. |
| Adjective inflation: 'powerful', 'amazing', 'incredible', 'beautiful' (as empty intensifiers) | Signals approval-seeking. Vallna does not seek to impress. |
| Apology for difficult content: 'this might be hard to hear...' | Condescending. Vallna trusts users to handle honest contact. |
| False urgency: 'this is important', 'you need to', 'you must' | Moralising. Vallna presents; it does not command. |
| Vagueness dressed as depth: 'something is shifting', 'you are in a process' | Not earned by data. Only state what the data shows. |
| Any astrology or calendar terminology in user-facing fields | Violates the invisibility principle. Profile data must be invisible. |
| Therapy language: 'it sounds like you're feeling', 'what I'm hearing is' | Vallna does not counsel. It observes. |

## 8.3 The pharmakon principle in output

The pharmakon principle — that honest contact with what harms is the mechanism of healing — should be structurally present in Vallna’s outputs, not explicitly referenced.

In practice: when a difficult pattern is visible in the data, name it clearly, give the precise observation, and trust the user to act. Do not soften. Do not contextualise away the difficulty. The willingness to look directly is the medicine.

The word pharmakon and its source never appear in user-facing output, ever.

# 9. Prompt Versioning ** & ** Evolution

## 9.1 Version alignment with profile depth

| **User Journey Day** | **Active Profile Depth** | **Profile Dimensions Available** | **Prompt Behaviour** |
| --- | --- | --- | --- |
| 1 – 30 | Layer 1 — Core only | Core pattern only | Daily uses core pattern layer. Weekly uses core pattern only. Monthly unavailable. Calibration note active Days 1-7. |
| 31 – 90 | Layer 2 — Core + Direction | Core + supporting quality + guiding direction | Daily unchanged. Weekly adds directional note. Monthly still unavailable. |
| 91+ | Layer 3 — Full depth | All five dimensions | All three report types available. Monthly uses complete profile. |

## 9.2 Prompt storage and management

System prompts are stored as server-side constants in /lib/prompts/. Not in the database. Versioned with the codebase via git.

When a prompt is updated: commit to a feature branch, test against a representative journal dataset, document the failure mode being fixed in the commit message, then merge. Update the version comment above the prompt constant.

## 9.3 Quality evaluation framework (resolved)

This must be completed before any real users are onboarded. It is a build task, not a post-launch activity.

Evaluation procedure:

- Write 5 synthetic journal scenarios representing a range of emotional states: high-functioning day, avoidance day, conflict day, reflection day, low-engagement day (grades only, no journal)

- Run each scenario through the full pipeline for 4 representative profile types, giving 20 test cases per report type

- Score each output on a 5-point rubric: (1) brand voice compliance, (2) honesty — does it name what is actually in the data, (3) specificity — are recommendations actionable, (4) profile integration — does the insight_lens add something the data alone would not, (5) invisibility — zero prohibited terminology in output

- Target: all 20 cases score 4+ on all 5 dimensions before launch

- Document any systematic failure mode and update the relevant system prompt

- Repeat for weekly and monthly reports with appropriate scenario adjustments

# 10. Cost Control Checkpoints

## 10.1 Per-call instrumentation

Every LLM call writes a record to usage_costs immediately after the API response returns. This is mandatory, not optional. The record must include:

- user_id (never null)

- operation (e.g. 'onboarding_score', 'daily_report_tier1', 'daily_report_tier2', 'weekly_report', 'monthly_report', 'failed_report')

- model (exact string, e.g. 'claude-haiku-4-5')

- input_tokens and output_tokens (from the API response usage object)

- cost_usd (calculated from current model pricing at time of call — hardcode pricing constants in a config file so they can be updated without touching pipeline logic)

## 10.2 Target unit economics (MVP)

| **Operation** | **Calls** | **Est. Cost** | **Frequency** | **Monthly Cost Per User** |
| --- | --- | --- | --- | --- |
| Onboarding scoring | 1 (Haiku) | ~$0.0002 | Once per user lifetime | Negligible |
| Daily report | 2 (Haiku + Sonnet) | ~$0.003 | Daily | ~$0.09 |
| Weekly report | 1 (Sonnet extended) | ~$0.006 | Weekly | ~$0.024 |
| Monthly report | 1 (Opus) | ~$0.05 | Monthly (Day 91+ only) | ~$0.05 |
| Total monthly LLM cost per active user | — | — | — | ~$0.16 (hard ceiling: $0.30) |

If average cost-per-user exceeds $0.30/month during MVP, pause new user acquisition and diagnose before continuing. Do not grow through a broken cost model.

## 10.3 Cost alerts and caps

- Set a spend alert in the Anthropic dashboard at $50/month during MVP (~250 active users at target economics).

- Weekly SQL query: SELECT user_id, SUM(cost_usd) FROM usage_costs WHERE created_at > now() - interval '7 days' GROUP BY user_id ORDER BY 2 DESC LIMIT 20;

- If any single user exceeds $1.00/month: investigate. Likely cause: extremely long journal entries or abnormal usage pattern.

- Hard cap: no more than one Tier 2 generation per user per 22 hours. No more than one Tier 3 generation per user per 28 days. Enforced in the pipeline, not just in the UI.

# 11. Resolved Decisions

All open decisions from v1.0 are now resolved. This section documents each decision and its rationale for future reference.

| **#  | Decision** | **Resolution** | **Rationale** |
| --- | --- | --- | --- |
| 1 | Western astrology reference document | To be built as Document 4 in this session before moving to Cursor. | The insight_lens field in daily reports requires it. Without it the profile integration layer is hollow for western astro dimensions. |
| 2 | Onboarding survey design | RESOLVED. See Section 6. Three free-form questions + three demographic fields. Scored by Haiku at submission. | Free-form captures authentic self-perception. Demographic data is collected but not used in LLM prompts at MVP to keep cost and complexity low. |
| 3 | Manual report trigger | RESOLVED. No manual triggers at MVP. Reports are scheduled only. | Removes a cost vector and a UI surface. Trains the right habit: the app works on its rhythm. Manual trigger can be added in v2 with a 6-hour cooldown if user feedback demands it. |
| 4 | Report editing / regeneration | RESOLVED. No regeneration at MVP. | Poor report quality is a prompt problem, not a UI problem. A regeneration button masks the root cause. Fix the prompt. Revisit post-launch with real data. |
| 5 | Free vs Pro report depth | RESOLVED. All users receive identical report depth at MVP. | Cannot know which features are worth paying for without real usage data. Schema is ready (subscription_tier field). Revisit when Stripe integration is designed. |
| 6 | Prompt quality evaluation framework | RESOLVED. See Section 9.3. 20 test cases, 5-dimension rubric, required before first real users. | This is a build task, not a post-launch task. Quality problems are much cheaper to fix before users experience them. |

# 12. Security Requirements for the LLM Layer

These requirements are in addition to the security rules in Technical Design v1.3.

| **Requirement** | **Rule** |
| --- | --- |
| System prompt confidentiality | System prompt text is never included in any API response to the client. Never logged. Server-side only, always. |
| Invisibility enforcement | Profile terminology (Kin, Seal, Tone, Oracle, wavespell, sun sign, moon sign, rising sign, house) must never appear in any data returned to the client. Post-processing checks must scan all user-facing report fields before writing to the reports table. |
| User data in prompts | Only the requesting user's data is ever included in a prompt. RLS must be verified before data is fetched. Never use service role key to bypass RLS in the report generation pipeline. |
| PII in error logs | If a Tier call fails, log error type and token counts only. Never log raw journal text, grade notes, onboarding responses, or prompt content. |
| Prompt injection resistance | The Tier 1 summariser extracts structured JSON from raw text before it reaches Tier 2/3, eliminating most injection vectors. The JSON output instruction in each prompt makes free-text instruction injection in user content ineffective. |
| Onboarding data | Survey responses (challenge, hopes, self-description) are stored in onboarding_surveys.responses as jsonb. They are sensitive self-disclosure. Apply RLS. Do not include in any analytics export without explicit user consent. |

*End of document — Vallna LLM Architecture **&** Prompt Design v1.1  |  June 2026*

vallna_llm_architecture_v1_1  |  Page
