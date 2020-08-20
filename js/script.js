var app = new Vue({
    el: '#app',
    data() {
        return {
            startScreen: true,
            gameScreen: false,
            mainBlock: [
                {
                    id: 0
                },
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                },
                {
                    id: 4
                },
                {
                    id: 5
                },
                {
                    id: 6
                },
                {
                    id: 7
                },
                {
                    id: 8
                },
            ],
        }
    },
    methods: {
        startGame(){
            const vm = this;
            vm.startScreen = false;
            vm.gameScreen = true;
        }
    },
    // mounted() {
    // },
});