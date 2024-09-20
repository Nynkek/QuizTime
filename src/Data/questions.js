export const questions_multiple_choice = [
    {
        title: 'Van wie is de hobby:',
        focused_word: 'borduren',
        type: 'checkbox',
        question_options: ['Nynke', 'Margriet', 'Jan', 'Teun'],
        answer: 'Nynke',
    },
    {
        title: 'Van wie is de hobby:',
        focused_word: 'kogelstoten',
        type: 'checkbox',
        question_options: ['Nynke', 'Toes', 'Jan', 'Pim'],
        answer: 'Toes',
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

export const questions_two_options = [
    {
        title: 'Pim knipt al 10 jaar Nynkes hoofdhaar',
        type: 'radio',
        question_options: ['niet waar', 'waar'],
        answer: ['waar']
    },
];