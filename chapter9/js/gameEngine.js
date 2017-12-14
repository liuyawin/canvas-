var getTimeNow = function () {
    return +new Date();
}

//Game..............
function Game(gameName, canvasId) {
    var canvas = document.getElementById(canvasId),
        self = this;

    this.context = canvas.getContext('2d');
    this.gameName = gameName;
    this.sprites = [];
    this.keyListeners = [];

    this.HIGH_SCORE_SUFFIX = '_highscores';

    this.imageLoadingProgressCallback;
    this.images = {};
    this.imageUrls = [];
    this.imagesLoaded = 0;
    this.imagesFailedToLoad = 0;
    this.imageIndex = 0;

    this.startTime = 0;
    this.lastTime = 0;
    this.gameTime = 0;
    this.fps = 0;
    this.STARTING_FPS = 60;

    this.paused = false;
    this.startedPausedAt = 0;
    this.PAUSE_TIMEOUT = 100;

    this.soundOn = true;
    this.soundChannels = [];
    this.audio = new Audio();
    this.NUM_SOUND_CHANNELS = 10;

    for (var i = 0; i < this.NUM_SOUND_CHANNELS; ++i) {
        var audio = new Audio();
        this.soundChannels.push(audio);
    }

    window.onkeyup = function (e) {
        self.keyPressed(e);
    }

    window.onkeydown = function (e) {
        self.keyPressed(e);
    }
}

Game.prototype = {
    constructor: Game,

    //图片资源加载相关
    getImage: function (imageUrl) {
        return this.images[imageUrl];
    },

    imageLoadCallback: function () {
        this.imagesLoaded++;
    },

    imageLoadErrorCallback: function () {
        this.imagesFailedToLoad++;
    },

    loadImage: function (imageUrl) {
        var image = new Image(),
            self = this;

        image.src = imageUrl;
        image.onload = function (e) {
            self.imageLoadCallback(e);
        };
        image.onerror = function (e) {
            self.imageLoadErrorCallback(e);
        };
        this.images[imageUrl] = image;
    },

    loadImages: function () {
        if (this.imageIndex < this.imageUrls.length) {
            this.loadImage(this.imageUrls(this.imageIndex));
            this.imageIndex++;
        }
        return (this.imagesLoaded + this.imagesFailedToLoad) / this.imageUrls.length * 100;
    },

    queueImage: function (imageUrl) {
        this.imageUrls.push(imageUrl);
    },

    //游戏循环相关
    start: function () {
        var self = this;
        this.startTime = getTimeNow();

        window.requestNexnAnimationFrame(function (time) {
            self.animate.call(self, time);
        });
    },

    animate: function (time) {
        var self = this;

        if (this.paused) {
            setTimeout(function () {
                self.animate.call(self, time);
            }, this.PAUSE_TIMEOUT);
        } else {
            this.tick(time);
            this.clearScreen();

            this.startAnimate(time);
            this.paintUnderSprites();

            this.updateSprites(time);
            this.paintSprites(time);

            this.paintOverSprites();
            this.endAnimate();

            window.requestNexnAnimationFrame(
                function (time) {
                    self.animate.call(self, time);
                }
            );
        }
    },

    tick: function (time) {
        this.updateFrameRate(time);
        this.gameTime = (getTimeNow() - this.startTime);
        this.lastTime = time;
    },

    updateFrameRate: function (time) {
        if (this.lastTime === 0) {
            this.fps = this.STARTING_FPS
        } else {
            this.fps = 1000 / (time - this.lastTime);
        }
    },

    clearScreen: function () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    },

    updateSprites: function (time) {
        for (var i = 0; i < this.sprites.length; i++) {
            var sprite = this.sprites[i];
            if (sprite.visible) {
                sprite.paint(this.context);
            }
        }
    },

    togglePaused: function () {
        var now = getTimeNow();

        this.paused = !this.paused;

        if (this.paused) {
            this.startedPausedAt = now;
        } else {
            this.startTime = this.startTime + now - this.startedPausedAt;
            this.lastTime = now;
        }
    },

    pixelsPerFrame: function (time, velocity) {
        return velocity / this.fps;
    },

    //高分榜相关
    getHighScores: function () {
        var key = this.gameName + this.HIGH_SCORE_SUFFIX,
            highScoreString = localStorage[key];

        if (highScoreString == undefined) {
            localStorage[key] = JSON.stringify([]);
        }

        return JSON.parse(localStorage[key]);
    },

    setHighScore: function (highScore) {
        var key = this.gameName + this.HIGH_SCORE_SUFFIX,
            highScoreString = localStorage[key];

        highScore.unshift(highScore);
        localStorage[key] = JSON.stringify(highScore);
    },

    clearHighScores: function () {
        localStorage[this.gameName + this.HIGH_SCORE_SUFFIX] = JSON.stringify([]);
    },

    //按键事件监听
    addKeyListener: function (keyAndListener) {
        this.keyListeners.push(keyAndListener);
    },

    findKeyListener: function (key) {
        var listener = undefined;

        for (var i = 0; i < this.keyListeners.length; i++) {
            var keyAndListener = this.keyListeners[i],
                currentKey = keyAndListener.key;

            if (currentKey == key) {
                listener = keyAndListener.listener;
            }
        }
        return listener;
    },

    keyPress: function (e) {
        var listener = undefined,
            key = undefined;

        switch (key) {
            case 32: key = 'space'; break;
            case 68: key = 'd'; break;
            case 75: key = 'k'; break;
            case 83: key = 's'; break;
            case 80: key = 'p'; break;
            case 37: key = 'left arrow'; break;
            case 39: key = 'right arrow'; break;
            case 38: key = 'up arrow'; break;
            case 40: key = 'down arrow'; break;
        }

        listener = this.findKeyListener(key);
        if (listener) {
            listener();
        }
    },

    //声音相关
    canPlayOggVorbis: function () {
        return "" != this.audio.canPlayType('audio/ogg; codecs="vorbis"');
    },

    canPlayMp3: function () {
        return "" != this.audio.canPlayType('audio/mpeg');
    },

    getAvailableSoundChannel: function () {
        var audio;

        for (var i = 0; i < this.NUM_SOUND_CHANNELS; i++) {
            audio = this.soundChannels[i];
            if (audio.played && audio.played.length > 0) {
                if (audio.ended) {
                    return audio;
                }
            } else {
                if (!audio.ended) {
                    return audio;
                }
            }
        }
        return undefined;
    },

    playSound: function(id){
        var channel = this.getAvailableSoundChannel(),
            element = document.getElementById(id);
        if (channel && element) {
            channel.src = element.src === '' ? element.currentSrc : element.src;
            channel.load();
            channel.play();
        }
    },

    //Sprite
    addSprite: function(sprite){
        this.sprites.push(sprite);
    },

    getSprite: function(name){
        for (var i in this.sprites) {
            if (this.sprites[i].name === name) {
                return this.sprites[i];
            }
        }
        return null;
    },

    startAnimate:       function(time)  {},
    paintUnderSprites:  function()      {},
    paintOverSprites:   function()      {},
    endAnimate:         function()      {}
}