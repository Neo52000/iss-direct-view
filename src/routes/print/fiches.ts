import { createFileRoute } from "@tanstack/react-router";
import { printDoc } from "@/lib/print-utils";

export const Route = createFileRoute("/print/fiches")({
  server: {
    handlers: {
      GET: async () => {
        const body = `
<h1>📘 Fiches pédagogiques — L'ISS</h1>

<!-- FICHE 1 : CYCLE 2 (CE1-CE2-CM1) -->
<div style="border:2px solid #111;border-radius:8px;padding:16px;margin:16px 0">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
    <span style="background:#111;color:#fff;padding:4px 12px;border-radius:20px;font-family:Arial,sans-serif;font-size:11px;font-weight:700">CYCLE 2 · CE1 – CM1</span>
    <span style="font-family:Arial,sans-serif;font-size:11px;color:#555">Découverte du monde · Sciences</span>
  </div>
  <h2 style="font-size:18px;margin-bottom:10px">La Station Spatiale Internationale</h2>

  <h3>🚀 Qu'est-ce que l'ISS ?</h3>
  <p>La Station Spatiale Internationale, appelée ISS (en anglais : <em>International Space Station</em>), est une grande station construite dans l'espace. Elle orbite autour de la Terre à environ <strong>400 kilomètres</strong> d'altitude — soit comme si elle était à la même distance que Paris à Marseille, mais vers le ciel !</p>
  <p>L'ISS fait le tour de la Terre en seulement <strong>90 minutes</strong>. C'est très rapide ! Elle vole à plus de 28 000 km/h.</p>

  <h3>👨‍🚀 Qui vit à bord ?</h3>
  <p>En général, <strong>6 astronautes</strong> vivent et travaillent sur l'ISS. Ils viennent de différents pays : États-Unis, Russie, Europe, Japon, Canada… Ils mangent, dorment, font des expériences scientifiques et font du sport — tout ça dans l'espace !</p>

  <h3>🌍 Peut-on voir l'ISS depuis la Terre ?</h3>
  <p>Oui ! Parfois, on peut voir l'ISS dans le ciel la nuit, comme une étoile très brillante qui se déplace vite. Elle apparaît quand le Soleil l'éclaire et que le ciel est sombre.</p>

  <h3>✏️ Questions</h3>
  <div style="font-family:Arial,sans-serif;font-size:12px">
    <p><strong>1.</strong> À quelle altitude vole l'ISS ? ___________________________</p>
    <p><strong>2.</strong> En combien de temps fait-elle le tour de la Terre ? ___________________________</p>
    <p><strong>3.</strong> Combien d'astronautes vivent à bord ? ___________________________</p>
    <p><strong>4.</strong> Que signifie le sigle ISS ? ___________________________</p>
    <p><strong>5.</strong> Dessine l'ISS dans l'encadré :</p>
    <div style="border:1px solid #ccc;border-radius:4px;height:80px;margin-top:6px"></div>
  </div>
</div>

<div class="page-break"></div>

<!-- FICHE 2 : CYCLE 3 (CM2-6e-5e) -->
<div style="border:2px solid #111;border-radius:8px;padding:16px;margin:16px 0">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
    <span style="background:#111;color:#fff;padding:4px 12px;border-radius:20px;font-family:Arial,sans-serif;font-size:11px;font-weight:700">CYCLE 3 · CM2 – 5e</span>
    <span style="font-family:Arial,sans-serif;font-size:11px;color:#555">Sciences et technologie · SVT</span>
  </div>
  <h2 style="font-size:18px;margin-bottom:10px">Vivre et travailler à bord de l'ISS</h2>

  <h3>🔬 Un laboratoire en apesanteur</h3>
  <p>L'ISS est un laboratoire scientifique unique. Les astronautes y mènent des expériences impossibles sur Terre grâce à l'<strong>apesanteur</strong> (absence de pesanteur ressentie). Ils étudient la biologie, la physique des fluides, la croissance des cristaux, l'adaptation du corps humain à l'espace, et bien d'autres domaines.</p>

  <h3>💧 L'eau et l'air en circuit fermé</h3>
  <p>Sur l'ISS, les ressources sont précieuses. L'eau est <strong>entièrement recyclée</strong> : la vapeur d'eau exhalée par les astronautes, la sueur, et même l'urine sont filtrées et purifiées pour redevenir de l'eau potable. L'oxygène est produit par électrolyse de l'eau (H₂O → H₂ + O₂).</p>

  <h3>🏋️ Maintenir sa santé en apesanteur</h3>
  <p>Sans gravité, les muscles et les os s'affaiblissent rapidement. Les astronautes doivent donc faire <strong>2 heures de sport par jour</strong> avec des équipements spéciaux fixés. Malgré cela, après 6 mois dans l'espace, leur corps a besoin de plusieurs semaines pour se réadapter à la gravité terrestre.</p>

  <h3>🌐 Une coopération internationale</h3>
  <p>L'ISS est le résultat d'une collaboration entre <strong>15 nations</strong> et 5 agences spatiales : NASA (USA), Roscosmos (Russie), ESA (Europe), JAXA (Japon) et CSA (Canada). Sa construction a commencé en 1998 et elle est habitée en permanence depuis novembre 2000.</p>

  <h3>✏️ Questions de compréhension</h3>
  <div style="font-family:Arial,sans-serif;font-size:12px">
    <p><strong>1.</strong> Qu'est-ce que l'apesanteur ? Pourquoi permet-elle des expériences impossibles sur Terre ?</p>
    <div style="border-bottom:1px solid #ccc;margin:4px 0;height:28px"></div>
    <div style="border-bottom:1px solid #ccc;margin:4px 0;height:28px"></div>
    <p style="margin-top:8px"><strong>2.</strong> Comment les astronautes obtiennent-ils de l'eau potable ?</p>
    <div style="border-bottom:1px solid #ccc;margin:4px 0;height:28px"></div>
    <p style="margin-top:8px"><strong>3.</strong> Pourquoi font-ils du sport chaque jour ? Quel risque prennent-ils sinon ?</p>
    <div style="border-bottom:1px solid #ccc;margin:4px 0;height:28px"></div>
    <div style="border-bottom:1px solid #ccc;margin:4px 0;height:28px"></div>
    <p style="margin-top:8px"><strong>4.</strong> Cite 3 pays qui participent à la construction de l'ISS :</p>
    <div style="border-bottom:1px solid #ccc;margin:4px 0;height:28px"></div>
    <p style="margin-top:8px"><strong>5.</strong> Calcule : si l'ISS fait 16 tours de la Terre par jour, combien en fait-elle en une semaine ?</p>
    <div style="border-bottom:1px solid #ccc;margin:4px 0;height:28px"></div>
  </div>
</div>

<p style="font-family:Arial,sans-serif;font-size:10px;color:#888;margin-top:16px;text-align:center">
  © ISS Direct France · iss-direct-france.fr · Reproduction autorisée à usage pédagogique
</p>
`;

        return new Response(printDoc("Fiches pédagogiques — L'ISS", body), {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
