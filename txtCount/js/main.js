/* 
 * @func txtNumber
 * @author miaoyanhui
 * @time 2014-05-05
 */
//通用正则表达式
var link =/http:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/,:;@&=\?\~\#\%]*)*/gi //url地址
var cn=/([\u4E00-\u9FA5]|[\，]|[\。]|[\！]|[\《]|[\》]|[\（]|[\）]|[\￥]|[\“]|[\；]|[\、])/g; //中文
var space = /^\s+$/g; //空格
//字数统计实例化
function runCount(txtBox,numTip){
	if(txtBox && numTip){
		var t=setInterval(function(){txtCount(txtBox,numTip)},100)
	}else{
		clearInterval(t);
	};
}
//字数统计方法
function txtCount(objA,objB){
	var txt=objA.val().replace(space,'');
	if(txt==''){
		objB.val('还可以输入 140 字');
	}else{
		var linkObj=txt.match(link);
		var linkNum=0;
		var cnNum=0;
		if(linkObj){
			for(i=0;i<linkObj.length;i++){
				if(linkObj[i].length>10){
					var exp= new RegExp(linkObj[i]);
					txt=txt.replace(exp,'');
					linkNum+=10;
				}
			}
		}
		var cnObj=txt.match(cn);
		if(cnObj){
			for(i=0;i<cnObj.length;i++){
				var exp= new RegExp(cnObj[i]);
				txt=txt.replace(exp,'');
				cnNum+=1;
			}
		}
		var num=Math.round(txt.length/2);
		var leftLen=140-num-linkNum-cnNum;
		if(leftLen>=0){
			objB.val('还可以输入 '+leftLen+' 字').removeClass('oversize');
		}else if(leftLen<0){
			objB.val('已经超过 '+(0-leftLen)+' 字').addClass('oversize');
		}
	}
}