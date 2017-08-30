# 基础知识
## canvas元素
不给Canvas元素设置宽高时，其默认尺寸是300px*150px。可以通过Canvas元素的width/height属性和CSS两种方式来设置其宽高，但是这两种方法产生的效果并不一样。
Canvas实际上有两套尺寸，一是元素本身的大小，二是元素绘图表面的大小。当设置元素的width/height时，实际上是同时修改了元素本身的大小与绘图表面的大小。但是修改CSS只会改变元素本身的大小，而不会影响到绘图表面。
当元素本身大小不符合其绘图表面的大小时，浏览器会对绘图表面进行缩放，使其符合元素的大小。


Canvas只提供了两个属性和三个方法。
#### 属性：
width和height，其取值为任意非负整数，前面可以添加+和空格，后面不能添加“px”后缀。
#### 方法：
- getContext()：返回与canvas相关的绘图环境对象。每个canvas都有这样一个对象，且每个环境对象与一个canvas元素相关联。
- toDataURL(type, quality):返回一个数据地址，可以将其设置为img元素的src值。接收两个参数，一个是图像的类型，如image/jpeg或image/png，默认为image/png。第二个参数是0-1之间的double，表示图片的质量。
- toBlob(callback, type, args):创建一个用于表示此canvas元素图像文件的Blob。

## canvas的绘图环境
**canvas元素仅仅是为了充当绘图容器对象的容器而存在的，该环境对象提供了全部的绘图功能。**

2d绘图环境的属性：
属性|简介
:-----:|-----
canvas|指向该绘图环境所属的canvas对象。该属性最常见的作用是通过它来获取canvas的宽高，分别调用context.canvas.width与context.canvas.height即可
fillstyle|指定该绘图环境在后续的图形填充操作中使用的颜色。渐变色或图案。
font|设置在调用绘图环境对象的fillText()和strokeText()方法时所使用的字型。
globalAlpha|全局透明度设置，取值0-1。
globalCompsiteOperation|该值决定了浏览器将某个物体绘制在其他物体之上时，所采用的绘制方式。
lineCap|该属性告诉浏览器如何绘制线段的端点、可以取一下三个值:butt、round以及square。默认是butt。
lineWidth|该值决定了在canvas中绘制线段的屏幕像素宽度，必须为一个非负、非无穷的double值，默认为1.0。
lineJoin|告诉浏览器在两条线段相交时如何绘制焦点。可取值是：bevel、round、miter。默认为miter。
miterLimit|告诉浏览器如何绘制miter形式的线段焦点。
shadowBlur|该值决定了了浏览器该如何延伸阴影效果。值越高，阴影效果延伸的越远。它必须是一个非负非无穷的double值，默认为0。
shadowColor|该值告诉浏览器使用何种颜色来绘制阴影。通常使用半透明色作为该属性的值，以便让后面的背景能显示出来。
shadowOffsetX|以像素为单位，指定了阴影效果的水平方向偏移量。
shadowOffserY|以像素为单位，指定了阴影效果的竖直方向偏移量。
strokeStyle|指定了对路径进行描边时所用的绘制风格。该值可以被指定为某个颜色、渐变色或图案。
textAlign|决定了以fillText()或strokeText()方法进行绘制时，所画文本的水平对齐方式。
textBaseline|决定了以fillText()或strokeText()方法进行绘制时，所画文本的垂直对齐方式。
|

WebGL是canvas中与2d绘图环境对应的3d绘图环境。

Canvas的API提供了save()和restore()方法用来保存及恢复当前canvas绘图环境的所有属性。save方法将当前的绘图环境压入堆栈顶部，对应的restore方法会从堆栈顶部弹出一组状态信息，并据此恢复当前绘图环境的各个状态。这意味着可以嵌套式地调用sava()/restore()方法。

Canvas让开发者先创建不可见的路径，然后再通过调用stroke()来描绘路径边缘，或使用fill()来对路径进行内部填充。

## 事件处理
### 鼠标事件
两种方式：
```
canvas.onmousedown = function(){
	//...
}

canvas.addEventListener('mousedown', function(){
	//...
});
```
除了onmousedown，也可以使用onmousemove、onmouseup、onmouseout来注册监听器。
如果想向某个鼠标事件注册多个监听器，必须用addEventListener()方法。

**将鼠标坐标转化为窗口坐标**：浏览器通过事件对象传递给监听器的鼠标坐标是窗口坐标而不是相对于canvas自身的坐标。而大部分情况下，开发者需要知道的是发生鼠标事件的点相对于canvas的位置，而不是整个窗口中的位置，所以必须进行坐标转换。

### 键盘事件
当在浏览器窗口中按下某个按键时，浏览器就回生成键盘事件。这些事件发生在当前拥有焦点的HTML元素身上。如果没有元素有焦点，那么事件发生地将会上移至window或document对象。
canvas本身是不可获取焦点的，因此要想检测键盘事件，必须为document或window对象新增键盘事件监听器。
一共有三种键盘事件：keydown，keypress，keyup。
keydown与keyup是底层事件，几乎每次按键时浏览器都会触发这些事件。但是有些按键敲击动作，如一些特殊的组合按键，会被系统吞掉。
如果激发keydown事件的那个按键会打印出某个字符，那么浏览器会在keyup事件之前产生keypress事件。如果在某段时间内持续按住某个可打印出字符的按键，那么浏览器就会在keydown和keyup之间产生一系列的keypress事件。
按键监听器的实现方法与鼠标监听器类似，可以将某个函数赋值给document或window对象的onkeydown、onkeypress和onkeyup变量，也可以使用addEventListener()方法。
键盘事件产生的事件对象也包含下述boolean属性：
- altKey
- ctrlKey
- metaKey
- shiftKey

**浏览器只会在产生可打印字符时才会触发keypress事件**。可以用如下方式来获取字符：
```
var key = String.fromCharCode(event.which);
```

### 触摸事件   
    
### 绘图表面的保存与恢复    
使用getImageData()和putImageData()方法可以对绘图表面进行保存与恢复。     
    
canvas元素使用的是“立即模式”来绘制图形的，即它会立刻将指定的内容绘制在canvas上，然后，它就会忘记刚才所绘制的内容，这表示在canvas中不会包含将要绘制的图形对象列表。   
与之相对应的是“保留模式”，它会维护一份所绘制图形对象的列表。    
立即模式的绘制系统更适合制作“绘画应用程序”，这种程序不需要跟踪记录用户所绘制的东西，而保留模式的绘制系统则更适合制作“画图应用程序”，此种应用程序可以让用户操作其创建的图形对象。   
    
### 在canvas中使用HTML元素   
任何放入canvas主体内的HTML控件，只有在浏览器不支持canvas时才会被显示出来。因此，为了让HTML控件看上去好像是出现在canvas范围内，可以使用CSS将这些控件放置在canvas之上。    
    
采用绝对定位方式的元素会被绘制在采用相对定位方式的元素之上。   
    
### 打印canvas   
虽然canvas默认情况下是一幅**位图**，但是它不能像img元素一样进行拖动或右键另存为。要实现这些功能，需要使用toDataURL()方法结合img标签。          
   
### 离屏canvas
是指将背景存储在一个或多个离屏（隐藏的）canvas之中，将这些离屏canvas中的某一部分复制到屏幕上，以此来大幅提高应用程序的性能。    
    
# 绘制
## 坐标系统    











