## canvas元素
不给Canvas元素设置宽高时，其默认尺寸是300px*150px。可以通过Canvas元素的width/height属性和CSS两种方式来设置其宽高，但是这两种方法产生的效果并不一样。  
Canvas实际上有两套尺寸，一是元素本身的大小，二是元素绘图表面的大小。当设置元素的width/height时，实际上是同时修改了元素本身的大小与绘图表面的大小。但是修改CSS只会改变元素本身的大小，而不会影响到绘图表面。
当元素本身大小不符合其绘图表面的大小时，浏览器会对绘图表面进行缩放，使其符合元素的大小。  
  

Canvas只提供了两个属性和三个方法。
#### 属性：
width和height，其取值为任意非负整数，前面可以添加+和空格，后面不能添加“px”后缀。
#### 方法：
- **getContext()：返回与canvas相关的绘图环境对象。每个canvas都有这样一个对象，且每个环境对象与一个canvas语速相关联。
- **toDataURL(type, quality):返回一个数据地址，可以将其设置为img元素的src值。接收两个参数，一个是图像的类型，如image/jpeg或image/png，默认为image/png。第二个参数是0-1之间的double，表示图片的质量。
- **toBlob(callback, type, args):创建一个用于表示此canvas元素图像文件的Blob。  

## canvas的绘图环境











