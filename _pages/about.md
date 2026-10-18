---
permalink: /
title: "Welcome to the Cao Group"
excerpt: "The Cao Group website: research, people, publications, and news."
author_profile: true
redirect_from:
  - /about/
---

<p class="lab-eyebrow">Cao Group</p>
<p class="lab-intro">{{ site.data.lab.intro | escape }}</p>

<ul class="lab-links">
  <li><a href="{{ '/research/' | relative_url }}">Research <span>Questions, approaches &amp; projects &rarr;</span></a></li>
  <li><a href="{{ '/people/' | relative_url }}">People <span>Meet the group &rarr;</span></a></li>
  <li><a href="{{ '/publications/' | relative_url }}">Publications <span>Papers &amp; scholarly work &rarr;</span></a></li>
  <li><a href="{{ '/join/' | relative_url }}">Join Us <span>Opportunities &amp; contact &rarr;</span></a></li>
</ul>

## Latest News

{% if site.posts.size > 0 %}
<ul class="lab-news">
{% for post in site.posts limit: 3 %}
  <li><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %b %Y" }}</time><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></li>
{% endfor %}
</ul>
[All news &rarr;]({{ '/news/' | relative_url }})
{% else %}
News and group updates will appear here soon.
{% endif %}
