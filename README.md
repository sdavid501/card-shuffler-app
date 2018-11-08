# card-shuffler-app
A simple angular application to draw a hand from a deck of cards.


Rules
Your interface should have 1 page that has a draw button, four filters, and a view of the current
hand you have drawn. We can assume that after ever draw all cards are shuffled back into the
deck and every hand being drawn is taken from a full deck.
Four Filters - The four filters should allow you to filter by the following:

- Possible card Suit (spade, heart, club, diamond -- multi-selection preferred),
- number of Cards in a hand (1-52),
- Max card Value (e.g.: No cards larger than a Jack),
- Min Card Value (e.g.: No cards lower than a 4).

All hands must consist of unique cards and randomized (to the best of your ability)
Hand size should be dynamic based on the filters selected. I.e.: If you have selected Spades,
and Hearts as possible suits your hands size should not be able to be larger than 26 etc..
Future builds may require that you add more Decks to draw from.
