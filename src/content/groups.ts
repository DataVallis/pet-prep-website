import { site } from "@/lib/site";

/**
 * /groups — "PetPrep for Groups" pilot page (David 2026-11-15, product docs SCHOOLS_SEL_CONCEPT.md and
 * GROUPS_LANDING_SPEC.md). English only, its own route.
 *
 * HIDDEN PAGE: no link from the header, footer or any other page; `noindex, nofollow`; not in the sitemap,
 * the llms files or IndexNow. The address is sent by hand to pilot partners.
 *
 * Rules for this copy:
 * - It describes a PILOT, not a product in the stores. What is not built is labelled "planned".
 * - A learning aid, never a health product: no "therapy", "treatment", "symptoms", "diagnosis", "clinical",
 *   "intervention", "proven", and no condition names.
 * - No age range. No partner names, logos or frameworks until that partner agrees in writing.
 * - Original text only.
 */
export const groupsContact = `mailto:${site.email.david}?subject=${encodeURIComponent("PetPrep for Groups pilot")}`;

export const groupsCopy = {
  meta: {
    title: "PetPrep for Groups: a shared pet, a weekly routine, a reason to rely on each other",
    description:
      "A six-week pilot for practitioners who run small groups of children. The group shares one simulated pet, takes turns caring for it and looks back together each week. A learning aid, not therapy.",
  },
  badge: "Pilot programme · 2026/27",
  title: "One pet. A small group. A reason to rely on each other.",
  lead: "PetPrep for Groups turns caring for a simulated pet into a shared weekly routine: children take turns, hand over, and work out together what to do when someone forgets.",
  cta: "Talk to us about a pilot",
  small: "A learning aid for responsibility and teamwork. Not therapy, and not a medical product.",
  image: {
    src: "/animals/dogs/labrador-retriever.webp",
    alt: "A lifelike AI-generated portrait of a Labrador Retriever, as pets look in the PetPrep app.",
    caption: "AI-generated image. This is how a pet looks in the app.",
  },
  why: {
    eyebrow: "Why a shared pet",
    title: "Responsibility is easier to practise when someone is counting on you.",
    text: [
      "A pet needs the same things every day, at roughly the same times, whether you feel like it or not. That makes it a patient teacher of routine.",
      "Shared between a few children, it also becomes practice in the harder things: agreeing who does what, telling the next person what you did, asking for help, and putting it right after a slip.",
    ],
  },
  week: {
    eyebrow: "How it works",
    title: "A week in four steps",
    steps: [
      { title: "Agree", text: "The group decides who is on duty each day. Roles rotate." },
      { title: "Care", text: "The child on duty feeds, refills the water, cleans up and takes the walk, in a few short check-ins." },
      { title: "Hand over", text: "“I fed her this morning. You have tomorrow.”" },
      { title: "Look back", text: "Ten minutes with the group's adult: what went well, who helped whom, what we change next week." },
    ],
  },
  practise: {
    eyebrow: "What children practise",
    title: "Small, repeatable, real",
    items: [
      "Keeping a promise to someone else",
      "Fitting a routine into the day",
      "Negotiating and swapping roles",
      "Asking for help, and offering it",
      "Repairing a mistake instead of hiding it",
    ],
  },
  adult: {
    eyebrow: "For the adult",
    title: "You see what happened. You decide what it means.",
    items: [
      "A live view of what the pet needs",
      "A timeline of who did what, and when",
      "One tap to pause for weekends, holidays or a hard day",
      "Quiet hours for school time and nights",
      "A facilitator guide with six ten-minute sessions",
    ],
  },
  checkins: {
    eyebrow: "Built for short check-ins",
    title: "Not an app to sit in",
    text: "PetPrep asks for a minute here and there, then sends children outside: the walk counts real steps. Nothing happens during quiet hours. There are no ads, no chat and no feeds.",
  },
  privacy: {
    eyebrow: "Privacy",
    title: "We know as little as possible",
    items: [
      "A child is a nickname and a PIN. No email, surname, photo or date of birth.",
      "We never ask why a child is in a group, and we store no health information.",
      "Servers in the EU. An adult can export or delete everything.",
      "Children join only with a parent's written consent.",
    ],
  },
  honest: {
    eyebrow: "Honest about where we are",
    title: "What we know, and what we do not",
    text: "Guided programmes with real animals have encouraging research behind them. Simulated pets do not, yet. We think the structure around the pet matters more than the pet itself, which is why the programme comes with a weekly session and a guide. The pilot is how we find out whether that holds.",
    plannedLabel: "Planned, not built yet",
    planned: ["A gentle mode in which a slip becomes a shared repair task", "A school calendar", "A group-leader role"],
  },
  pilot: {
    eyebrow: "The pilot",
    title: "Six weeks, one small group, no cost",
    text: "We are looking for a few practitioners who already run small groups: learning-support teachers, school counsellors, coaches. You bring the group and your judgement. We bring the app, the guide and a consent template, and we listen to what needs to change.",
  },
  faq: {
    title: "Questions",
    items: [
      { q: "Is this a treatment?", a: "No. It is a learning activity. It does not assess, diagnose or treat anything." },
      { q: "Do children need their own phone?", a: "No. They can use a parent's phone at home or the facilitator's tablet in sessions." },
      { q: "What happens at weekends?", a: "The adult pauses the pet. Nothing is expected while it is paused." },
      { q: "What if a child forgets?", a: "The adult is alerted and can pause. The guide has a short script for turning it into a repair, not a blame." },
      { q: "What does it cost?", a: "Nothing during the pilot." },
      { q: "Which languages?", a: "English and Slovenian today." },
    ],
  },
  /**
   * Hidden until there is real content (David: easier to hide than to add). The entries below are
   * PLACEHOLDERS and must never be published as real.
   */
  showPartners: false,
  partners: { title: "Pilot partners", logos: [{ name: "Placeholder partner 1" }, { name: "Placeholder partner 2" }, { name: "Placeholder partner 3" }] },
  showVoices: false,
  voices: {
    title: "From the first groups",
    quotes: [
      { text: "Placeholder quote. Replace with a real facilitator's words.", who: "Placeholder name, role" },
      { text: "Placeholder quote. Replace with a real facilitator's words.", who: "Placeholder name, role" },
    ],
  },
};
