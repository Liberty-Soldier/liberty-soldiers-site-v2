// types/hyvor-talk.d.ts
import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "hyvor-talk-comments": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "website-id": string;
        "page-id"?: string;
        "page-url"?: string;
      };
    }
  }
}

export {};
