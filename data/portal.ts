export const PORTAL_URL = "https://myschool.carsu.edu.ph";

export const portal = (path: string) => `${PORTAL_URL}${path}`;

export const links = {
  login: portal("/login"),
  activate: portal("/user/register"),
  records: portal("/student/academic-records/request"),
  survey: PORTAL_URL,
  accountSupport: "https://www.facebook.com/people/Ict4rm-20/100087678650818/",
  university: "https://www.carsu.edu.ph",
  about: "https://www.carsu.edu.ph/about-us/",
  branding: "https://www.carsu.edu.ph/ovpeo/pico/university-branding/",
} as const;

export const campus = {
  coordinates: "08°57′N 125°36′E",
  address: "Ampayon, Butuan City 8600, Agusan del Norte",
  term: "AY 2026–2027 · First Semester",
  registrarEmail: "registrar.csumain@carsu.edu.ph",
  registrarPhone: "0917 707 8713",
} as const;

export const sections = [
  { id: "services", index: "01", label: "Services" },
  { id: "course", index: "02", label: "Heading" },
  { id: "seal", index: "03", label: "Seal" },
  { id: "bulletin", index: "04", label: "Bulletin" },
  { id: "support", index: "05", label: "Support" },
] as const;

export type IconName =
  | "grades"
  | "enrollment"
  | "schedule"
  | "balances"
  | "records"
  | "evaluation"
  | "support"
  | "mail"
  | "survey";

export interface Service {
  code: string;
  icon: IconName;
  title: string;
  summary: string;
  path: string;
}

export const services: Service[] = [
  {
    code: "GRD",
    icon: "grades",
    title: "Grades",
    summary: "Final grades per term, plus completion of incomplete marks.",
    path: "/student/grade",
  },
  {
    code: "ENR",
    icon: "enrollment",
    title: "Online enrollment",
    summary: "Request enrollment, validate subjects, and follow your curriculum.",
    path: "/onlineenrollment/request",
  },
  {
    code: "SCH",
    icon: "schedule",
    title: "Class schedule",
    summary: "Rooms, times, and instructors for every enlisted subject.",
    path: "/student/class-schedule",
  },
  {
    code: "BAL",
    icon: "balances",
    title: "Balances",
    summary: "Assessed fees and outstanding balances before you pay.",
    path: "/student/balances",
  },
  {
    code: "REC",
    icon: "records",
    title: "Academic records",
    summary: "Request a TOR, certifications, and other registrar documents.",
    path: "/student/academic-records/request",
  },
  {
    code: "EVL",
    icon: "evaluation",
    title: "Faculty evaluation",
    summary: "Evaluate your instructors at the close of each term.",
    path: "/evaluation/evaluate-teachers",
  },
];

export const quickAccess = services.filter((s) => ["GRD", "ENR", "REC"].includes(s.code));

export interface Bulletin {
  date: string;
  tag: "System" | "Registrar" | "Account" | "Feedback";
  title: string;
  body: string;
}

export const bulletins: Bulletin[] = [
  {
    date: "2026-10-05",
    tag: "Feedback",
    title: "MySchool account survey is open",
    body: "Tell us what works and what doesn't. Responses shape the next round of portal improvements.",
  },
  {
    date: "2026-09-01",
    tag: "Account",
    title: "New students: activate before your first sign-in",
    body: "Use Activate Account with your student number, then sign in with your credentials or CSU Google Workspace.",
  },
  {
    date: "2026-08-10",
    tag: "Registrar",
    title: "Records requests run on daily slots",
    body: "Requests open every working day with a limited number of slots. Once filled, they reopen the next working day.",
  },
  {
    date: "2026-08-03",
    tag: "System",
    title: "MySchool is now mobile-first",
    body: "The upgraded interface works across more devices, from phones on the jeepney to lab workstations.",
  },
];

export const values = [
  {
    key: "C",
    name: "Competence",
    gloss: "Skill earned through rigorous instruction, research, and practice.",
  },
  {
    key: "S",
    name: "Service",
    gloss: "Knowledge put to work for Caraga, the nation, and beyond.",
  },
  {
    key: "U",
    name: "Uprightness",
    gloss: "Integrity in every grade, every record, every decision.",
  },
] as const;

export const vision =
  "A socially-engaged digital, innovation, and entrepreneurial university excelling globally in science, engineering, and the arts by 2028.";

export const mission =
  "As a transformative university, CSU is a responsible steward of problem-solvers and value creators who are driven to create a sustainable future for the region, the nation, and beyond.";

export const sealManifest = [
  { part: "torch", meaning: "Vision and eagerness, guiding the way into uncharted waters" },
  { part: "sail", meaning: "Light rays: stakeholders whose trust propels the vessel forward" },
  { part: "roof", meaning: "Vision and Mission, uniting every effort under one frame" },
  { part: "curve_strips", meaning: "Instruction, research, extension, and production" },
  { part: "gear", meaning: "A continuous drive for innovation and collaboration" },
  { part: "open_book", meaning: "Learning, growth, and wisdom shared across generations" },
  { part: "caraga_map", meaning: "Roots in nurturing problem-solvers and value creators" },
  { part: "laurel", meaning: "Core values: Competence, Service, Uprightness" },
  { part: "1946", meaning: "Founding as Agusan Agricultural High School" },
] as const;
