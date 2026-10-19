# Cao Group website

An English-language research group website built with [Academic Pages](https://academicpages.github.io/) and Jekyll.

- Website: https://thu-caoyf.github.io/Group-Cao.github.io/
- Content and maintenance: [CONTENT_GUIDE.md](CONTENT_GUIDE.md)
- Site configuration: `_config.yml`
- Group introduction, research, people, and contact: `_data/lab.yml`
- Pages: `_pages/`; publications: `_publications/`; news: `_posts/`

The site includes the PI profile, four research themes, group members, and 20 journal articles published after September 2023. Each article has a representative figure and a DOI link. Verified issue covers are distinguished from publisher journal covers; unavailable or inapplicable covers are labelled explicitly.

## Deployment

Push to `main` to build and deploy through GitHub Actions. GitHub Pages must use **GitHub Actions** as its publishing source. Pull requests build without deployment.

## Local preview

Install Ruby 3.3 and Bundler, then run:

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Open the printed URL including `/Group-Cao.github.io/`.

## Credits

Based on [Academic Pages](https://github.com/academicpages/academicpages.github.io), derived from Michael Rose's Minimal Mistakes theme. The original MIT license is retained in `LICENSE`.
