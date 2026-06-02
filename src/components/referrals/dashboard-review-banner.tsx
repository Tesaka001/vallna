import { getStoreLinks, hasStoreLinks } from "@/lib/referrals/stores";

import { ReviewPrompt } from "./review-prompt";

export function DashboardReviewBanner() {
  const storeLinks = getStoreLinks();

  if (!hasStoreLinks(storeLinks)) {
    return null;
  }

  return <ReviewPrompt storeLinks={storeLinks} variant="banner" />;
}
