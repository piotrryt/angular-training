export type Character = {
  id: number;
  name: string;
  image: string;
  status: "Alive" | "Dead" | "unknown";
};
