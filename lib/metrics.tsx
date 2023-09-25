import "server-only";

import { queryBuilder } from "lib/planetscale";
import { cache } from "react";

export const getBlogViews = cache(async () => {
  if (!process.env.DATABASE_URL) {
    return 0;
  }

  const data = await queryBuilder
    .selectFrom("views")
    .select(["count"])
    .execute();

  return data.reduce((acc, curr) => acc + Number(curr.count), 0);
});

export const getViewsCount = cache(async () => {
  return queryBuilder.selectFrom("views").select(["slug", "count"]).execute();
});
