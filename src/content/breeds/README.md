# Breed register content (M5-R11)

| File | What | Who edits |
|---|---|---|
| `registry.json` | **Generated** in the `pet-prep` repo — never edit by hand. Facts (each with `source_ids`), suitability tags + the app's EN/SL wording, game numbers (David's decisions), sources. | export script |
| `registry.ts` | Types + loader (checks `schema_version`). | dev |
| `en.ts`, `sl.ts` | Breed names, intros (our own words, based only on sourced facts; `introSources` must be in the breed's sources — checked at build), UI strings, labels for registry values. | copy |
| `availability.ts` | In-app status per breed (`in_app` / `coming_soon`) and `registryUpdated` (sitemap / JSON-LD date). | David |

## Refresh the data

```bash
# in pet-prep (monorepo)
node scripts/export-breed-registry.mjs          # writes docs/research/breed-registry.json
node --test scripts/tests/export-breed-registry.test.mjs
# in this repo
cp ../pet-prep/docs/research/breed-registry.json src/content/breeds/registry.json
npm run lint && npm run build && npx tsc --noEmit
```

The build fails loudly when the data needs copy work: a new value without a label in `en.ts` / `sl.ts`
(e.g. a new grooming wording), a registry breed without a slug in `src/i18n/config.ts`, or an intro that cites
a source the breed page does not list.

## Add a breed

1. In pet-prep: research + David's decisions in `data.json`, tags in `breed_suitability.php`, then add the breed to `BREEDS` / `GAME` in `scripts/export-breed-registry.mjs` and re-export.
2. Here: copy `registry.json`, add the slug in `breedSlugs` (`src/i18n/config.ts`), name + intro in `en.ts` and `sl.ts`, status in `availability.ts`, bump `registryUpdated`.

Rules: facts only with a source; standards paraphrased (no long quotes); never “hypoallergenic”; health = information only, not vet-reviewed, no cancer percentages; game numbers only in “How PetPrep simulates it”.
