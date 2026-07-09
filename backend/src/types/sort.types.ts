
export const SortOptions = {
    newest: { createdAt: -1 as const },
    oldest: { createdAt: 1 as const },
}

export enum SortOption {
    NEWEST = "newest",
    OLDEST = "oldest",
}