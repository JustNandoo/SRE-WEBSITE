// lib/staffData.ts

export interface SocialLinks {
  linkedin: string;
  instagram: string;
}

export interface Member {
  name: string;
  role: string;
  major: string;
  img: string;
  socials: SocialLinks;
}

export interface Division {
  id: string;
  division: string;
  description: string;
  members: Member[];
}

export const staffData: Division[] = [];
