# Pacman Project
##

## Tehcnologies Used:
HTML, CSS, Javascript.
## Bugs
Occasionally, when pacman is empowered by a powerPellet and goes unto the same space as a ghost, the ghosts's death is not triggered.
## Future improvements
Rendering the entire page at once, rather than rendering the individual elements at point of change.
Ghosts moving slower when they are scared.
Ghosts moving away from pacman when they are scared.
Ghost animation(where the ghosts flash white) triggering when the "Empowered" state duration is almost over.
Mutltiple boards and levels.
Weakening the ghosts' ai so they dont always take the best path.
Performance Optimizations.
Leaderboard Implementation.
Pacman death Animation
## How to Play
On page load click on the start button.
A countdown sequence should ensue.
Once countdown is over, control pacman by using (WASD) or ((←↑→↓)).
Collect as many pellets as you can by moving into a space with a pellet.
Avoid the ghosts, they will chase you and coming into contact with them reduces your number of lives.
Go through tunnels for a quick escape and come out the other side.
If your number of lives hits zero you lose and the game is over.
Eat all the pellets to win.
## User Flow
User lands on webpage
User is asked to enter a name.
User can navigate to choose board or level. The corresponding leader board for the level is shown.. the leaderboard should show the 10 hightest scores with the corresponding user names.
	1. Left right button  to move to the next or previous board.
	2. Central Play button to play the level.
	3. If user clicks the other space showing the board level, the user also plays the level.
Board is shown with message Ready!
Wait for key press any key press or click.
Starts listening for user movement keys
Valid key presses are arrow keys(←→↑↓) or WASD.
keypresses should translate into
A pacman in motion remains in motion until it either encounters an board terrain or the direction is changed.
after 3 seconds from the game start ghosts start to make their way towards pacman.
(distance function to control how the ghosts move. if equidistant from pacman, pick a random good direction.).
pacman can gobble up the items on spaces by moving into that space.
point dots add to the players score
if pacman can gobble up all the point dots on the board,pacman wins.
if pacman moves into a space with a ghost game pacman loses a life
if pacman moves into a space with a fruit then  pacman gets the powerup.
on game over show a leader board

the players points can be shown through out and update
when all lives are exhaused the game is over
if pacman wins the game is over

victory message goes across the board either you win. or you lost
after game is over show leader
## Special Thanks and Credits
Character Sprites provided by Caylie C [available on](https://www.spriters-resource.com/arcade/pacman/asset/159361/)
Map Sprites provided by Superjustinbros [avaialable on](https://www.spriters-resource.com/arcade/pacman/asset/52631/)
This could not have been possible without their great resources.