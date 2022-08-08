async function scheduleHtmlProvider() {
  // 跳过验证用的
  if (window.location.href === 'https://lacus.site/') {
    return ''
  }

  await loadTool('AIScheduleTools')

  /**
   * 重载页面到选择页面
   */
  const reloadPage = () => {
    const aTag = document.createElement('a')
    aTag.href = 'http://m.dean.nsu.edu.cn/ZNPK/KBFB_ClassSel.aspx'
    aTag.click()
    return 'do not continue'
  }

  /**
   * 开始导入
   */
  const startImport = async () => {
    await loadTool('KingoImgReader')
    const image = document?.getElementsByName("frmRpt")[0]?.contentWindow?.document?.getElementsByTagName('img')[0]
    if (!image) {
      await AIScheduleAlert('未检查到图片请重试')
      return 'do not continue'
    }
    const providerRes = await KingoImgReader(image)
    return providerRes
  }

  const userConfrim = await AIScheduleConfirm({
    titleText: '提示',
    contentText: '请选择是重载到课程页面还是开始导入',
    cancelText: '重载页面',
    confirmText: '开始导入',
  })

  if (userConfrim) {
    return await startImport()
  }

  return reloadPage()
  
  
}