"use strict";

var app = new Vue({
  el: '#app',
  data: function data() {
    return {
      startScreen: true,
      gameScreen: false,
      mainBlock: [{
        id: 0,
        //格子id
        value: 0,
        //格子的值
        isClick: false //格子是否點過

      }, {
        id: 1,
        value: 0,
        isClick: false
      }, {
        id: 2,
        value: 0,
        isClick: false
      }, {
        id: 3,
        value: 0,
        isClick: false
      }, {
        id: 4,
        value: 0,
        isClick: false
      }, {
        id: 5,
        value: 0,
        isClick: false
      }, {
        id: 6,
        value: 0,
        isClick: false
      }, {
        id: 7,
        value: 0,
        isClick: false
      }, {
        id: 8,
        value: 0,
        isClick: false
      }],
      nowTurn: 'o',
      checkRow: [[], [], []],
      checkCol: [[], [], []],
      checkSlash: [[], []],
      whoWin: undefined,
      scoreBar: {
        oScore: 0,
        xScore: 0
      }
    };
  },
  methods: {
    startGame: function startGame() {
      var vm = this;
      vm.startScreen = false;
      vm.gameScreen = true;
    },
    blockClick: function blockClick(index) {
      var vm = this;
      var b_id = 'b_' + index;
      console.log(index);
      var block = document.getElementById(b_id);
      var o = "<i class='far fa-circle'></i>";
      var x = "<i class='fas fa-times' style='color: white'></i>";

      if (vm.mainBlock[index].isClick == false) {
        if (vm.nowTurn == 'o') {
          block.innerHTML += o;
          vm.mainBlock[index].value = 'o';
          vm.nowTurn = 'x';
        } else {
          block.innerHTML += x;
          vm.mainBlock[index].value = 'x';
          vm.nowTurn = 'o';
        }

        vm.mainBlock[index].isClick = true;
      }

      vm.checkWin();
    },
    checkWin: function checkWin() {
      var vm = this;
      var oWin = 'ooo';
      var xWin = 'xxx';
      var isWin = false;
      vm.checkRow[0] = [vm.mainBlock[0].value, vm.mainBlock[1].value, vm.mainBlock[2].value];
      vm.checkRow[1] = [vm.mainBlock[3].value, vm.mainBlock[4].value, vm.mainBlock[5].value];
      vm.checkRow[2] = [vm.mainBlock[6].value, vm.mainBlock[7].value, vm.mainBlock[8].value];
      vm.checkCol[0] = [vm.mainBlock[0].value, vm.mainBlock[3].value, vm.mainBlock[6].value];
      vm.checkCol[1] = [vm.mainBlock[1].value, vm.mainBlock[4].value, vm.mainBlock[7].value];
      vm.checkCol[2] = [vm.mainBlock[2].value, vm.mainBlock[5].value, vm.mainBlock[8].value];
      vm.checkSlash[0] = [vm.mainBlock[0].value, vm.mainBlock[4].value, vm.mainBlock[8].value];
      vm.checkSlash[1] = [vm.mainBlock[2].value, vm.mainBlock[4].value, vm.mainBlock[6].value];

      if (vm.checkRow[0].join('') == oWin || vm.checkRow[1].join('') == oWin || vm.checkRow[2].join('') == oWin || vm.checkCol[0].join('') == oWin || vm.checkCol[1].join('') == oWin || vm.checkCol[2].join('') == oWin || vm.checkSlash[0].join('') == oWin || vm.checkSlash[1].join('') == oWin) {
        console.log('circle win!');
        isWin = true;
        vm.whoWin = 'o';
        vm.mainBlock.forEach(function (element) {
          element.isClick = true;
        });
        vm.scoreBar.oScore += 1;
      }

      if (vm.checkRow[0].join('') == xWin || vm.checkRow[1].join('') == xWin || vm.checkRow[2].join('') == xWin || vm.checkCol[0].join('') == xWin || vm.checkCol[1].join('') == xWin || vm.checkCol[2].join('') == xWin || vm.checkSlash[0].join('') == xWin || vm.checkSlash[1].join('') == xWin) {
        console.log('X win!');
        isWin = true;
        vm.whoWin = 'x';
        vm.mainBlock.forEach(function (element) {
          element.isClick = true;
        });
        vm.scoreBar.xScore += 1;
      }

      var haveCleanBlock = false;
      vm.mainBlock.forEach(function (item) {
        if (item.isClick == false) {
          haveCleanBlock = true;
        }
      });

      if (isWin == false && haveCleanBlock == false) {
        console.log('draw');
        vm.whoWin = 'draw';
      }
    },
    reStart: function reStart() {
      var vm = this;
      vm.startScreen = true;
      vm.gameScreen = false;
      vm.nowTurn = 'o';
      vm.checkRow.forEach(function (item) {
        item.length = 0;
      });
      vm.checkCol.forEach(function (item) {
        item.length = 0;
      });
      vm.checkSlash.forEach(function (item) {
        item.length = 0;
      });
      vm.whoWin = undefined;
      vm.mainBlock.forEach(function (item) {
        item.isClick = false;
        item.value = 0;
      });
    }
  },
  watch: {
    'scoreBar.oScore': function scoreBarOScore() {
      var vm = this;
      localStorage.setItem('oScore', vm.scoreBar.oScore);
      console.log(localStorage.getItem('oScore'));
    },
    'scoreBar.xScore': function scoreBarXScore() {
      var vm = this;
      localStorage.setItem('xScore', vm.scoreBar.xScore);
      console.log(localStorage.getItem('xScore'));
    }
  },
  mounted: function mounted() {
    var vm = this;
    vm.checkWin();

    if (localStorage.getItem('oScore') && localStorage.getItem('xScore')) {
      vm.scoreBar.oScore += Number(localStorage.getItem('oScore'));
      vm.scoreBar.xScore += Number(localStorage.getItem('xScore'));
    }
  }
});