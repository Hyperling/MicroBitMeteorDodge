/* Program Log * /
    C.Greenwood
    2019-09-28, 2019-12-28
    Create a silly meteor dodging game.
/* End Program Log */

const boardSizeX = 5;
const boardSizeY = 5;

/* Enemy Actions */
function has_collided(x: number, y: number, otherX: number, otherY: number) {
    if (x == otherX && y == otherY) {
        return true;
    }
    return false;
}
function redraw_enemy(x: number, y: number) {
    led.unplot(x, y - 1);
    led.plot(x, y);
}

let round = 1;
basic.forever(function () {
    // Draw player
    player_x = ((boardSizeX - 1) / 2); // center on X axis. Do not allow this to have a decimal value
    player_y = boardSizeY - 1; // last row
    led.plot(player_x, player_y);

    // Difficulty config
    let time = 600; // 500 is somewhat slow but good for learning
    let win_time = 200; // 100 gets pretty fast at the end. 250 makes it easier to finish.
    let advance_time = 10; // 10 is somewhat balanced, 5 is a bit slower
    let enemies = [];
    while (time > win_time) {
        for (let i = 0; i < enemies.length; i++) { // change this x loop to be the Enemy array loop
            enemies[i].y += 1;
            redraw_enemy(enemies[i].x, enemies[i].y);
            // Player has been hit
            if (has_collided(enemies[i].x, enemies[i].y, player_x, player_y) === true) {
                print_frown();
                round = 1;
                return;
            }
            // Remove the meteor if it is in the line of movement
            if (enemies[i].y > player_y) {
                enemies.splice(i, 1);
            }
        }
        basic.pause(time);
        time = time - advance_time;
        if (enemies.length < round) {
            let enemy = {
                x: Math.randomRange(0, boardSizeX - 1),
                y: Math.randomRange((boardSizeY * -1) - 1, 0)
            };
            enemies.push(enemy);
            redraw_enemy(enemy.x, enemy.y);
        }
        led.plot(player_x, player_y);
    }
    print_smile();
    round = round + 1;
})
/* End Enemy Actions */

/* User Controls */
let player_x = ((boardSizeX - 1) / 2); // center on X axis. Do not allow this to have a decimal value
let player_y = boardSizeY - 1; // last row
input.onButtonPressed(Button.A, function () {
    led.unplot(player_x, player_y);
    if (player_x > 0) {
        player_x = player_x - 1;
    }
    led.plot(player_x, player_y);
})
input.onButtonPressed(Button.B, function () {
    led.unplot(player_x, player_y);
    if (player_x < (boardSizeX - 1)) {
        player_x = player_x + 1;
    }
    led.plot(player_x, player_y);
})
/* End User Controls */

/* Supporting Functions */
function print_frown() {
    clear_board();
    // eyes
    led.plot(1, 1);
    led.plot(3, 1);
    // mouth
    led.plot(0, 4);
    led.plot(1, 3);
    led.plot(2, 3);
    led.plot(3, 3);
    led.plot(4, 4);
    basic.pause(10000); // 10 seconds
    clear_board();
}

function print_smile() {
    clear_board();
    // eyes
    led.plot(1, 1);
    led.plot(3, 1);
    // mouth
    led.plot(0, 3);
    led.plot(1, 4);
    led.plot(2, 4);
    led.plot(3, 4);
    led.plot(4, 3);
    basic.pause(2000); // 2 seconds
    clear_board();
}

function clear_board() {
    // unplot everything
    for (let i = 0; i < boardSizeX; i++) {
        for (let j = 0; j < boardSizeY; j++) {
            led.unplot(i, j);
        }
    }
}
/* End Supporting Functions */
