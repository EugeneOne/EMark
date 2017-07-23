**Electron API**
> ##DOM 

####File对象
提供了一个path属性，获取文件真实路径

```
  var holder = document.getElementById('holder');
  holder.ondragover = function () {
    return false;
  };
  holder.ondragleave = holder.ondragend = function () {
    return false;
  };
  holder.ondrop = function (e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    console.log('File you dragged here is', file.path);
    return false;
  };
```

#### `<webview>` 标签
类似iframe，但又不同,webview和应用运行的是不同的进程,没有渲染进程的权限,应用和webview之间的交互全部是异步的
```
	<webview id="foo" src="https://www.github.com/" style="display:inline-block; width:640px; height:480px"></webview>
```

有两个事件监听：

	did-start-loading

监听 web page 准备加载

	did-stop-loading

监听 web page 停止加载


**<h2>主进程中的模块</h2>**
> ##app模块

- app模块
	
	app模块是为了控制整个应用给的生命周期设计的
	
	```
	const electron = require('electron')
	const app = electron.app  //控制应用生命周期的模块
	```
	
	事件列表 | 方法列表：

	[详细链接](https://www.w3cschool.cn/electronmanual/electronmanual-electronapp.html)
	
	