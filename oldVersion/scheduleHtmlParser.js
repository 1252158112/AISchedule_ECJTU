//1.0.0
function scheduleHtmlParser(html) {
    //夏令时
     const summerTime = [
        {"section": 1, "startTime": "08:00", "endTime": "08:45"},
        {"section": 2, "startTime": "08:55", "endTime": "09:40"},
        {"section": 3, "startTime": "10:05", "endTime": "10:50"},
        {"section": 4, "startTime": "10:55", "endTime": "11:40"},
        {"section": 5, "startTime": "14:00", "endTime": "14:45"},
        {"section": 6, "startTime": "14:55", "endTime": "15:40"},
        {"section": 7, "startTime": "16:05", "endTime": "16:50"},
        {"section": 8, "startTime": "16:55", "endTime": "17:40"},
        {"section": 9, "startTime": "19:00", "endTime": "19:45"},
        {"section": 10, "startTime": "19:55", "endTime": "20:40"}
    ]

    // 冬令时
    const winterTime = [
        {"section": 1, "startTime": "08:00", "endTime": "08:40"},
        {"section": 2, "startTime": "08:50", "endTime": "09:30"},
        {"section": 3, "startTime": "09:50", "endTime": "10:30"},
        {"section": 4, "startTime": "10:40", "endTime": "11:20"},
        {"section": 5, "startTime": "11:30", "endTime": "12:10"},
        {"section": 6, "startTime": "13:30", "endTime": "14:10"},
        {"section": 7, "startTime": "14:20", "endTime": "15:00"},
        {"section": 8, "startTime": "15:10", "endTime": "15:50"},
        {"section": 9, "startTime": "16:00", "endTime": "16:40"},
        {"section": 10, "startTime": "18:30", "endTime": "19:10"}
    ]
    let result = []
    var flag = 0
    var op = html.slice(html.search('course-box'), html.search('/tbody'))
    var ans = op.slice(op.search('<tr>') + 4, op.length)
    var cls = []
    for (let i = 1; i < 12; i += 2) {
        var course = []
        course = ans.slice(12, ans.search('/tr>'))
        ans = ans.slice(ans.search('/tr>') + 4)
        cls.push(course)
    }
    //以上过滤出每节次所有周的课程
    for (let i = 0; i < 6; i++) //按节次
    {
        cls[i] = cls[i].slice(cls[i].search('</td>') + 5)
        let temp = cls[i]
        for (let j = 0; j < 7; j++) //模拟，按星期
        {
            let pt = temp.search('<td>') + 5
            if (flag == 1) {
                pt = 0
                flag = 0
            }
            if (temp[pt] == '<') {
                temp = temp.slice(temp.search('</td>') + 5)
            } else {
                var course = {}
                course.name = []
                course.position = []
                course.teacher = []
                course.weeks = []
                course.day = ''
                course.sections = new Array()
                course.name = temp.slice(pt, temp.search('<br>'))
                temp = temp.slice(temp.search('<br>') + 4)
                course.teacher = temp.slice(0, temp.search(' '))
                pt = temp.search(' ') + 1
                if (temp[pt] == '@') //有教室
                {
                    course.position = temp.slice(pt + 1, temp.search('<br>'));
                    temp = temp.slice(temp.search('<br>') + 4)

                } else {
                    course.position = '暂无'
                    temp = temp.slice(temp.search(' ' + 1))
                    while (temp[0] == ' ')
                        temp = temp.slice(1)
                }
                let st = 0
                let ed = 0
                let t_st = temp.slice(0, temp.search(' '))
                st = t_st.slice(0, t_st.search('-')) - 0
                if (t_st[t_st.length - 1] == ')') //有单双周
                {
                    ed = t_st.slice(t_st.search('-') + 1, t_st.length - 3) - 0
                    if (t_st[t_st.length - 2] == '单') {
                        if (st % 2 == 1)
                            for (let k = st; k <= ed; k += 2)
                                course.weeks.push(k - 0)
                        else
                            for (let k = st + 1; k <= ed; k += 2)
                                course.weeks.push(k - 0)
                    } else {
                        if (st % 2 == 1)
                            for (let k = st + 1; k <= ed; k += 2)
                                course.weeks.push(k - 0)
                        else
                            for (let k = st + 1; k <= ed; k += 2)
                                course.weeks.push(k - 0)
                    }
                } else {
                    ed = t_st.slice(t_st.search('-') + 1, t_st.length) - 0
                    for (let k = st; k <= ed; k++)
                        course.weeks.push(k - 0)
                }
                //判断之后还有没有课程
                temp = temp.slice(temp.search('<br>') + 4)
                var time = {}
                course.day = (j + 1) //.toString
                time.section = i * 2 + 1
                time.startTime = ''
                time.endTime = ''
                course.sections[0] = time
                var time2 = {}
                time2.section = i * 2 + 2
                time2.startTime = ''
                time2.endTime = ''
                course.sections[1] = time2
                result.push(course)
                if (temp[0] == '<') //结尾了
                {
                    temp = temp.slice(temp.search('</td>') + 5)
                } else //还有
                { 
                    j--
                    flag = 1
                }
            }
        }
    }
    return { courseInfos: result, sectionTimes: summerTime }
}
