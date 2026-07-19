import * as React from "react";

interface ViewTransitionProps {
  children?: React.ReactNode;
  /** Shared-element name: two elements on different routes with the same
   * name morph into each other during navigation. */
  name?: string;
}

// React's experimental view-transition component (enabled via
// experimental.viewTransition in next.config.mjs). @types/react doesn't
// declare it yet, so the export is typed here with the props we use.
export const ViewTransition = (
  React as unknown as {
    ViewTransition: React.ComponentType<ViewTransitionProps>;
  }
).ViewTransition;
