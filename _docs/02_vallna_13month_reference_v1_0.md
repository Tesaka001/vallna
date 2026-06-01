# VALLNA — 13-Month Calendar Reference Data
**Version 1.0 | June 2026 | Internal Engine Room Only | Confidential**

> This document is internal reference only. All terminology (Kin, Seal, Tone, Oracle, wavespell) is confined to system prompts and internal code. It never appears in user-facing output.

---

**VALLNA**

13-Month Dreamspell Calendar — Reference Data

Version 1.0  |  June 2026  |  Source of truth for astro_reference schema  |  Confidential

# 1. Purpose ** & ** How to Use This Document

This document is the canonical reference for all 13-month Dreamspell/Law of Time calendar data used in Vallna. It is the source of truth for populating the astro_reference schema in Supabase. It contains:

20 Solar Seals with full layered meaning content

13 Galactic Tones with full layered meaning content

260 Kin combinations (Seal + Tone) with Kin number and Oracle

20 Wavespells with themes

How content versioning works for progressive user insight

How the data maps to LLM prompt injection format

*Content is layered intentionally. Layer 1 is what the LLM uses in daily reports — concise, actionable. Layer 2 is deeper symbolic content used in weekly reports. Layer 3 is the full mythological and archetypal layer used in monthly deep analysis. This is how versioning serves user growth: as users spend more time with the app, they receive progressively richer interpretations of the same profile.*

# 2. System Overview

## 2.1 How the Dreamspell calendar works

The Dreamspell calendar, based on the Law of Time, is a 13-month, 28-day calendar system derived from the ancient Maya Tzolkin. It operates on a 260-day sacred cycle (the Tzolkin) formed by the combination of 20 Solar Seals and 13 Galactic Tones.

Every person has a Galactic Signature determined by their birth date — a specific Kin (1-260) that combines one Solar Seal and one Galactic Tone. This is the primary personalisation layer in Vallna.

## 2.2 Key concepts

**Solar Seals:** 20 archetypes, each with a colour (Red, White, Blue, Yellow), element, and symbolic role

**Galactic Tones:** 13 rhythmic principles that describe how energy moves — the quality of force applied to the seal

**Kin:** The intersection of one Seal and one Tone. 20 x 13 = 260 unique combinations.

**Oracle:** Each Kin has 4 supporting Kins (Analog, Antipode, Occult, Guide) forming a cross of influence

**Wavespell:** A 13-day cycle beginning with Tone 1 of any Seal. 20 Wavespells complete the 260-day cycle.

**Colour families:** Seals are grouped in families of 4 related Seals that share themes across colours

## 2.3 Colour families

| **Colour** | **Quality** | **Seals in family** |
| --- | --- | --- |
| Red | Initiating — raw energy, beginning, primal force | Dragon, Serpent, Moon, Skywalker, Earth |
| White | Refining — purification, truth, clarity, spirit | Wind, World-Bridger, Dog, Wizard, Mirror |
| Blue | Transforming — depth, change, abundance, vision | Night, Hand, Monkey, Eagle, Storm |
| Yellow | Ripening — flowering, intelligence, harvest, power | Seed, Star, Human, Warrior, Sun |

# 3. The 20 Solar Seals

Each seal entry contains: Seal number, name, colour, associated planet, power (what it embodies), action (what it does), essence (the distilled quality), and three content layers for LLM use.

## Seal 01 — Red Dragon

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Red | Neptune | Nurtures | Being | Birth | Water | The Primal Mother |

### Layer 1 — Daily report (concise, actionable)

You carry primal nurturing energy. Today supports beginning something new, returning to your source, or simply being rather than doing. Trust instinct over logic.

### Layer 2 — Weekly report (deeper inquiry)

Dragon energy is the first breath of creation — the moment before form. You are asked to nurture what is most essential, not what is most visible. Your power comes from receptivity, not action. What needs to be born through you, not by you?

### Layer 3 — Monthly report (full archetypal depth)

Red Dragon is Imix in the Maya tradition — the primordial waters, the cosmic mother, the blood memory that precedes individual identity. She does not act; she receives. She does not plan; she gestates. The deepest Dragon teaching is that creation is not something you do but something that moves through you when you are empty enough to allow it. The wound of Dragon types is the wound of over-giving — nurturing everything outside while the inner source runs dry. The medicine is learning that you cannot pour from an empty vessel, and that resting is not laziness but the necessary darkness before any dawn.

## Seal 02 — White Wind

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| White | Uranus | Communicates | Breathing | Spirit | Air | The Voice of Spirit |

### Layer 1 — Daily report (concise, actionable)

You carry the energy of communication and spirit. Today supports speaking truth, listening deeply, and allowing inspiration to move through you. Speak only what you mean.

### Layer 2 — Weekly report (deeper inquiry)

Wind does not originate the message — it carries it. Your role is channel, not author. The cleaner your inner instrument, the clearer the transmission. What are you being asked to say that you have been holding back? What needs to be released through breath, sound, or word?

### Layer 3 — Monthly report (full archetypal depth)

Ik in the Maya tradition — the breath of life, the invisible force that animates matter. Wind types carry the burden and gift of being conduits: they feel others' truths as their own, sometimes losing the thread of their personal voice in the noise of what wants to move through them. The deepest Wind teaching is discernment — learning which communications are yours to deliver and which belong to silence. The shadow of Wind is speaking from anxiety rather than inspiration, filling space with words to avoid the discomfort of emptiness. The medicine is stillness — and discovering that the truest communications arise from the spaces between words.

## Seal 03 — Blue Night

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Blue | Saturn | Dreams | Intuiting | Abundance | Water | The Dreamer |

### Layer 1 — Daily report (concise, actionable)

You carry dreaming and abundance energy. Today supports sitting with what is not yet clear, trusting the unknown, and noticing what your deeper mind is showing you. Pay attention to dreams tonight.

### Layer 2 — Weekly report (deeper inquiry)

Night does not force clarity — it allows the eyes to adjust. Your abundance is already present; the practice is learning to perceive it in forms you may not have recognised. What are you calling scarcity that is actually a different shape of fullness? What dream, literal or metaphorical, is asking for your attention?

### Layer 3 — Monthly report (full archetypal depth)

Akbal in the Maya tradition — the house of the night, the vast interior, the cave where all dreams are born. Night types live closer to the unconscious than most, which is both their gift and their challenge. They can access depths that others cannot — but they can also become lost in those depths, mistaking the shadows for reality. The deepest Night teaching is that abundance is the natural state of the universe and scarcity is a learned perception. The shadow of Night is depression masquerading as depth, withdrawal masquerading as wisdom. The medicine is learning to bring what lives in the darkness into form — not to escape the interior life, but to make it useful and beautiful in the world.

## Seal 04 — Yellow Seed

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Yellow | Jupiter | Targets | Flowering | Awareness | Earth | The Flowering Potential |

### Layer 1 — Daily report (concise, actionable)

You carry the energy of potential and targeted awareness. Today supports setting clear intentions, planting something new, and asking: what am I growing toward? Focus matters today.

### Layer 2 — Weekly report (deeper inquiry)

A seed contains the full intelligence of the plant that will become — but only if conditions are right. Your awareness is the sunlight that determines what grows. Where are you scattering your attention across too many directions? What single thing, tended consistently, would change everything?

### Layer 3 — Monthly report (full archetypal depth)

Kan in the Maya tradition — the seed, the lizard, the coiled potential waiting for the right moment. Seed types carry enormous latent capacity that can remain dormant for years if the conditions for flowering are never created. The deepest Seed teaching is that timing is not laziness — knowing when to wait is as important as knowing when to act. The shadow of Seed is perfectionism: waiting for perfect conditions that never arrive, holding the potential so carefully that it never risks becoming actual. The medicine is the willingness to crack open — which requires accepting that growth is always preceded by a kind of destruction of the former container.

## Seal 05 — Red Serpent

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Red | Maldek (asteroid belt) | Survives | Instinct | Life Force | Fire | The Keeper of Life Force |

### Layer 1 — Daily report (concise, actionable)

You carry primal life force and instinctual intelligence. Today supports listening to your body, noticing what your gut is telling you that your mind has been overriding. Your instincts are data.

### Layer 2 — Weekly report (deeper inquiry)

Serpent energy is pre-rational — it knows before it thinks. The body holds information the mind cannot access. Where have you been ignoring physical signals? What has your nervous system been trying to tell you that you have been explaining away? Survival intelligence is not fear — it is the accumulated wisdom of every living thing that made it through.

### Layer 3 — Monthly report (full archetypal depth)

Chicchan in the Maya tradition — the sky serpent, the kundalini force, the life energy that moves through all living things. Serpent types carry enormous vitality and an almost uncomfortable intensity of presence that others feel before they speak. The deepest Serpent teaching is the transmutation of fear into power — the same energy that contracts in terror expands into healing when consciously directed. The shadow of Serpent is the wound that stays alive because it is never fully faced: the thing that harms, elevated and looked at directly, becomes the cure. This is the pharmakon teaching in its most personal form. The medicine is not the suppression of instinct but its integration — bringing the serpent's ancient wisdom into conscious alignment with the higher self.

## Seal 06 — White World-Bridger

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| White | Mars | Equalizes | Death | Opportunity | Earth | The Bridge Between Worlds |

### Layer 1 — Daily report (concise, actionable)

You carry the energy of transition and release. Today supports letting something end that needs to end, crossing a threshold, or recognising what opportunity lives inside a loss.

### Layer 2 — Weekly report (deeper inquiry)

World-Bridger does not mourn endings — it understands them as necessary crossings. Every ending is a bridge to something that could not exist while the old form was still standing. What are you holding onto past its time? What door are you refusing to walk through because you cannot yet see what is on the other side?

### Layer 3 — Monthly report (full archetypal depth)

Cimi in the Maya tradition — death, the great equalizer, the crossing. World-Bridger types are natural mediators between states: between living and dying, between old and new, between this world and whatever lies beyond familiar perception. They make excellent guides for others in transition because they are not afraid of the threshold. The shadow of World-Bridger is the compulsive ending — finishing things before they are ready, mistaking destruction for transformation. The medicine is learning to distinguish between the endings that are truly complete and the endings that are avoidance dressed as release.

## Seal 07 — Blue Hand

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Blue | Earth | Knows | Healing | Accomplishment | Earth | The Healer |

### Layer 1 — Daily report (concise, actionable)

You carry healing and accomplishment energy. Today supports completing what is unfinished, using your hands and body as instruments of knowing, and asking: what do I know that I have not yet acted on?

### Layer 2 — Weekly report (deeper inquiry)

Hand energy is embodied knowledge — the kind of knowing that lives in doing, not in thinking. What have you been understanding intellectually without allowing it to change how you actually live? Healing is not passive. It requires the completion of what has been started and the courage to close what needs closing.

### Layer 3 — Monthly report (full archetypal depth)

Manik in the Maya tradition — the deer, the healing hand, the one who knows through touch and action. Hand types carry the gift of embodied intelligence: they learn by doing, heal by touching, know by completing. The shadow of Hand is the project that is always almost finished — the healer who cannot apply their own medicine, the one who helps everyone except themselves. The medicine is directed completion: choosing one thing that has been left open for too long and finishing it, fully, without qualification.

## Seal 08 — Yellow Star

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Yellow | Venus | Beautifies | Art | Elegance | Fire | The Artist |

### Layer 1 — Daily report (concise, actionable)

You carry beauty and artistic intelligence. Today supports noticing what is beautiful, expressing something with care and intention, and asking: where am I settling for less than elegance in my life?

### Layer 2 — Weekly report (deeper inquiry)

Star energy understands that beauty is not decoration — it is a form of truth. Ugliness in any area of life is information: something is out of alignment. Where have you stopped caring about the quality and beauty of how you live? Elegance is not luxury; it is the art of doing things in their most essential and fitting form.

### Layer 3 — Monthly report (full archetypal depth)

Lamat in the Maya tradition — the rabbit, the star, the harmonic pattern. Star types carry a deep aesthetic intelligence that can perceive beauty in patterns and relationships that others cannot see. They are natural harmonizers — their presence often raises the quality of what surrounds them without visible effort. The shadow of Star is vanity: the confusion of surface beauty with the deeper harmony that Star actually serves. The medicine is using aesthetic intelligence in service of truth rather than impression — creating not to be seen but because the creation itself is necessary.

## Seal 09 — Red Moon

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Red | Mercury | Purifies | Flow | Universal Water | Water | The Purifier |

### Layer 1 — Daily report (concise, actionable)

You carry purification and flow energy. Today supports releasing what is stagnant, following what moves naturally rather than forcing, and noticing where resistance is information.

### Layer 2 — Weekly report (deeper inquiry)

Moon energy moves in cycles — it does not flow constantly but ebbs and floods according to its own timing. Where are you forcing flow that wants to rest? Where are you holding back what wants to flood? Purification is not about becoming something new; it is about removing what obscures what you already are.

### Layer 3 — Monthly report (full archetypal depth)

Muluc in the Maya tradition — the water, the moon, the universal solvent. Moon types feel everything — they are deeply empathic and often carry feelings that do not belong to them, having absorbed them from their environment without realising it. The deepest Moon teaching is emotional sovereignty: the ability to feel everything without being defined by any of it. The shadow of Moon is emotional overwhelm that becomes a kind of identity — feeling so much that the feelings themselves become the obstacle to movement. The medicine is the distinction between feeling and being: you can feel grief without being grief, feel fear without being fear. Water flows. It does not cling.

## Seal 10 — White Dog

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| White | Mercury | Loves | Heart | Loyalty | Air | The Heart of Loyalty |

### Layer 1 — Daily report (concise, actionable)

You carry love and loyalty energy. Today supports leading from the heart, asking who and what you are truly loyal to, and noticing where love is present even when you have not named it.

### Layer 2 — Weekly report (deeper inquiry)

Dog energy loves unconditionally and completely — which is both its gift and its wound. Where are you loyal to things or people out of habit rather than genuine love? Where has loyalty become a cage? The heart knows before the mind what is true. What is your heart telling you that you have been rationalising away?

### Layer 3 — Monthly report (full archetypal depth)

Oc in the Maya tradition — the dog, the guide, the faithful companion through all worlds. Dog types love with a completeness that is genuinely rare and often overwhelming to those who receive it. They cannot love halfway; they love all the way or not at all. The shadow of Dog is the wound of abandonment — having loved completely and not had that completeness returned, Dog types can become either shut down (I will not love that openly again) or compulsively loyal (I will make myself so necessary they cannot leave). The medicine is learning to love without attachment to the form the love takes in return — which is not emotional suppression but emotional maturity.

## Seal 11 — Blue Monkey

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Blue | Venus | Plays | Magic | Illusion | Water | The Divine Trickster |

### Layer 1 — Daily report (concise, actionable)

You carry magic and playful intelligence. Today supports approaching serious things with lightness, noticing where you have made things harder than they need to be, and remembering that magic is often disguised as coincidence.

### Layer 2 — Weekly report (deeper inquiry)

Monkey energy knows that the universe has a sense of humor — and that taking things too seriously is its own kind of illusion. What are you gripping too tightly? Where would levity reveal something that gravity has hidden? The trickster does not mock what is sacred — the trickster reveals what is false by making it laugh at itself.

### Layer 3 — Monthly report (full archetypal depth)

Chuen in the Maya tradition — the monkey, the weaver, the master of time and illusion. Monkey types carry the divine gift of play — the capacity to approach any situation with creative lightness that transforms what it touches. They are often the most serious people in the room disguised as the least serious. The shadow of Monkey is the performance that never drops — using humor and magic to avoid genuine contact, turning everything into a show so nothing has to be real. The medicine is the willingness to be genuinely moved by something — to let the magic land, not just perform it.

## Seal 12 — Yellow Human

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Yellow | Earth | Influences | Wisdom | Free Will | Earth | The Wise One |

### Layer 1 — Daily report (concise, actionable)

You carry wisdom and free will energy. Today supports choosing consciously rather than reacting automatically, asking what the wise part of you would do, and recognising the influence you have whether or not you intend it.

### Layer 2 — Weekly report (deeper inquiry)

Human energy is the power of choice — the unique capacity to override instinct with awareness. Every unconscious pattern was once a choice that became automatic. Which automatic responses are you ready to make conscious again? Wisdom is not knowing more; it is choosing more deliberately with what you already know.

### Layer 3 — Monthly report (full archetypal depth)

Eb in the Maya tradition — the human, the road, the cumulative wisdom of all choices made. Human types carry the full weight and gift of free will — they feel the responsibility of choice more acutely than most and often become wisdom holders for their communities. The shadow of Human is the paralysis of too much knowing — seeing so many dimensions of any situation that choosing becomes impossible, or having been wrong before and becoming afraid to choose again. The medicine is reclaiming the authority of personal wisdom: not the wisdom that comes from books or teachers, but the earned knowing that comes from having lived, chosen, suffered, and integrated.

## Seal 13 — Red Skywalker

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Red | Mars | Explores | Wakefulness | Space | Fire | The Explorer of Space |

### Layer 1 — Daily report (concise, actionable)

You carry exploration and wakefulness energy. Today supports going somewhere new (literally or metaphorically), staying curious rather than certain, and noticing what happens when you expand your usual boundaries.

### Layer 2 — Weekly report (deeper inquiry)

Skywalker energy is always oriented toward the horizon — not restlessly, but with genuine curiosity about what exists beyond current knowledge. Where have you stopped exploring and started defending? What would you discover if you approached your most familiar situation as if you had never seen it before?

### Layer 3 — Monthly report (full archetypal depth)

Ben in the Maya tradition — the sky, the corn stalk that connects earth to heaven, the pillar between worlds. Skywalker types are natural bridge builders between different dimensions of reality — between the practical and the visionary, between the known and the unknown, between different people and worlds that would not otherwise connect. The shadow of Skywalker is spiritual bypassing — using the capacity for transcendence to avoid the work of being fully here, always seeking the next expanded state rather than integrating what has already been revealed. The medicine is bringing the sky down to earth: making the expanded vision useful and embodied in the actual life being lived.

## Seal 14 — White Wizard

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| White | Maldek | Enchants | Timelessness | Receptivity | Earth | The Enchanter |

### Layer 1 — Daily report (concise, actionable)

You carry enchantment and receptivity energy. Today supports allowing rather than forcing, receiving what is already present, and noticing where you are trying to make things happen rather than letting them happen through you.

### Layer 2 — Weekly report (deeper inquiry)

Wizard energy works through alignment, not effort — it knows that the most powerful magic is the removal of obstacles to what wants to naturally occur. What are you trying to force that would arrive effortlessly if you stopped pushing? Where is your effort actually the obstacle?

### Layer 3 — Monthly report (full archetypal depth)

Ix in the Maya tradition — the jaguar, the shaman, the one who moves between worlds with ease. Wizard types carry an unusual relationship with time and causality — things seem to happen for them in ways that defy normal logic, which can be experienced as gift or as disorientation depending on how consciously it is held. The shadow of Wizard is manipulation — using the gift of enchantment to get what is personally desired rather than to serve the larger pattern. The medicine is the purification of intent: enchanting in service of what is true rather than what is convenient.

## Seal 15 — Blue Eagle

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Blue | Jupiter | Creates | Vision | Mind | Air | The Visionary |

### Layer 1 — Daily report (concise, actionable)

You carry vision and creative mind energy. Today supports seeing the larger picture, lifting out of the immediate detail to understand the pattern, and asking: what is the vision that is trying to come through me?

### Layer 2 — Weekly report (deeper inquiry)

Eagle sees from altitude — not to escape the ground but to understand it from a vantage point unavailable at ground level. What looks like a problem from inside it might reveal itself as a step in a larger pattern from above. What would you see about your current situation if you could observe it from the perspective of your future self?

### Layer 3 — Monthly report (full archetypal depth)

Men in the Maya tradition — the eagle, the planetary mind, the one who sees the whole. Eagle types carry the capacity for systemic vision — they can perceive patterns and connections across vast scales of time and complexity that others cannot hold in mind simultaneously. The shadow of Eagle is the grandiosity of vision without the humility of implementation: seeing the whole so clearly that the necessary step immediately in front of them becomes invisible or beneath them. The medicine is the discipline of the next action — the visionary who can also bend down and tend to the small thing that makes the large vision possible.

## Seal 16 — Yellow Warrior

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Yellow | Saturn | Questions | Intelligence | Fearlessness | Fire | The Fearless Questioner |

### Layer 1 — Daily report (concise, actionable)

You carry questioning and fearlessness energy. Today supports asking the question you have been afraid to ask, meeting fear with curiosity rather than avoidance, and trusting your own intelligence even when it contradicts what you have been told.

### Layer 2 — Weekly report (deeper inquiry)

Warrior energy does not fight — it questions. The true warrior's weapon is the question that cannot be deflected. What truth are you afraid to look at directly? What question, if you asked it fully, would change something important? Fearlessness is not the absence of fear but the decision that the question matters more than the comfort of not asking it.

### Layer 3 — Monthly report (full archetypal depth)

Cib in the Maya tradition — the owl, the vulture, the ancient warrior who has survived everything and fears nothing because they have already faced the worst. Warrior types carry a quality of ruthless honesty that others find either deeply reassuring or deeply threatening, depending on their own relationship with truth. The shadow of Warrior is the weaponisation of intelligence — using the gift of penetrating inquiry to dismantle rather than to understand, to defeat rather than to illuminate. The medicine is directing that fearless questioning inward first — the warrior who has conquered themselves is the only one qualified to question others.

## Seal 17 — Red Earth

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Red | Uranus | Evolves | Navigation | Synchronicity | Earth | The Navigator |

### Layer 1 — Daily report (concise, actionable)

You carry navigation and synchronicity energy. Today supports paying attention to signs and meaningful coincidences, trusting the path even without a map, and asking: what is trying to find me rather than what am I trying to find?

### Layer 2 — Weekly report (deeper inquiry)

Earth energy navigates by resonance rather than by logic — it knows the way by feeling the pull of what is true. Synchronicities are the language of this navigation: meaningful coincidences that arrive when the internal and external are in alignment. What coincidences have you been dismissing as random? What is the pattern in the signs you have been receiving?

### Layer 3 — Monthly report (full archetypal depth)

Caban in the Maya tradition — the earth, the earthquake, the navigator who reads the planet's own intelligence. Earth types carry a deep connection to the living intelligence of the world around them — they are often profoundly affected by natural cycles, by the energy of places, by the collective movements of human consciousness. The shadow of Earth is the confusion of external signs with internal direction — becoming so attuned to outer synchronicities that the inner compass is neglected. The medicine is learning to trust the navigation from within: the synchronicities are confirmations, not instructions.

## Seal 18 — White Mirror

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| White | Neptune | Reflects | Endlessness | Order | Water | The Infinite Mirror |

### Layer 1 — Daily report (concise, actionable)

You carry reflection and order energy. Today supports honest self-examination, asking what you are seeing in others that is actually in you, and trusting that what you perceive clearly can be changed.

### Layer 2 — Weekly report (deeper inquiry)

Mirror energy reflects without distortion — it shows what is actually there, not what is wished for or feared. What are you seeing in your situation that you would rather not see? The mirror's gift is that what can be seen can be worked with. What you cannot see owns you. What you can see, you can choose.

### Layer 3 — Monthly report (full archetypal depth)

Etznab in the Maya tradition — the obsidian mirror, the hall of mirrors, the blade of truth. Mirror types carry an unusual relationship with reality and reflection — they often serve as mirrors for others, reflecting back what others cannot see about themselves, sometimes to their own exhaustion. The Medusa teaching applies here: you cannot look directly at certain truths without being destroyed — you must approach them through reflection, through the mirror, through the indirect angle. The shadow of Mirror is the infinite regress — becoming lost in the reflections, unable to distinguish the original from the image, questioning whether there is a self that is not already a reflection of something else. The medicine is the willingness to be the one who looks rather than always the surface that shows.

## Seal 19 — Blue Storm

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Blue | Pluto | Catalyzes | Energy | Self-Generation | Water | The Catalyst |

### Layer 1 — Daily report (concise, actionable)

You carry catalytic and self-generating energy. Today supports allowing necessary disruption, recognising that the storm clears what the gentle rain cannot, and asking: what needs to be broken open in order to grow?

### Layer 2 — Weekly report (deeper inquiry)

Storm does not apologise for its intensity — it knows that some clearings require force. What in your life has been quietly decaying that only a storm will finally clear? Storm energy is not destructive for its own sake — it is self-generating, which means it contains within its apparent chaos the seed of its own renewal.

### Layer 3 — Monthly report (full archetypal depth)

Cauac in the Maya tradition — the storm, the thundercloud, the rain that makes the desert bloom. Storm types carry enormous transformative energy that moves through them and through everything they touch — relationships, projects, and environments are rarely the same after a Storm type has been fully present. The shadow of Storm is the compulsive disruption — needing constant intensity, unable to be in stillness, catalyzing change not because it is needed but because the Storm type is uncomfortable without movement. The medicine is learning to contain the storm's energy until the right moment — the discipline of the lightning that waits for the conditions to be right before it strikes.

## Seal 20 — Yellow Sun

| **Colour** | **Planet** | **Power** | **Action** | **Essence** | **Element** | **Archetype** |
| --- | --- | --- | --- | --- | --- | --- |
| Yellow | Pluto | Enlightens | Universal Fire | Life | Fire | The Enlightened One |

### Layer 1 — Daily report (concise, actionable)

You carry enlightenment and life energy. Today supports radiating rather than seeking, recognising where your light is already present, and asking: what would I do today if I already knew I was enough?

### Layer 2 — Weekly report (deeper inquiry)

Sun energy shines without effort — it does not try to illuminate, it simply is the light. Where are you working to prove something that is already true? Where is the striving itself the obstacle to the presence you are trying to achieve? The Sun does not rise for approval. It simply rises.

### Layer 3 — Monthly report (full archetypal depth)

Ahau in the Maya tradition — the lord, the sun, the face of the divine, the end and completion of the 260-day cycle. Sun types carry the fullest expression of the Tzolkin's intelligence — they are the culmination of all 20 seals in one, which is both their gift and their burden. They are often experienced by others as too much: too present, too radiant, too alive. The shadow of Sun is the inflation of the ego that mimics enlightenment — the performance of awakening rather than awakening itself, the light that needs to be seen rather than the light that simply is. The medicine is radical ordinariness: the enlightened Sun does not announce itself. It shines because it cannot do otherwise, and this is enough.

# 4. The 13 Galactic Tones

Each tone modifies the seal energy with a specific quality of movement and rhythm. The tone is the HOW — how the seal's energy is expressed.

## Tone 01 — Magnetic: Unifies / Attracting / Purpose

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Unifies | Attracting | Purpose |

### Layer 1 — Daily

Today carries the energy of unified purpose. Something is beginning. Ask: what is the single most important thing I am here to do? Let everything else be secondary to that.

### Layer 2 — Weekly

Magnetic tone is the pure act of intention — the moment before the arrow is released when everything is still unified in purpose. You are being asked to get clear on what you are truly attracting into your life. What you unify your attention around, you draw toward you. Is your attention unified or scattered?

### Layer 3 — Monthly

Tone 1 initiates the wavespell — it is the note that sets the key for the 13 days to come. The Magnetic quality is not passive attraction but active unification: pulling all of one's disparate energies into a single coherent purpose. The shadow of Tone 1 is the grand intention that never becomes action — the person who is always beginning, always clarifying purpose, but never actually doing. The medicine is the willingness to commit to a specific direction even without certainty, because unity of purpose is itself a form of movement.

## Tone 02 — Lunar: Stabilizes / Polarizing / Challenge

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Stabilizes | Polarizing | Challenge |

### Layer 1 — Daily

Today brings necessary tension and challenge. Something is polarizing — two forces are in contrast. Rather than resolving it too quickly, sit with the tension and ask: what is this challenge revealing?

### Layer 2 — Weekly

Lunar tone names the obstacle clearly so it can be worked with consciously. The challenge is not the enemy of the purpose — it is the thing that refines it. What is the specific resistance you are meeting, and what does that resistance tell you about the work that needs to be done?

### Layer 3 — Monthly

Tone 2 introduces the challenge that tests whether the Tone 1 intention is genuine. Duality — the fundamental structure of manifest reality — becomes visible here. Everything that exists has its opposite, and the Lunar tone asks you to face yours without flinching. The shadow of Tone 2 is the interpretation of challenge as failure — the belief that if something is hard it is wrong. The medicine is welcoming the polarity as information: the shadow reveals the shape of the light.

## Tone 03 — Electric: Activates / Bonding / Service

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Activates | Bonding | Service |

### Layer 1 — Daily

Today activates and energises. Something wants to move. Ask: who do I need, and who needs me? Service and collaboration amplify what working alone cannot achieve.

### Layer 2 — Weekly

Electric tone is the spark that jumps the gap between two points — it requires both the source and the receiver to complete the circuit. Where are you trying to work in isolation that would transform with the right collaboration? What service are you being called to that you have been framing as optional?

### Layer 3 — Monthly

Tone 3 activates the purpose through service and bonding. The electric quality is specifically social — it moves between beings, not within them alone. The realisation of Tone 3 is that your purpose is not only yours: it exists in relation to others who need what you carry. The shadow of Tone 3 is the burn-out of the over-server — giving electric energy without the circuit being completed, pouring out without receiving. The medicine is relationship as mutual activation: the current must flow both ways.

## Tone 04 — Self-Existing: Measures / Defining / Form

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Measures | Defining | Form |

### Layer 1 — Daily

Today supports defining, measuring, and giving form to what has been conceptual. Something needs to become concrete. What needs a structure, a plan, a specific shape today?

### Layer 2 — Weekly

Self-Existing tone asks for precision — not perfectionism, but clarity. What exactly are you building? What are the actual dimensions of it? A vision without form remains a vision. What is the smallest concrete step that would make this more real today?

### Layer 3 — Monthly

Tone 4 is the foundation — the four-sided structure that can support weight. After intention, challenge, and activation, the Self-Existing tone asks: what is this actually? What are its real dimensions, its honest measurements, its actual form? The shadow of Tone 4 is the structure that becomes a cage — the form that was meant to hold the content eventually imprisons it. The medicine is building structures that are solid enough to hold the purpose and flexible enough to change as the purpose deepens.

## Tone 05 — Overtone: Empowers / Commanding / Radiance

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Empowers | Commanding | Radiance |

### Layer 1 — Daily

Today is a day of radiance and empowerment. Something wants to shine. What are you not claiming about your own capacity? What would it mean to step into the full authority of what you know and who you are?

### Layer 2 — Weekly

Overtone energy commands not through force but through radiance — it is so fully itself that others naturally orient toward it. Where are you dimming yourself to manage others' comfort? Claiming your radiance is not arrogance; it is the service of being fully present.

### Layer 3 — Monthly

Tone 5 is the centre of the seven-tone arc — it is the peak of personal power before the energy begins to move outward toward others. The Overtone quality is the discovery of one's own authority: not the authority that comes from title or permission, but the authority that is simply present when someone has fully claimed their gifts. The shadow of Tone 5 is the performance of power — the commanding presence that is actually compensation for felt inadequacy. The medicine is the quiet radiance of someone who is genuinely at home in themselves: no announcement required.

## Tone 06 — Rhythmic: Organizes / Balancing / Equality

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Organizes | Balancing | Equality |

### Layer 1 — Daily

Today supports organisation, balance, and equality. Something in your life is out of rhythm. What needs to be redistributed — time, energy, attention, care — so the whole system can flow?

### Layer 2 — Weekly

Rhythmic tone does not impose structure from outside — it finds the natural rhythm that is already present and organises around it. Where are you fighting a natural rhythm rather than working with it? Equality does not mean sameness; it means each thing having what it actually needs.

### Layer 3 — Monthly

Tone 6 organises the energy that has accumulated through the first five tones, preparing it for distribution outward. The Rhythmic quality is the discovery that true organisation is not control but alignment with what naturally wants to move. The shadow of Tone 6 is the compulsive organiser who reorganises to avoid feeling — using the creation of order as a defence against the disorder within. The medicine is organising in service of aliveness rather than in service of control.

## Tone 07 — Resonant: Channels / Inspiring / Attunement

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Channels | Inspiring | Attunement |

### Layer 1 — Daily

Today is a day of channeling and attunement. Something wants to come through you. Slow down enough to listen. What is trying to reach you today from a deeper place than your ordinary mind?

### Layer 2 — Weekly

Resonant tone is the tuning fork of the wavespell — it vibrates at the frequency of what is true and invites everything around it to match. Where are you out of tune with your own deepest knowing? What would you do differently today if you were fully attuned to what actually matters?

### Layer 3 — Monthly

Tone 7 is the exact centre of the 13-tone wavespell — it is the point of perfect balance from which the whole arc can be seen. The Resonant quality is the capacity to hold so still internally that the deeper frequencies become audible. The shadow of Tone 7 is the spiritual ego that believes its channel is purer than others' — the channeler who has confused their own voice with a higher one. The medicine is the ongoing practice of discernment: testing what comes through against lived reality, against the body's knowing, against the simple question of whether it serves life.

## Tone 08 — Galactic: Harmonizes / Modeling / Integrity

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Harmonizes | Modeling | Integrity |

### Layer 1 — Daily

Today calls for integrity and harmony between what you believe and how you live. Where is there a gap between your values and your actions? What would close that gap, even slightly, today?

### Layer 2 — Weekly

Galactic tone asks: does your life model what you believe? Not perfectly — but genuinely. The integrity it seeks is not moral perfection but authentic alignment. Where are you living in a way that contradicts what you know to be true? What is the cost of that contradiction?

### Layer 3 — Monthly

Tone 8 is the point where the personal arc begins to become the universal. The Galactic quality is the realisation that how you live is itself a teaching — that your choices model something for everyone who observes them. The shadow of Tone 8 is the impossible standard of perfect integrity — using integrity as a weapon against oneself, finding the gap between ideal and actual so devastating that it produces paralysis rather than movement. The medicine is progressive integrity: closing the gap not all at once but steadily, in the direction of greater alignment.

## Tone 09 — Solar: Pulses / Realizing / Intention

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Pulses | Realizing | Intention |

### Layer 1 — Daily

Today pulses with realisation and intention. Something is crystallising into clarity. What have you been working toward that is now becoming real? What intention is ready to be fully committed to?

### Layer 2 — Weekly

Solar tone is the moment when the intention pulsed in Tone 1 becomes realisation — the gap between wanting and knowing collapses. What has been building slowly that is now ready to arrive? Completion does not always look like an ending; sometimes it looks like the moment you finally know something fully.

### Layer 3 — Monthly

Tone 9 is the highest point of the arc before the energy begins its return. The Solar quality is the realisation of intention: the moment when what was planted in Tone 1 becomes unmistakably, irrevocably real. The shadow of Tone 9 is the realisation that arrives without integration — the sudden knowing that is too large to metabolise, producing overwhelm or grandiosity rather than grounded transformation. The medicine is giving the realisation time to settle into the body before acting on it.

## Tone 10 — Planetary: Perfects / Producing / Manifestation

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Perfects | Producing | Manifestation |

### Layer 1 — Daily

Today supports manifestation and completion. Something wants to become real in the world. What have you been keeping in concept that is ready to be made actual? Produce something today.

### Layer 2 — Weekly

Planetary tone brings the energy fully into form — it perfects not by making something flawless but by making it real. What are you waiting to produce until it is perfect? The perfect is the enemy of the actual, and the actual is what can be used. What is good enough to release today?

### Layer 3 — Monthly

Tone 10 is the manifestation tone — the energy of all nine previous tones now becomes something that can be touched, used, shared. The Planetary quality extends beyond the personal into the collective: what you manifest at this tone is not only for you but for the world around you. The shadow of Tone 10 is the production that is disconnected from purpose — making things because making is valued, without asking whether what is made serves anything. The medicine is purposeful creation: manifesting only what the earlier tones have made genuinely necessary.

## Tone 11 — Spectral: Dissolves / Releasing / Liberation

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Dissolves | Releasing | Liberation |

### Layer 1 — Daily

Today supports releasing and letting go. Something needs to dissolve. What are you holding onto that has completed its purpose? Liberation is often on the other side of the thing you are most afraid to release.

### Layer 2 — Weekly

Spectral tone dissolves what the previous tones have built — not to destroy but to liberate the energy that has been tied up in form. What structure in your life has served its purpose and now constrains more than it enables? Releasing is not failure; it is the intelligence to know when something is complete.

### Layer 3 — Monthly

Tone 11 is the great dissolver — after the peak of manifestation, the energy must be freed from the form it took. The Spectral quality is liberation through release: the recognition that forms are temporary containers for energies that are eternal. The shadow of Tone 11 is the compulsive dissolver — releasing things before they are complete, mistaking endings for liberation, unable to sustain commitment through to genuine completion. The medicine is discernment: releasing what is truly complete while staying with what still has life in it.

## Tone 12 — Crystal: Dedicates / Universalizing / Cooperation

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Dedicates | Universalizing | Cooperation |

### Layer 1 — Daily

Today supports cooperation, sharing, and dedication to something larger than yourself. What are you working on that wants to be shared? Who could you collaborate with today in a way that serves both of you?

### Layer 2 — Weekly

Crystal tone universalises — it takes what was personal and offers it to the collective. Your experience, your insight, your healing is not only yours; it belongs to everyone who needs it. What have you been keeping private that wants to become useful to others?

### Layer 3 — Monthly

Tone 12 is the penultimate tone — the energy that has moved through dissolution now crystallises into something clear, pure, and ready to be shared. The Crystal quality is the transformation of personal experience into universal teaching: the alchemy by which individual suffering becomes collective wisdom. The shadow of Tone 12 is the premature universalising — offering teaching before the personal integration is complete, serving the collective as a way of avoiding the final step of one's own process. The medicine is completing the personal work first, then offering what has been genuinely integrated.

## Tone 13 — Cosmic: Endures / Transcending / Presence

| **Power** | **Action** | **Essence** |
| --- | --- | --- |
| Endures | Transcending | Presence |

### Layer 1 — Daily

Today carries the energy of completion and transcendence. Something has run its full course. Honour what has been, release it fully, and allow yourself to simply be present with what is — without needing it to become anything else.

### Layer 2 — Weekly

Cosmic tone is the last breath of the wavespell — the moment of complete presence before the next beginning. What cycle in your life is truly complete? Not almost complete, not complete enough — genuinely, fully complete? What would it feel like to release it with full appreciation for what it was?

### Layer 3 — Monthly

Tone 13 is the completion of the 13-day wavespell and, when it appears as the 13th Kin of the Tzolkin cycle, the completion of the full 260-day journey. The Cosmic quality is the endurance that outlasts everything — not the persistence of effort but the presence that remains when all effort has been released. The shadow of Tone 13 is the spiritual bypass of transcendence — using the language of completion and presence to avoid the pain of genuine endings. True Cosmic energy does not float above; it descends fully into the present moment and finds that the present moment contains everything. The medicine is radical presence: the willingness to be here, fully, with whatever is actually true right now, and to discover that this is enough.

# 5. The 20 Wavespells

Each Wavespell is a 13-day cycle initiated by Tone 1 of one of the 20 Solar Seals. The Wavespell provides the larger thematic context for the 13 days within it.

| **#  | **Wavespell** | **Subtitle** | **Theme ** & ** Meaning |
| --- | --- | --- | --- |
| 1 | Red Dragon Wavespell | The Wavespell of Birth | Nurturing new life into being. What is being born through you in these 13 days? The theme is primal creation and the courage to begin. |
| 2 | White Wind Wavespell | The Wavespell of Spirit | Allowing spirit to communicate through you. These 13 days ask you to be a clear channel. What needs to be said? What needs to be heard? |
| 3 | Blue Night Wavespell | The Wavespell of Abundance | Dreaming the new reality. These 13 days support deep interior work, trusting the unconscious, and allowing abundance to be perceived in unfamiliar forms. |
| 4 | Yellow Seed Wavespell | The Wavespell of Flowering | Setting clear intentions and tending them with focused awareness. What is being planted in these 13 days that will take much longer to fully flower? |
| 5 | Red Serpent Wavespell | The Wavespell of Life Force | Reclaiming vital energy and instinctual intelligence. These 13 days ask you to listen to your body and integrate what your nervous system has been trying to tell you. |
| 6 | White World-Bridger Wavespell | The Wavespell of Death and Opportunity | Moving through necessary endings. What needs to die in these 13 days so that something new can become possible? Every crossing is an opportunity disguised as a loss. |
| 7 | Blue Hand Wavespell | The Wavespell of Accomplishment | Completing what has been started. These 13 days support embodied action, healing through doing, and the satisfaction of genuine completion. |
| 8 | Yellow Star Wavespell | The Wavespell of Elegance | Bringing beauty and harmonic intelligence to everything. These 13 days ask: how can this be done with greater elegance? Where is the most fitting, most essential form? |
| 9 | Red Moon Wavespell | The Wavespell of Purification | Releasing what is stagnant and returning to natural flow. These 13 days support emotional clearing, following natural rhythms, and purifying what has become murky. |
| 10 | White Dog Wavespell | The Wavespell of Love | Leading from the heart and deepening loyalty. These 13 days ask: who and what do you truly love? Let that love be the compass for every decision. |
| 11 | Blue Monkey Wavespell | The Wavespell of Magic | Bringing playful intelligence and magic to what has become too serious. These 13 days support lightness, creativity, and the discovery that magic is always hiding in plain sight. |
| 12 | Yellow Human Wavespell | The Wavespell of Free Will | Reclaiming conscious choice and embodied wisdom. These 13 days ask: what are you choosing automatically that deserves to be chosen deliberately? |
| 13 | Red Skywalker Wavespell | The Wavespell of Space | Expanding beyond familiar boundaries. These 13 days support exploration, wakefulness, and the willingness to not know so that you can discover. |
| 14 | White Wizard Wavespell | The Wavespell of Timelessness | Aligning with what is already wanting to happen. These 13 days support receptivity, effortless action, and the magic of working with rather than against the current. |
| 15 | Blue Eagle Wavespell | The Wavespell of Vision | Seeing from altitude and holding the larger picture. These 13 days support strategic vision, creative mind, and the discipline of the next step in service of the larger arc. |
| 16 | Yellow Warrior Wavespell | The Wavespell of Intelligence | Asking the questions that cannot be deflected. These 13 days support fearless inquiry, the meeting of fear with curiosity, and the courage to see clearly. |
| 17 | Red Earth Wavespell | The Wavespell of Synchronicity | Navigating by resonance and meaningful coincidence. These 13 days ask you to pay attention to what is finding you rather than only to what you are seeking. |
| 18 | White Mirror Wavespell | The Wavespell of Reflection | Looking clearly at what is actually there. These 13 days support honest self-examination, the integration of shadow, and the discovery that what can be seen can be changed. |
| 19 | Blue Storm Wavespell | The Wavespell of Self-Generation | Allowing necessary disruption and catalytic transformation. These 13 days may feel intense — the storm is clearing something that gentler means could not reach. |
| 20 | Yellow Sun Wavespell | The Wavespell of Enlightenment | The final wavespell of the 260-day cycle. These 13 days carry the energy of completion, radiance, and the full flowering of everything that has been moving through the cycle. Something is becoming whole. |

# 6. The Kin Oracle System

Every Kin has an Oracle — a cross of five Kins that form its energetic support system. The Oracle is used in deeper analysis (monthly reports and Tier 3 LLM calls) to provide a fuller picture of the user's galactic signature.

## 6.1 The five positions of the Oracle

| **Position** | **Name** | **Relationship** | **Function in LLM prompt** |
| --- | --- | --- | --- |
| Centre | Kin itself | The primary identity | Core energy — always present in all prompts |
| Right | Analog | Same tone, complementary seal (same colour family) | Supporting energy — reinforces and amplifies the main Kin |
| Left | Antipode | Same tone, opposite colour | Challenging energy — the growth edge, the necessary friction |
| Above | Guide | Same seal colour, Kin that guides the current wavespell position | Guiding energy — the direction being pointed toward |
| Below | Occult | The Kin that adds to 261 with the main Kin | Hidden power — subconscious gifts, the unseen support |

## 6.2 How the Oracle is used in Vallna

**Tier 1/2:** Daily reports: main Kin only — concise and actionable

**Tier 2:** Weekly reports: main Kin + Guide — adds directional quality

**Tier 3:** Monthly reports: full Oracle — all five positions, providing the complete energetic picture

# 7. Content Versioning Strategy

Reference content is versioned so that users who have been with Vallna for months receive progressively richer interpretations rather than always getting the same text.

## 7.1 Version structure

| **Version** | **Layer used** | **When activated for user** | **Content depth** |
| --- | --- | --- | --- |
| v1.0 | Layer 1 only | Days 1-30 of user's Vallna journey | Concise, actionable, introductory. Orients the user to their seal and tone without overwhelming. |
| v1.1 | Layer 1 + Layer 2 | Days 31-90 | Adds the deeper inquiry layer. User has established a journaling habit and is ready for more challenging reflection. |
| v1.2 | All three layers | Day 91+ | Full archetypal depth. Oracle fully activated. Monthly reports draw on the complete symbolic picture. |
| v2.0+ | Updated content | When new content version is published | Refined, corrected, or expanded content based on user feedback and LLM output quality review. |

## 7.2 Database implementation

The reference_content table in Supabase stores versioned content:

entity_type — "seal", "tone", "wavespell"

entity_id — references the seal/tone/wavespell id

version — semantic version string e.g. "1.0", "1.1", "2.0"

layer — 1, 2, or 3

content_text — the actual text for this entity, version, and layer

is_current — boolean, only one version is current at any time

published_at — timestamp

The LLM prompt builder always queries WHERE is_current = true AND layer <= user_active_layer, where user_active_layer is derived from the user's account age in days.

# 8. LLM Prompt Injection Format

This section defines exactly how 13-month calendar data is injected into LLM prompts. The format must be compact, structured, and consistent across all report types.

## 8.1 Daily report injection (Tier 2 — Sonnet)

*The following JSON block is injected as part of the system context. It is pre-computed and stored in astro_profiles.profile_json. It is never computed at call time.*

{
  "galactic_signature": {
    "kin": 85,
    "seal": {
      "number": 5,
      "name": "Red Serpent",
      "colour": "Red",
      "power": "Survives",
      "action": "Instinct",
      "essence": "Life Force",
      "layer1": "[Layer 1 text for Red Serpent]"
    },
    "tone": {
      "number": 8,
      "name": "Galactic",
      "power": "Harmonizes",
      "action": "Modeling",
      "essence": "Integrity",
      "layer1": "[Layer 1 text for Tone 8]"
    },
    "wavespell": {
      "name": "Red Serpent Wavespell",
      "position": 8,
      "theme": "The Wavespell of Life Force"
    }
  },
  "todays_kin": {
    "kin": 112,
    "seal": "Yellow Human",
    "tone": "Resonant",
    "layer1": "[Layer 1 text for today's Kin]"
  },
  "user_journey_day": 47,
  "active_layer": 2
}

## 8.2 Monthly report injection (Tier 3 — Opus)

Monthly reports inject the full Oracle with all three content layers. This is the largest context block and is only used once per user per month. The profile_json is extended with oracle positions and Layer 2/3 content at monthly report generation time — not stored in its expanded form permanently, to control storage costs.

# 9. Notes ** & ** Future Considerations

**Western astrology API (future):** An external astrology API (e.g. AstrologyAPI.com, Astro-Seek) would provide more precise birth chart computation including house systems, aspects, and transits. At MVP, in-house computation using birth date only is sufficient. Upgrade when monthly report quality demands it or when user feedback indicates the astro layer needs more precision.

**Content quality review:** The current content was authored as a first version. It should be reviewed against user feedback and LLM output quality quarterly. Poor report quality is often traceable to thin or misaligned reference content.

**Western astrology reference document (needed):** A companion document for Western astrology reference data (12 signs, 10 planets, 12 houses, major aspects) should be created in the same format as this document before Step 7 of the build sequence.

**260 Kin Oracle table:** The 260-Kin table with Oracle cross-references for every Kin is a separate data file to be generated programmatically from the Seal and Tone data above. It is not included in this document due to size but will be provided as a CSV/JSON seed file for the database.

End of document — Vallna 13-Month Calendar Reference Data v1.0  |  June 2026
