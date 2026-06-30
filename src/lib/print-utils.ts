/** Wrap HTML body content in a standalone printable HTML document */
export function printDoc(title: string, body: string, extraStyles = ""): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title} — ISS Direct France</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Georgia,'Times New Roman',serif;color:#111;background:#fff;padding:20px;max-width:800px;margin:0 auto}
  h1{font-family:Arial,sans-serif;font-size:28px;font-weight:900;letter-spacing:-0.5px;margin-bottom:4px}
  h2{font-family:Arial,sans-serif;font-size:18px;font-weight:700;margin:20px 0 8px}
  h3{font-family:Arial,sans-serif;font-size:14px;font-weight:700;margin:14px 0 6px}
  p{line-height:1.55;margin-bottom:8px;font-size:13px}
  .brand{font-size:11px;color:#555;margin-bottom:16px;font-family:Arial,sans-serif}
  .divider{border:none;border-top:2px solid #111;margin:12px 0}
  .page-break{page-break-after:always;break-after:page}
  @media print{
    body{padding:0}
    .no-print{display:none}
    a{color:#111;text-decoration:none}
  }
  ${extraStyles}
</style>
</head>
<body>
<p class="brand">🛰️ ISS Direct France · iss-direct-france.fr</p>
<hr class="divider"/>
${body}
<div class="no-print" style="margin-top:32px;text-align:center">
  <button onclick="window.print()" style="background:#0b1530;color:#fff;border:none;padding:12px 28px;border-radius:24px;font-size:15px;font-weight:700;cursor:pointer">
    🖨️ Imprimer / Enregistrer en PDF
  </button>
  <button onclick="window.close()" style="background:#f0f0f0;color:#333;border:none;padding:12px 28px;border-radius:24px;font-size:15px;margin-left:12px;cursor:pointer">
    Fermer
  </button>
</div>
<script>
  // Auto-print après chargement (si ouvert depuis le site)
  if(window.opener){ window.addEventListener('load',()=>{ setTimeout(()=>window.print(),400) }) }
</script>
</body>
</html>`;
}
