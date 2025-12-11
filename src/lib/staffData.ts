// lib/staffData.ts

export interface SocialLinks {
  linkedin: string;
  instagram: string;
}

export interface Member {
  name: string;
  role: string;
  img: string;
  socials: SocialLinks;
}

export interface Division {
  id: string;
  division: string;
  description: string;
  members: Member[];
}

export const staffData: Division[] = [
  {
    id: "exec",
    division: "Executive Board",
    description: "The main pillars driving the organization's vision.",
    members: [
      {
        name: "Diki Candra",
        role: "President",
        img: "/img/photo/President.webp",
        socials: { linkedin: "#", instagram: "#" }
      },
      {
        name: "Alfiqri Amri",
        role: "Vice President 1",
        img: "/img/photo/VpOne.webp",
        socials: { linkedin: "#", instagram: "#" }
      },
      {
        name: "Tiara Vania",
        role: "Vice President 2",
        img: "/img/photo/VpTwo.webp",
        socials: { linkedin: "#", instagram: "#" }
      },
    ]
  },
  {
    id: "admin",
    division: "Secretary & Treasurer",
    description: "Managing administration and financial stability.",
    members: [
      {
        name: "Bintang Mayra",
        role: "Secretary 1",
        img: "/img/photo/Secretary1.webp",
        socials: { linkedin: "#", instagram: "#" }
      },
      {
        name: "Nabila Andini",
        role: "Secretary 2",
        img: "/img/photo/Secretary2.webp",
        socials: { linkedin: "#", instagram: "#" }
      },
      {
        name: "Dailatul Arofah",
        role: "Treasurer",
        img: "/img/photo/Treasurer.webp",
        socials: { linkedin: "#", instagram: "#" }
      },
    ]
  },
];