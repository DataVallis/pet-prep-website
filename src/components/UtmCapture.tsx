"use client";

import { useEffect } from "react";
import { rememberUtm } from "@/lib/emailSignup";

/**
 * Keeps the UTM tags and the first other-site referrer host of a visit in sessionStorage (`petprep.utm`, this tab only, gone
 * when it is closed; listed in the privacy policy), so an e-mail left a few pages later still says what brought the visitor
 * (lib/emailSignup.ts). The write happens for every visitor, but nothing is sent from here: the entry is read and sent to us
 * only when the visitor submits an e-mail form with consent. Renders nothing.
 */
export function UtmCapture() {
  useEffect(() => {
    try {
      rememberUtm(window.location.search, window.sessionStorage, document.referrer, window.location.hostname);
    } catch { /* storage blocked: the current URL still works */ }
  }, []);
  return null;
}
