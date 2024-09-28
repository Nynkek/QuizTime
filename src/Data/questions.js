// 0 = niet waar
// 1 = waar
export const questions_two_options = [
  {
    title: "Pim knipt al meer dan 5 jaar Nynkes hoofdhaar",
    type: "radio",
    q_options: ["✗ niet waar", "✓ waar"],
    answer: 1,
  },
  {
    title: "Freerk houdt niet van honden",
    type: "radio",
    q_options: ["✗ niet waar", "✓ waar"],
    answer: 1,
  },
  {
    title: "Margriet heeft rugby gespeeld",
    type: "radio",
    q_options: ["✗ niet waar", "✓ waar"],
    answer: 1,
  },
  {
    title: "Fokje heeft haar sleutelbeen gebroken met skiën",
    type: "radio",
    q_options: ["✗ niet waar", "✓ waar"],
    answer: 0,
  },
  {
    title: "Teun houdt van school",
    type: "radio",
    q_options: ["✗ niet waar", "✓ waar"],
    answer: 1,
  },
  {
    title: "Mathijs beweegt vaak heen en weer als hij wil slapen",
    type: "radio",
    q_options: ["✗ niet waar", "✓ waar"],
    answer: 1,
  },
  {
    title:
      "Toen Marlies jong was, had ze een muntje in het ventilatorrooster van de auto gegooid. Omdat ze kort daarna een nieuwe auto kreeg, was ze er lange tijd van overtuigd dat ze de oude auto had gesloopt.",
    type: "radio",
    q_options: ["✗ niet waar", "✓ waar"],
    answer: 0,
  },
];

export const questions_multiple_choice = [
  {
    title: "Van wie is de hobby:",
    focused_word: "borduren",
    type: "checkbox",
    q_options: ["Nynke", "Margriet", "Jan", "Jos"],
    answer_index: [0],
  },
  {
    title: "Wie heeft blauwe ogen",
    focused_word: "ogen",
    type: "checkbox",
    q_options: ["Michiel", "Hannie", "Teun", "Lina", "Sytske"],
    answer_index: [1, 3],
  },
  {
    title: "Wie heeft wel eens een bot",
    focused_word: "gebroken",
    type: "checkbox",
    q_options: ["Lisa", "Noor", "Hannie", "Wytse", "Freerk"],
    answer_index: [1, 4],
  },
  {
    title: "Wie is er na 2000 geboren?",
    focused_word: "geboren",
    type: "checkbox",
    q_options: ["Lina", "Jouke", "Wytse", "Juniper", "Lisa"],
    answer_index: [0, 1, 2, 3],
  },
];

export const questions_reorder = [
  {
    title: "Sorteer de volgende mensen op",
    focused_word: "Lengte",
    type: "drag_and_drop",
    question_options: ["Elliott", "Jouke", "Margriet", "Marlies"],
    answer_order_indices: [1, 3, 2, 0],
    options_measurement: ["Langst", "Kortst"],
  },
  {
    title: "Wie is er het langst",
    focused_word: "samen",
    type: "drag_and_drop",
    question_options: [
      "Pim & Nynke",
      "Fokje & Michiel",
      "Hanna & Jouke",
      "Corrie & Koos",
    ],
    answer_order_indices: [3, 0, 1, 2],
    options_measurement: ["Langst", "Kortst"],
  },
  {
    title: "Zet de gebeurtenissen op",
    focused_word: "datum",
    type: "drag_and_drop",
    question_options: [
      "Freerk en Marlies trouwen",
      "Fokje wordt 20 jaar",
      "Koos & Corrie trouwen",
      "Nynke wordt geboren",
    ],
    answer_order_indices: [3, 1, 0, 2],
    options_measurement: ["Oudst", "Recent"],
  },
];

export const questions_drag_and_drop = [
  {
    title: "Welk huisdier hoort bij wie?",
    type: "drag_and_drop",
    question_options: ["Noor", "Jurjen", "Femke", "Jan"],
    answer_options: [
      "Kat, Mickey",
      "Kat, Muis",
      "Hond, Sparky",
      "Kat, de rode",
    ],
    answer_ordered: [1, 0, 2, 3],
  },
  {
    title: "Welke bijnaam hoort bij wie?",
    type: "drag_and_drop",
    question_options: ["Jurjen", "Margriet", "Nynke", "Corrie"],
    answer_options: ["Knilles", "Mooike", "Kekje", "Snurk"],
    answer_ordered: [3, 1, 2, 0],
  },
  {
    title: "Wie omschrijft zichzelf met:",
    type: "drag_and_drop",
    question_options: ["Sytske", "Sander", "Tessa", "Fokje"],
    answer_options: ["Fantastierijk", "Kikker", "Spectaculair", "Lekkerbek"],
    answer_ordered: [2, 0, 1, 3],
  },
];
