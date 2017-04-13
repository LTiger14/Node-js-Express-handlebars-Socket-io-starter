var socket = io();
var isValid = true;

var renderer = PIXI.autoDetectRenderer(800, 600);
var graphic = new PIXI.Graphics();
document.body.appendChild(renderer.view);

//Rectangle
var stage = new PIXI.Container();
graphic.beginFill(0x808080);
graphic.drawRect(0, 0, 100, 100);
graphic.endFill();
var texture = graphic.generateTexture();
var rect = new PIXI.Sprite(texture);
rect.anchor.set(0.5);
rect.position.x = 0;
rect.position.y = 0;
rect.rotation = 10;
stage.addChild(rect);

// Opt-in to interactivity
rect.interactive = true;
// Shows hand cursor
rect.buttonMode = true;
// Pointers normalize touch and mouse
rect.on('pointerdown', rectClick);

renderer.autoResize = true;
renderer.backgroundColor = 0xffffff;
renderer.render(stage);

function rectClick() {
    socket.emit('square press', {valid: isValid});
}

socket.on('update', function(msg) {
    isValid = msg.valid;
    stage.removeChild(rect);
    graphic = new PIXI.Graphics();
    if (!msg.valid) {
        graphic.beginFill(0xe60000);
    } else {
        graphic.beginFill(0x808080);
    }
    graphic.drawRect(0, 0, msg.h, msg.w);
    graphic.endFill();
    texture = graphic.generateTexture();
    rect = new PIXI.Sprite(texture);
    rect.anchor.set(0.5);
    rect.position.x = msg.x;
    rect.position.y = msg.y;
    rect.rotation = 0;
    // Opt-in to interactivity
    rect.interactive = true;
    // Shows hand cursor
    rect.buttonMode = true;
    // Pointers normalize touch and mouse
    rect.on('pointerdown', rectClick);
    stage.addChild(rect);
    renderer.render(stage);
});