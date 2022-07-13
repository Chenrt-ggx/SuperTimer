<template>
    <v-app id="app">
        <div class="text-right dots">
            <v-icon color="black" size="22" @click="dialog = true">mdi-dots-vertical</v-icon>
        </div>
        <div class="text-left grey--text">
            <span class="title-begin" @click="redirect">闹钟</span>
            <span class="title-font" @click="redirect">时钟</span>
            <span class="title-font" style="color: #2196f3">秒表</span>
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
            <v-btn color="white" fab large @click="begin" v-if="state === 0" elevation="3">
                <v-icon color="primary" size="36">mdi-play</v-icon>
            </v-btn>
            <div v-if="state === 1">
                <v-btn color="white" fab large @click="flag" elevation="3">
                    <v-icon color="primary" size="32">mdi-flag</v-icon>
                </v-btn>
                <span class="button-gap"></span>
                <v-btn color="white" fab large @click="pause" elevation="3">
                    <v-icon color="primary" size="36">mdi-pause</v-icon>
                </v-btn>
            </div>
            <div v-if="state === 2">
                <v-btn color="white" fab large @click="stop" elevation="3">
                    <v-icon color="primary" size="36">mdi-stop</v-icon>
                </v-btn>
                <span class="button-gap"></span>
                <v-btn color="white" fab large @click="begin" elevation="3">
                    <v-icon color="primary" size="36">mdi-play</v-icon>
                </v-btn>
            </div>
        </div>
        <v-dialog v-model="dialog" @click:outside="dialog = false">
            <v-card>
                <v-card-title>倍率选择</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="text-center">
                    <v-slider
                        class="mt-10"
                        v-model="slide"
                        prepend-icon="mdi-speedometer"
                        :step="5"
                        :max="400"
                        :min="25"
                    />
                    {{ '当前倍率: ' + ratio }}
                    <span class="mx-4">|</span>
                    {{ '更新倍率: ' + slide / 100 }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text dark @click="resetRatio">取消</v-btn>
                    <v-btn color="success" text dark @click="setRatio">确认</v-btn>
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
        setRatio() {
            this.stop();
            this.ratio = this.slide / 100;
            this.dialog = false;
            this.slide = 100;
        },
        resetRatio() {
            this.dialog = false;
            this.slide = 100;
        },
        begin() {
            this.fix = this.minute * 60000 + this.second * 1000 + this.millisecond * 10;
            this.mainInterval = setInterval(this.updateTime, 10 / this.ratio);
            this.fixInterval = setInterval(this.fixTime, 1000 * 5);
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
</style>

<style scoped>
.dots {
    margin-top: 3.7vw;
    margin-right: 6.4vw;
    margin-bottom: 4.3vw;
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
    font-weight: 360;
    margin-top: 23.5vh;
}

.time-font {
    font-size: 18.4vw;
    font-family: sans-serif;
}

.sign-font {
    margin-left: -0.1vw;
    margin-right: -0.1vw;
}

.display-slider {
    width: 94%;
    margin-left: 3%;
    margin-top: -0.5vh;
}

.footer-fix {
    margin-bottom: 5vw;
}

.button-gap {
    margin-left: 6vw;
    margin-right: 6vw;
}
</style>
