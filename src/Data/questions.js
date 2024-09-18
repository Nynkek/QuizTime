export const questions_multiple_choice = [
    {
        title: 'Van wie is de hobby:',
        focused_word: 'borduren',
        type: 'checkbox',
        q_options: ['Nynke', 'Margriet', 'Jan', 'Teun'],
        answer: 'Nynke',
    },
];

export const questions_drag_and_drop = [
    {
        title: 'Welke oogkleur hoort bij wie?',
        type: 'drag_and_drop',
        q_options: ['Nynke', 'Margriet', 'Jan', 'Teun'],
        a_options: ['bruin', 'groen', 'blauw', 'paars'],
        answer_ordered: ['bruin', 'blauw', 'paars', 'groen']
    },
];

export const questions_reorder = [
    {
        title: 'Sorteer de volgende mensen op',
        focused_word: 'Lengte',
        type: 'reorder',
        q_options: ['Nynke', 'Margriet', 'Jan', 'Teun'],
        answer_ordered: ['Nynke', 'Jan', 'Margriet', 'Teun']
    },
];

export const questions_two_options = [
    {
        title: 'Pim knipt al 10 jaar Nynkes hoofdhaar',
        type: 'radio',
        q_options: ['niet waar', 'waar'],
        answer: ['waar']
    },
];