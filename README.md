# Eastern Mechanical Contractors: design preview

Design preview prepared by Premier Code Inc.

**Preview URL:** https://eastern.premiercodeinc.com

Three single-page homepage directions for Eastern Mechanical Contractors, Inc. (Mesquite, Texas). Switch
between them with the **Option A / Option B / Option C** control in the bottom-left corner of every page.
Nothing on these pages is functional; project cards and contact details are samples.

| Option | Path | Concept |
|---|---|---|
| Option A | `/option-a/` | "TD, local scale": corporate-clean commercial contractor. Navy split hero, credentials strip, prequalification sheet |
| Option B | `/option-b/` | "Blueprint / spec sheet": dark navy, safety orange, numbered scope modules, animated isometric pipe drawing |
| Option C | `/option-c/` | "Mesquite-made": warm editorial layout, serif headlines, large photography, hometown band |

`/` redirects to Option A.

## Confirm with the client (every `PLACEHOLDER`)

Each item below is wrapped in `<!-- PLACEHOLDER -->` comments in all three options.

1. **License line:** "Michael L. Mosby, Responsible Master Plumber, License M-8918". Taken from the Texas State Board
   of Plumbing Examiners public list (current to 10/31/2027). Confirm he is still the RMP of record.
2. **Phone:** (214) 415-9848, taken from the company's claimed Procore profile. Other numbers appear in directories.
3. **Email and domain:** info@easternmechanicalcontractors.com. The domain is **assumed** to be the client's, and
   the mailbox name is invented.
4. **Service area:** "Serving Mesquite and the Dallas–Fort Worth area".
5. **Remodeling:** shown as a secondary service. No public source confirms it.
6. **Project cards:** all three are labeled **Sample** (K-12 campus, public building, commercial building) with
   generic text. Real projects, photos and names need the client's list and permission.
7. **Headline and statement copy:** "Plumbing systems for buildings that have to work on day one" (and variants)
   is proposed copy, not a client quote. Get approval or replace it.
8. **Photography:** all images are licensed stock (Pexels / Unsplash), credited in each footer. None shows the
   client's people, vehicles or work. Replace them with the client's own job-site photos.

Also confirm: the founding story (state records show the corporation was chartered in 1998; some directories say
1989, which is not used), whether they do HVAC (no TDLR license was found, so HVAC is not mentioned), and the
current shop address (not shown).

## Remove at launch

- [ ] The option switcher: the block between `<!-- REMOVE AT LAUNCH: option switcher -->` and
      `<!-- /REMOVE AT LAUNCH -->` in each option's `index.html`.
- [ ] The two unused options, and the root redirect (point `/` at the chosen design).
- [ ] The "Design preview" bar at the top of each page.
- [ ] `<meta name="robots" content="noindex, nofollow">` on every page.
- [ ] The `robots.txt` block (`Disallow: /`).
- [ ] Sample labels: replace with real projects or remove the section.

Do not remove `noindex` until the client has signed a project.
