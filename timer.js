/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({
} = {}) {
  // await loadTool('AIScheduleTools')
  // const userSelect = await AIScheduleSelect({
  //   titleText: '提示', // 标题内容，字体比较大，超过10个字不给显示的喔，也可以不传就不显示
  //   contentText: '请选择导入的作息时间', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，为必传，不传显示版本号
  //   selectList: [
  //     '夏令时->下午2:30上课',
  //     '冬令时->下午2:00上课',
  //   ], // 选项列表，数组，为必传
  // })
  await AIScheduleAlert('稍安勿躁~正在解析课表\n目前使用夏令时~，您可以导入后手动修改')
  return {
    totalWeek: 22, // 总周数：[1, 30]之间的整数
    startSemester: '1661961600', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: false, // 是否显示周末
    forenoon: 4, // 上午课程节数：[1, 10]之间的整数
    afternoon: 4, // 下午课程节数：[0, 10]之间的整数
    night: 4, // 晚间课程节数：[0, 10]之间的整数
    sections: [{
      section: 1, // 节次：[1, 30]之间的整数
      startTime: '08:00', // 开始时间：参照这个标准格式5位长度字符串
      endTime: '08:45', // 结束时间：同上
    }, {
      section: 2, // 节次：[1, 30]之间的整数
      startTime: '08:55', // 开始时间：参照这个标准格式5位长度字符串 
      endTime: '09:40', // 结束时间：同上
    }, {
      section: 3, // 节次：[1, 30]之间的整数
      startTime: '10:05', // 开始时间：参照这个标准格式5位长度字符串
      endTime: '10:50', // 结束时间：同上
    }, {
      section: 4, // 节次：[1, 30]之间的整数
      startTime: '11:00', // 开始时间：参照这个标准格式5位长度字符串
      endTime: '11:40', // 结束时间：同上
    }, {
      section: 5, // 节次：[1, 30]之间的整数
      startTime: '14:30', // 开始时间：参照这个标准格式5位长度字符串
      endTime: '15:15', // 结束时间：同上
    }, {
      section: 6, // 节次：[1, 30]之间的整数
      startTime: '15:25', // 开始时间：参照这个标准格式5位长度字符串
      endTime: '16:10', // 结束时间：同上
    }, {
      section: 7, // 节次：[1, 30]之间的整数
      startTime: '16:20', // 开始时间：参照这个标准格式5位长度字符串
      endTime: '17:05', // 结束时间：同上
    }, {
      section: 8, // 节次：[1, 30]之间的整数
      startTime: '17:05', // 开始时间：参照这个标准格式5位长度字符串
      endTime: '17:50', // 结束时间：同上
    }, {
      section: 9, // 节次：[1, 30]之间的整数
      startTime: '18:50', // 开始时间：参照这个标准格式5位长度字符串
      endTime: '19:35', // 结束时间：同上
    }, {
      section: 10, // 节次：[1, 30]之间的整数
      startTime: '19:45', // 开始时间：参照这个标准格式5位长度字符串
      endTime: '20:30', // 结束时间：同上
    }, {
      section: 11, // 节次：[1, 30]之间的整数
      startTime: '20:40', // 开始时间：参照这个标准格式5位长度字符串
      endTime: '21:25', // 结束时间：同上
    }, {
      section: 12, // 节次：[1, 30]之间的整数
      startTime: '21:35', // 开始时间：参照这个标准格式5位长度字符串
      endTime: '22:20', // 结束时间：同上
    }], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
  }
}