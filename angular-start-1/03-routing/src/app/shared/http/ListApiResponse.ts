export type ListApiResponse<T extends { id: number }> = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: T[];
};
