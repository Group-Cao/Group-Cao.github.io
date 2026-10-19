# Maintaining the Cao Group website

This website uses [Academic Pages](https://academicpages.github.io/markdown/) with Jekyll. Group-specific pages contain no invented biographies, publications, affiliations, or recruitment claims.

## Add group information

- `_config.yml`: group name, site description, sidebar, affiliation, public email, and academic profile links. Set `url` to the account hostname and `baseurl` to the repository path for a project site.
- `_data/lab.yml`: introduction, four research themes, PI profile, postdocs, doctoral students, master's students, and contact details. Update the existing records with confirmed information.
- `_data/navigation.yml`: menu labels and order.
- `_pages/about.md`: homepage structure.
- `images/`: group photos, member portraits, and research images. Use `/images/filename.jpg` paths in the data file.
- `files/`: approved public downloads only. Original PDFs, CVs, application documents, and presentations remain outside the published site.

Student IDs and private contact details are not published. English names can be corrected in `_data/lab.yml` without changing page templates.

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
venue: "Journal name"
volume: "1"
issue: "1"
pages: "1–10"
doi: "10.example/paper"
paperurl: "https://doi.org/your-doi"
authors:
  - name: "Yufei Cao"
    highlight: true
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

Use the issue year in `year` and the first online date in `date`. Check publisher metadata and the full author list. Do not add preprints or translated editions as duplicate articles. Quote YAML values that contain colons or other special characters.

Use an actual figure or graphical abstract from the paper and credit its source. Retain figure labels, axes, and legends; do not recreate scientific results. Supporting figures must be labelled as such. Convert images to a web-friendly format and strip unnecessary metadata.

An `Issue cover` must match the paper's journal, volume, and issue. Use `Publisher journal cover` for generic publisher artwork. If no image is available, omit `cover`, `cover_label`, and `cover_source`, and add a `cover_note` such as `Issue cover to be added`, `Online first · Issue not yet assigned`, or `Continuous publication · No issue cover`. Never substitute a different issue's artwork.

### Cover status at the October 2026 update

- 8 verified issue covers.
- 4 generic publisher covers: Chemical Engineering Journal volumes 522 and 531, Trends in Food Science & Technology volume 170, and International Journal of Biological Macromolecules volume 274.
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

## Preview and deployment

With Ruby 3.3 and Bundler available, run `bundle install`, followed by `bundle exec jekyll serve --host 127.0.0.1`. Open the printed URL, including `baseurl` for a project site.

GitHub Pages must use **Settings → Pages → Source → GitHub Actions**. Pushes to `main` or `master` build and deploy through `.github/workflows/jekyll.yml`. Pull requests run the build without deployment. Check the Actions tab for failures.

The original Academic Pages license is retained in `LICENSE`. Theme documentation remains available at the official site; template demonstrations are excluded from the public website.
