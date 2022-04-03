---
to: blog/<%= new Date().toISOString().substring(0,10) %>-<%= name %>/index.md
---
---
title: <%= locals.title || h.changeCase.titleCase(h.changeCase.sentenceCase(name)) %>
<% if (locals.authors) { -%>
authors: [<%= authors %>]
<% } -%>
<% if (locals.description) { -%>
description: <%= description %>
<% } -%>
<% if (locals.draft !== undefined) { -%>
draft: <%= !!locals.draft %>
<% } -%>
<% if (locals.hide_table_of_contents !== undefined) { -%>
hide_table_of_contents: <%= !!locals.hide_table_of_contents %>
<% } -%>
<% if (locals.image) { -%>
image: <%= image %>
<% } -%>
<% if (locals.keywords) { -%>
keywords: [<%= keywords %>]
<% } -%>
<% if (locals.slug) { -%>
slug: <%= slug %>
<% } -%>
<% if (locals.tags) { -%>
tags: [<%= tags %>]
<% } -%>
<% if (locals.toc_max_heading_level) { -%>
toc_max_heading_level: <%= toc_max_heading_level %>
<% } -%>
<% if (locals.toc_min_heading_level) { -%>
toc_min_heading_level: <%= toc_min_heading_level %>
<% } -%>
---

<!--truncate-->
