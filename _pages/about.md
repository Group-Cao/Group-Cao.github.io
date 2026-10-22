---
permalink: /
title: "Engineering enzymes across scales"
excerpt: "The Cao Group at SCUT combines mechanistic simulation, enzyme engineering, and materials chemistry for sustainable biocatalysis."
author_profile: true
redirect_from:
  - /about/
---

<p class="lab-eyebrow">Cao Group · South China University of Technology</p>
<p class="lab-intro">{{ site.data.lab.intro }}</p>
<p>We are based in the <strong>School of Food Science and Engineering</strong> at SCUT in Guangzhou, China. Our group is led by <a href="{{ '/yufei-cao/' | relative_url }}">Dr. Yufei Cao</a>.</p>

<figure class="lab-home-figure">
  <a href="{{ '/research/' | relative_url }}"><img src="{{ '/images/research/multiscale-confinement.webp' | relative_url }}" alt="Multiscale organization and confinement of enzyme catalysts" fetchpriority="high"></a>
  <figcaption>From molecular active sites to organized enzyme systems · <a href="https://doi.org/10.1038/s44160-025-00898-1">Nature Synthesis, 2025</a></figcaption>
</figure>

## What We Study

<div class="lab-research-overview">
{% for area in site.data.lab.research %}
  <section><p class="lab-eyebrow">0{{ forloop.index }}</p><h3><a href="{{ '/research/' | relative_url }}#{{ area.id }}">{{ area.title }}</a></h3><p>{{ area.question }}</p></section>
{% endfor %}
</div>

## Recent Publications

<ul class="lab-home-publications">
{% assign recent_papers = site.publications | sort: 'date' | reverse %}
{% for paper in recent_papers limit: 3 %}
  <li><span class="lab-pub-journal">{{ paper.venue }} · {{ paper.year }}</span><a href="{{ paper.url | relative_url }}">{{ paper.title }}</a></li>
{% endfor %}
</ul>
[All publications →]({{ '/publications/' | relative_url }})

## Our Team

Our team includes postdoctoral researchers, doctoral students, and master’s students working at the interface of biocatalysis, computation, and food science.

[Meet the group →]({{ '/people/' | relative_url }}) · [Contact and opportunities →]({{ '/join/' | relative_url }})

## Photos

{% include group-gallery.html %}

[More photos →]({{ '/photos/' | relative_url }})
