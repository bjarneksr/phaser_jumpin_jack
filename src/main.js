import './style.css'
import Phaser from 'phaser'
import { Game } from './scenes/Game.js'

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 700,
  backgroundColor: '#097e1aff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }
    }
  },
  scene: [Game]
}

new Phaser.Game(config)