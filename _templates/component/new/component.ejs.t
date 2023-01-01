---
to: src/components/<%= name %>.tsx
---
<% const comp = name -%>
import React from "react";

interface <%= comp %>Props {
}

export function <%= comp %>({}: <%= comp %>Props) {
  return (<></>);
}
