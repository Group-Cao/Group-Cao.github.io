# Maintaining the Cao Group website

This website uses [Academic Pages](https://academicpages.github.io/markdown/) with Jekyll. Group-specific pages contain no invented biographies, publications, affiliations, or recruitment claims.

## Add group information

- `_config.yml`: group name, site description, sidebar, affiliation, public email, and academic profile links. Set `url` to the account hostname and `baseurl` to the repository path for a project site.
  This organization site uses `url: https://group-cao.github.io`, `baseurl: ''`, and `repository: Group-Cao/Group-Cao.github.io`.
- `_data/lab.yml`: introduction, four research themes, PI profile, postdocs, doctoral students, master's students, and contact details. Update the existing records with confirmed information.
- `_data/navigation.yml`: menu labels and order.
- `_pages/about.md`: homepage structure.
- `images/`: group photos, member portraits, and research images. Use `/images/filename.jpg` paths in the data file.
- `images/branding/`: the selected enhanced A group logo. The original PNG is retained; a resized WebP is used for the sidebar and a PNG thumbnail for the favicon. Keep the complete composition when preparing display sizes.
- `files/`: approved public downloads only. Original PDFs, CVs, application documents, and presentations remain outside the published site.

Student IDs and private contact details are not published. English names can be corrected in `_data/lab.yml` without changing page templates.
Student records show the entry year without academic/professional degree tracks. Portraits, undergraduate education, completed postgraduate education for doctoral students and postdocs, and research interests were added from the October 22, 2026 member information workbook. A master's student's current SCUT program must not be described as an already completed degree.

Member cards in `/people/` are rendered by `_includes/member-card.html` and show only a portrait, name, role, entry year, and research interests. The complete card links to `/people/<member-id>/`. Each member has a short page record in `_pages/members/`, rendered with `_layouts/member.html`; education and publications appear on that detail page only. The user confirmed postdoctoral entry years as 2026 for Zhenru Zhou and 2024 for Canyu Zhang.

Member detail pages automatically link group papers with an exact author-name match in `_publications/`. `_data/member_publications.yml` holds additional English publications supplied by members, including work outside this group; these do not become Cao Group publication records. Chinese-language publications are excluded. Every paper displays its complete author list using the shared author renderer, with first/co-first and corresponding-author markers where confirmed and Yufei Cao bold and underlined. Use verified DOI links where available. Existing group publication metadata takes precedence over abbreviated or inconsistent citations in the information workbook. Additional author order was checked against Crossref metadata; author-role markers use explicit original-article or member-supplied notes rather than inferred seniority.

## Group photo gallery

The homepage and `/photos/` share `_includes/group-gallery.html`, with photo metadata in `_data/gallery.yml` and behavior in `assets/js/group-gallery.js`. The navigation label is Photos; the former `/gallery/` URL redirects to `/photos/`. No photo captions, explanatory copy, or enlargement descriptions are shown. Keep descriptive alt text and screen-reader labels. The gallery supports native horizontal scrolling, previous/next buttons, keyboard navigation, thumbnails, and an enlarged dialog. The automatic slideshow can be paused, pauses after manual navigation, and respects reduced-motion preferences. It stops while offscreen or in a hidden tab.

Use the real group photographs in `images/group/`, retain the full composition so people are not cropped out, and provide descriptive alt text. The display WebP files and thumbnails omit source EXIF metadata. Original photographs and the source member workbook remain in the ignored `资料/` directory. Add dates, locations, or names to captions only when confirmed.

## Add a publication

Create `_publications/YYYY-short-title.md` (or copy an existing record):

```yaml
---
title: "Paper title"
collection: publications
category: manuscripts
layout: publication
permalink: /publication/short-title/
date: YYYY-MM-DD
year: YYYY
period: after_scut
venue: "Journal name"
volume: "1"
issue: "1"
pages: "1–10"
doi: "10.example/paper"
paperurl: "https://doi.org/your-doi"
authors:
  - name: "Yufei Cao"
    highlight: true
    first_author: true
    corresponding_author: true
summary: "A short, verified summary."
figure: /images/publications/short-title.webp
figure_label: "Figure 1"
figure_alt: "A description of the figure."
figure_source: "https://doi.org/your-doi"
cover: /images/covers/journal-volume-issue.webp
cover_label: "Issue cover"
cover_source: "https://publisher.example/verified-issue-page"
---
```

Use the issue year in `year` and the verified first online date in `date` (or a verified issue date if no online date is available). Set `period: after_scut` for papers after September 2023. For earlier papers use `period: before_scut`, include only confirmed first/co-first author papers, and omit figures and covers. The earlier-paper section displays citations only. Set `equal_contribution: true` on authors with a verified equal-contribution note. Check publisher metadata and the full author list. Do not add preprints or translated editions as duplicate articles. Quote YAML values that contain colons or other special characters.

Set `first_author: true` for the first author and every verified co-first author; set `corresponding_author: true` only for authors identified by the original article, publisher author notes, or the user's explicit confirmation. The site displays † for first/co-first authors and * for corresponding authors. Both markers can appear on one person. `highlight: true` makes Yufei Cao bold and underlined in every publication author list. Do not infer correspondence from author order, seniority, supervision statements, or affiliation alone.

Use an actual figure or graphical abstract from the paper and credit its source. Retain figure labels, axes, and legends; do not recreate scientific results. Supporting figures must be labelled as such. Convert images to a web-friendly format and strip unnecessary metadata.

An `Issue cover` must match the paper's journal, volume, and issue. If no verified image is available, omit `cover`, `cover_label`, and `cover_source`; the page displays no cover information or empty placeholder. Do not display generic publisher artwork as an issue cover or substitute another issue's artwork.

### Cover status at the October 2026 update

- 8 verified issue covers.
- 4 generic publisher covers were removed from display: Chemical Engineering Journal volumes 522 and 531, Trends in Food Science & Technology volume 170, and International Journal of Biological Macromolecules volume 274. Only add replacements if an actual corresponding issue cover can be verified.
- 5 issue covers awaiting source images: Angewandte Chemie International Edition 64(37) and 65(36), Chemical Science 17(3), Green Chemistry 27(40), and Food Bioscience 82.
- 2 Nature Communications articles use continuous publication without conventional issue covers. The October 16, 2026 JAFC article has not yet been assigned an issue.

Source files in `资料/` and working files in `local/` are ignored by Git and excluded from Jekyll. Do not remove these exclusions when adding images.

## Add news

Create `_posts/YYYY-MM-DD-short-title.md`:

```yaml
---
title: "News title"
date: YYYY-MM-DD
---
Your announcement.
```

## Footer animation

The custom footer in `_includes/footer.html` replaces the template's social links, copyright, update date, and sitemap link. It uses `assets/js/protein-design.js` and the footer rules in `assets/css/lab.css`. Keep the original theme license and source acknowledgements in `LICENSE` and `README.md`.

The cyan ribbon and golden design sites are illustrative geometry, not a molecular structure or a physical folding simulation. Keep the visible “Conceptual animation” label. The 20-second loop illustrates Generate → Fold → Refine. It supports Pause/Play, respects reduced-motion preferences, and stops drawing when offscreen or in a hidden tab. `images/branding/protein-design-poster.svg` provides a static fallback when JavaScript or Canvas is unavailable.

The footer stays in normal document flow. Desktop sidebar positioning is constrained to the main content, and the old theme script's inline bottom margin is overridden to avoid a blank area below the new footer.

## Preview and deployment

With Ruby 3.3 and Bundler available, run `bundle install`, followed by `bundle exec jekyll serve --host 127.0.0.1`. Open the printed root URL; this organization site uses an empty `baseurl`.

GitHub Pages must use **Settings → Pages → Source → GitHub Actions**. Pushes to `main` or `master` build and deploy through `.github/workflows/jekyll.yml`. Pull requests run the build without deployment. Check the Actions tab for failures.

The original Academic Pages license is retained in `LICENSE`. Theme documentation remains available at the official site; template demonstrations are excluded from the public website.
