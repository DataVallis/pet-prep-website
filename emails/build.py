#!/usr/bin/env python3
"""Builds the early-access welcome email in every language from one layout.

Run: python3 emails/build.py  → emails/early-access-welcome.<lang>.html (+ .txt)
The output is pasted into Klaviyo as a code template ("Uredi kodo" / "Code editor").
Klaviyo tags used: {% unsubscribe %}, {{ organization.name }}, {{ organization.full_address }}.
Images are served from https://petprep.si/brand/email/ (public/brand/email/ in this repo).
"""
from pathlib import Path

SITE = "https://petprep.si"
IMG = f"{SITE}/brand/email"

COPY = {
    "sl": {
        "lang": "sl",
        "subject": "Ste na seznamu 🎉",
        "preheader": "Hvala za prijavo na zgodnji dostop do PetPrep. Pišemo vam med prvimi.",
        "bubble": "Psst … jaz sem Radovednež. Že komaj čakam, da se spoznamo!",
        "title": "Hvala, ste na seznamu!",
        "lead": "Prijava na zgodnji dostop do PetPrep je uspela. Ko bo aplikacija pripravljena, vam pišemo med prvimi.",
        "promise_title": "Obljuba",
        "promise": "Pisali vam bomo samo takrat, ko bo PetPrep pripravljen — nič drugega.",
        "what_title": "Kaj vas čaka",
        "points": [
            ("12 tednov", "otrok skrbi za virtualnega ljubljenčka: hranjenje, voda, sprehodi in šolanje."),
            ("Vi vidite vse", "semafor, Care Score in dnevne rutine za vsakega otroka."),
            ("Na koncu", "Certifikat odgovornosti — in odgovor, ali je družina pripravljena na pravo žival."),
        ],
        "cta": "Poglejte, kako deluje",
        "cta_href": f"{SITE}/sl",
        "signoff": "Lep pozdrav,<br>ekipa PetPrep",
        "slogan": "Pripravljeni na žival. Ob njej vse življenje.",
        "why": "To sporočilo ste prejeli, ker ste se na petprep.si prijavili na zgodnji dostop.",
        "unsubscribe": "Odjava",
        "logo_alt": "PetPrep",
        "mark_alt": "Radovednež, maskota PetPrep",
    },
    "en": {
        "lang": "en",
        "subject": "You're on the list 🎉",
        "preheader": "Thanks for joining PetPrep early access. You'll hear from us first.",
        "bubble": "Psst… I can't wait to meet you!",
        "title": "Thank you, you're on the list!",
        "lead": "You're signed up for PetPrep early access. When the app is ready, you'll be among the first to know.",
        "promise_title": "Our promise",
        "promise": "We'll only email you when PetPrep is ready — nothing else.",
        "what_title": "What's coming",
        "points": [
            ("12 weeks", "your child cares for a virtual pet: food, water, walks and training."),
            ("You see everything", "a traffic light, Care Score and daily routines for every child."),
            ("At the end", "a Certificate of Responsibility — and an answer to whether your family is ready for a real pet."),
        ],
        "cta": "See how it works",
        "cta_href": f"{SITE}/en",
        "signoff": "Warm regards,<br>the PetPrep team",
        "slogan": "Ready for a pet. There for its whole life.",
        "why": "You're receiving this because you signed up for early access at petprep.si.",
        "unsubscribe": "Unsubscribe",
        "logo_alt": "PetPrep",
        "mark_alt": "The PetPrep mascot",
    },
}

# Brand CGP v2 tokens (brand/README.md in pet-prep)
FOG, WHITE, INK, MUTED, MINT, MINT_TEXT, RASP = "#F3F5F2", "#FFFFFF", "#121614", "#5A635D", "#7FE0B4", "#1A7A55", "#FF6B8B"
HEAD = "'Bricolage Grotesque', 'Helvetica Neue', Helvetica, Arial, sans-serif"
BODY = "'Instrument Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"


def html(c: dict) -> str:
    points = "".join(
        f"""
              <tr>
                <td width="28" valign="top" style="padding:0 0 14px 0;">
                  <div style="width:12px;height:12px;border-radius:6px;background:{MINT};margin-top:6px;font-size:0;line-height:0;">&nbsp;</div>
                </td>
                <td valign="top" style="padding:0 0 14px 0;font-family:{BODY};font-size:16px;line-height:24px;color:{INK};">
                  <strong style="font-weight:700;">{t}</strong> — {d}
                </td>
              </tr>"""
        for t, d in c["points"]
    )
    return f"""<!DOCTYPE html>
<html lang="{c['lang']}" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>{c['subject']}</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Instrument+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  body {{ margin:0; padding:0; background:{FOG}; }}
  a {{ color:{MINT_TEXT}; }}
  @media (max-width:620px) {{
    .card {{ width:100% !important; border-radius:0 !important; }}
    .pad {{ padding-left:24px !important; padding-right:24px !important; }}
    .h1 {{ font-size:28px !important; line-height:34px !important; }}
  }}
</style>
</head>
<body style="margin:0;padding:0;background:{FOG};">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:{FOG};">{c['preheader']}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:{FOG};">
  <tr>
    <td align="center" style="padding:32px 12px;">

      <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:{WHITE};border-radius:22px;overflow:hidden;">
        <!-- logo -->
        <tr>
          <td class="pad" align="left" style="padding:28px 40px 20px 40px;">
            <a href="{SITE}/{c['lang']}" style="text-decoration:none;"><img src="{IMG}/petprep-wordmark-320.png" width="110" height="36" alt="{c['logo_alt']}" style="display:block;border:0;width:110px;height:auto;"></a>
          </td>
        </tr>

        <!-- mint hero with the mascot -->
        <tr>
          <td class="pad" style="padding:0 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:{MINT};border-radius:22px;">
              <tr>
                <td align="center" style="padding:36px 24px 30px 24px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="background:{WHITE};border-radius:18px;padding:12px 18px;font-family:{BODY};font-size:15px;line-height:21px;font-weight:600;color:{INK};">{c['bubble']}</td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0;line-height:0;padding:0 0 10px 0;">
                        <div style="width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-top:10px solid {WHITE};margin:0 auto;">&nbsp;</div>
                      </td>
                    </tr>
                  </table>
                  <img src="{IMG}/petprep-mark-192.png" width="104" height="104" alt="{c['mark_alt']}" style="display:block;border:0;width:104px;height:104px;margin:0 auto;">
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- message -->
        <tr>
          <td class="pad" style="padding:32px 40px 8px 40px;">
            <h1 class="h1" style="margin:0 0 14px 0;font-family:{HEAD};font-size:32px;line-height:38px;font-weight:800;letter-spacing:-0.02em;color:{INK};">{c['title']}</h1>
            <p style="margin:0 0 22px 0;font-family:{BODY};font-size:17px;line-height:26px;color:{INK};">{c['lead']}</p>
          </td>
        </tr>

        <!-- promise -->
        <tr>
          <td class="pad" style="padding:0 40px 24px 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:{FOG};border-radius:16px;">
              <tr>
                <td style="padding:16px 20px;font-family:{BODY};font-size:15px;line-height:22px;color:{INK};">
                  <span style="font-weight:700;color:{MINT_TEXT};">{c['promise_title']}:</span> {c['promise']}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- what's coming -->
        <tr>
          <td class="pad" style="padding:0 40px 8px 40px;">
            <h2 style="margin:0 0 14px 0;font-family:{HEAD};font-size:20px;line-height:26px;font-weight:700;letter-spacing:-0.01em;color:{INK};">{c['what_title']}</h2>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{points}
            </table>
          </td>
        </tr>

        <!-- button -->
        <tr>
          <td class="pad" align="left" style="padding:8px 40px 32px 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" bgcolor="{INK}" style="border-radius:12px;">
                  <a href="{c['cta_href']}" style="display:inline-block;padding:14px 26px;font-family:{BODY};font-size:16px;line-height:20px;font-weight:700;color:{WHITE};text-decoration:none;border-radius:12px;">{c['cta']} &rarr;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- sign-off -->
        <tr>
          <td class="pad" style="padding:0 40px 32px 40px;border-top:1px solid {FOG};">
            <p style="margin:24px 0 6px 0;font-family:{BODY};font-size:16px;line-height:24px;color:{INK};">{c['signoff']}</p>
            <p style="margin:0;font-family:{HEAD};font-size:15px;line-height:22px;font-weight:700;color:{MUTED};">{c['slogan']}<span style="color:{RASP};">&#9679;</span></p>
          </td>
        </tr>
      </table>

      <!-- footer -->
      <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
        <tr>
          <td class="pad" align="center" style="padding:22px 40px 8px 40px;font-family:{BODY};font-size:12px;line-height:18px;color:{MUTED};">
            {c['why']}<br>
            {{% unsubscribe '{c['unsubscribe']}' %}}<br><br>
            {{{{ organization.name }}}} · {{{{ organization.full_address }}}}
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
</body>
</html>
"""


def text(c: dict) -> str:
    pts = "\n".join(f"- {t}: {d}" for t, d in c["points"])
    return (
        f"{c['title']}\n\n{c['lead']}\n\n{c['promise_title']}: {c['promise']}\n\n"
        f"{c['what_title']}\n{pts}\n\n{c['cta']}: {c['cta_href']}\n\n"
        f"{c['signoff'].replace('<br>', chr(10))}\n{c['slogan']}\n\n"
        f"{c['why']}\n{c['unsubscribe']}: {{% unsubscribe_url %}}\n"
        "{{ organization.name }} · {{ organization.full_address }}\n"
    )


if __name__ == "__main__":
    out = Path(__file__).parent
    for lang, c in COPY.items():
        (out / f"early-access-welcome.{lang}.html").write_text(html(c), encoding="utf-8")
        (out / f"early-access-welcome.{lang}.txt").write_text(text(c), encoding="utf-8")
        print(f"{lang}: subject «{c['subject']}»")
