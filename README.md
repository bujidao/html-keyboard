# HTMLkeyBoard
mobile phone html keyboard

## how to use

html code

    <script src="src/HTMLkeyBoard.js" type="text/javascript"></script>
    <input type="text" id="inputdemo" value="">
    
js code

    <script>
        function showKeyboart () {
          var d1 = new BuKeyboard();
          d1.init({
            el: 'inputdemo',
            width: '700px',
            funType: 'letter',
            left: '20%',
            top: '30%'
          });
        }
        window.onload = function(){
          showKeyboart()
        }
    </script>

Args detail
* el: 綁定的id,
* left: 鍵盤到網頁頁面可視區域左邊的距離,
* top: 鍵盤到網頁頁面可視區域頂部的距離,
* width: 鍵盤的寬度(default: 340px),
* height: 鍵盤的高度（default: 170px）,　
* funType: 初始化輸入類型:letter:字母，char：　符號（default: letter）,
* open: 是否打開,
* background: 鍵盤背景,
* fontSize: 鍵盤文字大小(default: 16px)

