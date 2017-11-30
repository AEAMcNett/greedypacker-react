export const h_choices = {
  'Shelf':
    ['First Fit',
     'Next Fit',
     'Best Width Fit',
     'Best Height Fit',
     'Best Area Fit',
     'Worst Width Fit',
     'Worst Height Fit',
     'Worst Area Fit'
    ],
    'Guillotine':
    ['Best Shortside',
     'Best Longside',
     'Best Area',
     'Worst Shortside',
     'Worst Longside',
     'Worst Area',
    ],
    'Maximal Rectangle':
    ['Best Shortside',
     'Best Longside',
     'Best Area',
     'Worst Shortside',
     'Worst Longside',
     'Worst Area',
     'Bottom Left',
     'Contact Point',
    ],
    'Skyline':
    ['Bottom Left',
     'Best Fit'
    ]
}
  
export const sorting_choices = ['ASCA', 'DESCA', 'ASCSS', 'DESCSS',
                        'ASCLS', 'DESCLS', 'ASCPERIM', 'DESCPERIM',
                        'ASCDIFF', 'DESCDIFF', 'ASCRATIO', 'DESCRATIO', 'None']

export const bin_algo_choices = ['bin first fit', 'bin best fit']

export const algo_choices = ['Shelf', 'Guillotine', 'Maximal Rectangle', 'Skyline']
