async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {//函数名不要动
    await loadTool('AIScheduleTools')
    if(document.getElementById('courseSche')==null) {
        await AIScheduleAlert('我没有在这个网页找到课表>_<,您是否通过智慧交大左侧进入教务综合管理系统并打开课表了呢')
        return "do not continue"
    }
    const userInput = await AISchedulePrompt({
        titleText: '欢迎', // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
        tipText: '您可以复制并添加以下QQ群聊向我反馈问题', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，也可以不传就不显示
        defaultText: '786707995', // 文字输入框的默认内容，不传会显示版本号，所以空内容要传个''
        validator: value => { // 校验函数，如果结果不符预期就返回字符串，会显示在屏幕上，符合就返回false
          if (value != '786707995') return '注意是786707995哈'
          return false
      }})
    return document.getElementById('courseSche').innerHTML 
}