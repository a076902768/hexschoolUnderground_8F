var app = new Vue({
    el: '#app',
    data() {
        return {
            startScreen: true,
            gameScreen: false,
        }
    },
    methods: {
        startGame(){
            const vm = this;
            vm.startScreen = false;
            vm.gameScreen = true;
        }
    },
});