 var _ATDOM = {
 	/**
 	 * @name _ATDOM#$lzc
 	 * @param {string} sArg	
 	 * @param {object} context
 	 * @function
 	 * @return element 
 	 * @return elements
 	 */
 	$lzc: function(sArg, context) {

 		switch (sArg.charAt(0)) {
 			case "#":
 				return document.getElementById(sArg.substring(1));
 				break;
 			case ".":
 				var reg = new RegExp("(^|\\s)" + sArg.substring(1) + "(\\s|$)"),
 					arr = [],
 					aEl = _ATDOM.$lzc("*", context),
 					i;
 				for (i = 0; i < aEl.length; i++) reg.test(aEl[i].className) && arr.push(aEl[i]);
 				return arr;
 				break;
 			default:
 				return (context || document).getElementsByTagName(sArg);
 				break;
 		}
 	},
 	/**
 	 * @name _ATDOM#hasClass
 	 * @param {object} element	
 	 * @param {string} className
 	 * @function
 	 * @return boolean
 	 */
 	hasClass: function(element, className) {
 		return new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className)
 	},
 	/**
 	 * @name Calendar#addClass
 	 * @param {object} element		
 	 * @param {string} className	
 	 * @function
 	 */
 	addClass: function(element, className) {
 		var arr = element.className.split(/\s+/);
 		this.hasClass(element, className) || arr.push(className);
 		element.className = arr.join(" ").replace(/(^\s*)|(\s*$)/, "")
 	},
 	/**
 	 * @name _ATDOM#removeClass
 	 * @param {object} element		
 	 * @param {string} className
 	 * @function
 	 */
 	removeClass: function(element, className) {
 		element.className = element.className.replace(new RegExp("(^|\\s)" + className + "(\\s|$)", "g"), "").split(/\s+/).join(" ")
 	},
 	/**
 	 * @name _ATDOM#on
 	 * @param {object} element		
 	 * @param {string} type 		
 	 * @param {function} handler	
 	 * @function
 	 */
 	on: function(element, type, handler) {
 		element.addEventListener ? element.addEventListener(type, handler, false) : element.attachEvent("on" + type, handler)
 	},
 	/**
 	 * @name _ATDOM#halt
 	 * @param {event} e	 
 	 * @function
 	 */
 	halt: function(e) {
 		e = e || event;
 		e.preventDefault ? e.preventDefault() : e.returnValue = !1;
 		e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
 	}
 };

 /**
  * @name Release
  * @param {object} property
  */
 function Release() {
 	this._init.apply(this, arguments)
 }

 Object.extend = function(destination, source) {
 	for (var property in source) destination[property] = source[property];
 	return destination;
 };

 Release.prototype = {
 		_init: function(obj, id, fnEnd) {
 			if (typeof obj == 'string') {
 				var _this = this;
 				this.iNow = 1;
 				this.val = 0;
 				this.id = id;
 				this.property(fnEnd);
 				this.box = this.fnEnd.box;
 				this.list = this.fnEnd.list;
 				this.mousekey();
 				this.mouseclick();
 			}
 		},
 		property: function(fnEnd) {
 			this.fnEnd = {};
 			Object.extend(this.fnEnd, fnEnd || {});
 		},

 		/**
 		 * @name _DOM
 		 * @function
 		 */
 		_DOM: function() {
 			this.List = _ATDOM.$lzc('#' + this.list);
 			this.aLi = _ATDOM.$lzc('li', this.List);
 			this.Box = _ATDOM.$lzc('#' + this.box);
 			this.Id = _ATDOM.$lzc('#' + this.id);
 			this.Btn = _ATDOM.$lzc('.btn', document)[0];
 			this.num140 = _ATDOM.$lzc('#num140');
 		},

 		/**
 		 * @name listSite 
 		 * @function
 		 */
 		listSite: function() {
 			this._DOM();
 			this.iNum = 0;
 			this.replaceHTML = this.getPosition(this.Id).replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;').replace(/http:\/\/(([^\u4e00-\u9fa5\s])*(\.)?)*/g, '&nbsp;');
 			//this.repre              = this.replaceHTML.match(/http:\/\/(([^\u4e00-\u9fa5\s])*(\.)?)*/g);
 			//this.repre              = this.repre ? this.repre[this.replaceAt.length>10?iNum += 10:iNum += str.length]+'$':'';
 			//this.repre              = new RegExp(this.repre);
 			this.replaceAt = this.replaceHTML.match(/@[^@]+|@/g);
 			//this.replaceAt          = this.replaceAt ?(this.replaceAt.length>10?iNum += 10:iNum += this.replaceAt.length): '';
 			this.replaceAt = this.replaceAt ? this.replaceAt[this.replaceAt.length - 1] + '$' : '';
 			this.replaceAt = new RegExp(this.replaceAt);
 			this.oDiv = document.createElement('div');
 			this.oDiv.id = 'textDisplay';
 			this.oDiv.innerHTML = this.replaceHTML.replace(this.replaceAt, '') + '<cite>#</cite>';
 			this.Box.appendChild(this.oDiv);
 			this.oTextDisplay = _ATDOM.$lzc('#textDisplay');
 			this.oCite = _ATDOM.$lzc('cite', this.oTextDisplay)[0];
 			this.List.style.top = this.oCite.offsetTop + this.oTextDisplay.parentNode.offsetTop - this.Id.scrollTop + 20 + 'px';
 			this.List.style.left = this.oCite.offsetLeft + this.oTextDisplay.parentNode.offsetLeft + 2 + 'px';
 			this.Box.removeChild(this.oDiv);
 		},

 		/**
 		 * @name getPosition 
 		 * @function
 		 */
 		getPosition: function() {
 			this.text;
 			this._DOM();

 			if (typeof(this.Id.selectionStart) == "number") {
 				this.text = this.Id.value.substring(0, this.Id.selectionStart);
 			} else {
 				this.rng;
 				this.rng = document.selection.createRange();
 				this.rng.moveStart("character", -event.srcElement.value.length);
 				this.text = this.rng.text;
 			}
 			return this.text;
 		},

 		/**
 		 * @name insertAdd 
 		 * @function
 		 */
 		insertAdd: function(txt, lenv) {
 			this._DOM();

 			this.txt = txt + ' ';

 			this.List.style.display = 'none';


 			if (document.selection) {
 				this.range = document.selection.createRange();
 				this.range.moveStart("character", -event.srcElement.value.length);
 				lenv && lenv > 0 ? this.start = lenv : this.start = this.range.text.length;
 				this.atReplace(this.start);
 				this.setFocus();
 			} else if (window.getSelection && this.Id.selectionStart > -1) {
 				this.start = this.Id.selectionStart;
 				this.end = this.Id.selectionEnd;
 				this.atReplace(this.start);
 				this.setFocus();
 			}
 		},

 		/**
 		 * @name insertAdd 
 		 * @function
 		 */
 		atReplace: function(start) {
 			this._DOM();
 			this.aReplace = this.Id.value.substring(0, start).match(/@[^@]+|@/g);
 			this.aReplace = this.aReplace ? this.aReplace[this.aReplace.length - 1] + '$' : '';
 			this.aReplace = new RegExp(this.aReplace);
 			this.aReplace = this.Id.value.substring(0, start).replace(this.aReplace, '@');
 		},

 		/**
 		 * @name setFocus 
 		 * @function
 		 */
 		setFocus: function() {
 			if (document.selection) {
 				this.Id.value = this.aReplace + this.txt + this.Id.value.substring(this.start, this.Id.value.length);
 				this.ofocus = this.Id.createTextRange();
 				this.ofocus.moveStart('character', (this.aReplace.length + this.txt.length));
 				this.ofocus.collapse(true);
 				this.ofocus.select();
 			} else if (window.getSelection && this.Id.selectionStart > -1) {
 				this.Id.value = this.aReplace + this.txt + this.Id.value.substring(this.start, this.end) + this.Id.value.slice(this.end);
 				this.Id.setSelectionRange(this.aReplace.length + this.txt.length, this.aReplace.length + this.txt.length);
 			}

 			this.character('text', 280, 'num140');
 		},

 		/**
 		 * @name disList 
 		 * @function
 		 */
 		disList: function() {
 			var len = this.getPosition(this.Id).match(/@[^@]+|@/g);

 			if (len) len[len.length - 1] != '@' ? this.aLi[0].innerHTML = '选择昵称或轻敲空格完成输入' : this.aLi[0].innerHTML = '选择最近@的人或直接输入';
 			//len ? (/\s/g.test(len[len.length-1]) ? this.List.style.display = 'none':this.List.style.display = 'block') : this.List.style.display = 'none';
 			len ? (/[^a-zA-Z0-9\u4e00-\u9fa5@]/g.test(len[len.length - 1]) ? this.List.style.display = 'none' : this.List.style.display = 'block') : this.List.style.display = 'none';
 		},

 		/**
 		 * @name opt
 		 * @function
 		 */
 		opt: function() {
 			for (var len = this.aLi.length, i = 1; i < len; i++) _ATDOM.removeClass(this.aLi[i], 'hove');
 			_ATDOM.addClass(this.aLi[this.iNow], 'hove');
 		},

 		/**
 		 * @name limit
 		 * @function
 		 */
 		limit: function(id) {
 			this.e = _ATDOM.$lzc('#' + id).value;
 			this.e_length = 0;

 			if (this.e.replace(/\n*\s*/, '') == '') {
 				this.e_length = 0
 			} else {
 				this.e_length = this.e.match(/[^ -~]/g) == null ? this.e.length : this.e.length + this.e.match(/[^ -~]/g).length;
 			}
 			return this.e_length
 		},

 		/**
 		 * @name character
 		 * @function
 		 */
 		character: function(id, size, tit) {
 			this.e_length = this.limit(id);
 			this.font_count = Math.floor((size - this.e_length) / 2);
 			if (this.font_count >= 0) {
 				_ATDOM.$lzc('#' + tit).innerHTML = "发言请遵守社会公约，还可以输入<em>" + this.font_count + "</em>字";
 				_ATDOM.addClass(this.Btn, 'btnh');
 				return true
 			} else {
 				_ATDOM.$lzc('#' + tit).innerHTML = "发言请遵守社会公约，已经超过<em style='color:red'>" + Math.abs(this.font_count) + "</em>字";
 				_ATDOM.removeClass(this.Btn, 'btnh');
 				return false
 			}
 		},

 		/**
 		 * @name Error
 		 * @function
 		 */
 		Error: function(id) {
 			var _this = this;
 			this.Timer = null;
 			this.i = 0;

 			this.Timer = setInterval(function() {
 				_this.i++;
 				_this.i == 6 ? (clearInterval(_this.Timer), _this.Id.focus()) : (_this.i % 2 == 0 ? _ATDOM.addClass(_ATDOM.$lzc('#' + id), 'back') : _ATDOM.removeClass(_ATDOM.$lzc('#' + id), 'back'));
 			}, 120);
 		},

 		/**
 		 * @name mousekey 
 		 * @function
 		 */
 		mousekey: function() {
 			var _this = this;
 			this._DOM();

 			_ATDOM.on(this.Id, 'mouseup', function() {
 				_this.listSite();
 				_this.disList();
 			});

 			_ATDOM.on(this.Id, 'keyup', function() {
 				_this.listSite();
 				_this.disList();
 				_this.character('text', 280, 'num140');
 				if (this.value == '') _ATDOM.removeClass(_this.Btn, 'btnh');

 				if (document.selection) {
 					var range = document.selection.createRange();
 					range.moveStart("character", -event.srcElement.value.length);
 					_this.val = range.text.length;
 				}
 			});

 			this.Id.onkeydown = function(e) {
 				var oEvent = e || event;

 				if (_this.List.style.display == 'block' && oEvent.keyCode == 38) {
 					_this.iNow == 1 ? _this.iNow = _this.aLi.length - 1 : _this.iNow--;
 					_this.opt();
 					return false;
 				} else if (_this.List.style.display == 'block' && oEvent.keyCode == 40) {
 					_this.iNow == _this.aLi.length - 1 ? _this.iNow = 1 : _this.iNow++;
 					_this.opt();
 					return false;
 				}

 				if (_this.List.style.display == 'block' && oEvent.keyCode == 13) {

 					_this.insertAdd(_this.aLi[_this.iNow].innerHTML);
 					return false;
 				}
 			};


 			_ATDOM.on(this.Id, 'focus', function() {
 				_ATDOM.addClass(this, 'hove');


 				_ATDOM.addClass(_this.num140, 'color');
 				_this.character('text', 280, 'num140');


 				this.value != '' && _this.e_length <= 280 ? _ATDOM.addClass(_this.Btn, 'btnh') : _ATDOM.removeClass(_this.Btn, 'btnh');
 			});


 			_ATDOM.on(this.Id, 'blur', function() {
 				_ATDOM.removeClass(this, 'hove');


 				if (this.value == '') {
 					_ATDOM.removeClass(_this.num140, 'color');
 					_this.num140.innerHTML = '前任现任人手一个，李晨泡妞神器石头心走红  24小时热博';
 					_ATDOM.removeClass(_this.Btn, 'btnh');
 				}
 			});
 		},

 		/**
 		 * @name mouseclick 
 		 * @function
 		 */
 		mouseclick: function() {
 			var _this = this;

 			for (var len = this.aLi.length, i = 1; i < len; i++) {
 				this.aLi[i].index = i;


 				_ATDOM.on(this.aLi[i], 'mouseover', function() {
 					for (var len = _this.aLi.length, i = 1; i < len; i++) _ATDOM.removeClass(_this.aLi[i], 'hove');
 					_ATDOM.addClass(this, 'hove');
 					_this.iNow = this.index;
 				});


 				_ATDOM.on(this.aLi[i], 'click', function() {

 					_this.insertAdd(this.innerHTML, _this.val);

 				});
 			}


 			_ATDOM.on(this.Btn, 'click', function() {
 				if (_ATDOM.hasClass(this, 'btnh')) {
 					_this.Id.value = '';
 					_this.character('text', 280, 'num140');
 					_ATDOM.removeClass(_this.Btn, 'btnh');
 					_ATDOM.addClass(_ATDOM.$lzc('.fbcg', document)[0], 'dis');


 					setTimeout(function() {
 						_ATDOM.removeClass(_ATDOM.$lzc('.fbcg', document)[0], 'dis');
 						_this.Id.focus();
 					}, 500);
 				} else {
 					_this.Error('text');
 				}
 			});
 		}
 	}
 	/**
 	 * @name atRelease
 	 * @obj, id, fnEnd
 	 */
 function atRelease(obj, id, fnEnd) {
 	return new Release(obj, id, fnEnd);
 }