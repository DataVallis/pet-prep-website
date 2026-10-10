import type { Dictionary } from "./types";

const en: Dictionary = {
  meta: {
    siteTitle: "PetPrep — Ready for a pet. There for its whole life.",
    siteDescription:
      "PetPrep is a 12-week pet simulator that shows parents whether their child is truly ready for a real pet — then becomes an AI assistant for the real animal's whole life.",
    slogan: "Ready for a pet. There for its whole life.",
    keywords: [
      "is my child ready for a dog",
      "pet responsibility app for kids",
      "virtual pet simulator",
      "AI pet simulator",
      "before getting a dog",
      "kids and pets",
      "pet readiness test",
      "parent dashboard",
      "try a dog breed before buying",
      "is this breed right for me",
    ],
  },
  nav: { home: "Home", menu: "Menu", close: "Close menu", skip: "Skip to content" },
  lang: { label: "Language", switchTo: "Switch language" },
  cta: {
    primary: "Start free with a mixed breed",
    secondary: "See how it works",
    earlyAccess: "Get early access",
    earlyAccessSubject: "PetPrep early access",
    ios: "Get it for iPhone",
    android: "Get it for Android",
    comingSoon: "Coming to iPhone and Android",
    readMore: "Read more",
    contactUs: "Contact us",
  },
  common: {
    planned: "Planned",
    plannedNote:
      "This page describes what we are building next. It is not available in the app yet, and details may change.",
    legalDraft:
      "This text is being finalised with our legal advisors before the public launch. Contact us if anything is unclear.",
    lastUpdated: "Last updated",
    breadcrumbHome: "Home",
    screensNote: "App screens shown on this site are product previews; the final app may look slightly different.",
    perPet: "per pet",
    free: "Free",
    forever: "forever",
    notFoundTitle: "This page ran off the leash.",
    notFoundText: "The page you are looking for does not exist or has moved.",
    notFoundCta: "Back to the home page",
  },
  footer: {
    tagline: "Ready for a pet. There for its whole life.",
    groups: [
      { title: "Product", links: ["howItWorks", "parents", "animals", "afterAdoption", "pricing", "faq"] },
      { title: "Company", links: ["about", "partners", "investors", "contact"] },
      { title: "Trust", links: ["privacy", "terms", "childSafety"] },
    ],
    rights: "All rights reserved.",
    dataEu: "Data stored in the EU.",
    languages: "More languages coming soon.",
    company: "PetPrep is a product of",
    cookieSettings: "Cookie settings",
  },
  screens: {
    pin: "Child login with a 6-digit code from the parent — no email, no password.",
    contract: "The Responsibility Contract, signed with a finger. Signing brings the pet to life.",
    hud: "The child's home screen: the pet's live state, four care needs and the care buttons.",
    picker: "Parents choose the pet: breed, origin (adopted or from a breeder) and age on arrival.",
    parent: "The parent dashboard: a traffic light, Care Score and today's routines for every child.",
    report: "A child's report for 7, 30 or 84 days: routines, walks and missed tasks day by day.",
    assistant: "When it comes home: the AI assistant turns collar data into one clear suggestion.",
    certificate: "After 12 weeks: the Certificate of Responsibility with the child's Care Score.",
  },
  pricingPlans: {
    free: {
      name: "Mixed breed",
      text: "The full simulation with a lifelike mixed-breed pet.",
      features: [
        "12-week simulation with real consequences",
        "Real walks counted from the phone's step sensor",
        "Parent dashboard, traffic light and Care Score",
        "Quiet hours and a pause button",
        "Photorealistic image of your pet and short videos",
      ],
      cta: "Start free",
    },
    challenge: {
      name: "The 12-week PetPrep Challenge",
      badge: "12 weeks + certificate",
      unit: "per pet · 12 weeks",
      text: "For families who want the full experience and a certificate at the end.",
      features: [
        "Everything in Mixed breed",
        "Demanding breeds, such as the [Border Collie](breed:border_collie)",
        "Your pet's moods as AI videos",
        "Certificate of Responsibility",
        "One price when siblings share a pet",
        "Access for both parents",
      ],
      cta: "Choose the challenge",
    },
    note:
      "Purchases are made in the app through the App Store or Google Play. A second pet in the same family is a separate challenge. Prices include VAT where applicable.",
  },
  earlyAccess: {
    title: "Get early access",
    text: "Be among the first families to try PetPrep. We will email you when it is ready — nothing else.",
    label: "Your email address",
    placeholder: "you@example.com",
    button: "Get early access",
    sending: "Sending…",
    successTitle: "You are on the list.",
    successText: "Thank you! We will email you first when PetPrep is ready.",
    invalid: "Please enter a valid email address.",
    error: "Something went wrong. Please try again in a moment.",
    consent: "By subscribing you agree to receive emails about PetPrep. Unsubscribe anytime.",
    privacyLink: "Privacy policy",
  },
  contactCards: [
    { title: "Families", text: "Questions about the app, your account or the challenge.", email: "hello" },
    { title: "Privacy", text: "Data access, export, deletion or any privacy question.", email: "privacy" },
    { title: "Partners", text: "Pet stores, shelters, vets, trainers, insurers and schools.", email: "partners" },
    { title: "Investors", text: "Investor brief, deck and data room on request.", email: "investors" },
  ],
  home: {
    meta: {
      title: "PetPrep — Is your child ready for a pet? Find out in 12 weeks.",
      description:
        "Before a real pet comes home, your child cares for a lifelike AI pet for 12 weeks: meals, cleaning up, real walks. You see daily if they are truly ready.",
    },
    hero: {
      eyebrow: "The 12-week PetPrep Challenge",
      title: "Ready for a pet. There for its whole life.",
      lead:
        "Before a real pet comes home, your child cares for a lifelike AI pet for 12 weeks — feeding, cleaning up and going on real walks. You see every day whether they are truly ready.",
      trust: ["Mixed-breed pet free forever", "No ads, no chat with strangers", "No email needed for kids"],
    },
    phone: {
      petName: "Luna",
      petAge: "Puppy · 3 months",
      live: "LIVE",
      video: "Photorealistic AI pet video",
      actions: ["Feed", "Water", "Walk", "Clean"],
    },
    parentCard: { child: "Maya", status: "All good", scoreLabel: "Care Score", progress: "Week 3 of 12 · 31 of 36 routines on time" },
    notification: { app: "PetPrep", text: "Your pet is looking at its food bowl. Breakfast time ends at 9:00." },
    promise: {
      quote: "Every family hears “I promise I'll take care of it.” PetPrep turns the promise into",
      highlight: "proof",
      text:
        "Failing in the simulation is a success for your family: you find out before a real animal suffers — and before you commit to years of care and costs.",
    },
    how: {
      eyebrow: "How it works",
      title: "Three steps from “please” to “ready”.",
      steps: [
        {
          title: "You choose the pet",
          text: "Create a family account, add your child with just a nickname and choose the pet — breed, adopted or from a breeder, puppy or senior.",
        },
        {
          title: "Your child signs the promise",
          text: "A 6-digit code logs your child in — no email, no password. They sign the Responsibility Contract with a finger and their one-of-a-kind pet is born.",
        },
        {
          title: "12 weeks of real care",
          text: "One real week is one month of the pet's life. At the end: a Certificate of Responsibility with the Care Score — objective proof, or an honest no.",
        },
      ],
      link: "How it works in detail",
    },
    realism: {
      title: "As close to a real pet as an app can get.",
      text: "Feeding times, walks and growth are based on sources such as veterinary associations and kennel clubs — not made up for a game.",
      items: [
        { title: "Real walks, real steps", text: "The daily walk counts steps from your child's phone. No walk at all today? The pet feels it tomorrow." },
        { title: "It grows up", text: "A puppy eats four times a day, then three, then two — and gets a new photo as it grows." },
        { title: "It behaves like one", text: "Puppies need to go out. Bored dogs chew slippers. Messes come before dinner." },
        { title: "Respects school and sleep", text: "Quiet hours pause reminders. A meal that falls during school is yours, not your child's." },
        { title: "Real consequences, gently", text: "Neglect means a vet visit or the shelter — never scary, always with a fresh start." },
        { title: "One of a kind", text: "Every pet gets its own coat, markings and eyes — photorealistic and never the same twice." },
      ],
    },
    parents: {
      eyebrow: "For parents",
      title: "You see the truth, live.",
      text: "A clear traffic light for every child, a Care Score built from routines done on time and a timeline of who did what. Siblings sharing a pet each get their own fair score.",
      points: [
        { strong: "Quiet hours and a pause button", text: "you stay in control." },
        { strong: "Kids log in with a code", text: "no email, no surname, no ads." },
        { strong: "Both parents, all children", text: "one family, one view." },
      ],
      link: "Everything parents see",
    },
    adults: {
      eyebrow: "For adults",
      title: "Try the breed before you bring it home.",
      text: "Have your heart set on a particular breed? PetPrep is not only for kids. For 12 weeks you care for an AI pet of that breed with its real daily needs — and find out whether it is really for you, before you buy or adopt.",
      points: [
        {
          strong: "The breed's real needs",
          text: "meals in time windows, water, cleaning up and a daily step goal based on sourced exercise needs: an adult Border Collie needs 12,000 steps a day, a mixed breed 6,000.",
        },
        {
          strong: "Training and puppy accidents",
          text: "a short training session every day, and a puppy that can only hold it for about one hour per month of age before it has to go out — or there is a puddle on the floor.",
        },
        {
          strong: "12 weeks show whether it fits your life",
          text: "your working days, your free time and the weather. Because it will be a family dog, you can add your partner or children later.",
        },
      ],
      how: "How to start: create an account as a parent, add yourself as the carer profile and log in with the 6-digit code — on the same phone or another one.",
      note: "Available today: the mixed breed (free) and the [Border Collie](breed:border_collie) (in the 12-week challenge).",
      link: "How to use PetPrep on your own",
    },
    after: {
      eyebrow: "When it comes home",
      title: "When the real pet arrives, PetPrep stays.",
      text: "Tap “We got a real pet” and the simulator becomes an AI assistant for the years ahead — already knowing your family's rhythm.",
      features: [
        { title: "Smart collar", text: "Activity and alerts when something is off." },
        { title: "AI first contact", text: "Answers fast, then hands over to a real vet." },
        { title: "Growth and food", text: "Weekly weight, growth chart, when to switch food." },
        { title: "Trusted partners", text: "Vets, trainers and insurers near you — clearly labelled." },
      ],
      link: "About the AI assistant",
      planned: "In development",
    },
    species: {
      title: "Dogs today. More species to come.",
      text: "Built for families worldwide, in their own language.",
      chips: [
        { label: "Dog · available", active: true, link: "species:dog" },
        { label: "Border Collie · in the challenge", link: "breed:border_collie" },
        { label: "Cat · next", link: "species:cat" },
        { label: "More species · planned", link: "page:animals" },
      ],
    },
    pricing: { eyebrow: "Pricing", title: "Simple, fair pricing." },
    faq: { title: "Questions parents ask", link: "All questions" },
    final: { title: "Ready for a pet?", text: "Find out in 12 weeks. Start free, on iPhone or Android." },
  },
  pages: {
    howItWorks: {
      meta: {
        title: "How PetPrep works — a 12-week pet readiness challenge",
        description:
          "How the 12-week PetPrep challenge works: choosing a pet, the Responsibility Contract, daily care, real walks, quiet hours and the certificate.",
      },
      eyebrow: "How it works",
      title: "Twelve weeks that show what a promise is worth.",
      lead:
        "Your child cares for a photorealistic AI pet that behaves as much like a real one as an app can. One real week equals one month of the pet's life, so in 12 weeks the pet grows up — and you see whether the care holds.",
      blocks: [
        {
          type: "steps",
          heading: "From first tap to certificate",
          items: [
            { title: "The parent creates the family", text: "You register with your email (Apple and Google sign-in are coming). Add each child with a nickname and, optionally, a birth year. That is all we ask about your child." },
            { title: "You choose the pet", text: "Pick the breed (the mixed breed is free), where the pet comes from — adopted from a shelter or bought from a breeder — and its age on arrival: puppy, young, adult or senior." },
            { title: "Your child logs in with a code", text: "You get a 6-digit code valid for 15 minutes. Your child types it on their phone — no email and no password. A lost phone? Sign them out of every device with one tap." },
            { title: "The Responsibility Contract", text: "Your child signs a promise with a finger. Signing is the pet's birth: needs start counting from that moment, so nothing is lost if they sign later." },
            { title: "Twelve weeks of care", text: "Feeding in the right time windows, fresh water, cleaning up and a daily walk with real steps. As the pet grows, its needs change." },
            { title: "The certificate", text: "After 12 weeks the pet turns one. Your child receives a Certificate of Responsibility with their Care Score — or you both learn, safely, that now is not the time." },
          ],
        },
        {
          type: "screens",
          heading: "What your child sees",
          items: [
            { screen: "pin", caption: "" },
            { screen: "contract", caption: "" },
            { screen: "hud", caption: "" },
          ],
        },
        {
          type: "table",
          heading: "What an adult mixed-breed dog needs each day",
          intro: "Numbers come from veterinary and kennel-club sources; where sources give only a range, PetPrep sets the value and says so.",
          head: ["Need", "How often", "If it is forgotten"],
          rows: [
            ["Food", "Morning (6–10) and evening (17–21), once per window", "Hungry after about 12.5 hours"],
            ["Water", "3 times a day, at least 3 hours apart", "Thirsty after about 10 hours"],
            ["Walk", "6,000 real steps (puppies start at 2,000)", "No walk at all → ill the next morning"],
            ["Cleaning", "When the pet makes a mess — never during quiet hours", "No food or water until it is clean"],
          ],
          note: "Puppies eat 4, then 3, then 2 times a day and can only hold it for about one hour per month of age. A [Border Collie](breed:border_collie) needs 12,000 steps and gets hungry faster.",
        },
        {
          type: "cards",
          heading: "Built around real family life",
          columns: 3,
          items: [
            { title: "Quiet hours", text: "Set school and sleep times. The pet slows down, no reminders are sent and messes never happen then." },
            { title: "Meals during school", text: "A feeding window that falls entirely within quiet hours is the parent's job — it never counts against your child." },
            { title: "Pause anytime", text: "One button pauses the game, for example for a family talk. Nothing gets worse while paused." },
            { title: "Gentle reminders", text: "The pet first nudges your child, then urgently. Only if a need stays at zero for an hour do you get an alarm." },
            { title: "Real consequences", text: "Neglect means 12 hours at the vet. A full day of neglect means the shelter takes the pet — and you can start again." },
            { title: "Shared pets", text: "Siblings can share one pet. Every action is credited to the child who did it, so the score stays fair." },
          ],
        },
        {
          type: "callout",
          title: "Failing is a result too.",
          text: "If the pet ends up at the virtual shelter, you have learned something valuable — before a real animal paid the price. You can start again, also with an easier breed.",
          tone: "mint",
        },
      ],
    },
    parents: {
      meta: {
        title: "For parents — the PetPrep dashboard, Care Score and controls",
        description:
          "What parents see in PetPrep: a daily traffic light per child, the Care Score, routines, reports, notifications, quiet hours, pause and privacy by design.",
      },
      eyebrow: "For parents",
      title: "Objective proof, not another promise.",
      lead:
        "You will not have to guess whether the walks really happened. PetPrep measures care against clear daily routines and shows you, child by child, how it is going.",
      blocks: [
        {
          type: "cards",
          heading: "The traffic light",
          intro: "Every child and every pet gets a colour for today, in your family's local time — always with the reason in words.",
          columns: 3,
          items: [
            { title: "Green — all good", text: "Routines are on track.", tag: "ok" },
            { title: "Yellow — needs attention", text: "More than two routines were missed today.", tag: "warn" },
            { title: "Red — urgent", text: "The pet fell ill today, a need has been at zero for over an hour, or the pet went to the shelter.", tag: "danger" },
          ],
        },
        {
          type: "prose",
          heading: "The Care Score",
          paragraphs: [
            "Care Score = routines done on time ÷ routines expected × 100, minus 10 points for each illness, between 0 and 100.",
            "A routine is one concrete task: each feeding window, each of the three water refills, cleaning every mess within two hours (school and sleep do not count), and reaching the daily walk goal.",
            "Time when you paused the game, the pet was at the vet, or before the contract was signed never counts against your child. Past days are frozen, so a score cannot be rewritten later.",
            "Siblings sharing a pet split every routine fairly. Only a child's own actions count — if one does everything, they score 100 and the other 0.",
          ],
        },
        {
          type: "screens",
          heading: "Your view",
          items: [
            { screen: "parent", caption: "" },
            { screen: "report", caption: "" },
            { screen: "picker", caption: "" },
          ],
        },
        {
          type: "list",
          heading: "You stay in control",
          items: [
            "Quiet hours for school and sleep, in your local time — also across daylight saving changes.",
            "Pause the game for any pet with one confirmed tap; your child's screen locks live.",
            "Invite the other parent with a one-time code; both of you see every child and every pet.",
            "Sign a child out of all devices if a phone is lost; codes are single-use and expire in 15 minutes.",
            "Export all your family's data as a file, or delete a child's profile or your whole account instantly from the app.",
          ],
        },
        {
          type: "list",
          heading: "Privacy by design",
          items: [
            "Children log in with a code — no email, no password, no surname.",
            "We store a nickname and, if you add it, a birth year. Nothing else about your child.",
            "Notifications never contain your child's or pet's name, because they can appear on a lock screen.",
            "Steps come from the phone's motion sensor. PetPrep does not use GPS or track location.",
            "No ads, no chat with strangers, servers in the EU.",
          ],
        },
      ],
    },
    afterAdoption: {
      meta: {
        title: "When it comes home — the PetPrep AI assistant for your real pet",
        description:
          "When your family gets a real pet, PetPrep becomes an AI assistant: smart-collar activity, alerts, AI first contact with a real vet, growth and food.",
      },
      eyebrow: "When it comes home",
      title: "The simulation ends. The care does not.",
      lead:
        "When your family brings a real pet home, one tap turns PetPrep into an assistant for the animal's whole life — in real time, without health bars, and already familiar with your family's routine.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "What the assistant will do",
          columns: 2,
          items: [
            { title: "Smart collar integration", text: "Connect popular GPS and activity trackers — or a PetPrep collar — and see activity in context." },
            { title: "Alerts that explain", text: "“Max ran 2 km today, half his usual, and had a bigger meal. An extra evening walk will help him settle.” One observation, one reason, one suggestion." },
            { title: "AI first contact, real vet second", text: "Ask a question or upload a photo. The assistant answers general questions, estimates urgency and hands you over to a real vet when needed — urgent signs go straight to a vet." },
            { title: "Growth and nutrition", text: "Log weight weekly, see the growth chart and get a reminder when it is time to change food." },
          ],
        },
        {
          type: "screens",
          heading: "A preview",
          items: [{ screen: "assistant", caption: "" }],
        },
        {
          type: "list",
          heading: "Principles we will not compromise on",
          items: [
            "The AI assistant is not a veterinarian and never gives a diagnosis. Every health answer includes a way to reach a real vet.",
            "Partner offers (shops, insurers, trainers, vets) are always labelled, and we disclose when we earn a commission.",
            "Nothing is shared with a partner without your consent.",
            "Your child's data from the challenge moves to the assistant only if you agree.",
          ],
        },
      ],
    },
    pricing: {
      meta: {
        title: "Pricing — PetPrep is free to start, €49.99 for the 12-week challenge",
        description:
          "The mixed-breed pet is free forever. The 12-week PetPrep Challenge costs €49.99 per pet as a one-time purchase. One price for siblings sharing a pet.",
      },
      eyebrow: "Pricing",
      title: "Simple, fair pricing.",
      lead: "Start free with a mixed-breed pet. Buy the full 12-week challenge when you are ready — the 12 weeks start with the purchase.",
      blocks: [
        { type: "pricing" },
        {
          type: "faq",
          heading: "Pricing questions",
          items: [
            { q: "Is the free version really free?", a: "Yes. The mixed-breed pet is free forever, with the full simulation, real walks and the parent dashboard." },
            { q: "What does the challenge include?", a: "Demanding breeds such as the [Border Collie](breed:border_collie), your pet's moods as AI videos, the Certificate of Responsibility at the end and access for both parents." },
            { q: "Do siblings pay twice?", a: "No. Children who share one pet pay one price. A second pet in the family is a separate challenge." },
            { q: "How do I pay?", a: "In the app, through the App Store or Google Play. Refunds are handled by your store account." },
            { q: "Is it the same for adults?", a: "Yes. If you use PetPrep on your own to try a breed, the same applies: the mixed breed is free forever and the 12-week challenge costs €49.99 per pet." },
          ],
        },
      ],
    },
    faq: {
      meta: {
        title: "FAQ — questions parents ask about PetPrep",
        description:
          "Answers about PetPrep: daily time, using it as an adult, privacy and location, steps, siblings, what if a child fails, languages, species, real pets.",
      },
      eyebrow: "FAQ",
      title: "Questions parents ask.",
      lead: "Short, honest answers. Missing something? Write to us.",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "What age is PetPrep for?", a: "For children it is designed for ages about 7 to 12, and works well up to 16. Adults use it too, to test whether a particular breed is really for them before they buy or adopt." },
            { q: "Can I use PetPrep on my own, without kids?", a: "Yes. Create an account as a parent and add yourself as the carer profile — a nickname is enough, leave the birth year empty. Choose the breed, create a 6-digit code, then on the same phone or another one choose “I'm a kid” and type the code — that is how you become the carer. Because it will be a family dog, you can add your partner or children later so you care for it together. The price is the same as for families." },
            { q: "How much time does it take each day?", a: "A few minutes for food, water and cleaning — plus the walk a real dog would need anyway." },
            { q: "Does the app track my child's location?", a: "No. It only counts steps from the phone's motion sensor and asks for that permission when the child opens the walk. GPS is not used." },
            { q: "Does my child need an email address?", a: "No. You create the account; your child logs in with a 6-digit code you generate. We only store a nickname and, optionally, a birth year." },
            { q: "What happens if my child forgets?", a: "The pet first sends gentle reminders. If a need stays at zero, the pet gets ill and spends 12 hours at the vet. After a full day without care, the virtual shelter takes it — and you can start again." },
            { q: "Can siblings share a pet?", a: "Yes. Each child signs their own contract, every action is credited to whoever did it and each child gets their own fair Care Score." },
            { q: "What about school and bedtime?", a: "Set quiet hours. The pet slows down, nothing is sent and meals that fall entirely in quiet hours are handled by you." },
            { q: "Is it scary for children?", a: "No. Consequences are real but gentle: the pet goes to the vet or the shelter, never anything graphic, and there is always a fresh start." },
            { q: "Which animals are available?", a: "[Dogs](species:dog) today: a free mixed breed and the [Border Collie](breed:border_collie). [Cats](species:cat) are next, more species are planned. The [animal register](page:animals) lists every species and breed with sourced needs." },
            { q: "Which languages?", a: "English and Slovenian today. More languages are coming as PetPrep launches in new countries." },
            { q: "What happens after we get a real pet?", a: "PetPrep can become an AI assistant for your real pet. This part is in development." },
          ],
        },
      ],
    },
    partners: {
      meta: {
        title: "Partners — work with PetPrep",
        description:
          "PetPrep partners with pet stores, shelters, veterinarians, trainers, insurers, collar makers and schools to help families get pets responsibly.",
      },
      eyebrow: "Partners",
      title: "Better-prepared families for everyone who cares about animals.",
      lead:
        "Families who finish PetPrep know what a pet really takes. We are building a partner network that meets them at the right moment — clearly labelled and always with the family's consent.",
      planned: true,
      blocks: [
        {
          type: "cards",
          heading: "Who we work with",
          columns: 3,
          items: [
            { title: "Pet stores", text: "Reach families at the moment they prove they are ready — for example with a starter-kit offer at the certificate." },
            { title: "Shelters, rescues and breeders", text: "Recommend PetPrep before adoption or purchase for fewer impulsive decisions and returns." },
            { title: "Veterinarians", text: "Once the real pet comes home, the AI assistant answers first questions and refers owners to you, with a case summary shared only with consent." },
            { title: "Trainers and dog schools", text: "Recommendations and booking when a family moves to a real dog." },
            { title: "Pet insurers", text: "Breed-aware offers when a real pet is registered — clearly labelled." },
            { title: "Collar and IoT makers", text: "Integration of activity data for smarter, explained alerts." },
          ],
        },
        {
          type: "list",
          heading: "Why partners trust us",
          items: [
            "Children log in without email and we keep their data to a minimum, on EU servers.",
            "Only verified content reaches a child's screen; there are no ads.",
            "Every partner offer is labelled and every commission disclosed to the family.",
          ],
        },
        { type: "callout", title: "Let's talk.", text: "Partnership terms are being prepared. Tell us who you are and what you have in mind.", tone: "dark" },
        { type: "contact" },
      ],
    },
    investors: {
      meta: {
        title: "Invest in PetPrep — from pet readiness to lifelong pet care",
        description:
          "PetPrep turns a child's promise into proof before a family gets a pet, then becomes an AI assistant for its whole life. Pre-launch; brief on request.",
      },
      eyebrow: "Investors",
      title: "From a 12-week challenge to a 10–15-year relationship.",
      lead:
        "PetPrep gives parents objective proof of whether their child is ready for a real pet — and then stays with the family for the animal's whole life.",
      blocks: [
        {
          type: "cards",
          heading: "The opportunity",
          columns: 3,
          items: [
            { title: "Problem", text: "Children promise to care for a pet; parents have no neutral way to test it before committing money and years of care." },
            { title: "Solution", text: "A realistic 12-week simulation with a live parent dashboard and an objective Care Score, ending in a Certificate of Responsibility." },
            { title: "Expansion", text: "Once the real pet comes home, an AI assistant for it: collar data, AI first contact with vets, growth and nutrition, partner services." },
          ],
        },
        {
          type: "table",
          heading: "Business model",
          head: ["Stream", "Model", "Status"],
          rows: [
            ["Mixed-breed pet", "Free forever (acquisition)", "Decided"],
            ["12-week PetPrep Challenge", "€49.99 per pet, one-time purchase", "Decided"],
            ["Partner offers", "Commissions from stores, insurers, vets and trainers", "Planned"],
            ["AI assistant for the real pet", "Subscription", "Planned"],
          ],
        },
        {
          type: "list",
          heading: "Built so far",
          items: [
            "Server-side game engine with real-time sync, tested on whole-day simulations, daylight saving days and family edge cases.",
            "Families with several parents, several children and shared pets, with fair per-child scoring.",
            "Unique photorealistic AI pets with measured and capped AI costs, media stored on our own EU servers.",
            "Pet needs based on cited veterinary and kennel-club sources, with every number traceable to its source.",
            "Child safety by design: PIN login without email, minimal data, no ads, verified media only.",
          ],
        },
        {
          type: "prose",
          heading: "Stage",
          paragraphs: [
            "PetPrep is pre-launch, with a closed beta planned. The first market is Slovenia and the region, followed by DACH and the UK; the product is built for global localization from day one.",
            "Founder: David Tacer, software developer and entrepreneur (DATA VALLIS d.o.o., Maribor, Slovenia). More [about us](page:about).",
          ],
        },
        { type: "callout", title: "Request the investor brief.", text: "We share the brief, deck and data room on request.", tone: "dark" },
        { type: "contact" },
      ],
    },
    contact: {
      meta: {
        title: "Contact PetPrep — families, privacy, partners, investors",
        description: "Contact PetPrep: questions from families, privacy requests, partnerships and investor enquiries. We reply in English or Slovenian.",
      },
      eyebrow: "Contact",
      title: "We read every message.",
      lead: "Write to the right inbox and we will reply as soon as we can, in English or Slovenian.",
      blocks: [{ type: "contact" }, { type: "company", heading: "Company details" }],
    },
    privacy: {
      navLabel: "Privacy",
      meta: {
        title: "Privacy Policy — PetPrep",
        description: "How PetPrep collects, uses and protects personal data of parents and children, and how to exercise your rights under the GDPR.",
      },
      eyebrow: "Legal",
      title: "Privacy Policy",
      lead: "PetPrep is built mainly for children, so we collect as little as possible and explain exactly what we do with it.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. Who is responsible",
              paragraphs: [
                "The controller of personal data processed through the PetPrep app and this website is {company}, {address}; {companyIds}. Contact for privacy questions: {privacyEmail}.",
              ],
            },
            {
              heading: "2. What we collect",
              items: [
                "Parent account: name (how your family calls you), email address, password (stored only as a secure hash), your device's time zone, and the time you accepted the terms and this policy.",
                "Carer profile (a child or an adult who cares for the pet): a nickname of up to 30 characters and, optionally, a birth year — left empty for an adult. No email, password, surname or date of birth.",
                "Devices: the phone model (for example “iPhone”, never a name the user gave the phone), and for notifications a push token, platform and app version.",
                "Care activity: actions in the simulation (feeding, water, cleaning, walks), daily step totals from the phone's motion sensor, scores and reports.",
                "The Responsibility Contract: the child's finger signature, stored as a vector line with the time of signing.",
                "Codes: login and invite codes are stored only as hashes and expire.",
                "Early access list (this website): your email address, the language of the page and the time you signed up.",
              ],
            },
            {
              heading: "3. What we do not collect",
              items: [
                "No location: PetPrep does not use GPS.",
                "No advertising and no third-party advertising or tracking SDKs in the app.",
                "No chat between users.",
                "No advertising cookies on this website. Analytics cookies are set only if you allow them (see Cookies below).",
              ],
            },
            {
              heading: "4. Why we process data (purposes and legal bases)",
              items: [
                "To provide the service you asked for: accounts, the simulation, the dashboard, reports and notifications (performance of a contract).",
                "To process purchases through the App Store or Google Play (performance of a contract).",
                "To keep the service secure, for example limiting repeated login attempts (legitimate interest).",
                "To meet legal obligations, such as accounting for purchases (legal obligation).",
                "To email you about the PetPrep launch if you joined the early access list (consent — you can unsubscribe in every email).",
                "To understand how visitors use this website, with Google Analytics, only if you allow analytics cookies (consent — you can change it at any time under Cookie settings).",
              ],
            },
            {
              heading: "5. Children",
              paragraphs: [
                "Only a parent or legal guardian can create an account and add a child. The parent decides what the child can do and can delete the child's profile at any time. We never ask a child for contact details, never show ads and never allow contact with strangers.",
                "The account holder can also create a carer profile for themselves or for another adult in the family — for example to test whether a breed suits them before buying or adopting. The same rules and the same minimal data apply to such a profile; every protection designed for children applies to it too.",
              ],
            },
            {
              heading: "6. AI-generated images and videos",
              paragraphs: [
                "Each pet's photo and short videos are created by an AI service from a description of the pet only (breed, coat, markings and similar). The description never contains names or any information about your family. Finished media are stored on our own servers in the EU and shown through short-lived links.",
              ],
            },
            {
              heading: "7. Service providers",
              items: [
                "Hosting: Hetzner Online (servers in the EU).",
                "AI image and video generation: fal.ai (receives only the pet description).",
                "Push notifications: Apple Push Notification service and Firebase Cloud Messaging via Expo; notifications contain no names.",
                "Purchases: Apple App Store and Google Play; purchase management through RevenueCat when purchases go live.",
                "Early access emails: Klaviyo (receives only the email address and language you submit on this website).",
                "Website cookie consent: CookieYes (stores your consent choice).",
                "Website analytics: Google Analytics 4 by Google Ireland Ltd., only with your consent; IP addresses are not stored by Google Analytics 4.",
              ],
            },
            {
              heading: "8. How long we keep data",
              paragraphs: [
                "We keep your data while your account exists. When you delete a child's profile or your account in the app, the data is deleted immediately and cannot be restored. Records we must keep by law (for example for purchases) are kept for the period the law requires.",
              ],
            },
            {
              heading: "9. Your rights",
              paragraphs: [
                "You have the right to access, correct, export and delete your data, to object to and restrict processing, and to complain to a supervisory authority — in Slovenia the Information Commissioner (Informacijski pooblaščenec). In the app you can export all your family's data as a file (Control → Account → Export my data) and delete a child's profile or your whole account. For anything else, write to {privacyEmail}.",
              ],
            },
            {
              heading: "10. Security",
              paragraphs: [
                "Passwords and codes are stored as hashes, connections are encrypted, live updates are only delivered to members of your family, and AI media are verified before they reach a child's screen.",
              ],
            },
            {
              heading: "11. Changes",
              paragraphs: ["We will tell you about important changes in the app before they take effect. The date at the top shows the latest version."],
            },
          ],
        },
        {
          type: "cookies",
          heading: "12. Cookies",
          paragraphs: [
            "Necessary cookies keep the website working and remember your consent choice. Analytics cookies (Google Analytics) are set only if you allow them in the banner, and you can change your choice at any time.",
            "The table below is generated automatically from the latest scan of this website, so it always lists the cookies we actually use.",
          ],
          settings: "Change cookie settings",
          fallback: "The cookie list loads with the consent banner. If you do not see it, allow scripts on this page or write to {privacyEmail}.",
        },
      ],
    },
    terms: {
      navLabel: "Terms of use",
      meta: {
        title: "Terms of Use — PetPrep",
        description: "The terms for using the PetPrep app and website: accounts, free and paid features, fair use, AI-generated content, liability and governing law.",
      },
      eyebrow: "Legal",
      title: "Terms of Use",
      lead: "The rules for using PetPrep, written to be read.",
      blocks: [
        {
          type: "legal",
          sections: [
            {
              heading: "1. The service",
              paragraphs: [
                "PetPrep is provided by {company}, {address}; {companyIds}. PetPrep is a simulation that helps families and individuals find out whether they are ready to care for a real pet — children, and adults who want to test whether a breed suits them before buying or adopting. It is an educational tool, not veterinary advice, and it does not guarantee how anyone will care for a real animal.",
              ],
            },
            {
              heading: "2. Accounts",
              items: [
                "Accounts are created by adults (parents, legal guardians or adults using PetPrep for themselves). You are responsible for the profiles you add and for keeping your password safe.",
                "Children or adults care for the pet through a carer profile created by the account holder and log in with a code from that account. The account holder can also create a carer profile for themselves.",
                "Provide accurate information and keep login codes private.",
              ],
            },
            {
              heading: "3. Free and paid features",
              items: [
                "The mixed-breed pet is free.",
                "The 12-week PetPrep Challenge costs €49.99 per pet as a one-time purchase; the 12 weeks start with the purchase. The free mixed-breed pet is the way to try PetPrep first. Siblings sharing one pet pay one price.",
                "Purchases and refunds are handled by the App Store or Google Play under their terms.",
              ],
            },
            {
              heading: "4. Fair use",
              items: [
                "Do not try to cheat the step count, access other families' data, reverse engineer or disrupt the service.",
                "We may limit or suspend accounts that break these rules or put children at risk.",
              ],
            },
            {
              heading: "5. AI-generated content",
              paragraphs: [
                "Pet images and videos are generated by AI. They are illustrations of a simulated pet and may not perfectly match any real animal or breed standard. Future AI assistant features provide general information only, never a diagnosis, and always point to a real veterinarian.",
              ],
            },
            {
              heading: "6. Intellectual property",
              paragraphs: ["PetPrep, its logo, design, software and content belong to {company}. You may use the app for your family's personal, non-commercial use."],
            },
            {
              heading: "7. Liability",
              paragraphs: [
                "We work to keep PetPrep available and accurate, but the service is provided as it is. To the extent permitted by law, we are not liable for indirect damage or for decisions about getting a real pet. Nothing in these terms limits rights you have as a consumer under mandatory law.",
              ],
            },
            {
              heading: "8. Ending use",
              paragraphs: ["You can delete your account at any time in the app. Deletion is immediate and permanent."],
            },
            {
              heading: "9. Law and disputes",
              paragraphs: [
                "These terms are governed by the law of the Republic of Slovenia. Consumers may also rely on the mandatory protections of the country where they live and use the EU online dispute resolution platform.",
              ],
            },
            { heading: "10. Contact", paragraphs: ["Questions about these terms: {helloEmail}."] },
          ],
        },
      ],
    },
    childSafety: {
      navLabel: "Child safety",
      meta: {
        title: "Child safety — how PetPrep protects children",
        description:
          "How PetPrep protects children: parent-created accounts, code login without email, minimal data, no ads or chat, no location tracking, verified media.",
      },
      eyebrow: "Trust",
      title: "Built for children from the first line of code.",
      lead: "A child is the main user of PetPrep, so safety and privacy are product rules, not settings.",
      blocks: [
        {
          type: "cards",
          heading: "Our standards",
          columns: 2,
          items: [
            { title: "Parents create every account", text: "Children cannot sign up on their own. A parent adds the child and generates a single-use login code valid for 15 minutes." },
            { title: "No email or password for kids", text: "A child logs in with the parent's code. Wrong, expired and used codes all get the same answer, so nobody can guess which children exist." },
            { title: "Minimal data", text: "A nickname and, optionally, a birth year. No surname, no date of birth, no photos of the child." },
            { title: "No ads, no chat, no strangers", text: "There is no advertising and no way to contact other users." },
            { title: "No location tracking", text: "Walks are counted from the phone's step sensor only. GPS is not used." },
            { title: "Private live updates", text: "Real-time updates reach only the children who care for that pet and the parents of the same family." },
            { title: "Verified media", text: "Only images and videos produced for PetPrep and checked by our server are shown, from our own EU storage." },
            { title: "Name-free notifications", text: "Notifications never include the child's or pet's name, because they can appear on a lock screen." },
          ],
        },
        {
          type: "list",
          heading: "Parents stay in control",
          items: [
            "Quiet hours for school and sleep, with no notifications.",
            "A pause button that locks the child's screen live.",
            "Sign a child out of every device at once.",
            "Export or delete all data instantly from the app.",
          ],
        },
        { type: "callout", title: "Report a concern", text: "If something in PetPrep worries you, write to us and we will respond with priority.", tone: "dark" },
        { type: "contact" },
      ],
    },
    animals: {
      meta: {
        title: "PetPrep animal register — species and breeds, with sources",
        description:
          "Dogs, cats and their breeds: what each needs, who it suits and how PetPrep simulates it. Search and compare breeds; every fact links to its source.",
      },
      navLabel: "Animals",
      eyebrow: "Animal register",
      title: "Know the animal before it comes home.",
      lead:
        "What each species and breed in PetPrep really needs — from kennel clubs, cat registries, veterinary charities and studies, with every source linked. Plus the rules PetPrep uses to simulate it.",
      blocks: [{ type: "animalsHub" }],
    },
    about: {
      meta: {
        title: "About PetPrep — company, founder and how we source pet facts",
        description:
          "Who makes PetPrep: DATA VALLIS d.o.o. from Maribor, Slovenia, founder David Tacer, our mission, and how the animal register sources and checks its facts.",
      },
      navLabel: "About us",
      eyebrow: "About us",
      title: "Who makes PetPrep.",
      lead: "PetPrep is made in Maribor, Slovenia, by a small software company. This page says who we are, why we build PetPrep and how we decide what the app and the animal register say about animals.",
      blocks: [
        {
          type: "prose",
          id: "company",
          heading: "The company",
          paragraphs: [
            "PetPrep is a product of DATA VALLIS d.o.o., a software company with its registered office in Maribor, Slovenia. The same company operates this website and the PetPrep app and is the controller of personal data (see the [privacy policy](page:privacy)).",
          ],
        },
        { type: "company" },
        {
          type: "prose",
          id: "founder",
          heading: "The founder",
          paragraphs: [
            "PetPrep was founded by David Tacer, a software developer and entrepreneur from Maribor, Slovenia.",
          ],
        },
        {
          type: "prose",
          id: "mission",
          heading: "Our mission",
          paragraphs: [
            "Every family hears “I promise I'll take care of it.” PetPrep turns that promise into proof: for 12 weeks a child — or an adult who wants a particular breed — cares for a lifelike AI pet with a real animal's daily needs, and the parent sees every day how the care holds.",
            "Failing in the simulation is a good result too: the family finds out before a real animal suffers, and before committing to years of care and costs. When a real pet does come home, we want PetPrep to stay useful for the animal's whole life.",
          ],
        },
        {
          type: "list",
          id: "methodology",
          heading: "How the animal register is built",
          intro: "The [animal register](page:animals) and the app use the same data. These rules decide what it may say:",
          items: [
            "Every fact names its source and links to it. Sources are graded by how much weight they deserve: A — breed standards, peer-reviewed papers and veterinary association guidelines; B — advice pages of veterinary hospitals, universities and national animal-welfare charities; C — secondary summaries (encyclopedias, press articles), used only together with an A or B source.",
            "Only sourced facts are shown as facts. A value that no source supports is not published. Where sources disagree, each one is shown with its own value.",
            "Game rules are not veterinary advice. Where the game needs a number that sources do not give exactly (for example a daily step goal), PetPrep decides it from the sources and shows it only under “How PetPrep simulates it”, labelled as a game rule.",
            "Health notes are for information only. They summarise what the sources say about a breed and have not been reviewed by a veterinarian. For a real animal, ask a vet.",
            "Breed standards are summarised in our own words, never copied at length, and a breed is never called “hypoallergenic”.",
            "The register is generated from PetPrep's research data, the same data the app uses. When a source or a value changes, the register is exported again and each breed page shows the date of its last update. If you spot a mistake, write to hello@petprep.si.",
          ],
        },
        { type: "callout", title: "Questions about PetPrep?", text: "Write to the right inbox on the contact page — families, privacy, partners or investors.", tone: "mint" },
        { type: "contact" },
      ],
    },
  },
};

export default en;
