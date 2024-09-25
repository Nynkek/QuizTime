// De volgorde waarop elk team de enveloppen te zien krijgt
export const teamOrder = [
  [0, 3, 1, 2],
  [2, 0, 3, 1],
  [3, 1, 2, 0],
  [1, 2, 0, 3],
];

export const envelops = [
  {
    color: "Groen",
    location: "Lorentz",
    question: "Hoeveel mensen staan er afgebeeld?",
    photoPrompt: "Neem allemaal dezeflde houding aan als het grootste beeld.",
    type: "input",
    answer_options: ["zeven", "7"],
  },
  {
    color: "Blauw",
    location: "Grote Waterval",
    question: "Naar welke windrichting stroomt de waterval?",
    photoPrompt: "Poseer op een rijtje, gesorteerd op lengte",
    type: "input",
    answer_options: ["zuiden", "zuid", "zw", "zuid-west", "westen", "west"],
  },
  {
    color: "Roze",
    location: "Belvedère",
    question: "Hoeveel deuren zie je als je voor de toren staat?",
    photoPrompt:
      "Zoek de mooiste bladeren uit en laat die zien! Leg ze na de foto in een mooi patroon, zodat de volgende groep ze opvalt.",
    type: "input",
    answer_options: ["twee", "2"],
  },
  {
    color: "Geel",
    location: "Zwanenbrug",
    question: "Hoeveel zwanen tel je op de brug?",
    photoPrompt: "Doe iets met het woord ‘Zwanenmeer’",
    type: "input",
    answer_options: ["zes", "6"],
  },
];
