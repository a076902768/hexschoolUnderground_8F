var app = new Vue({
    el: '#app',
    data() {
        return {
            startScreen: true,
            gameScreen: false,
            mainBlock: [
                {
                    id: 0,//格子id
                    value: 0,//格子的值
                    isClick: false//格子是否點過
                },
                {
                    id: 1,
                    value: 0,
                    isClick: false
                },
                {
                    id: 2,
                    value: 0,
                    isClick: false
                },
                {
                    id: 3,
                    value: 0,
                    isClick: false
                },
                {
                    id: 4,
                    value: 0,
                    isClick: false
                },
                {
                    id: 5,
                    value: 0,
                    isClick: false
                },
                {
                    id: 6,
                    value: 0,
                    isClick: false
                },
                {
                    id: 7,
                    value: 0,
                    isClick: false
                },
                {
                    id: 8,
                    value: 0,
                    isClick: false
                },
            ],
            nowTurn: 'o',
            checkRow: [
                [],
                [],
                []
            ],
            checkCol: [
                [],
                [],
                []
            ],
            checkSlash: [
                [],
                []
            ],
            whoWin: undefined,
            scoreBar: {
                oScore: 0,
                xScore: 0
            }
        }
    },
    methods: {
        startGame(){
            const vm = this;
            vm.startScreen = false;
            vm.gameScreen = true;
        },
        blockClick(index){
            const vm = this;
            let b_id = 'b_'+index; 
            console.log(index);
            let block = document.getElementById(b_id);
            let o = "<i class='far fa-circle'></i>";
            let x = "<i class='fas fa-times' style='color: white'></i>";
            if(vm.mainBlock[index].isClick == false){
                if(vm.nowTurn=='o'){
                    block.innerHTML+=o;
                    vm.mainBlock[index].value = 'o';
                    vm.nowTurn = 'x';
                }else{
                    block.innerHTML+=x;
                    vm.mainBlock[index].value = 'x';
                    vm.nowTurn = 'o';
                }
                vm.mainBlock[index].isClick = true;
            }
            vm.checkWin();

            
        },
        checkWin(){
            const vm = this;
            let oWin = 'ooo';
            let xWin = 'xxx';
            let isWin = false;
            vm.checkRow[0] = [vm.mainBlock[0].value,vm.mainBlock[1].value,vm.mainBlock[2].value];
            vm.checkRow[1] = [vm.mainBlock[3].value,vm.mainBlock[4].value,vm.mainBlock[5].value];
            vm.checkRow[2] = [vm.mainBlock[6].value,vm.mainBlock[7].value,vm.mainBlock[8].value];

            vm.checkCol[0] = [vm.mainBlock[0].value,vm.mainBlock[3].value,vm.mainBlock[6].value];
            vm.checkCol[1] = [vm.mainBlock[1].value,vm.mainBlock[4].value,vm.mainBlock[7].value];
            vm.checkCol[2] = [vm.mainBlock[2].value,vm.mainBlock[5].value,vm.mainBlock[8].value];

            vm.checkSlash[0] = [vm.mainBlock[0].value,vm.mainBlock[4].value,vm.mainBlock[8].value];
            vm.checkSlash[1] = [vm.mainBlock[2].value,vm.mainBlock[4].value,vm.mainBlock[6].value];
            
            if(vm.checkRow[0].join('') == oWin || vm.checkRow[1].join('') == oWin || vm.checkRow[2].join('') == oWin || 
               vm.checkCol[0].join('') == oWin || vm.checkCol[1].join('') == oWin || vm.checkCol[2].join('') == oWin ||
               vm.checkSlash[0].join('') == oWin || vm.checkSlash[1].join('') == oWin)
            {
                console.log('circle win!');
                isWin = true;
                vm.whoWin = 'o';
                vm.mainBlock.forEach(element => {
                    element.isClick = true;
                });
                vm.scoreBar.oScore+=1;
            }
            if(vm.checkRow[0].join('') == xWin || vm.checkRow[1].join('') == xWin || vm.checkRow[2].join('') == xWin || 
               vm.checkCol[0].join('') == xWin || vm.checkCol[1].join('') == xWin || vm.checkCol[2].join('') == xWin ||
               vm.checkSlash[0].join('') == xWin || vm.checkSlash[1].join('') == xWin)
            {
                console.log('X win!');
                isWin = true;
                vm.whoWin = 'x';
                vm.mainBlock.forEach(element => {
                    element.isClick = true;
                });
                vm.scoreBar.xScore+=1;
            }

            let haveCleanBlock = false;
            vm.mainBlock.forEach((item) =>{
                if(item.isClick == false){
                    haveCleanBlock = true;
                }
            });

            if(isWin == false && haveCleanBlock == false){
                console.log('draw');
                vm.whoWin = 'draw';
            }
            
        },
        reStart(){
            const vm = this;
            vm.startScreen = true;
            vm.gameScreen = false;
            vm.nowTurn = 'o';
            vm.checkRow.forEach((item) =>{
                item.length=0;
            });
            vm.checkCol.forEach((item) =>{
                item.length=0;
            });
            vm.checkSlash.forEach((item) =>{
                item.length=0;
            });
            vm.whoWin = undefined;
            vm.mainBlock.forEach((item) =>{
                item.isClick = false;
                item.value = 0;
            })
        }
    },
    watch: {
        'scoreBar.oScore'(){
            const vm = this;
            localStorage.setItem('oScore', vm.scoreBar.oScore);
            console.log(localStorage.getItem('oScore'));
        },
        'scoreBar.xScore'(){
            const vm = this;
            localStorage.setItem('xScore', vm.scoreBar.xScore);
            console.log(localStorage.getItem('xScore'));
        }
    },
    mounted() {
        const vm = this;
        vm.checkWin();
        if(!Number(localStorage.getItem('oScore'))){
            vm.scoreBar.oScore = 0;
        }
        if(!Number(localStorage.getItem('xScore'))){
            vm.scoreBar.xScore = 0;
        }
        console.log(Number(localStorage.getItem('oScore')),Number(localStorage.getItem('xScore')));
        vm.scoreBar.oScore += Number(localStorage.getItem('oScore'));
        vm.scoreBar.xScore += Number(localStorage.getItem('xScore'));
    },
});