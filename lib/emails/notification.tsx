function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function NotificationEmail({ email }: { email: string }): string {
  const safeEmail = esc(email);
  const now = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Douala',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Nouvelle inscription RSVP — PAINTCAM</title></head><body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4"><tbody><tr><td align="center" style="padding:40px 16px"><table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:4px;overflow:hidden"><tbody><tr><td style="background-color:#D7B66F;padding:18px 28px"><p style="margin:0;color:#030303;font-size:12px;letter-spacing:0.25em;text-transform:uppercase;font-weight:700">PAINTCAM — Nouvelle inscription RSVP</p></td></tr><tr><td style="padding:32px 28px 24px"><p style="margin:0 0 24px;color:#111;font-size:15px;line-height:1.6">Une nouvelle personne vient de confirmer sa présence à la soirée des 20 ans.</p><table cellpadding="0" cellspacing="0" width="100%" style="background-color:#f9f6ef;border:1px solid #e8dfc8;margin-bottom:24px"><tbody><tr><td style="padding:20px 24px"><p style="margin:0 0 4px;color:#888;font-size:10px;letter-spacing:0.2em;text-transform:uppercase">Email inscrit</p><p style="margin:0;color:#111;font-size:18px;font-weight:700">${safeEmail}</p></td></tr></tbody></table><table cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid #eee;border-bottom:1px solid #eee;margin-bottom:24px"><tbody><tr><td style="padding:14px 0"><p style="margin:0;color:#888;font-size:10px;letter-spacing:0.2em;text-transform:uppercase">Horodatage (Douala)</p><p style="margin:5px 0 0;color:#555;font-size:13px">${now}</p></td></tr></tbody></table><p style="margin:0;color:#888;font-size:12px;line-height:1.6">Répondez directement à <a href="mailto:${safeEmail}" style="color:#B8953E;text-decoration:none;font-weight:700">${safeEmail}</a> pour toute communication personnalisée.</p></td></tr><tr><td style="background-color:#fafafa;border-top:1px solid #eee;padding:14px 28px"><p style="margin:0;color:#bbb;font-size:11px">PAINTCAM Industries S.A. · reservation@paintcam.com · +237 6 98 88 08 88</p></td></tr></tbody></table></td></tr></tbody></table></body></html>`;
}
