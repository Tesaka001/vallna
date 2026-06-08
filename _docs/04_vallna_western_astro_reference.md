VALLNA — Western Astrology Reference  |  v1.0.2  |  Confidential

**VALLNA**

Western Astrology — Reference Data

Version 1.0.2  |  June 2026  |  Internal Engine Room Only  |  Confidential

*v1.0.2 (June 2026): layer-activation thresholds updated — Layer 2 now unlocks at Day 15 and Layer 3 at Day 30 (previously Day 31 / Day 91), matching the LLM Architecture doc's §11.1. Also repointed the "Used By" reference to the LLM Architecture doc.*

| **Document Status** | **Used By** | **Invisibility Rule** |
| --- | --- | --- |
| Internal reference only. Never shown to users. | LLM Architecture — Tier 2 and Tier 3 system prompts | All terminology in this document is confined to system prompts and internal code. Sun signs, houses, aspects, and planet names never appear in user-facing report output. |

| HOW THIS DOCUMENT RELATES TO THE 13-MONTH REFERENCE Both documents feed the same profile_json structure stored in astro_profiles. The 13-month calendar provides the user's core archetypal pattern (Seal, Tone, Oracle). Western astrology provides the psychological and relational layer (Sun, Moon, rising, house emphasis, aspects). Together they produce a richer profile than either system alone. In LLM prompts, these are never presented as separate systems. They are injected as a single unified 'user personality profile' block. The model uses both without distinguishing them. Content is layered identically to the 13-month reference: Layer 1: Days 1-14 (concise, actionable). Layer 2: Days 15-29 (deeper inquiry). Layer 3: Day 30+ (full archetypal depth, monthly reports only). |
| --- |

# **1. Purpose ****&**** How to Use This Document**

This document is the canonical western astrology reference for Vallna. It is the source of truth for the western astrology component of astro_profiles.profile_json and for populating the astro_reference schema in Supabase.

It contains:

- 12 zodiac signs with full layered meaning content

- 10 planets with domain, report role, and layered interpretive content

- 12 houses with life-area mapping and layered content (monthly reports, birth time required)

- 4 major aspect types with functional quality descriptions for LLM use

- LLM injection format for the western astrology component of the profile block

Content is layered intentionally. Layer 1 is used in daily reports — concise and actionable. Layer 2 is deeper, used in weekly reports. Layer 3 is the full psychological and archetypal layer, used only in monthly deep analysis for users on Day 30+. NOTE ON ACTIVATION TIMING: The report-type-to-layer mapping above describes which content depth each report type draws on; it is not the activation rule. Actual layer activation is gated by account age, not report type: Layer 2 content unlocks at Day 15 and Layer 3 at Day 30, per LLM Architecture §11.1, which is authoritative on activation timing. A weekly report generated before Day 15 uses Layer 1 content. Where this document and the LLM Architecture document differ on when a layer becomes active, the LLM Architecture document governs.

| BIRTH DATA REQUIREMENTS BY FEATURE Sun sign:          requires birth date only (always available) Moon sign:         requires birth date only (calculated from date; approximate without time) Rising sign:       requires birth date + birth time + birth location (precise) House placements:  requires birth time + location (cannot be calculated without both) Aspects:           calculated from full birth chart (requires time + location for precision) MVP approach: calculate Sun and Moon from birth date alone. Rising and houses are injected as null in profile_json if birth time was not provided. The LLM is instructed to omit house-based insight_lens content when these fields are null. In onboarding UI: birth time is labelled 'optional — improves personalisation'. No further explanation. Do not mention astrology. |
| --- |

# **2. The 12 Zodiac Signs**

Each sign entry contains: element, modality, traditional ruler, archetype, and three content layers for LLM use. The sign describes the quality of the Sun’s expression at birth — the user’s core drive, identity style, and the way they meet the world. The Moon sign describes emotional need and instinctive response. Both are injected into the profile block with their respective roles.

**Sign 01 — Aries  ♈**

| **Element** | **Modality** | **Traditional Ruler** | **Archetype** |
| --- | --- | --- | --- |
| Fire | Cardinal | Mars | The Initiator |

Layer 1 — Daily (concise, actionable)

*Your core drive is to begin. You meet the world with directness and energy. Today supports action over analysis — trust your first impulse if it has been consistent for more than a day.*

Layer 2 — Weekly (deeper inquiry)

*Aries energy excels at starting and struggles with the middle. The pattern to watch: where have you initiated something this week and then lost interest before completion? Initiative without follow-through is the characteristic wound here. What would it mean to finish one thing fully before beginning the next?*

Layer 3 — Monthly (full archetypal depth)

*Aries is the first sign — the pure impulse of becoming, the moment before form. Mars-ruled, it carries the original fire: the desire that does not know why it wants, only that it must move. The gift is courage that does not require permission. The wound is the self that can only be seen at the beginning of things, that needs the novelty of starting because the middle feels like death. The medicine is learning that completion is not the opposite of aliveness — it is the moment when aliveness becomes real. The warrior who cannot sustain is only half a warrior.*

**Sign 02 — Taurus  ♉**

| **Element** | **Modality** | **Traditional Ruler** | **Archetype** |
| --- | --- | --- | --- |
| Earth | Fixed | Venus | The Builder |

Layer 1 — Daily (concise, actionable)

*Your core drive is to secure and sustain. You meet the world through the senses and through what endures. Today supports slow, thorough work — resist the pressure to move faster than feels right.*

Layer 2 — Weekly (deeper inquiry)

*Taurus energy builds what lasts and resists what threatens stability. The pattern to watch this week: where is your resistance to change actually protecting something valuable, and where has it become inertia dressed as stability? These look identical from the inside. What in your week has been stubborn for the right reasons, and what has simply been stuck?*

Layer 3 — Monthly (full archetypal depth)

*Taurus is Venus in her earth form — not beauty for its own sake but beauty made real: the garden, the craft, the body that knows its own comfort. Fixed earth: the most committed of all the signs, the least willing to move when it has decided where it stands. The gift is reliability so deep it becomes a kind of love. The wound is the confusion of security with truth — holding to what is familiar because change has always come as loss. The medicine is discovering that some forms of security are prisons with comfortable furniture, and that the ground underfoot is more solid than any structure built on fear of losing it.*

**Sign 03 — Gemini  ♊**

| **Element** | **Modality** | **Traditional Ruler** | **Archetype** |
| --- | --- | --- | --- |
| Air | Mutable | Mercury | The Connector |

Layer 1 — Daily (concise, actionable)

*Your core drive is to understand by connecting. You meet the world through language, curiosity, and the movement between ideas. Today supports gathering information before concluding — but watch for using new information to avoid a decision already made.*

Layer 2 — Weekly (deeper inquiry)

*Gemini energy thrives in complexity and becomes scattered when it cannot find a frame. The pattern to watch this week: how many threads are you holding simultaneously, and which of them are actually going somewhere? Genuine curiosity and anxiety-driven mental movement feel identical in the moment. What would it mean to follow one thread all the way to its end?*

Layer 3 — Monthly (full archetypal depth)

*Gemini is Mercury in his winged form — the mind that moves so fast it sometimes loses itself. Mutable air: the most adaptable sign, the most capable of holding contradictions without needing to resolve them. The gift is genuine intellectual range — the ability to see multiple true things at once where others can only hold one. The wound is the self that lives only in motion, that cannot stop long enough to know what it actually thinks, that uses the next idea as an escape from the weight of the last one. The medicine is stillness long enough to discover that the mind, when it stops moving, does not disappear — it deepens.*

**Sign 04 — Cancer  ♋**

| **Element** | **Modality** | **Traditional Ruler** | **Archetype** |
| --- | --- | --- | --- |
| Water | Cardinal | Moon | The Nurturer |

Layer 1 — Daily (concise, actionable)

*Your core drive is to protect what you love. You meet the world through feeling and memory. Today supports attending to your inner state before responding to outer demands — what you feel is data, not weakness.*

Layer 2 — Weekly (deeper inquiry)

*Cancer energy leads with care and withdraws when it feels unsafe. The pattern to watch this week: where have you been protecting others from something they could actually handle, and where has caretaking been a way of managing your own anxiety? The helper who cannot receive is as stuck as the one who cannot give. What would it mean to let someone care for you this week?*

Layer 3 — Monthly (full archetypal depth)

*Cancer is the Moon’s own sign — the water that moves with the pull of something invisible, the self that knows it is shaped by forces it cannot see or name. Cardinal water: it initiates through feeling rather than action, it begins things by caring about them. The gift is emotional intelligence so deep it borders on psychic — the capacity to know what is wrong in a room before anyone speaks. The wound is the confusion of care with control — the parent who cannot stop parenting, the friend whose love has conditions hidden even from themselves. The medicine is learning that genuine care does not require the other person to remain in need of it.*

**Sign 05 — Leo  ♌**

| **Element** | **Modality** | **Traditional Ruler** | **Archetype** |
| --- | --- | --- | --- |
| Fire | Fixed | Sun | The Sovereign |

Layer 1 — Daily (concise, actionable)

*Your core drive is to be seen for what you genuinely are. You meet the world through self-expression and leadership. Today supports acting from your actual values rather than from the desire to impress — the difference between the two is always visible in retrospect.*

Layer 2 — Weekly (deeper inquiry)

*Leo energy radiates when it is genuinely itself and performs when it is afraid of being unseen. The pattern to watch this week: in which moments were you fully present and which were performance? Performance is exhausting in a specific way — you can feel the cost. Genuine expression has a different quality: it costs nothing and leaves you more alive than before. What did this week cost you, and what left you more alive?*

Layer 3 — Monthly (full archetypal depth)

*Leo is the Sun in its fixed fire form — the light that does not move because it is the centre others move around. The gift is a quality of presence that makes people feel genuinely seen, because the Leo nature sees itself so clearly. The wound is the confusion of love with admiration: wanting to be seen so desperately that the authentic self is replaced by a more impressive version, and then discovering that the admiration received is for someone who does not quite exist. The medicine is the courage to be unimpressive and loved for it — to discover that genuine sovereignty requires no audience.*

**Sign 06 — Virgo  ♍**

| **Element** | **Modality** | **Traditional Ruler** | **Archetype** |
| --- | --- | --- | --- |
| Earth | Mutable | Mercury | The Analyst |

Layer 1 — Daily (concise, actionable)

*Your core drive is to improve what exists. You meet the world through discernment, precision, and the desire for things to work correctly. Today supports distinguishing between what genuinely needs refining and what you are criticising because it is easier than accepting it.*

Layer 2 — Weekly (deeper inquiry)

*Virgo energy serves best when it is in service of something it genuinely values. The pattern to watch this week: where has your critical intelligence been directed outward at things beyond your control, and where has it been turned productively inward? Discrimination applied to the self is medicine. Discrimination applied to everything except the self is avoidance. What needs your precision most right now?*

Layer 3 — Monthly (full archetypal depth)

*Virgo is Mercury in her earth form — the mind that wants not just to understand but to be useful, to make the understanding into something that works. Mutable earth: the sign most capable of adapting its methods in service of a larger goal. The gift is an exacting intelligence that sees exactly what is wrong and exactly what would fix it. The wound is the perfectionism that is secretly self-punishment in disguise — the standard set so high that falling short is guaranteed, which confirms the felt sense that something essential is inadequate. The medicine is directing the analytical gift toward what is already working, and discovering that refinement and self-acceptance are not opposites.*

**Sign 07 — Libra  ♎**

| **Element** | **Modality** | **Traditional Ruler** | **Archetype** |
| --- | --- | --- | --- |
| Air | Cardinal | Venus | The Harmoniser |

Layer 1 — Daily (concise, actionable)

*Your core drive is to create balance and connection. You meet the world through relationships and the desire for fairness. Today supports making a decision you have been deferring — the balance you are seeking is often on the other side of the choice, not before it.*

Layer 2 — Weekly (deeper inquiry)

*Libra energy excels at holding multiple perspectives and struggles to act when acting means someone is disappointed. The pattern to watch this week: how many decisions have been deferred in the name of fairness or further information? Genuine fairness sometimes requires disappointing someone. Where has the desire for everyone to be satisfied been a way of avoiding the responsibility of your own position?*

Layer 3 — Monthly (full archetypal depth)

*Libra is Venus in her air form — beauty as relationship, as the space between people, as the moment when two things come into right proportion. Cardinal air: it initiates through connection, it begins things by relating. The gift is a genuine capacity for seeing the other’s position as real and valid, which makes Libra types natural mediators. The wound is the self that has become so skilled at seeing all sides that it has lost track of which side is its own — that mistakes permanent openness for fairness, and cannot act because acting means taking a position. The medicine is discovering that having a position is not the same as being closed, and that the most balanced thing a Libra can do is sometimes to choose.*

**Sign 08 — Scorpio  ♏**

| **Element** | **Modality** | **Traditional Ruler** | **Archetype** |
| --- | --- | --- | --- |
| Water | Fixed | Pluto | The Transformer |

Layer 1 — Daily (concise, actionable)

*Your core drive is to go beneath the surface of things. You meet the world through intensity, depth, and the desire to understand what is actually happening. Today supports naming something you have been circling without yet facing directly.*

Layer 2 — Weekly (deeper inquiry)

*Scorpio energy investigates what others avoid and sometimes cannot stop investigating what would be better released. The pattern to watch this week: where has your penetrating perception been genuinely useful, and where has it become a way of maintaining control by knowing more than others? Understanding and power are not the same thing. What are you holding onto that you would be freer without?*

Layer 3 — Monthly (full archetypal depth)

*Scorpio is Pluto’s sign — the water that moves underground, invisible, reshaping everything it passes through. Fixed water: the most committed feeling type, the least willing to let go once it has attached. The gift is an x-ray quality of perception — the capacity to see through the surface of things to what is actually operating beneath. The wound is the confusion of depth with destruction — the belief that transformation always requires the annihilation of what came before, that there is no way through except by burning everything down. The medicine is the discovery that some things can be changed without being destroyed, and that the capacity for regeneration is greater than the need to control the terms of the change.*

**Sign 09 — Sagittarius  ♐**

| **Element** | **Modality** | **Traditional Ruler** | **Archetype** |
| --- | --- | --- | --- |
| Fire | Mutable | Jupiter | The Seeker |

Layer 1 — Daily (concise, actionable)

*Your core drive is to understand the larger picture. You meet the world through meaning, exploration, and the need for things to make sense at a philosophical level. Today supports following genuine curiosity rather than the need to arrive at a conclusion.*

Layer 2 — Weekly (deeper inquiry)

*Sagittarius energy expands what it touches and sometimes over-expands past the point of usefulness. The pattern to watch this week: where has your search for meaning been genuinely generative, and where has it been a way of staying in motion rather than integrating what you already know? The next horizon is always available. What would it mean to stop long enough to use what you have already found?*

Layer 3 — Monthly (full archetypal depth)

*Sagittarius is Jupiter’s own sign — the fire that wants to illuminate everything, that believes the world is essentially meaningful and that meaning is always one more journey away. Mutable fire: the most adaptable of the fire signs, the most capable of adjusting its direction without losing its heat. The gift is a genuine optimism that is not naïve but hard-won — the capacity to keep going toward something even when the evidence is mixed. The wound is the restlessness that cannot settle into what it has found, the teacher who is always preparing the next lecture rather than living the lesson, the belief that arrival would mean death. The medicine is discovering that depth and breadth are not opposites — that going further is sometimes the same as going deeper.*

**Sign 10 — Capricorn  ♑**

| **Element** | **Modality** | **Traditional Ruler** | **Archetype** |
| --- | --- | --- | --- |
| Earth | Cardinal | Saturn | The Architect |

Layer 1 — Daily (concise, actionable)

*Your core drive is to build something that endures. You meet the world through structure, responsibility, and the long view. Today supports asking whether the structure you are building is in service of something you actually value, or in service of the idea of being someone who builds things.*

Layer 2 — Weekly (deeper inquiry)

*Capricorn energy achieves what it commits to and sometimes commits to the wrong things out of discipline rather than desire. The pattern to watch this week: what are you working toward, and when did you last verify that you still want it? Sustained effort is Capricorn’s greatest gift and its most available trap. What would change if the goal shifted?*

Layer 3 — Monthly (full archetypal depth)

*Capricorn is Saturn’s own sign — the earth that has been compressed by time into something that does not give way. Cardinal earth: it initiates through structure, through the decision to build something real. The gift is a quality of seriousness that is not heaviness — the capacity to take on the weight of what matters and carry it without complaint. The wound is the self that has internalised authority so thoroughly that it cannot distinguish between genuine ambition and the need to prove something to a judge who may no longer be present. The medicine is the discovery that the most enduring structures are built from genuine desire, not from the fear of being found inadequate.*

**Sign 11 — Aquarius  ♒**

| **Element** | **Modality** | **Traditional Ruler** | **Archetype** |
| --- | --- | --- | --- |
| Air | Fixed | Uranus | The Visionary |

Layer 1 — Daily (concise, actionable)

*Your core drive is to see what could exist that does not yet. You meet the world through ideas, systems, and the needs of the collective. Today supports distinguishing between the vision that serves others and the detachment that protects you from needing them.*

Layer 2 — Weekly (deeper inquiry)

*Aquarius energy innovates and sometimes uses innovation as a way of staying above the emotional reality of relationships. The pattern to watch this week: where has your systems-level thinking been genuinely useful, and where has it been a way of engaging with ideas about people rather than with the people themselves? The collective is real. What is your actual relationship to the individuals within it?*

Layer 3 — Monthly (full archetypal depth)

*Aquarius is Uranus’s sign — the fixed air that has decided what it knows and will not easily be moved by what contradicts it. The paradox: the sign most associated with revolution and change is also one of the most stubborn signs in the zodiac. The gift is the capacity to hold a vision of what could be with enough conviction to actually make it real. The wound is the confusion of independence with invulnerability — the belief that needing people is a weakness, that genuine connection is a threat to the clarity of the vision. The medicine is discovering that the most revolutionary act for Aquarius is often allowing itself to be genuinely known by someone, one person at a time.*

**Sign 12 — Pisces  ♓**

| **Element** | **Modality** | **Traditional Ruler** | **Archetype** |
| --- | --- | --- | --- |
| Water | Mutable | Neptune | The Mystic |

Layer 1 — Daily (concise, actionable)

*Your core drive is to dissolve the boundaries between yourself and what is larger. You meet the world through feeling, imagination, and empathy so complete it sometimes loses the border between self and other. Today supports naming one thing that is yours — your feeling, your need, your direction — without qualifying it away.*

Layer 2 — Weekly (deeper inquiry)

*Pisces energy understands everything and sometimes understands so completely that it cannot act. The pattern to watch this week: where has your compassion been genuinely offered, and where has it been a way of avoiding the discomfort of your own unmet needs? Empathy for others is natural here. Self-advocacy is the practice. What did you need this week that you did not ask for?*

Layer 3 — Monthly (full archetypal depth)

*Pisces is Neptune’s sign — the water that has become the ocean, that no longer knows where it ends and the rest of the world begins. Mutable water: the most permeable of all the signs, the most capable of taking the shape of its container. The gift is a capacity for compassion and imagination that borders on the transpersonal — the ability to feel what others feel as if it were one’s own, which produces both great artists and exhausted helpers. The wound is the loss of self in the service of others, or in the service of a fantasy that never quite arrives. The medicine is the discovery that boundaries are not the opposite of compassion — they are what makes genuine compassion sustainable.*

# **3. The 10 Planets**

Each planet entry contains: its domain (what it governs in the psyche), its role in Vallna’s reports, and three content layers. Planets in the user’s birth chart are injected into the profile block by the role they play in the user’s psychological pattern — not by their astrological names. In LLM prompts and user-facing output, they appear as qualities or drives, never as planet names.

At MVP: Sun and Moon sign positions are calculated from birth date. All other planet positions require an external astrology API or library for precise placement. The Sun and Moon are the minimum viable profile. The remaining planets enrich the profile when chart calculation is available.

**Planet 01 — Sun**

| **Domain** | **Role in Reports** |
| --- | --- |
| Core identity, ego, conscious will, the self the user is developing into | Primary profile dimension. The user’s Sun sign is the spine of the personality profile block. Always injected. |

Layer 1 — Daily

*The Sun in the profile describes the user’s core drive and the quality of their conscious self-expression. It is what they are actively becoming, not what they were born as. Use it to frame the central energy of the day when it is relevant to what the journal shows.*

Layer 2 — Weekly

*The Sun’s sign describes the style of the user’s will: how they meet challenges, what they are fundamentally trying to prove or express. When the week’s data shows the user in full alignment with this drive, name it. When the week shows them acting against it, name that tension without diagnosing it.*

Layer 3 — Monthly

*The Sun is the conscious project of the life — who the user is choosing to become through their choices over time. In the monthly deep analysis, the Sun sign provides the frame for assessing whether the month’s actions were in service of the user’s genuine direction or were a detour from it. The Sun does not describe who the user is; it describes who they are in the process of becoming.*

**Planet 02 — Moon**

| **Domain** | **Role in Reports** |
| --- | --- |
| Emotional nature, instinctive responses, needs, what makes the user feel safe or unsafe | Secondary profile dimension. Moon sign injected alongside Sun from Day 1. Critical for understanding emotional grade patterns. |

Layer 1 — Daily

*The Moon describes the user’s emotional baseline and their instinctive responses. When grades in emotional or relational categories diverge from what the journal text suggests, the Moon sign often explains the gap. Use it to enrich observations about emotional pattern without naming it as an astrological factor.*

Layer 2 — Weekly

*The Moon’s sign shows how the user’s emotional needs are structured: what they require to feel safe, what triggers withdrawal or reactivity, what nourishes them at a level below conscious preference. When the week’s emotional grade trend diverges from the journal’s stated experience, the Moon pattern is often the explanation.*

Layer 3 — Monthly

*The Moon is the oldest self — the emotional patterning formed before conscious memory, the need structure that operates independently of what the user believes about themselves. In the monthly report, the Moon sign provides the lens for understanding the user’s recurring emotional responses: not as problems to solve but as a deeply-rooted intelligence about what sustains them. The tension between Sun and Moon — between the self being built and the self that was already there — is often where the most significant growth patterns live.*

**Planet 03 — Mercury**

| **Domain** | **Role in Reports** |
| --- | --- |
| Thinking style, communication, how the user processes and transmits information | Tertiary profile dimension. Used when chart is available. Enriches insight around journal clarity, communication patterns. |

Layer 1 — Daily

*Mercury’s sign describes how this user thinks and communicates: quickly or methodically, linearly or associatively, concretely or abstractly. When journal entries show a particular pattern of reasoning or communication difficulty, Mercury provides the context.*

Layer 2 — Weekly

*Mercury’s position explains why certain kinds of thinking feel natural and others feel like effort. A week with high journal output may reflect Mercury in a favourable sign position. A week of fragmented or circular thinking may reflect Mercury under strain. Use it to contextualise cognitive pattern weeks without pathologising the style.*

Layer 3 — Monthly

*Mercury in the monthly analysis provides the frame for understanding the user’s relationship with their own mind: how they learn, how they communicate what matters to them, and where the gap between what they know and what they can express creates frustration. Some Mercury placements are slow and thorough; some are fast and scattered. Neither is better. The question is whether the user is working with their natural thinking style or against it.*

**Planet 04 — Venus**

| **Domain** | **Role in Reports** |
| --- | --- |
| What the user values, how they relate, what they find beautiful or meaningful, their relationship style | Injected when chart available. Particularly relevant for relational category grades and patterns around self-worth. |

Layer 1 — Daily

*Venus’s sign describes how the user experiences value and connection: what they are drawn to, how they express affection, what they need from their relationships. When relational grades are low, Venus provides context for the underlying dynamic.*

Layer 2 — Weekly

*Venus’s pattern shows itself most clearly in what the user moves toward and what they withdraw from in their relationships. A week with relational tension may reflect Venus in a sign that has particular friction with the user’s Sun or Moon. A week of unusual ease in connection may reflect Venus operating in its natural register.*

Layer 3 — Monthly

*Venus in the monthly analysis reveals the user’s deepest pattern around value: not just in relationships but in what they believe they deserve, what they are willing to ask for, and what they accept in place of what they actually want. The gap between Venus’s natural expression and what the user actually receives — or allows themselves to receive — is one of the most reliable indicators of where growth is both needed and possible.*

**Planet 05 — Mars**

| **Domain** | **Role in Reports** |
| --- | --- |
| Drive, assertion, anger, desire, how the user pursues what they want | Injected when chart available. Relevant for energy level grades and patterns around action vs. avoidance. |

Layer 1 — Daily

*Mars’s sign describes how the user pursues what they want: directly or indirectly, quickly or slowly, through assertion or through persistence. When energy grades are consistently low, or when journal entries show frustration or blocked desire, Mars provides the context.*

Layer 2 — Weekly

*Mars’s pattern in the weekly view shows itself in where the user applied effort and where they withdrew. A week of high productivity aligned with a strong Mars expression. A week of frustration and blocked action may reflect Mars energy that has no clear outlet or that is being expressed in the wrong direction.*

Layer 3 — Monthly

*Mars in the monthly analysis reveals the user’s relationship with desire and agency: how they mobilise themselves toward what they want, how they handle frustration and resistance, and what they do with anger. Mars energy that is suppressed does not disappear — it becomes resentment, passivity, or physical symptoms. The monthly report can name this pattern when it is visible in the data without diagnosing it.*

**Planet 06 — Jupiter**

| **Domain** | **Role in Reports** |
| --- | --- |
| Growth, expansion, belief, where the user’s confidence and optimism are most natural | Injected when chart available. Used in monthly reports to identify where genuine expansion is available vs. overreach. |

Layer 1 — Daily

*Jupiter’s sign describes where growth comes most naturally for this user: in which domain confidence is abundant, where opportunities tend to arise, and where the risk of over-expansion is highest. Use it to contextualise patterns of ambition or excess in the journal data.*

Layer 2 — Weekly

*Jupiter’s position shows where the user tends to invest energy with confidence and where they may be overextended. A week of ambitious plans and high optimism may reflect Jupiter’s natural influence. A week where that same optimism produced unrealistic commitments reflects the shadow side of the same placement.*

Layer 3 — Monthly

*Jupiter in the monthly analysis identifies the user’s growth edges — not as challenges but as areas of genuine possibility. Jupiter’s sign shows where the user’s natural faith is most available and where they are most capable of genuine expansion. The question is always whether that expansion is in service of something real or is a way of avoiding the more difficult and necessary work of depth.*

**Planet 07 — Saturn**

| **Domain** | **Role in Reports** |
| --- | --- |
| Structure, discipline, limitation, where the user’s deepest lessons and responsibilities live | Injected when chart available. Particularly relevant for patterns around self-discipline, achievement, and the user’s relationship with their own standards. |

Layer 1 — Daily

*Saturn’s sign describes where the user experiences the most significant pressure to develop mastery and where they are most likely to feel inadequate or blocked. It is not a comfortable planet, but its domain is where the most lasting growth happens.*

Layer 2 — Weekly

*Saturn’s pattern in the weekly view often shows as the recurring difficulty the user cannot resolve quickly — the category that stays low regardless of effort, the theme that returns no matter how many times it seems to be addressed. This is not failure; it is Saturn’s curriculum.*

Layer 3 — Monthly

*Saturn in the monthly analysis frames the user’s central developmental task — the long project of becoming adequate to their own life in the domain Saturn governs. Saturn does not reward shortcuts. But it does reward sustained effort with a quality of earned authority that no other planet can provide. When the monthly data shows the user consistently engaging with their Saturn domain, even without resolution, that engagement is itself the progress.*

**Planet 08 — Uranus**

| **Domain** | **Role in Reports** |
| --- | --- |
| Disruption, originality, the user’s relationship with freedom and change | Injected when chart available. Used to contextualise sudden shifts, unexpected changes, and the user’s tolerance for disruption. |

Layer 1 — Daily

*Uranus’s position describes where the user is most likely to experience unexpected change and where their need for freedom is most acute. When journal entries describe sudden disruption or restlessness with existing structures, Uranus provides context.*

Layer 2 — Weekly

*Uranus’s influence in the weekly view shows in the moments the user broke from routine — whether that break was generative or destabilising depends on what was ready to change. A week with high disruption may reflect Uranus energy that was unavoidable. The question is not whether the disruption happened but how the user is relating to it.*

Layer 3 — Monthly

*Uranus in the monthly analysis identifies the user’s long-term relationship with freedom and change: where they court disruption, where they resist it, and what their pattern of revolution and consolidation looks like over time. Uranus energy that is integrated produces genuine originality. Uranus energy that is unconscious produces chaos that the user attributes to external circumstances.*

**Planet 09 — Neptune**

| **Domain** | **Role in Reports** |
| --- | --- |
| Idealism, dissolution, spirituality, the user’s relationship with illusion and transcendence | Injected when chart available. Used to contextualise patterns of escapism, idealisation, and the user’s spiritual or creative life. |

Layer 1 — Daily

*Neptune’s position describes where the user is most susceptible to idealisation and most drawn to transcendence. When journal entries show a pattern of disappointment with reality not matching expectation, Neptune provides the frame.*

Layer 2 — Weekly

*Neptune’s influence in the weekly view shows in the gap between how the user describes events and what the grades suggest about how those events actually felt. Neptune dissolves clear perception in its domain — which can produce beautiful creative vision or persistent self-deception, often simultaneously.*

Layer 3 — Monthly

*Neptune in the monthly analysis frames the user’s relationship with the ideal: what they believe things should be, what they are willing to accept when reality falls short, and where their capacity for transcendence is being used in service of genuine spiritual development versus as an escape from what needs to be faced. Neptune’s highest expression is compassion without illusion. Its lowest is the dream maintained at the cost of the real.*

**Planet 10 — Pluto**

| **Domain** | **Role in Reports** |
| --- | --- |
| Transformation, power, depth, the user’s relationship with what cannot be controlled | Injected when chart available. Used in monthly reports to identify the user’s core transformation theme and their relationship with power and loss. |

Layer 1 — Daily

*Pluto’s position describes where the user encounters the most significant forces of transformation in their life — the domain where things do not change incrementally but rupture and reconstitute. When journal entries describe something that feels beyond the user’s control, Pluto provides the frame.*

Layer 2 — Weekly

*Pluto’s influence in the weekly view is subtle but persistent. It shows in the themes the user returns to repeatedly, the tensions that do not resolve through normal means, the places where journal language becomes most charged or most carefully neutral — which often indicates the same thing.*

Layer 3 — Monthly

*Pluto in the monthly analysis reveals the user’s deepest transformation theme — the domain where life is demanding that they die to one version of themselves in order to become the next. This is never comfortable, and Pluto does not permit shortcuts or delays beyond a certain point. The monthly report can name this theme clearly when the data supports it, trusting the user to meet what is being asked of them.*

# **4. The 12 Houses**

Houses are used in monthly reports only, and only when the user has provided birth time and location. Without birth time, house placements cannot be calculated accurately and this section of the profile block is null.

Each house describes a domain of life. Planets placed in a house activate that life domain with the planet’s particular energy and the sign’s particular style. In LLM prompts, houses are referred to by their life-area name, never by their number or astrological title.

**House 01 — First House — Self ****&**** Approach**

| **Life Area** |
| --- |
| How the user presents to the world and initiates action. The self as others first encounter it. |

Layer 1

*The way this user meets new situations and new people. The energy they lead with before they have time to adjust it.*

Layer 2

*The First House describes the mask that is not quite a mask — the instinctive presentation that reflects something genuine even when the user believes they are performing. The tension between First House energy and Sun sign energy is often where the user’s self-concept and their actual behaviour diverge.*

Layer 3

*The First House in the monthly analysis frames the user’s relationship with their own presence: how they take up space, how they initiate, and whether their outer presentation is in alignment with their inner experience. A significant gap between the two is one of the most common sources of the chronic low-grade exhaustion that the data sometimes shows but the journal does not name.*

**House 02 — Second House — Resources ****&**** Worth**

| **Life Area** |
| --- |
| What the user values, owns, and earns. Their relationship with material security and self-worth. |

Layer 1

*The domain of what the user considers theirs: their money, their possessions, their body, and the felt sense of their own value. Grade patterns in financial or physical wellbeing categories often reflect Second House dynamics.*

Layer 2

*The Second House pattern in the weekly view shows in the user’s relationship with having and not having: where they feel abundant and where they feel insufficient, and whether that sense of insufficiency tracks reality or a deeper belief about what they deserve.*

Layer 3

*The Second House in the monthly analysis reveals the user’s foundational relationship with worth — not just financial worth but the sense of being enough, of deserving what they have and wanting what they do not. This is one of the most practically consequential houses because its pattern shapes what the user allows themselves to pursue, ask for, and receive.*

**House 03 — Third House — Communication ****&**** Mind**

| **Life Area** |
| --- |
| How the user thinks, communicates, learns, and relates to their immediate environment. |

Layer 1

*The domain of how the user expresses ideas and processes daily experience through language and thought. Journal entry patterns — length, clarity, fragmentation — often reflect Third House conditions.*

Layer 2

*The Third House in the weekly view shows in the quality of the user’s thinking: whether the week produced clarity or mental noise, whether communication with others felt natural or strained, whether the user’s mind was working with them or against them.*

Layer 3

*The Third House in the monthly analysis frames the user’s relationship with their own mind and their immediate world: how they learn, how they communicate, and whether the gap between what they understand and what they can express is narrowing or widening over time.*

**House 04 — Fourth House — Home ****&**** Foundation**

| **Life Area** |
| --- |
| The user’s inner life, private self, family of origin, home environment, and psychological roots. |

Layer 1

*The domain of private experience, home life, and the psychological foundation that everything else is built on. Grade patterns in home or family categories and recurring themes of security and belonging reflect Fourth House conditions.*

Layer 2

*The Fourth House in the weekly view shows in the user’s experience of their inner life and home environment: whether the week provided a sense of groundedness or left the user feeling internally unsettled regardless of external circumstances.*

Layer 3

*The Fourth House in the monthly analysis is the most private domain — it describes what the user carries from their earliest experience and how that shapes their sense of safety in the world. The patterns here are often the most resistant to change because they are the most deeply rooted. They are also, when they shift, the changes that feel most fundamental.*

**House 05 — Fifth House — Creativity ****&**** Joy**

| **Life Area** |
| --- |
| Self-expression, play, pleasure, romance, and what the user creates for the sheer joy of creating. |

Layer 1

*The domain of genuine enjoyment and creative self-expression. Grade patterns in areas of fun, creativity, or romantic connection often reflect Fifth House conditions.*

Layer 2

*The Fifth House in the weekly view shows in where the user experienced genuine pleasure and spontaneous self-expression — and where these were absent or substituted with productivity disguised as play.*

Layer 3

*The Fifth House in the monthly analysis reveals the user’s relationship with joy: whether they allow themselves genuine pleasure without purpose, whether their creative life is alive or dormant, and whether the month contained experiences that were wanted for themselves rather than for what they produce.*

**House 06 — Sixth House — Health ****&**** Daily Work**

| **Life Area** |
| --- |
| Daily routines, physical health, work habits, and the rhythms that structure ordinary life. |

Layer 1

*The domain of day-to-day functioning: health habits, work routines, and the small repeated actions that constitute most of a life. Grade patterns in physical or work categories are often Sixth House reflections.*

Layer 2

*The Sixth House in the weekly view shows in the quality of the user’s daily functioning: whether their routines were sustaining or depleting, whether health habits were maintained or neglected, and whether their work felt purposeful or mechanical.*

Layer 3

*The Sixth House in the monthly analysis frames the user’s relationship with their daily life — the unglamorous structures that determine whether everything else is possible. Sixth House neglect rarely produces dramatic symptoms immediately; it produces a gradual erosion of the foundation that makes the user’s actual goals possible.*

**House 07 — Seventh House — Partnership**

| **Life Area** |
| --- |
| Close one-to-one relationships: romantic partners, significant friendships, key collaborators. |

Layer 1

*The domain of the primary other: who the user chooses to commit to, what they seek in close partnership, and what they encounter in others that reflects their own unintegrated qualities.*

Layer 2

*The Seventh House in the weekly view shows in the quality of the user’s closest relationships: where they experienced genuine connection and where they experienced the familiar difficulties that tend to recur across different people.*

Layer 3

*The Seventh House in the monthly analysis reveals the user’s relational pattern — not just who they are in relationships but what they are seeking through them, what they project onto others, and whether their closest partnerships are growing or maintaining a familiar but limiting equilibrium.*

**House 08 — Eighth House — Transformation ****&**** Shared Resources**

| **Life Area** |
| --- |
| Depth, shared finances, psychological transformation, loss, sexuality, and what is held in common with others. |

Layer 1

*The domain of what cannot be controlled: death, loss, debt, shared resources, and the transformations that are not chosen. When journal entries touch on themes of power, loss, intimacy, or things that cannot be undone, Eighth House energy is often present.*

Layer 2

*The Eighth House in the weekly view shows in where the user encountered depth they could not manage on the surface — the relational undercurrents, the financial entanglements, the conversations that changed something.*

Layer 3

*The Eighth House in the monthly analysis frames the user’s relationship with what cannot be controlled: how they handle loss, how they navigate shared resources and shared power, and whether they are moving through necessary transformation or resisting it at significant personal cost.*

**House 09 — Ninth House — Meaning ****&**** Expansion**

| **Life Area** |
| --- |
| Beliefs, philosophy, higher education, travel, and the search for a framework that makes life meaningful. |

Layer 1

*The domain of the big picture: the beliefs the user lives by, the search for meaning, the desire to understand life at a larger scale. Journal entries that touch on questions of purpose, faith, or what it all means often reflect Ninth House themes.*

Layer 2

*The Ninth House in the weekly view shows in where the user engaged with something larger than immediate circumstance — a belief tested, a perspective expanded, a question that opened rather than closed.*

Layer 3

*The Ninth House in the monthly analysis frames the user’s relationship with meaning: whether their current beliefs are sustaining or constricting them, whether the month brought any genuine expansion of perspective, and whether the framework they use to understand their life is serving their actual development.*

**House 10 — Tenth House — Career ****&**** Public Life**

| **Life Area** |
| --- |
| Vocation, reputation, public role, and the contribution the user is building toward in the world. |

Layer 1

*The domain of public achievement and the user’s relationship with ambition and recognition. Grade patterns in career or purpose categories often reflect Tenth House conditions.*

Layer 2

*The Tenth House in the weekly view shows in how the user’s work life felt: whether they were moving toward something that felt genuinely theirs or performing a role that fits imperfectly, whether recognition was present or absent and how they related to that.*

Layer 3

*The Tenth House in the monthly analysis reveals the user’s relationship with their public purpose — not just what they do for work but what they are building toward and whether that direction still reflects who they are becoming. The Tenth House is where private development becomes public contribution, and it requires both the inner work of the other houses and the courage to be seen doing it.*

**House 11 — Eleventh House — Community ****&**** Vision**

| **Life Area** |
| --- |
| Friendships, groups, collective goals, and the user’s relationship with their wider community and future. |

Layer 1

*The domain of belonging and collective aspiration: the user’s friendships beyond close partnership, their role in groups and communities, and the vision they hold for the future. Grade patterns in social or community categories reflect Eleventh House conditions.*

Layer 2

*The Eleventh House in the weekly view shows in the quality of the user’s sense of belonging and collective engagement: whether they felt part of something larger or isolated within it, whether their friendships were nourishing or draining, whether the vision for their future felt alive or theoretical.*

Layer 3

*The Eleventh House in the monthly analysis frames the user’s relationship with their community and with the future they are trying to build toward. It asks whether the groups the user belongs to are helping them become who they are growing into, or maintaining a version of them that is no longer current.*

**House 12 — Twelfth House — Inner Life ****&**** Unseen Forces**

| **Life Area** |
| --- |
| The unconscious, spiritual practice, solitude, what is hidden, and the self beneath the self. |

Layer 1

*The domain of what is hidden from ordinary awareness: the unconscious patterns, the spiritual life, the need for solitude and retreat, and the fears that operate beneath the surface of conscious experience. Journal entries written late at night, during illness, or in states of unusual openness often carry Twelfth House material.*

Layer 2

*The Twelfth House in the weekly view shows in what was present beneath the week’s events but not fully named: the mood that had no clear cause, the sense of something unresolved that could not be located. When grades are low but journal entries seem fine, Twelfth House material is often operating.*

Layer 3

*The Twelfth House in the monthly analysis reveals the user’s relationship with their own depths — the self that exists beneath the one they present to the world and to themselves. This is the house most associated with what cannot be seen clearly, which is also what makes it the house of greatest potential for the kind of growth that cannot be engineered, only allowed.*

# **5. Major Aspect Types**

Aspects describe the angular relationships between planets in the birth chart — how different psychological drives interact. At MVP, aspects are only available when full chart calculation is used. They are injected into the profile block functionally, not as astrological terminology.

In LLM prompts, aspects are described as ‘the relationship between [planet domain] and [planet domain]’ — for example: ‘the relationship between this user’s drive for security and their need for independence’. The angle and aspect name are internal metadata only.

**Aspect — Conjunction (0° — planets in the same sign)**

| **Functional Quality** |
| --- |
| Fusion and intensification. Two drives operate as one, amplifying each other. Can be a gift (both forces available simultaneously) or a blind spot (cannot see one without the other). |

Layer 1

*When two of this user’s drives are in conjunction, they operate together — the user cannot easily access one without activating the other. Today’s data may reflect this fusion.*

Layer 2

*A conjunction in the weekly pattern often shows as a consistent theme where two apparently separate areas of the user’s life move in the same direction simultaneously — or block each other simultaneously. The amplification is real in both directions.*

Layer 3

*A conjunction in the monthly analysis is one of the most significant profile features because it describes a fusion that cannot be undone. The question is not whether to separate the two drives — they cannot be — but how to use their combination consciously. The most significant growth available to a conjunction is learning to see both drives clearly enough to choose when to express them together and when to hold one in reserve.*

**Aspect — Opposition (180° — planets in opposite signs)**

| **Functional Quality** |
| --- |
| Tension and awareness. Two drives that pull in opposite directions, creating a see-saw dynamic. The challenge is integration; the gift is the capacity to hold both perspectives. |

Layer 1

*An opposition in the user’s profile describes two drives that naturally pull against each other. Today’s data may reflect this as a pull in two directions at once, or as a decision that seems to require sacrificing one value for another.*

Layer 2

*An opposition in the weekly pattern often shows as the recurring tension that does not resolve — the same choice appearing in different forms, the same two needs competing. The task is not to eliminate the tension but to find the point of balance between the two poles.*

Layer 3

*An opposition in the monthly analysis is where the user’s most significant internal tension lives — the place where two genuine parts of themselves seem to be at war. The resolution is not choosing one over the other; it is discovering that both are true, and that the space between them is where the most authentic version of this person actually lives. An opposition fully integrated becomes extraordinary range.*

**Aspect — Trine (120° — planets in the same element)**

| **Functional Quality** |
| --- |
| Flow and ease. Two drives that support each other naturally, creating talent and fluency. The risk is taking the ease for granted or never developing what comes hard. |

Layer 1

*A trine in the user’s profile describes two drives that work together without friction. When the journal reflects an area of unusual ease or natural fluency, a trine is often the underlying structure.*

Layer 2

*A trine in the weekly pattern often shows as the domain where things moved smoothly compared to areas of effort — the category that requires less attention, the relationship that required less work. The question is whether that ease is being fully used or treated as background rather than as a genuine resource.*

Layer 3

*A trine in the monthly analysis identifies the user’s natural gifts — the places where they are genuinely talented without necessarily recognising it as talent because it has always come easily. Trines are the most underused features of any profile because the user rarely has to fight for what comes naturally and therefore rarely fully sees it. The monthly report can name a trine when the data shows it operating, and ask whether it is being directed toward what matters.*

**Aspect — Square (90° — planets in incompatible elements)**

| **Functional Quality** |
| --- |
| Friction and drive. Two forces that push against each other, creating tension that demands resolution. The most reliable source of motivation, accomplishment, and recurring difficulty. |

Layer 1

*A square in the user’s profile describes two drives that create friction: each is genuine, but they do not fit together easily. When the journal shows the user frustrated by a recurring pattern that will not resolve despite effort, a square is often operating.*

Layer 2

*A square in the weekly pattern often shows as the consistent source of friction across the week: the same type of difficulty appearing in different situations, the effort that produces results but costs more than it should. A square is productive pressure when directed well; it is exhausting when the user is trying to resolve it rather than use it.*

Layer 3

*A square in the monthly analysis is where the user’s most productive difficulty lives. A trine produces ease; a square produces results that matter precisely because they were hard. The user with significant squares often accomplishes more than others because they have no choice but to develop the muscles that others never need. The question the monthly report can ask — when the data supports it — is whether the user is using their friction as fuel, or being consumed by it.*

# **6. LLM Prompt Injection Format**

This section defines how western astrology data is merged into the unified personality profile block in astro_profiles.profile_json. The block combines both the 13-month calendar data (from the companion reference document) and the western astrology data documented here.

## **6.1 Compact profile block (daily/weekly — Layer 1)**

Stored permanently in astro_profiles.profile_json. Injected into every Tier 2 call.

| {   "personality_profile": {     "core_drive": {       "quality": "Scorpio",       "layer1": "[Layer 1 text for Scorpio Sun]",       "element": "Water",       "modality": "Fixed"     },     "emotional_pattern": {       "quality": "Cancer",       "layer1": "[Layer 1 text for Cancer Moon]"     },     "archetypal_signature": {       "kin": 85,       "layer1": "[Layer 1 text for Seal + Tone]",       "cycle_theme": "[Current wavespell theme]"     },     "user_journey_day": 47,     "active_layer": 1   } } |
| --- |

| Field naming rule: the key names in the profile JSON block use neutral language only. 'core_drive' not 'sun_sign'. 'emotional_pattern' not 'moon_sign'. 'archetypal_signature' not 'galactic_kin'. The LLM model reads the data through these neutral keys and never has occasion to reproduce the internal terminology in its output. If the model is ever asked what system produced the personalisation, it has no answer — because the system was never named in the prompt. |
| --- |

## **6.2 Extended profile block (monthly — Layer 3)**

Assembled at monthly report generation time from reference_content table. Not stored permanently. Adds: Layer 2 + Layer 3 content for Sun and Moon, rising sign and house emphasis if birth time available, dominant aspect dynamics (described functionally), and full 13-month Oracle cross (all five positions).

The extended block adds these fields to the compact block above:

- core_drive.layer2 and core_drive.layer3

- emotional_pattern.layer2 and emotional_pattern.layer3

- surface_energy (rising sign — Layer 1/2/3 as available). Null if no birth time.

- life_domains: array of active house domains with planet placements described functionally. Null if no birth time.

- key_tensions: 1-3 significant aspect dynamics described as relational qualities between drives. Not labelled by aspect name.

- archetypal_signature extended: analog (supporting quality), antipode (growth edge), guide (directional quality), occult (hidden resource)

# **7. Content Versioning**

Versioning follows the same structure as the 13-month calendar reference:

| **Version** | **Layer Used** | **When Active** | **Content Depth** |
| --- | --- | --- | --- |
| v1.0 | Layer 1 only | Days 1–14 | Sun + Moon Layer 1 only. Compact profile block. No rising, no houses. |
| v1.1 | Layer 1 + Layer 2 | Days 15–29 | Sun + Moon Layers 1 and 2. Directional quality added. Monthly still unavailable. |
| v1.2 | All three layers | Day 30+ | Full extended block. Rising sign, houses, aspects, full Oracle cross if birth time provided. |
| v2.0+ | Updated content | When new version published | Content refined based on output quality review. Same activation logic. |

*End of document — Vallna Western Astrology Reference v1.0.2  |  June 2026*

vallna_western_astro_reference_v1_0_2  |  Page