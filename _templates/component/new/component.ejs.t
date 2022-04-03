---
to: src/components/<%= name %>.tsx
---
<% const comp = name -%>
import React from "react";

interface <%= comp %>Props {
}

function <%= comp %>({}: <%= comp %>Props) {
  return (<></>);
}

export default <%= comp %>;
