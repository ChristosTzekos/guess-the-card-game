# Guess The Card Game
### JavaScript, HTML, CSS ###
It's a two-player, ten round card game.
Each player picks acard and as a round starts,
cards are randomly generated anddisplayed on screen 
until one of them matches the card 
that aplayer picked. Then the round concludes. 
The first player that wins
ten rounds wins the game.

An image of each card is saved in "cards" folder
as shown below.
#
1-> ace of clubs, 2-> ace of diamonds<br />
3-> ace of hearts, 4-> ace of spades<br />
5-> 2 of clubs, 6-> 2 of diamonds <br />
...<br />
51-> king of hearts, 52-> king of diamonds.<br />
#
The random generation of cards is being accomplished by
generating a random number from 1 to 52.
Each number represents a specific card with the same way that
the cards are named in the "cards" folder.

Players, each round, guess just one of the 13 ranks:
Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen or King.
The suit of a card (♣,♦,♥,♠) is not taken in consideration 
when checking if it has been picked by a player.

The code below is used to represent the four suits
of each rank with just the rank of the card.<br />
` actualNumber = Math.ceil(guessedNumber / 4); `<br />
*guessedNumber stands for the random number from 1 to 52.

That way we achive this mapping:

1♣(1)  &emsp;   1♦(2) &emsp;   1♥(3)   &emsp;  1♠(4) -> 1<br />
1♣(5)   &emsp;  1♦(6)  &emsp;   1♥(7)   &emsp;  1♠(8) -> 2 etc. 

*The numbers inside the round brackets 
are the real values of each card in the arr = [1,2,..,52].





