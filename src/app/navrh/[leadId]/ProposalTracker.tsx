"use client";

import { useEffect, useRef } from "react";
import { trackProposalViewAction } from "@/app/actions/leads";

export default function ProposalTracker({ leadId }: { leadId: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      trackProposalViewAction(leadId);
    }
  }, [leadId]);

  return null;
}
