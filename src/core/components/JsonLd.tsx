import * as React from "react";

interface Props {
  data: JsonLdData;
}

interface JsonLdData {
  "@context": string;
  "@type": string;
}

export const JsonLd = ({ data }: Props) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
