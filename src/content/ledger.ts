/* The ledger frieze under the short version: verified figures only, each
   with where it comes from and a link to the page that backs it. */
import LEDGER from "@/content/dashly-ledger.json";

const n = (v: number) => v.toLocaleString("en-GB");

export type Entry = { figure: string; what: string; source: string; href: string };

export const LEDGER_ENTRIES: Entry[] = [
  { figure: "215", what: "delegates", source: "NexVenue · IAZ 2026", href: "/work/insurance-conference-platform" },
  { figure: "71", what: "live questions", source: "NexVenue · IAZ 2026", href: "/work/insurance-conference-platform" },
  { figure: "18", what: "UML diagrams", source: "Health insurance MIS", href: "/work/health-insurance-mis" },
  { figure: String(LEDGER.calculators), what: "calculators", source: "Dashly", href: "/dashly" },
  { figure: n(LEDGER.testCases), what: "automated tests", source: "Dashly · last count", href: "/dashly" },
  { figure: "160", what: "characters a USSD menu gets", source: "Messaging platform", href: "/work/whatsapp-ussd-platform" },
  { figure: "67", what: "KPIs, scored automatically", source: "ZSIC tracker", href: "/cv#projects" },
  { figure: "3", what: "mobile-money networks", source: "AgriPredict", href: "/cv#projects" },
  { figure: n(LEDGER.commits), what: "commits on main", source: "Dashly · last count", href: "/dashly" },
  { figure: "15", what: "weeks in Malaysia", source: "InsurTech internship", href: "/work/insurtech-internship" },
];
