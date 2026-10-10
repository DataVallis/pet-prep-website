# Animal register content (M5-R11)

| File | What | Who edits |
|---|---|---|
| `registry.json` | **Generated** in the `pet-prep` repo (`scripts/export-breed-registry.mjs`, schema 2) — never edit by hand. Species (slugs, names, status, fact groups, filters, comparison rows, species-wide facts, free plan), breeds (availability `in_app` / `coming_soon` / `info_only`, names, slugs, synonyms, facets, generic fact items with `source_ids`, health keys, suitability tags, game rules), sources. | export script |
| `registry.ts` | Types + loader (checks `schema_version`; `PETPREP_REGISTRY_FILE` builds from another file, e.g. a large test fixture — never in production). | dev |
| `en.ts`, `sl.ts` | Every word the register shows: units, qualifiers, field / category / statement words, stage names per species, game-rule sentences, filters, optional hand-written breed intros (`sources` must be in the breed's sources). | copy |

Availability lives in the export (pet-prep), not here: the list of breeds in the register and their app status change together in that repo.

## Refresh the data

```bash
# in pet-prep
node scripts/export-breed-registry.mjs
node --test scripts/tests/export-breed-registry.test.mjs
# here
cp ../pet-prep/docs/research/breed-registry.json src/content/registry/registry.json
npm run lint && npm run build && npx tsc --noEmit
```

`next build` renders every value of the registry in both languages once (`validate()` in `src/lib/registry/views.ts`) and fails when words are missing — e.g. a new unit, category value, fact group, game rule or species. Add them to `en.ts` and `sl.ts`.

## Optional breed fields (read when the export provides them)

| Field | Type | Effect on the site |
|---|---|---|
| `updated` | `"YYYY-MM-DD"` | "Updated" date on the breed page, sitemap `lastmod`, JSON-LD `dateModified`; catalogue date = latest breed. Without it: `registryUpdated` in `src/lib/registry/views.ts`. |
| `portrait` | `{ file, width, height, kind: "ai_photo" \| "ai_illustration" } \| null` | Image at the top of the breed page (caption "AI-generated photo" / "Fotografija, ustvarjena z AI"; older `ai_illustration` exports: "AI-generated illustration"), `og:image` of the breed page and a lazy 48 px thumbnail in catalogue rows. The file must be at `public/animals/<species EN slug>/<file>` or the build fails. Without it: the page is unchanged and the share image is the generated name card (`/og/<species>/<breed>.<locale>.png`). |
| `same_as` | `string[]` | Authority URLs of the breed (Wikidata / Wikipedia) in JSON-LD `about.sameAs`. |

Never ship a placeholder portrait: test with `PETPREP_REGISTRY_FILE=<fixture.json>` and a local image that is not committed.

## Generated from the data (no extra fields needed)

- **At a glance** (`<dl>` under the intro): the species' `compare_fields`, each with every sourced value.
- **Questions and answers** (visible + `FAQPage` JSON-LD): exercise, lifespan, size, grooming and "who it suits", only for topics with facts; every answer lists each source's value with its source ids.

## Add a species or breed

Species and breeds are data: add them in the pet-prep export. Here you only add the words the build asks for (and, optionally, an intro). No layout change is needed.

Rules: facts only with a source; standards paraphrased (no long quotes); never “hypoallergenic”; health = information only, not vet-reviewed, no cancer percentages; game numbers only in “How PetPrep simulates it”.
