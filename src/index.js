import logMessage from './js/logger'
import './css/style.scss'
import dat from 'dat.gui';
import Game from './ts/classes/Game'

let width = 500;
let height = 500;
let enemyCount = 0;
let game = new Game(width, height, enemyCount);

let presets = {
    "preset": "2/3",
    "closed": false,
    "remembered": {
      "1/3": {
        "0": {
          "damping": 0.02,
          "friction": 0.02,
          "force": 0.08
        },
        "1":{
          "speedFactor": 2
        }
      }     ,
      "2/3": {
        "0": {
          "damping": 0.04,
          "friction": 0.04,
          "force": 0.16
        },
        "1":{
          "speedFactor": 4
        }
      }     ,
      "3/3": {
        "0": {
          "damping": 0.08,
          "friction": 0.08,
          "force": 0.32,
        },
        "1":{
          "speedFactor": 6
        }
      }      
    }
  };


const gui = new dat.GUI({ load: presets, preset: '2/3', width:300});
gui.remember(game.player.controls);
gui.remember(game.player);
gui.add(game.player.controls, 'damping').min(0).max(0.2).step(0.01);
gui.add(game.player.controls, 'friction').min(0).max(0.2).step(0.01);
gui.add(game.player.controls, 'force').min(0).max(0.4).step(0.01);
gui.add(game.player, 'speedFactor').min(0).max(10).step(1);

console.log("ok");

// Log message to console
logMessage('A very warm welcome to Expack!')
// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef  
}