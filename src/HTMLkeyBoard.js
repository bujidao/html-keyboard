function BuKeyboard() {
  var obj = null;
  this.settings = {
    el: 'input',
    left: '50px',
    top: '50px',
    width: '500px',
    height: '200px',
    funType: 'letter', //letter/char
    open: true,
    background: 'none',
    isUppercase: false,
    fontSize: '16px'
  }
};

BuKeyboard.prototype.json = {};

BuKeyboard.prototype.init = function (opt) {
  extend(this.settings,opt);
  if(this.settings.open) {
    this._open();
  } else {
    this._close();
  }
};

BuKeyboard.prototype._open = function() {
  this._createDiv();
};

BuKeyboard.prototype._close = function() {
  this._removeDiv();
};

BuKeyboard.prototype._setAddValue = function(input,value) {
  if (input) {
    input.value += value;
  };
};

BuKeyboard.prototype._setReduceValue = function(input) {
  var num = input && input.value || false;
  if (num) {
    var newNum = num.substr(0, num.length - 1);
    input.value = newNum;
  };
};

BuKeyboard.prototype._setEmptyValue = function(input) {
  input.value = '';
};

BuKeyboard.prototype._removeDiv = function() {
  var body = document.getElementsByTagName('body')[0];
  body.removeChild(document.getElementById('__b_u_k_e_y_b_o_a_r_d_div_id'));
};

BuKeyboard.prototype._createDiv = function(){
  var _div = document.createElement('div');
  _div.id = '__b_u_k_e_y_b_o_a_r_d_div_id';
  _div.innerHTML = this._createButton();
  _div.className = 'bu-keyboard__wrapper';
  _div.style.position = 'absolute';
  _div.style.left = this.settings.left;
  _div.style.top = this.settings.top;
  _div.style.width = this.settings.width;
  _div.style.height = this.settings.height;
  _div.style.background = this.settings.background;
  _div.style.fontSize = this.settings.fontSize;
  this._bindEvent(_div);
  var body = $$tag('body')[0];
  body.appendChild(_div);
  var aLi = $$tag('li', _div);
  for(var i = 0; i< aLi.length; i++) {
    aLi[i].style.width = (_div.offsetWidth - 80)/10 + 'px';
    aLi[i].style.height = (_div.offsetHeight - 20 )/5 + 'px';
    aLi[i].style.lineHeight = (_div.offsetHeight - 20 )/5 + 'px';
  };
  var btnWidth = aLi[0].offsetWidth + 4;
  var buKbLine2Header = $$class('k-line2-head', _div)[0];
  buKbLine2Header.style.marginLeft = btnWidth/2 + 2 + 'px';
  var buKbSwitchUppercase = $$class('k-switch-uppercase', _div)[0];
  buKbSwitchUppercase.style.width = btnWidth*1.5 - 4 + 'px';
  var buKbSwitchDel = $$class('k-switch-del', _div)[0];
  buKbSwitchDel.style.width = btnWidth*1.5 - 4 + 'px';
  var buKbSwitchFun = $$class('k-switch-function', _div)[0];
  buKbSwitchFun.style.width = aLi[0].offsetWidth*2.5 + 6 + 'px';
  var buKbSwitchSpace = $$class('k-space', _div)[0];
  buKbSwitchSpace.style.width = aLi[0].offsetWidth*3 + 8 + 'px';
  var buKbSwitchEnter = $$class('k-enter', _div)[0];
  buKbSwitchEnter.style.width = aLi[0].offsetWidth*2.5 + 6 + 'px';
};

BuKeyboard.prototype._setSwitchLetterChar = function(){
  var funType = this.settings.funType;
  if (funType === 'letter') {
    this.settings.funType = 'char';
  }else if (funType === 'char') {
    this.settings.funType = 'letter';
  };
};

BuKeyboard.prototype._setSwitchUppercase = function(){
  if (this.settings.isUppercase) {
    document.getElementsByClassName('k-switch-uppercase')[0].className = 'k-switch-uppercase color-dark';
    for(var i = 0; i < document.getElementsByClassName('k-letter').length; i++) {
      document.getElementsByClassName('k-letter')[i].innerHTML = document.getElementsByClassName('k-letter')[i].innerHTML.toLowerCase();
    };
  } else {
    document.getElementsByClassName('k-switch-uppercase')[0].className = 'k-switch-uppercase color-dark active';
    for(var i = 0; i < document.getElementsByClassName('k-letter').length; i++) {
      document.getElementsByClassName('k-letter')[i].innerHTML = document.getElementsByClassName('k-letter')[i].innerHTML.toUpperCase();
    };
  };
  this.settings.isUppercase = !this.settings.isUppercase;
};

BuKeyboard.prototype._clickEvent = function(e) {
  var ev = e || window.event;
  var clickEl = ev.element || ev.target;
  var value = clickEl.textContent || clickEl.innerText;
  var input = document.getElementById(this.settings.el);
  var clickElName = clickEl.tagName.toLocaleLowerCase();
  switch (clickElName){
    case 'div':
      this._close();
      break;
    case 'li':
      if(value === '↑'){
        this._setSwitchUppercase();
      }else if(value ==='空格'){
        this._setAddValue(input,' ');
      }else if(value ==='清空'){
        this._setEmptyValue(input);
      }else if(value==='._@/#' || value === "ABC"){
        this._close();
        this._setSwitchLetterChar();
        this._createDiv();
      }else if(value!=='删除'){
        this._setAddValue(input,value);
      }else {
        this._setReduceValue(input);
      };
      break;
    default:
      break;
  }
};

BuKeyboard.prototype._bindEvent = function(div) {
  if (this.settings.mobile) {
    div.ontouchstart = this._clickEvent.bind(this);
  } else {
    div.onclick = this._clickEvent.bind(this);
  }
  return div;
};

BuKeyboard.prototype._createButton = function(){
  var cssStyle = '<style>.bu-keyboard__wrapper{width:340px;height:175px;background:#eee;text-align:center}ul{list-style:none;margin:0}.keyboard-container{display:inline-block;height:100%;background:#eee;padding:10px 20px}.keyboard-container li{float:left;display:inline-block;width:30px;height:35px;line-height:35px;background:#fff;text-align:center;margin:2px;color:#4a4a4a;border-radius:4px;box-shadow:0 0 2px 1px #ccc;cursor:pointer;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none}.keyboard-container li:hover{background:#eee}.keyboard-container .k-line2-head{margin-left:18px}.keyboard-container .k-switch-uppercase,.keyboard-container .k-switch-del{width:46px}.keyboard-container .k-switch-uppercase.active{color:deepskyblue}.keyboard-container .k-switch-function,.keyboard-container .k-enter{width:81px}.keyboard-container .k-space{width:98px}.keyboard-container .color-dark{background:#ddd}</style>';
  var letterHtml = '<div class="keyboard-close" style="display: none;background: ' + this.settings.background + '">收起</div>' +
    '<ul class="keyboard-container" style="background: ' + this.settings.background + '">\n' +
    '        <li class="k-num">1</li>\n' +
    '        <li class="k-num">2</li>\n' +
    '        <li class="k-num">3</li>\n' +
    '        <li class="k-num">4</li>\n' +
    '        <li class="k-num">5</li>\n' +
    '        <li class="k-num">6</li>\n' +
    '        <li class="k-num">7</li>\n' +
    '        <li class="k-num">8</li>\n' +
    '        <li class="k-num">9</li>\n' +
    '        <li class="k-num">0</li>\n' +
    '\n' +
    '        <li class="k-letter">q</li>\n' +
    '        <li class="k-letter">w</li>\n' +
    '        <li class="k-letter">e</li>\n' +
    '        <li class="k-letter">r</li>\n' +
    '        <li class="k-letter">t</li>\n' +
    '        <li class="k-letter">y</li>\n' +
    '        <li class="k-letter">u</li>\n' +
    '        <li class="k-letter">i</li>\n' +
    '        <li class="k-letter">o</li>\n' +
    '        <li class="k-letter">p</li>\n' +
    '\n' +
    '        <li class="k-letter k-line2-head">a</li>\n' +
    '        <li class="k-letter">s</li>\n' +
    '        <li class="k-letter">d</li>\n' +
    '        <li class="k-letter">f</li>\n' +
    '        <li class="k-letter">g</li>\n' +
    '        <li class="k-letter">h</li>\n' +
    '        <li class="k-letter">j</li>\n' +
    '        <li class="k-letter">k</li>\n' +
    '        <li class="k-letter">l</li>\n' +
    '\n' +
    '        <li class="k-switch-uppercase color-dark">&uarr;</li>\n' +
    '        <li class="k-letter">z</li>\n' +
    '        <li class="k-letter">x</li>\n' +
    '        <li class="k-letter">c</li>\n' +
    '        <li class="k-letter">v</li>\n' +
    '        <li class="k-letter">b</li>\n' +
    '        <li class="k-letter">n</li>\n' +
    '        <li class="k-letter">m</li>\n' +
    '        <li class="k-switch-del color-dark">删除</li>\n' +
    '\n' +
    '        <li class="k-switch-function color-dark">._@/#</li>\n' +
    '        <li class="k-dot">.</li>\n' +
    '        <li class="k-space">空格</li>\n' +
    '        <li class="k-at">@</li>\n' +
    '        <li class="k-enter color-dark">清空</li>\n' +
    '    </ul>';
  var charHtml = '<div class="keyboard-close" style="display: none;background: ' + this.settings.background + '">收起</div>' +
    '<ul class="keyboard-container" style="background: ' + this.settings.background + '">\n' +
    '        <li class="k-num">^</li>\n' +
    '        <li class="k-num">\\</li>\n' +
    '        <li class="k-num">|</li>\n' +
    '        <li class="k-num"><</li>\n' +
    '        <li class="k-num">></li>\n' +
    '        <li class="k-num">&cent;</li>\n' +
    '        <li class="k-num">&pound;</li>\n' +
    '        <li class="k-num">&yen;</li>\n' +
    '        <li class="k-num"></li>\n' +
    '        <li class="k-num"></li>\n' +
    '\n' +
    '        <li class="k-char">[</li>\n' +
    '        <li class="k-char">]</li>\n' +
    '        <li class="k-char">{</li>\n' +
    '        <li class="k-char">}</li>\n' +
    '        <li class="k-char">#</li>\n' +
    '        <li class="k-char">%</li>\n' +
    '        <li class="k-char">+</li>\n' +
    '        <li class="k-char">=</li>\n' +
    '        <li class="k-char">&sim;</li>\n' +
    '        <li class="k-char">_</li>\n' +
    '\n' +
    '        <li class="k-char k-line2-head">-</li>\n' +
    '        <li class="k-char">/</li>\n' +
    '        <li class="k-char">:</li>\n' +
    '        <li class="k-char">;</li>\n' +
    '        <li class="k-char">(</li>\n' +
    '        <li class="k-char">)</li>\n' +
    '        <li class="k-char">$</li>\n' +
    '        <li class="k-char">&</li>\n' +
    '        <li class="k-char">"</li>\n' +
    '\n' +
    '        <li class="k-switch-uppercase color-dark"></li>\n' +
    '        <li class="k-char"></li>\n' +
    '        <li class="k-char">?</li>\n' +
    '        <li class="k-char">!</li>\n' +
    '        <li class="k-char">*</li>\n' +
    '        <li class="k-char">@</li>\n' +
    '        <li class="k-char">,</li>\n' +
    '        <li class="k-char">\'</li>\n' +
    '        <li class="k-switch-del color-dark">删除</li>\n' +
    '\n' +
    '        <li class="k-switch-function color-dark">ABC</li>\n' +
    '        <li class="k-dot">.</li>\n' +
    '        <li class="k-space">空格</li>\n' +
    '        <li class="k-at">@</li>\n' +
    '        <li class="k-enter color-dark">清空</li>\n' +
    '    </ul>';
  var funType = this.settings.funType;
  if (funType === 'letter') {
    return (cssStyle+letterHtml);
  }else if (funType === 'char') {
    return (cssStyle+charHtml);
  };
};

function extend(obj1,obj2) {
  for (var attr in obj2) {
    if (obj2.hasOwnProperty(attr)) {
      obj1[attr] = obj2[attr];
    };
  };
};

function $$class(obj1, obj2) {
  if(obj2) {
    return obj2.getElementsByClassName(obj1);
  };
  return document.getElementsByClassName(obj1);
};

function $$tag(obj1, obj2) {
  if(obj2) {
    return obj2.getElementsByTagName(obj1);
  };
  return document.getElementsByTagName(obj1);
};

function viewWidth() {
  return document.documentElement.clientWidth;
};

function viewHeight() {
  return document.documentElement.clientHeight;
};
