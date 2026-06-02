export type StoreLinks = {
  appStore: string | null;
  playStore: string | null;
};

export function getStoreLinks(): StoreLinks {
  const appStore = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() || null;
  const playStore = process.env.NEXT_PUBLIC_PLAY_STORE_URL?.trim() || null;
  return { appStore, playStore };
}

export function hasStoreLinks(links: StoreLinks): boolean {
  return Boolean(links.appStore || links.playStore);
}
