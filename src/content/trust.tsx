import type { ReactNode } from "react";

export interface TrustPerk {
  id: string;
  icon: "manager" | "checkout" | "cancel";
  title: string;
  description: string;
}

export const TRUST_PERKS: TrustPerk[] = [
  {
    id: "manager-support",
    icon: "manager",
    title: "Direct manager support",
    description:
      "Book direct and you deal with the motel itself, not a call centre — with no third-party booking fees added to your stay.",
  },
  {
    id: "late-checkout",
    icon: "checkout",
    title: "Priority late check-out",
    description: "Direct guests receive priority consideration for late check-out, subject to availability.",
  },
  {
    id: "flexible-cancellation",
    icon: "cancel",
    title: "Flexible cancellation policies",
    description: "Amend or cancel on flexible terms, handled by the front desk rather than a third party.",
  },
];
