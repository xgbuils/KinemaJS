!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a){var b=a("../../lib/Kinema.js"),c=!0,d=!0,e=!1,f=new b.Stage({container:"container",width:500,height:500}),g=new b.Layer,h=new b.Circle({x:0,y:200,radius:5,fill:"black"});g.add(h),f.add(g);var i=document.getElementById.bind(document),j={play_pause:i("play_pause"),play_mute:i("play_mute"),stop:i("stop"),seek:i("seek"),timeSeek:i("num-seek"),speed:i("speed"),resize:i("resize")},k=new b.Animation(function(a){h.setX(a.time/30),g.draw()});j.play_pause.addEventListener("click",function(){c||d?(k.play(),c=d=!1,j.play_pause.innerHTML="pause",j.play_mute.innerHTML="mute"):(k.pause(),c=!0,j.play_pause.innerHTML=j.play_mute.innerHTML="play")}),j.play_mute.addEventListener("click",function(){c||d?(k.play(),c=d=!1,j.play_pause.innerHTML="pause",j.play_mute.innerHTML="mute"):(k.mute(),d=!0,j.play_pause.innerHTML=j.play_mute.innerHTML="play")}),j.stop.addEventListener("click",function(){k.stop(),c=!0,j.play_pause.innerHTML=j.play_mute.innerHTML="play"}),j.seek.addEventListener("click",function(){var a=j.timeSeek.value;a=parseInt(a),k.seek(a)}),j.speed.addEventListener("input",function(){var a=j.speed.value;a=parseFloat(a),k.speed(a)}),j.resize.addEventListener("click",function(){e?(e=!1,f.resize({width:500,height:500})):(e=!0,f.resize({width:300,height:300}))})},{"../../lib/Kinema.js":7}],2:[function(a,b){function c(){var a=Date.now(),b={time:(a-this.played)*this.v};this.func(b),this.id=window.requestAnimationFrame(c.bind(this))}a("./rAF.js");var d=function(a){this.func=a,this.on=!1,this.paused=this.played=Date.now(),this.v=1,this.active=!1};d.prototype={play:function(){this.func&&!this.on&&(this.paused&&(this.played+=Date.now()-this.paused),c.call(this),this.active=this.on=!0)},pause:function(){this.func&&this.on&&(cancelAnimationFrame(this.id),this.active=this.on=!1,this.paused=Date.now())},mute:function(){this.func&&this.on&&(cancelAnimationFrame(this.id),this.active=this.on=!1,this.paused=void 0)},stop:function(){this.func&&(this.pause(),this.paused=this.played=Date.now())},seek:function(a){if(this.func){var b=Date.now();this.played=b-a,this.paused=b}},speed:function(a){if(this.func&&isFinite(a))if(a){a/=this.v;var b=Date.now(),c=(b-this.played)/a;if(this.played=b-c,this.paused){var d=(b-this.paused)/a;this.paused=b-d}this.v*=a,this.active&&this.play()}else this.pause(),this.active=!0},remove:function(){this.func&&(this.pause(),delete this.func)}},b.exports=d},{"./rAF.js":3}],3:[function(){!function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}()},{}],4:[function(a,b){function c(){this.shapes=[],this.canvas=document.createElement("canvas"),this.canvas.style.position="absolute",this.canvas.style.top="0",this.canvas.style.left="0",this.ctx=this.canvas.getContext("2d")}var d=c.prototype;d.add=function(a){this.shapes.push(a),a.layer=this},d.draw=function(){this.clear(),this.shapes.forEach(function(a){a.draw()})};var e=window.navigator.userAgent,f=/android/i.test(e)&&e.indexOf("534.30");f?(console.log("native_android_browser"),d.clear=function(){this.ctx.clearRect(0,0,this.width,this.height),this.canvas.style.display="none",this.canvas.offsetHeight,this.canvas.style.display="inherit"}):d.clear=function(){this.ctx.clearRect(0,0,this.width,this.height)},d.remove=function(){this.clear(),this.shapes.forEach(function(a){delete a.layer}),this.shapes=[]},b.exports=c},{}],5:[function(a,b){function c(a){this.shape=a}c.prototype.draw=function(){var a=this.shape,b=this.layer;b.ctx.beginPath(),b.ctx.arc(a.x,a.y,a.radius,0,2*Math.PI),b.ctx.closePath(),a.fill&&(b.ctx.fillStyle=a.fill,b.ctx.fill())},c.prototype.setX=function(a){this.shape.x=a},c.prototype.setY=function(a){this.shape.y=a},b.exports=c},{}],6:[function(a,b){function c(a){this.layers=[];var b=this.container=document.getElementById(a.container);if(!b)throw new Error("element #"+a.container+" does not exist");var c=b.style;c.position="relative",c.width=a.width+"px",c.height=a.height+"px",c.overflow="hidden",this.width=parseInt(a.width),this.height=parseInt(a.height)}c.prototype.add=function(a){var b=a.canvas;this.layers.push(a),b.width=a.width=this.width,b.height=a.height=this.height,this.container.appendChild(b)},c.prototype.resize=function(a){var b=parseInt(a.width),c=parseInt(a.height),d=this.container.style;isFinite(b)&&(d.width=b+"px",this.width=b),isFinite(c)&&(d.height=c+"px",this.height=c)},b.exports=c},{}],7:[function(a,b){b.exports={Animation:a("./Animation/Animation.js"),Stage:a("./Canvas/Stage.js"),Layer:a("./Canvas/Layer.js"),Circle:a("./Canvas/Shape/Circle.js")}},{"./Animation/Animation.js":2,"./Canvas/Layer.js":4,"./Canvas/Shape/Circle.js":5,"./Canvas/Stage.js":6}]},{},[1]);