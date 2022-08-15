---
to: src/pages/<%= name %>.tsx
---
<% const comp = name -%>
import React from "react";
import Layout from '@theme/Layout';

function <%= comp %>() {
  return (
    <Layout title="<%= comp %>">
    </Layout>
  );
}

export default <%= comp %>;
