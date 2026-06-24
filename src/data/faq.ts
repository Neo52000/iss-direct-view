export interface FaqItem {
  q: string;
  a: string;
}

export const homeFaq: FaqItem[] = [
  {
    q: "Pourquoi l'image est parfois noire ?",
    a: "L'ISS effectue un tour de la Terre toutes les 90 minutes environ. Quand elle passe du côté nuit de la planète, les caméras extérieures ne reçoivent plus assez de lumière et l'image devient noire. C'est normal et temporaire.",
  },
  {
    q: "Le flux est-il vraiment en direct ?",
    a: "Oui, le flux vidéo provient des caméras extérieures de la Station Spatiale Internationale, retransmis par la NASA via YouTube. Il peut exister un léger délai technique de quelques secondes.",
  },
  {
    q: "Peut-on voir l'ISS à l'œil nu ?",
    a: "Oui. L'ISS est l'un des objets les plus brillants du ciel nocturne. Elle apparaît comme un point lumineux blanc qui traverse rapidement le ciel, sans clignoter. Les meilleurs créneaux sont juste après le coucher du soleil ou avant l'aube.",
  },
  {
    q: "À quelle vitesse se déplace l'ISS ?",
    a: "L'ISS file à environ 28 000 km/h sur une orbite basse. Elle parcourt la distance Paris–New York en moins de 13 minutes.",
  },
  {
    q: "À quelle altitude vole l'ISS ?",
    a: "Entre 400 et 420 kilomètres d'altitude. Son orbite est régulièrement rehaussée pour compenser le frottement de la haute atmosphère.",
  },
  {
    q: "Comment savoir quand l'ISS passe au-dessus de ma ville ?",
    a: "Activez la géolocalisation ou indiquez votre ville sur notre page Passages : nous calculons les créneaux d'observation visibles à l'œil nu et vous pouvez les ajouter à votre calendrier.",
  },
  {
    q: "Pourquoi voit-on parfois un écran bleu ou gris ?",
    a: "Lors de pertes de signal entre l'ISS et le sol, ou pendant certaines opérations techniques, la NASA diffuse une mire ou une image statique. Le live reprend automatiquement.",
  },
  {
    q: "Ce site est-il affilié à la NASA ?",
    a: "Non. ISS Direct France est un site indépendant. Le flux vidéo est fourni par la NASA via YouTube, et les données de position proviennent d'APIs publiques de suivi orbital.",
  },
];