"use client";

import { useEffect } from "react";
import { rememberUtm } from "@/lib/emailSignup";

/**
 * Keeps the UTM tags of the first page of a visit in sessionStorage (this tab only, gone when it is closed), so an
 * e-mail left a few pages later still says which campaign brought the visitor (lib/emailSignup.ts). Used only when
 * the visitor submits a form with consent; nothing is sent from here. Renders nothing.
 */
export function UtmCapture() {
  useEffect(() => {
    try {
      rememberUtm(window.location.search, window.sessionStorage);
    } catch { /* storage blocked: the current URL still works */ }
  }, []);
  return null;
}
