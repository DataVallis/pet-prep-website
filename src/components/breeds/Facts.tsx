import type { FactLine, SourceRef, TagView } from "@/lib/breeds";

/** Publisher name(s) + links to the numbered entries in the page's source list. */
export function Cite({
  sources,
  sourceLabel,
  dark = false,
}: {
  sources: SourceRef[];
  sourceLabel: (id: string, publisher: string) => string;
  dark?: boolean;
}) {
  const publishers = [...new Set(sources.map((s) => s.publisher))].join(", ");
  return (
    <span className={`text-[13px] ${dark ? "text-muted-dark" : "text-muted"}`}>
      {" — "}
      {publishers}{" "}
      {sources.map((s) => (
        <a
          key={s.id}
          href={`#source-${s.id}`}
          aria-label={sourceLabel(s.id, s.publisher)}
          className="ml-0.5 inline-block rounded-md bg-fog px-1.5 py-0.5 align-[1px] font-mono text-[11px] font-semibold text-mint-text ring-1 ring-line hover:bg-mint-tint"
        >
          {s.id}
        </a>
      ))}
    </span>
  );
}

export function FactList({ lines, empty, sourceLabel }: { lines: FactLine[]; empty: string; sourceLabel: (id: string, publisher: string) => string }) {
  if (lines.length === 0) return <p className="text-[15px] leading-relaxed text-muted">{empty}</p>;
  return (
    <ul className="flex flex-col gap-2.5">
      {lines.map((l) => (
        <li key={l.text} className="text-[15px] leading-relaxed">
          <span className="font-medium text-graphite">{l.text}</span>
          <Cite sources={l.sources} sourceLabel={sourceLabel} />
        </li>
      ))}
    </ul>
  );
}

/** "Good for:" / "Keep in mind:" chips — same keys and wording as the app. */
export function TagChips({
  tags,
  tone,
  sourceLabel,
  withSources = true,
}: {
  tags: TagView[];
  tone: "suits" | "consider";
  sourceLabel?: (id: string, publisher: string) => string;
  withSources?: boolean;
}) {
  const cls = tone === "suits" ? "bg-mint-tint text-graphite ring-mint/60" : "bg-warn-tint text-graphite ring-warn-fill/60";
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t.tag} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ring-1 ${cls}`}>
          <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${tone === "suits" ? "bg-ok" : "bg-warn-fill"}`} />
          {t.label}
          {withSources && sourceLabel
            ? t.sources.map((s) => (
                <a key={s.id} href={`#source-${s.id}`} aria-label={sourceLabel(s.id, s.publisher)} className="font-mono text-[11px] font-semibold text-mint-text hover:underline">
                  {s.id}
                </a>
              ))
            : null}
        </li>
      ))}
    </ul>
  );
}
