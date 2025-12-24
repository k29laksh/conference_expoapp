// Shared schedule data for cross-linking between schedule and speakers

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  venue?: string;
  speaker?: string;
  designation?: string;
  type: "session" | "break";
  details?: {
    role: string;
    name: string;
    designation: string;
  }[];
}

export const SCHEDULE_DAY0: ScheduleItem[] = [
  {
    id: "day0-1",
    time: "02:10 - 02:15",
    title: "Welcome Reception and Registration",
    venue: "Main Conference Hall",
    type: "session",
  },
  {
    id: "day0-2",
    time: "02:15 - 02:20",
    title: "Introduction to Conference Theme",
    speaker: "Dr. Sarah Thompson",
    designation: "Conference Coordinator",
    type: "session",
  },
  {
    id: "day0-3",
    time: "02:20 - 02:25",
    title: "Networking Ice Breaker Session",
    venue: "Main Conference Hall",
    type: "session",
  },
  {
    id: "day0-4",
    time: "02:25 - 02:30",
    title: "Overview of Latest Research Trends",
    speaker: "Prof. Michael Chen",
    designation: "Research Director, Global Pharma Institute",
    type: "session",
  },
  {
    id: "day0-5",
    time: "02:30 - 02:35",
    title: "Industry Updates and Announcements",
    speaker: "Dr. Priya Sharma",
    designation: "Industry Relations Officer",
    type: "session",
  },
  {
    id: "day0-6",
    time: "02:35 - 02:40",
    title: "Poster Preview Session",
    venue: "Exhibition Area",
    type: "session",
  },
  {
    id: "day0-7",
    time: "02:40 - 02:45",
    title: "Innovation Showcase Highlights",
    speaker: "Dr. James Wilson",
    designation: "Innovation Lead, Tech Solutions Ltd.",
    type: "session",
  },
  {
    id: "day0-8",
    time: "02:45 - 02:50",
    title: "Sponsor Introduction and Opportunities",
    speaker: "Ms. Angela Roberts",
    designation: "Sponsorship Manager",
    type: "session",
  },
  {
    id: "day0-9",
    time: "02:50 - 02:55",
    title: "Quick Workshop Teasers",
    venue: "Workshop Hall",
    type: "session",
  },
  {
    id: "day0-10",
    time: "02:55 - 03:00",
    title: "Meet the Speakers Session",
    speaker: "Various Speakers",
    designation: "Conference Faculty",
    type: "session",
  },
  {
    id: "day0-11",
    time: "03:00 - 03:05",
    title: "Conference App and Digital Resources Guide",
    speaker: "Mr. David Kumar",
    designation: "Technology Coordinator",
    type: "session",
  },
  {
    id: "day0-12",
    time: "03:05 - 03:10",
    title: "Closing Remarks and Day 1 Preview",
    venue: "Main Conference Hall",
    type: "session",
  },
];

export const SCHEDULE_DAY1: ScheduleItem[] = [
  {
    id: "day1-1",
    time: "09:00 - 10:00",
    title: "REGISTRATION & BREAKFAST",
    venue:
      "Meenatai Bhujbal School, M.P. Hall, MET Campus, Bhujbal Knowledge City, Nashik",
    type: "break",
  },
  {
    id: "day1-2",
    time: "10:00 - 11:00",
    title: "Inauguration of Event",
    details: [
      {
        role: "Inaugural Address",
        name: "Hon. Shri. Sameer Bhujbal & Hon. Dr. Shefali Bhujbal",
        designation:
          "CEO, Bhujbal Knowledge City, Mumbai Educational Trust, Nashik",
      },
      {
        role: "Key Note",
        name: "Dr. Sanjay J. Kshirsagar",
        designation: "Principal, MET's Institute of Pharmacy, Nashik",
      },
      {
        role: "Guest of Honor",
        name: "Dr. Suchita Lokhande",
        designation:
          "Scientist D, Department of Science & Technology, Govt of India, New Delhi",
      },
      {
        role: "Chief Guest",
        name: "Dr. Ulhas Dhuppad",
        designation:
          "President and Head of Global Pharmaceutical Development, Glenmark Pharmaceuticals Limited, Nashik",
      },
    ],
    type: "session",
  },
  {
    id: "day1-3",
    time: "11:00 - 12:00",
    title: "Natural non-antibiotic antimicrobials for the skincare treatment",
    speaker: "Dr. Zyta Ziora",
    designation:
      "IITC Institute for Molecular Bioscience, The University of Queensland, Australia",
    type: "session",
  },
  {
    id: "day1-4",
    time: "12:00 - 01:00",
    title: "LUNCH BREAK (Poster Presentation)",
    venue: "Auditorium, MET Campus, Bhujbal Knowledge City, Nashik",
    type: "break",
  },
  {
    id: "day1-5",
    time: "01:00 - 02:00",
    title:
      "Discovery of an ERRg agonist as a therapeutic for neurological disease",
    speaker: "Dr. Kim Seok-ho",
    designation:
      "Professor, College of Pharmacy, Kangwon National University, South Korea",
    type: "session",
  },
  {
    id: "day1-6",
    time: "01:00 - 02:00",
    title:
      "Natural Product as an Alternative Source to Overcome Antimicrobial Resistance Problem (AMR)",
    speaker: "Dr. Abdi Wira Septama",
    designation:
      "Research Scientist, National Research and Innovation Agency, Indonesia",
    type: "session",
  },
  {
    id: "day1-7",
    time: "02:00 - 03:00",
    title:
      "Hot Melt Extrusion (HME) as an Emerging Frontiers Platform for Future-Ready Drug Delivery Systems",
    speaker: "Dr. Kailas Kalicharan Moravkar",
    designation: "Principal Research Engineer, Regeron Inc., South Korea",
    type: "session",
  },
  {
    id: "day1-8",
    time: "02:00 - 03:00",
    title: "Targeting cancer cells via Next-generation technological advances",
    speaker: "Prof. Rakesh K. Tekade",
    designation:
      "Professor and Head, Department of Pharmaceutics, NIPER-Ahmedabad",
    type: "session",
  },
  {
    id: "day1-9",
    time: "02:00 - 03:00",
    title:
      "Government of India Funding Opportunities for Researchers (Only for Faculties)",
    speaker: "Dr. Suchita Lokhande",
    designation:
      "Scientist D, Department of Science & Technology, Govt of India, New Delhi",
    type: "session",
  },
  {
    id: "day1-10",
    time: "03:30 - 05:30",
    title: "Poster Presentation",
    venue: "MET's Institute of Pharmacy, Nashik",
    type: "break",
  },
  {
    id: "day1-11",
    time: "05:45 - 06:15",
    title: "Discussion with Speakers and Campus Visit",
    type: "break",
  },
  {
    id: "day1-12",
    time: "06:30 - 09:00",
    title: "Gala Night and Dinner",
    type: "break",
  },
];

export const SCHEDULE_DAY2: ScheduleItem[] = [
  {
    id: "day2-1",
    time: "08:00 - 09:00",
    title: "BREAKFAST",
    venue:
      "Meenatai Bhujbal School, M.P. Hall, MET Campus, Bhujbal Knowledge City, Nashik",
    type: "break",
  },
  {
    id: "day2-2",
    time: "09:00 - 01:00",
    title: "Oral Presentation",
    venue: "MET's Institute of Pharmacy, Nashik",
    type: "session",
  },
  {
    id: "day2-3",
    time: "10:00 - 11:00",
    title:
      "The Intelligent Future: AI, Digital Health, and the 2030 Pharma Blueprint",
    speaker: "Dr. Sachin Kushare",
    designation: "Research Scientist, Glenmark Pharmaceuticals, Sinner",
    type: "session",
  },
  {
    id: "day2-4",
    time: "10:00 - 11:00",
    title: "Advancements in Respiratory Devices",
    speaker: "Mr. Sharad Chandak",
    designation: "Packaging Head, Glenmark Pharmaceuticals, Sinner",
    type: "session",
  },
  {
    id: "day2-5",
    time: "11:00 - 12:00",
    title:
      "Phenolic compounds extraction from fruit waste/byproducts and their nutraceutical applications",
    speaker: "Dr. Nilesh Prakash Nirmal",
    designation:
      "Global Talent Scientist, Mahidol University Salaya, Bangkok, Thailand",
    type: "session",
  },
  {
    id: "day2-6",
    time: "11:00 - 12:00",
    title: "Pharmaceutical quality system",
    speaker: "Dr. Manoj Chitnis",
    designation: "Vice President, JB Chemicals & Pharm. Mumbai",
    type: "session",
  },
  {
    id: "day2-7",
    time: "12:00 - 01:00",
    title:
      "Strategic Combinational Approach for Enhanced Bio-availability of Antiretroviral in HIV-1 Viral Reservoirs",
    speaker: "Dr. Javed Ali",
    designation: "Dept of Pharmaceutics, Jamia Hamdard University, New Delhi",
    type: "session",
  },
  {
    id: "day2-8",
    time: "12:00 - 01:00",
    title:
      "Next level of Audit Readiness and Laboratory Productivity for pharma QC lab- Options and Way Forward",
    speaker: "Dr. J. S. Wagh",
    designation: "Ex Service Director - Waters India Ltd.",
    type: "session",
  },
  {
    id: "day2-9",
    time: "01:00 - 02:00",
    title: "LUNCH BREAK",
    venue:
      "Meenatai Bhujbal School, M.P. Hall, MET Campus, Bhujbal Knowledge City, Nashik",
    type: "break",
  },
  {
    id: "day2-10",
    time: "02:00 - 03:00",
    title: "Government Funding and Research Opportunities",
    speaker: "Dr. Dinesh Jagtap",
    designation:
      "Scientific Officer, Rajiv Gandhi Science and Technology Commission (RGSTC), Govt. of Maharashtra, Mumbai",
    type: "session",
  },
  {
    id: "day2-11",
    time: "03:00 - 04:00",
    title: "Result Declaration and Valedictory Session",
    type: "session",
  },
];

// Helper function to get all schedule sessions for a speaker
export const getSessionsForSpeaker = (speakerName: string): ScheduleItem[] => {
  const allSessions = [...SCHEDULE_DAY0, ...SCHEDULE_DAY1, ...SCHEDULE_DAY2];
  return allSessions
    .filter((session) => session.speaker === speakerName)
    .map((session, index) => ({
      ...session,
      day: session.id.startsWith("day0-") ? 0 : session.id.startsWith("day1-") ? 1 : 2,
    }));
};

// Helper function to convert schedule items to session storage format
export const convertToStorageFormat = (items: ScheduleItem[], day: number) => {
  return items.map((item) => ({
    ...item,
    day,
  }));
};
