import Game from "./classes/Game"

let width = 500;
let height = 500;
let enemyCount = 5;
let game = new Game(width, height, enemyCount);

function level1() {
    game.player.difference = 0.2
    game.player.steerDamping = 0.1
    game.player.speedMax = 3
}
function level2() {
    game.player.difference = 0.7
    game.player.steerDamping = 0.4
    game.player.speedMax = 6
}
function level3() {
    game.player.difference = 1.1
    game.player.steerDamping = 0.7
    game.player.speedMax = 9
}

console.log("ok");

$("#level1").on("click", () => { level1(); $("#level").text("level1"); console.log("1"); })
$("#level2").on("click", () => { level2(); $("#level").text("level2"); console.log("2"); })
$("#level3").on("click", () => { level3(); $("#level").text("level3"); console.log("3"); })
