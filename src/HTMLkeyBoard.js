
class KeyBoardModule {
    constructor(input,porps,callback) {
        this.options = {
            zIndex: porps && porps.zIndex || 5000,
            width: porps && porps.width || '100%',
            backgroundColor: porps && porps.backgroundColor || '#fff',
            TABLE_ID: porps && porps.table_id || 'table_0909099',
            mobile: typeof orientation !== 'undefined',
            el: input,
            autoOpen:porps&&porps.autoOpen||false,
            callback: callback,
            open: false,
            funType: 'letter'
        };
        return this._init();
    }

    _get(key) {
        return this.options[key];
    }

    _set(key, value) {
        this.options[key] = value;
        return true;
    }

    _init() {
        this._get('el').setAttribute('readonly','readonly');
        this._autoOpen();
        return {
            close:()=>{this._close()},
            open:()=>{this._open()}
        }
    }
    _clickOpen(){
        var open = this._get('open');
        if(open){
            this._close();
        }else{
            this._open();
        }
    }
    _clickEnd(){
        console.log(1);
    }
    _autoOpen(){
        var ele = this._get('el'),
            autoOpen = this._get('autoOpen');
        if(autoOpen){
            if (this._get('mobile')) {
                ele.ontouchstart = this._clickOpen.bind(this);
                ele.ontouchend = this._clickEnd.bind(this);
            } else {
                ele.onmousedown = this._clickOpen.bind(this);
                ele.onmouseup = this._clickEnd.bind(this);
            }
        }
    }

    _open() {
        this._createDiv();
        this._set('open', true);
        this._set('funType', 'letter');
    }

    _close() {
        this._removeDiv();
        this._set('open', false);
    }

    _removeDiv() {
        var body = document.getElementsByTagName('body')[0];
        body.removeChild(document.getElementById('__b_u_j_i_d_a_o_k_b_divid'));
    }
    _setAddValue(input,value){
        if (input) {
            var oldval = input.value;
            input.value += value;
        }
    }
    _setReduceValue(input){
        var num = input && input.value || false;
        if (num) {
            var newNum = num.substr(0, num.length - 1);
            input.value = newNum;
        }
    }
    _setSwitchUppercase(){
        if (this.isUppercase) {
            document.getElementsByClassName('k-switch-uppercase')[0].className = 'k-switch-uppercase color-dark';
            for(var i = 0; i < document.getElementsByClassName('k-letter').length; i++) {
                document.getElementsByClassName('k-letter')[i].innerHTML = document.getElementsByClassName('k-letter')[i].innerHTML.toLowerCase();
            }
        } else {
            document.getElementsByClassName('k-switch-uppercase')[0].className = 'k-switch-uppercase color-dark active';
            for(var i = 0; i < document.getElementsByClassName('k-letter').length; i++) {
                document.getElementsByClassName('k-letter')[i].innerHTML = document.getElementsByClassName('k-letter')[i].innerHTML.toUpperCase();
            }
        }
        this.isUppercase = !this.isUppercase;
    }
    _setSwitchLetterChar(){
        var funType = this._get('funType');
        if (funType === 'letter') {
            this._set('funType', 'char');
        }else if (funType === 'char') {
            this._set('funType', 'letter');
        }
    }

    _clickEvnet(e) {
        var ev = e || window.event;
        var clickEl = ev.element || ev.target;
        var value = clickEl.textContent || clickEl.innerText;
        var input = this._get('el');
        var clickElName = clickEl.tagName.toLocaleLowerCase();
        switch (clickElName){
            case 'div':
                this._close();
                break;
            case 'li':
                if(value === '↑'){
                    this._setSwitchUppercase()
                }else if(value ==='space'){
                    this._setAddValue(input,' ');
                }else if(value ==='enter'){
                    this._close();
                }else if(value==='._@/#' || value === "ABC"){
                    this._close();
                    this._setSwitchLetterChar()
                    this._createDiv();
                }else if(value!=='del'){
                    this._setAddValue(input,value);
                }else {
                    this._setReduceValue(input);
                }
                break;
            default:
                break;
        }
    }

    _createDiv() {
        var _div = document.createElement('div');
        _div.id = '__b_u_j_i_d_a_o_k_b_divid';
        _div.style.position = 'fixed';
        _div.style.left = 0;
        _div.style.right = 0;
        _div.style.bottom = 0;
        _div.style.zIndex = this._get('zIndex');
        _div.style.width = this._get('width');
        _div.style.height = this._get('height');
        _div.style.backgroundColor = this._get('backgroundColor');

        _div.innerHTML = this._createButton();
        this._bindEvent(_div);
        var body = document.getElementsByTagName('body')[0];
        if (document.getElementById('__b_u_j_i_d_a_o_k_b_divid')) {
            this._removeDiv();
        }
        body.appendChild(_div);
    }

    _bindEvent(div) {
        if (this._get('mobile')) {
            div.ontouchstart = this._clickEvnet.bind(this);
        } else {
            div.onclick = this._clickEvnet.bind(this);
        }
        return div;
    }
    _createButton() {
        var cssStyle = '<style>.keyboard-close{width:340px;padding:0 20px;height:30px;line-height:30px;text-align:right;background:#eee;border-bottom:1px solid #ddd;color:#4a4a4a;font-size:14px;cursor:pointer}ul{list-style:none;margin:0}.keyboard-wrapper{display:inline-block;width:340px;background:#eee;padding:10px 20px}.keyboard-wrapper li{float:left;display:inline-block;width:30px;height:35px;line-height:35px;background:#fff;text-align:center;margin:2px;color:#4a4a4a;border-radius:4px;box-shadow:0 0 2px 1px #ccc;cursor:pointer;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none}.keyboard-wrapper li:hover{background:#eee}.keyboard-wrapper .k-line2-head{margin-left:18px}.keyboard-wrapper .k-switch-uppercase,.keyboard-wrapper .k-switch-del{width:46px}.keyboard-wrapper .k-switch-uppercase.active{color:deepskyblue}.keyboard-wrapper .k-switch-function,.keyboard-wrapper .k-enter{width:81px}.keyboard-wrapper .k-space{width:98px}.keyboard-wrapper .color-dark{background:#ddd}</style>';
        var letterHtml = '<div class="keyboard-close">收起</div>' +
            '<ul id="' + this._get('TABLE_ID') + '" class="keyboard-wrapper">\n' +
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
            '        <li class="k-switch-del color-dark">del</li>\n' +
            '\n' +
            '        <li class="k-switch-function color-dark">._@/#</li>\n' +
            '        <li class="k-dot">.</li>\n' +
            '        <li class="k-space">space</li>\n' +
            '        <li class="k-at">@</li>\n' +
            '        <li class="k-enter color-dark">enter</li>\n' +
            '    </ul>';
        var charHtml = '<div class="keyboard-close">收起</div>' +
            '<ul id="' + this._get('TABLE_ID') + '" class="keyboard-wrapper">\n' +
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
            '        <li class="k-switch-del color-dark">del</li>\n' +
            '\n' +
            '        <li class="k-switch-function color-dark">ABC</li>\n' +
            '        <li class="k-dot">.</li>\n' +
            '        <li class="k-space">space</li>\n' +
            '        <li class="k-at">@</li>\n' +
            '        <li class="k-enter color-dark">enter</li>\n' +
            '    </ul>';
        var funType = this._get('funType');
        if (funType === 'letter') {
            return (cssStyle+letterHtml);
        }else if (funType === 'char') {
            return (cssStyle+charHtml);
        }
    }
}
