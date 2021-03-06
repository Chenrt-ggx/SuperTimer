<template>
    <v-app id="app">
        <div class="text-right dots">
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" @click="dialog = true" />
        </div>
        <div class="text-left grey--text">
            <span class="title-begin" @click="redirect">闹钟</span>
            <span class="title-font" @click="redirect">时钟</span>
            <span class="title-font" style="color: #2382f3">秒表</span>
            <span class="title-font" @click="redirect">计时</span>
        </div>
        <v-row class="time-font">
            <v-spacer></v-spacer>
            <div>
                <div class="time-fix">
                    <span>{{ '0'.repeat(2).concat(minute).slice(-2) }}</span>
                    <span class="sign-font">:</span>
                    <span>{{ '0'.repeat(2).concat(second).slice(-2) }}</span>
                    <span class="sign-font">.</span>
                    <span>{{ '0'.repeat(2).concat(millisecond).slice(-2) }}</span>
                </div>
                <div class="display-slider text-center">
                    <v-slider
                        :min="0"
                        :max="59"
                        :step="1"
                        ticks="always"
                        :tick-size="2"
                        :value="second"
                        track-color="white"
                        track-fill-color="white"
                        thumb-size="20"
                        readonly
                    />
                </div>
            </div>
            <v-spacer></v-spacer>
        </v-row>
        <div class="text-center footer-fix">
            <v-btn color="white" fab large @click="begin" v-if="state === 0">
                <font-awesome-icon icon="fa-solid fa-play" class="ml-1 button-icon" />
            </v-btn>
            <div v-if="state === 1">
                <v-btn color="white" fab large @click="flag">
                    <font-awesome-icon icon="fa-solid fa-flag" class="button-icon" style="font-size: 20px" />
                </v-btn>
                <span class="button-gap"></span>
                <v-btn color="white" fab large @click="pause">
                    <font-awesome-icon icon="fa-solid fa-pause" class="button-icon" style="font-size: 28px" />
                </v-btn>
            </div>
            <div v-if="state === 2">
                <v-btn color="white" fab large @click="stop">
                    <font-awesome-icon icon="fa-solid fa-stop" class="button-icon" />
                </v-btn>
                <span class="button-gap"></span>
                <v-btn color="white" fab large @click="begin">
                    <font-awesome-icon icon="fa-solid fa-play" class="ml-1 button-icon" />
                </v-btn>
            </div>
        </div>
        <v-dialog v-model="dialog" @click:outside="dialog = false">
            <v-card>
                <v-card-title>倍率选择</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="text-center">
                    <v-slider class="mt-10" v-model="slide" :step="5" :max="250" :min="25" />
                    <div>
                        {{ '当前倍率: ' + fixValue(ratio) }}
                        <span class="mx-4">|</span>
                        {{ '更新倍率: ' + fixValue(slide / 100) }}
                    </div>
                    <div v-if="Math.round(1000 / slide) === 1000 / slide" class="my-2">当前倍率可正常计时</div>
                    <div v-else class="red--text my-2">因 setInterval 精度有限，此倍率可能发生跳变</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text dark @click="resetRatio">取消</v-btn>
                    <v-btn color="primary" text dark @click="setRatio">应用</v-btn>
                    <v-btn color="success" text dark @click="refreshRatio">刷新</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
export default {
    data: function () {
        return {
            fix: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
            state: 0,
            ratio: 1,
            slide: 100,
            dialog: false,
            mainInterval: null,
            fixInterval: null,
            timeStamp: null
        };
    },
    methods: {
        async updateTime() {
            this.millisecond++;
            if (this.millisecond > 99) {
                this.millisecond = 0;
                this.second++;
                if (this.second > 59) {
                    this.second = 0;
                    this.minute++;
                    if (this.minute > 59) {
                        this.minute = 0;
                    }
                }
            }
        },
        async fixTime() {
            const real = Math.round((+new Date() - this.timeStamp) * this.ratio) + this.fix;
            this.minute = Math.floor(real / 60000) % 60;
            this.second = Math.floor(real / 1000) % 60;
            this.millisecond = Math.floor((real % 1000) / 10);
        },
        redirect() {
            window.location = 'https://www.bilibili.com/video/BV1uT4y1P7CX';
        },
        updateRatio() {
            this.ratio = this.slide / 100;
            this.dialog = false;
            this.slide = 100;
        },
        setRatio() {
            if (this.state === 1) {
                this.pause();
                this.updateRatio();
                this.begin();
            } else {
                this.updateRatio();
            }
        },
        refreshRatio() {
            this.stop();
            this.updateRatio();
        },
        resetRatio() {
            this.dialog = false;
            this.slide = 100;
        },
        fixValue(value) {
            const src = value.toString();
            const index = src.indexOf('.');
            if (index === -1) {
                return src + '.00';
            } else if (index + 2 === src.length) {
                return src + '0';
            } else {
                return src;
            }
        },
        begin() {
            this.fix = this.minute * 60000 + this.second * 1000 + this.millisecond * 10;
            this.mainInterval = setInterval(this.updateTime, 10 / this.ratio);
            this.fixInterval = setInterval(this.fixTime, 1000);
            this.timeStamp = +new Date();
            this.state = 1;
        },
        flag() {
            this.redirect();
        },
        pause() {
            clearInterval(this.mainInterval);
            clearInterval(this.fixInterval);
            this.fixTime();
            this.state = 2;
        },
        stop() {
            clearInterval(this.mainInterval);
            clearInterval(this.fixInterval);
            this.minute = this.second = this.millisecond = 0;
            this.state = 0;
        }
    }
};
</script>

<style lang="scss">
html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

.display-slider {
    .v-slider__thumb {
        width: 4px;
        height: 4px;
        color: white;
    }

    .v-slider__tick {
        border-radius: 1px;
        background-color: #e5e5e5;
    }
}

.footer-fix {
    .v-btn--is-elevated.v-btn--fab {
        box-shadow: 0 3px 5px 1px rgba(35, 130, 243, 0.1), 0 1px 1px 0 rgba(35, 130, 243, 0.07),
            0 1px 1px 0 rgba(35, 130, 243, 0.06);
    }
}
</style>

<style scoped>
.dots {
    font-size: 20px;
    margin-top: 3.7vw;
    margin-right: 8.4vw;
    margin-bottom: 3vw;
}

.title-begin {
    font-size: 8vw;
    font-weight: 300;
    margin-left: 7vw;
}

.title-font {
    font-size: 8vw;
    font-weight: 300;
    margin-left: 4.5vw;
}

.time-fix {
    font-weight: 400;
    margin-top: 23.7vh;
}

.time-font {
    font-size: 18.3vw;
    font-family: Roboto, monospace;
}

.sign-font {
    margin-left: -0.1vw;
    margin-right: -0.1vw;
}

.display-slider {
    width: 96%;
    margin-left: 2%;
    margin-top: -0.6vh;
}

.footer-fix {
    margin-bottom: 5.5vw;
}

.button-icon {
    color: #2382f3;
    font-size: 24px;
}

.button-gap {
    margin-left: 6vw;
    margin-right: 6vw;
}
</style>
