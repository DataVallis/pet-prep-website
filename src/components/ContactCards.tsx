import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";

export function ContactCards({ dict }: { dict: Dictionary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {dict.contactCards.map((c) => {
        const email = site.email[c.email];
        return (
          <a
            key={c.email}
            href={`mailto:${email}`}
            className="group flex flex-col gap-2 rounded-[22px] border border-line bg-white p-6 transition-colors hover:border-graphite"
          >
            <h3 className="h-card text-xl">{c.title}</h3>
            <p className="text-[15px] leading-relaxed text-muted">{c.text}</p>
            <span className="mt-1 font-semibold text-mint-text group-hover:underline">{email}</span>
          </a>
        );
      })}
    </div>
  );
}
