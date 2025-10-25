export interface OprecData {
  name: string;
  division: string;
  status: "Lolos" | "Tidak Lolos";
}

export const oprecData: OprecData[] = [
  {
    name: "Tegar Aprilian Wibowo",
    division: "Web Development",
    status: "Lolos",
  },
  {
    name: "Alya Putri",
    division: "Marketing",
    status: "Lolos",
  },
  {
    name: "Bima Santoso",
    division: "Event Management",
    status: "Tidak Lolos",
  },
];
