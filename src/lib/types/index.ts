export type User = {
  id: number;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  avatar?: string;
  username?: string;
  role: "ADMIN" | "USER" | "MEMBER";
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  member: Member;
  programPackages: ProgramPackage[];
};

export type Program = {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  startDate: string;
  endDate: string;
  priceMember: number;
  priceNonMember: number;
};

export type MembershipPackage = {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  segmentasi: string;
  instansi: string;
  interest: string[];
  createdAt: string;
  updatedAt: string;
  user: User;
  programPackage: ProgramPackage[];
  membershipPackage: MembershipPackage;
};

export type ProgramPackage = {
  id: string;
  email: string;
  name: string;
  phone: string;
  institution: string;
  segment: "STUDENT" | "FRESH_GRADUATE" | "PROFESSIONAL" | null;
  registeredAt: Date | string;
  source: "MEMBER" | "NON_MEMBER";
  program: Program;
  member?: Member;
  user?: User;
};
