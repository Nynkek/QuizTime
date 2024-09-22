
// 0 = niet waar
// 1 = waar
export const questions_two_options = [
    {
        title: 'Pim knipt al 10 jaar Nynkes hoofdhaar',
        type: 'radio',
        q_options: ['✗ niet waar', '✓ waar'],
        answer: 1,
    },
    {
        title: 'Freerk houdt niet van honden',
        type: 'radio',
        q_options: ['✗ niet waar', '✓ waar'],
        answer: 1,
    },
    {
        title: 'Margriet heeft rugby gespeeld',
        type: 'radio',
        q_options: ['✗ niet waar', '✓ waar'],
        answer: 1,
    },
    {
        title: 'Fokje heeft haar sleutelbeen gebroken met skieen',
        type: 'radio',
        q_options: ['✗ niet waar', '✓ waar'],
        answer: 0,
    },
    {
        title: 'Toen Hannie jong was had ze een muntje in het ventilatorrooster van de auto gegooid. Omdat ze kort daarna een nieuwe auto kregen, was ze er lange tijd van overtuigd dat ze de oude auto had gesloopt.',
        type: 'radio',
        q_options: ['✗ niet waar', '✓ waar'],
        answer: 0,
    },
];


export const questions_multiple_choice = [
    {
        title: 'Van wie is de hobby:',
        focused_word: 'borduren',
        type: 'checkbox',
        q_options: ['Nynke', 'Margriet', 'Jan', 'Teun'],
        answer_index: [0]
    },
    {
        title: 'Van wie is de hobby:',
        focused_word: 'kogelstoten',
        type: 'checkbox',
        q_options: ['Nynke', 'Toes', 'Jan', 'Pim'],
        answer_index: [1, 2]
    },

];

export const questions_drag_and_drop = [
    {
        title: 'Welke oogkleur hoort bij wie?',
        type: 'drag_and_drop',
        question_options: ['Nynke', 'Margriet', 'Jan', 'Teun'],
        answer_options: ['bruin', 'groen', 'blauw', 'paars'],
        answer_ordered: ['bruin', 'blauw', 'paars', 'groen']
    },
];

export const questions_reorder = [
    {
        title: 'Sorteer de volgende mensen op',
        focused_word: 'Lengte',
        type: 'reorder',
        question_options: ['Nynke', 'Margriet', 'Jan', 'Teun'],
        answer_ordered: ['Nynke', 'Jan', 'Margriet', 'Teun']
    },
];
