// lib/departmentData.ts

export enum DepartmentType {
  PM = "PM",
  SRM = "SRM",
  CM = "CM",
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: DepartmentType;
  image: string;
  bio?: string;
}

// Department information
export interface Department {
  id: DepartmentType;
  name: string;
  description: string;
  image: string;
}

// Define departments
export const departments: Department[] = [
  {
    id: DepartmentType.SRM,
    name: "Strategic Resource Management",
    description:
      "Optimizing resource allocation and strategic partnerships to ensure sustainable growth and efficiency.",
    image: "/img/icons/srm.png",
  },
  {
    id: DepartmentType.PM,
    name: "Project Management",
    description:
      "Overseeing planning, execution, and delivery of projects to achieve organizational goals efficiently.",
    image: "/img/icons/pm.png",
  },
  {
    id: DepartmentType.CM,
    name: "Creative Media",
    description:
      "Developing engaging visual and digital content to strengthen brand identity and audience connection.",
    image: "/img/icons/cm.png",
  },
];

// Example team members data
export const teamMembers: TeamMember[] = [
  // PR Department
  {
    id: 1,
    name: "Sarah Johnson",
    position: "PR Director",
    department: DepartmentType.PR,
    image: "/images/team/sarah.jpg",
    bio: "With over 10 years of experience in public relations, Sarah leads our PR initiatives.",
  },
];

// Function to get team members by department
export const getTeamMembersByDepartment = (
  department: DepartmentType
): TeamMember[] => {
  return teamMembers.filter((member) => member.department === department);
};
