# Maintaining the Cao Group website

This website uses [Academic Pages](https://academicpages.github.io/markdown/) with Jekyll. Group-specific pages contain no invented biographies, publications, affiliations, or recruitment claims.

## Add group information

- `_config.yml`: group name, site description, sidebar, affiliation, public email, and academic profile links. Set `url` to the account hostname and `baseurl` to the repository path for a project site.
- `_data/lab.yml`: introduction, research areas, members, and contact details. Uncomment the examples and replace them with confirmed information.
- `_data/navigation.yml`: menu labels and order.
- `_pages/about.md`: homepage structure.
- `images/`: group photos, member portraits, and research images. Use `/images/filename.jpg` paths in the data file.
- `files/`: public papers and other downloads.

Empty data sections display a short coming-soon message. There are no demonstration people or papers on the site.

## Add a publication

Create `_publications/YYYY-MM-DD-short-title.md`:

```yaml
---
title: "Paper title"
collection: publications
category: manuscripts
permalink: /publication/short-title/
date: YYYY-MM-DD
venue: "Journal name"
citation: "Authors. Paper title. Journal, year."
paperurl: "https://doi.org/your-doi"
---
A short summary of the paper.
```

Use `conferences` for conference papers, or `books` for books. `paperurl` and `citation` are optional. Quote YAML values that contain colons or other special characters.

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
