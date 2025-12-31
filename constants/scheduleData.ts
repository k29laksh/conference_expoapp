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
    venue:
      "Meenatai Bhujbal School, M.P. Hall, MET Campus, Bhujbal Knowledge City, Nashik",
    details: [
      {
        role: "Inaugural Address",
        name: "Hon. Shri. Samir Bhujbal",
        designation:
          "Trustee, Mumbai Educational Trust, Bhujbal Knowledge City, Nashik",
      },
      {
        role: "Inaugural Address",
        name: "Hon. Dr. Shefali Bhujbal",
        designation:
          "Chief Administrator, Mumbai Educational Trust, Bhujbal Knowledge City, Nashik",
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
    venue:
      "Meenatai Bhujbal School, M.P. Hall, MET Campus, Bhujbal Knowledge City, Nashik",
    speaker: "Dr. Zyta Ziora",
    designation:
      "IITC Institute for Molecular Bioscience, The University of Queensland, Australia",
    type: "session",
  },
  {
    id: "day1-4",
    time: "12:00 - 01:00",
    title: "LUNCH BREAK (Poster Presentations)",
    venue: "Auditorium, MET Campus, Bhujbal Knowledge City, Nashik",
    type: "break",
  },
  {
    id: "day1-5",
    time: "01:00 - 02:00",
    title:
      "Discovery of an ERRg agonist as a therapeutic for neurological disease",
    venue: "Hall 1 (MPH, MBS)",
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
    venue: "Hall 2 (Auditorium, MBS)",
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
    venue: "Hall 2 (Auditorium, MBS)",
    speaker: "Dr. Kailas Kalicharan Moravkar",
    designation: "Principal Research Engineer, Regeneron Inc., South Korea",
    type: "session",
  },
  {
    id: "day1-8",
    time: "02:00 - 03:00",
    title: "Targeting cancer cells via Next-generation technological advances",
    venue: "Hall 1 (MPH, MBS)",
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
    venue: "Hall 3 (Seminar Hall, IOP)",
    speaker: "Dr. Suchita Lokhande",
    designation:
      "Scientist D, Department of Science & Technology, Govt of India, New Delhi",
    type: "session",
  },
  {
    id: "day1-10",
    time: "03:30 - 05:30",
    title: "Poster Presentations",
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
    title: "Oral Presentations",
    venue: "MET's Institute of Pharmacy, Nashik",
    type: "session",
  },
  {
    id: "day2-3",
    time: "10:00 - 11:00",
    title:
      "The Intelligent Future: AI, Digital Health, and the 2030 Pharma Blueprint",
    venue: "Hall 1 (MPH, MBS)",
    speaker: "Dr. Sachin Kushare",
    designation: "Research Scientist, Glenmark Pharmaceuticals, Sinner",
    type: "session",
  },
  {
    id: "day2-4",
    time: "10:00 - 11:00",
    title: "Advancements in Respiratory Devices",
    venue: "Hall 2 (Auditorium, MBS)",
    speaker: "Mr. Sharad Chandak",
    designation: "Packaging Head, Glenmark Pharmaceuticals, Sinner",
    type: "session",
  },
  {
    id: "day2-5",
    time: "11:00 - 12:00",
    title:
      "Phenolic compounds extraction from fruit waste/byproducts and their nutraceutical applications",
    venue: "Hall 1 (MPH, MBS)",
    speaker: "Dr. Nilesh Prakash Nirmal",
    designation:
      "Global Talent Scientist, Mahidol University Salaya, Bangkok, Thailand",
    type: "session",
  },
  {
    id: "day2-6",
    time: "11:00 - 12:00",
    title: "Pharmaceutical quality system",
    venue: "Hall 2 (Auditorium, MBS)",
    speaker: "Dr. Manoj Chitnis",
    designation: "Vice President, JB Chemicals & Pharm. Mumbai",
    type: "session",
  },
  {
    id: "day2-7",
    time: "12:00 - 01:00",
    title:
      "Strategic Combinational Approach for Enhanced Bioavailability of Antiretroviral in HIV-1 Viral Reservoirs",
    venue: "Hall 1 (MPH, MBS)",
    speaker: "Dr. Javed Ali",
    designation: "Dept of Pharmaceutics, Jamia Hamdard University, New Delhi",
    type: "session",
  },
  {
    id: "day2-8",
    time: "12:00 - 01:00",
    title:
      "Next level of Audit Readiness and Laboratory Productivity for pharma QC lab- Options and Way Forward",
    venue: "Hall 2 (Auditorium, MBS)",
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
    title:
      "Unlocking Research Potential: How to Identify Opportunities and Apply for RGSTC Funding (Only for Faculties)",
    venue: "Hall 3 (Seminar Hall, IOP)",
    speaker: "Dr. Dinesh Jagtap",
    designation:
      "Scientific Officer, Rajiv Gandhi Science and Technology Commission (RGSTC), Govt. of Maharashtra, Mumbai",
    type: "session",
  },
  {
    id: "day2-11",
    time: "03:00 - 04:00",
    title: "Result Declaration and Valedictory",
    speaker: "Dr. Sushant Bhandari",
    designation: "Director, Kaliberr Bioscience Private Limited, Nashik",
    type: "session",
  },
];

// Helper function to get all schedule sessions for a speaker
export const getSessionsForSpeaker = (speakerName: string): ScheduleItem[] => {
  const allSessions = [...SCHEDULE_DAY1, ...SCHEDULE_DAY2];
  return allSessions
    .filter((session) => session.speaker === speakerName)
    .map((session, index) => ({
      ...session,
      day: session.id.startsWith("day1-") ? 1 : 2,
    }));
};

// Helper function to convert schedule items to session storage format
export const convertToStorageFormat = (items: ScheduleItem[], day: number) => {
  return items.map((item) => ({
    ...item,
    day,
  }));
};
