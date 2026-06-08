# VALLNA — Brand & Strategy

**Version 1.0 | June 2026 | Founding strategy reference | Confidential**

> *"The poison transforms to cure. The wound raised up becomes the healing. This is what Vallna is."*

---

## Document map — read this first

This document was split out of the original Technical Design. The founding reference is now two documents with different readers and different update cadences:

- **This document — Brand & Strategy (`00_vallna_strategy.md`).** The *why*: brand story, product thesis, symbolic layer, competitive position, brand voice, and product vision. This is a human-facing reference. It is **not required in Cursor build context** and should not be loaded during routine build steps.
- **Technical Design (`01_vallna_technical_design.md`).** The *what and how* the build agent executes against: tech stack, data model, API, security, build order, open decisions.

**Governance on conflict:** on brand meaning or product intent, this document governs. On implementation, the Technical Design governs. Where brand voice becomes code (report generation, onboarding copy, AI output), the **LLM Architecture & Prompt Design** document, §8 (the Wise Woman persona) and §10 (Brand Voice Enforcement), is the operational authority — it is more specific than the principles here and supersedes them for anything the model produces.

---

# 1. Purpose & How to Use This Document

This is the brand and strategy foundation for Vallna — a personal growth and self-awareness application. It records the product thesis, the reasoning behind the name, the symbolic layer, and the competitive position, so that anyone building or writing for Vallna can stay aligned with its intent without re-deriving it.

It is the source of meaning, not the source of implementation. It informs tone, copy, design direction, and the spirit of AI-generated content. It does not contain tables, schemas, or build instructions — those live in the Technical Design.

# 2. Brand Story

## 2.1 The name

Vallna is a constructed word, built from sound rather than derived from a single root — and that is intentional. It was designed to carry the phonosemantic quality of the verbs that describe what users do inside it: journaling, awakening, grounding, clearing, becoming.

Say those words out loud. They share a quality: forward motion, no hard stop, the word keeps moving after you have finished saying it. They feel like process, not object. Like something happening to you while you do it.

Vallna was built to carry that same quality. The V launches cleanly. The double-l creates just enough weight without stopping the flow — a speed bump, not a wall. The open *-na* landing keeps moving after the word ends. Two syllables. No hard stop anywhere.

Underneath the construction, *val* carries *wave* in Catalan, Occitan, and traces through Romance languages. A journal entry is a wave. A pattern detected over weeks is a wave. The reports show the waves of a life in motion. Users will not know this consciously. They will feel it.

## 2.2 The naming journey

The name was arrived at through an extensive process that considered and eliminated: Innara, Innori, Innora (store conflicts or trademark blocks), Pharava (etymologically rich but three syllables, difficult to memorise), Vexa, Miren, Sova, Drava, Sera, Awra (all taken on EUIPO or Play Store), Volna (taken as brand), Wallna, and others. Vallna emerged from a phonosemantic brief: two syllables, flowing consonants, open vowel ending, sounds like process not object. It cleared every check — EUIPO, Play Store, .com, .app.

This history matters. If the name is ever questioned internally, the answer is: it was earned, not chosen quickly.

## 2.3 The thesis

> *"You need to get to know your enemy in order to defeat it. You can only personally grow if you truthfully detect your issues, false beliefs, and negative patterns. Bring the ugly out in order to resolve it and disintegrate it. The poison transforms to cure."*

This is not a comfort app. It is a truth app. The distinction matters and it is the entire competitive position.

Most wellness applications operate on the comfort end of the spectrum: gratitude journals, affirmations, gentle streaks, positive reinforcement. They help users feel better. Vallna helps users see more clearly — which sometimes feels uncomfortable before it feels better. The assumption is that users who genuinely want to grow are capable of tolerating honest contact with their own patterns. That they are hungry for it, because the comfort apps have not delivered the change they were promised.

## 2.4 The symbolic layer

The pharmakon concept — the Greek word that holds poison, medicine, and scapegoat simultaneously — underlies the entire product philosophy. The same substance that harms, heals, depending entirely on the relationship you have with it. The caduceus. The Rod of Asclepius. The bronze Nehushtan that Moses raised in the desert: anyone bitten by serpents who looked upon the bronze serpent was healed. The image of the thing that harms, elevated and looked at directly, becomes the cure.

The serpent symbolism runs deeper: in virtually every human tradition the serpent represents liminality (living at thresholds), cyclical renewal through shedding, dangerous wisdom, and the union of opposites. The shed skin is the most precise image of what honest journaling produces over time — the user becomes something new by releasing what they were.

This symbolic layer should inform onboarding language, report tone, visual design direction, and the metaphors used in AI-generated content. It should never be stated explicitly or made into a gimmick. It should be felt.

The wave quality in the name Vallna connects to this directly. Waves shed. Waves transform. Waves carry things to shore that were hidden in deep water.

# 3. Competitive Positioning

## 3.1 Competitive landscape

| Category | Examples | What they offer | What they avoid |
| --- | --- | --- | --- |
| Meditation | Calm, Headspace | Relaxation, sleep, stress reduction | Confrontation with patterns; personal shadow |
| Gratitude / positivity | Reflectly, Daylio | Positive reframing, mood logging | Honest assessment of negative patterns |
| Habit tracking | Habitica, Streaks | Behavioural consistency, gamification | Why habits fail; root cause analysis |
| Generic journaling | Day One, Journey | Free-form writing, memory keeping | AI analysis; pattern recognition; accountability |
| Astrology apps | Co-Star, The Pattern | Astrological profiles, daily readings | Integration with actual behaviour data; journaling |
| **Vallna** | — | Honest pattern detection, shadow integration, AI-enriched insight, astrological depth | Comfort without truth; validation without growth |

## 3.2 The specific gap Vallna fills

No app currently combines:

- Honest, AI-driven pattern analysis that names what is actually happening — not just what the user wants to hear
- Integration of Western astrology and the 13-month Dreamspell calendar as a personalisation layer for recommendations
- Daily journaling and category grading as the raw data source for AI insight
- A philosophical position that treats discomfort as the mechanism of growth, not a problem to be soothed

## 3.3 What Vallna is not

- **Not a therapy replacement** — it does not diagnose, treat, or counsel. It reflects and recommends.
- **Not a positivity platform** — it will name negative patterns when they are present in user data.
- **Not an astrology app** — astrology is context for insight, not the product itself.
- **Not a habit tracker** — it is concerned with awareness and alignment, not behavioural gamification.

# 4. Brand Voice Principles

These are the brand-level principles. Their **operational, enforceable form** — prohibited phrases, anti-patterns, the Wise Woman persona, and the per-tier register — lives in the LLM Architecture & Prompt Design document, §8 and §10. When writing or evaluating AI output, that document is authoritative; these principles are the intent behind it.

- **Honest:** The app does not flatter. It reflects.
- **Respectful:** It does not lecture or moralize. It presents patterns and trusts the user to act.
- **Precise:** Precise, meaningful language — not wellness jargon or motivational filler.
- **Mature:** Holds complexity without resolving it artificially. Growth is not linear. The app knows this.
- **Calm:** Simple surface, serious depth. The UI is calm and uncluttered. What happens beneath is sophisticated.

# 5. Product Vision

## 5.1 What the app does

Vallna helps users develop greater self-awareness, accountability, and alignment with their intuition through structured daily journaling, mood and category tracking, and AI-generated personal insights. Insights are enriched with the user's astrological profile — drawn from both Western astrology and the 13-month Dreamspell/Law of Time calendar — to produce recommendations that are both personally calibrated and honestly delivered.

## 5.2 Who it is for

- **Primary:** Women, 30+ years old, Western markets
- **Psychographic:** Interested in personal growth, spirituality, self-development — not technical. Has tried other wellness apps and found them too superficial. Ready for something more honest.
- **Expectation:** The app must feel simple, calm, and intuitive. Complexity is hidden, never shown.
- **Device:** Mobile-first. Most users will access primarily from smartphone.

## 5.3 The user's internal state

When a user opens Vallna, she is hoping to find clarity, to understand, to grow, to awaken. She comes in hoping. She leaves — over weeks and months of honest use — more awake. The app is the passage between those two states. Every design decision, every AI output, every piece of copy should serve that passage.

---

*End of document — Vallna Brand & Strategy v1.0  |  June 2026*

*Split from the original Technical Design. The implementation counterpart is `01_vallna_technical_design.md`.*
