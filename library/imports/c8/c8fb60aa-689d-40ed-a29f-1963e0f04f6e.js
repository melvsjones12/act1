"use strict";
cc._RF.push(module, 'c8fb6CqaJ1A7aKfGWPg8E9u', 'ball');
// Scripts/ball.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        acceleration: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        // switch of acceleration direction
        this.accLeft = false;
        this.accRight = false;
        this.accUp = false;
        this.accDown = false;
        // current horizontal speed of main character
        this.xSpeed = 0;
        this.ySpeed = 0;

        this.setInputControl();

        //ball
        this.ballSize = 127 / 2;

        //canvas
        this.width = 960 / 2;
        this.height = 640 / 2;
    },

    setInputControl: function setInputControl() {
        var self = this;
        // add keyboard event listener
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // When there is a key being pressed down, judge if it's the designated directional button and set up acceleration in the corresponding direction
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.d:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                    case cc.KEY.w:
                        self.accUp = true;
                        self.accDown = false;
                        break;
                    case cc.KEY.s:
                        self.accUp = false;
                        self.accDown = true;
                        break;
                }
            },
            // when releasing the button, stop acceleration in this direction
            onKeyReleased: function onKeyReleased(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                    case cc.KEY.w:
                        self.accUp = false;
                        break;
                    case cc.KEY.s:
                        self.accDown = false;
                        break;
                }
            }
        }, self.node);
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {

        // update speed of each frame according to the current acceleration direction
        if (this.accLeft) {
            this.xSpeed -= this.acceleration * 50 * dt;

            if (this.node.x <= -1 * this.width + this.ballSize) this.xSpeed = 0;
        } else if (this.accRight) {
            this.xSpeed += this.acceleration * 50 * dt;

            if (this.node.x <= -1 * this.width + this.ballSize) this.xSpeed = 0;
        } else {
            this.xSpeed = 0;
        }
        // up and down
        if (this.accUp) {
            this.ySpeed += this.acceleration * 50 * dt;

            if (this.node.y >= this.height - this.ballSize) this.ySpeed = 0;
        } else if (this.accDown) {
            this.ySpeed -= this.acceleration * 50 * dt;

            if (this.node.y <= -1 * this.height + this.ballSize) this.ySpeed = 0;
        } else {
            this.ySpeed = 0;
        }

        // update the position of the main character according to the current speed
        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;
    }
});

cc._RF.pop();