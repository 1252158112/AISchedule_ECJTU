function scheduleHtmlParser(html) {
    let result = []
    var flag=0
    var op=html.slice(html.search('course-box'),html.search('/tbody'))
    var ans=op.slice(op.search('<tr>')+4,op.length)
    var cls=[]//切片课表部分
    for(let i=1;i<12;i+=2)
    {
        var course=[]
        course=ans.slice(12,ans.search('/tr>'))
        ans=ans.slice(ans.search('/tr>')+4)
        cls.push(course)
    }
    for(let i=0;i<6;i++)//按节次
    {
        cls[i]=cls[i].slice(cls[i].search('</td>')+5)
        let temp=cls[i]
        for(let j=0;j<7;j++)//模拟，按星期读取
        {   
            let pt=temp.search('<td>')+5
            if(flag==1)
            {
                pt=0
                flag=0
            }
            if(temp[pt]=='<')//无课程
            {
                //'第',j+1,'星期','第',i+1,'节无课程')
                temp=temp.slice(temp.search('</td>')+5)
            }
            else
            {
                var course={}
                course.name=[]
                course.position=[]
                course.teacher=[]
                course.weeks=[]   
                course.day=''     
                course.sections=new Array()  
                course.name=temp.slice(pt,temp.search('<br>'))
                temp=temp.slice(temp.search('<br>')+4)
                course.teacher=temp.slice(0,temp.search(' '))
                pt=temp.search(' ')+1
                if(temp[pt]=='@')//课程有教室
                {
                    //console.info('有教室')
                    course.position=temp.slice(pt+1,temp.search('<br>'));
                    temp=temp.slice(temp.search('<br>')+4)

                }
                else
                {
                    //console.info('无教室')
                    course.position='暂无'
                    temp=temp.slice(temp.search(' '+1))
                    while(temp[0]==' ')
                        temp=temp.slice(1)
                }
                let st=0
                let ed=0
                let t_st=temp.slice(0,temp.search(' '))
                if(t_st[t_st.length-1]==')')//课程有单双周
                {
                      
                    st=t_st.slice(0,t_st.search('-'))-0
                    ed=t_st.slice(t_st.search('-')+1,t_st.length-3)-0
                    if(t_st[t_st.length-2]=='单')
                    {   
                        if(st%2==1)                 
                            for(let k=st;k<=ed;k+=2)
                                course.weeks.push(k-0) 
                        else
                            for(let k=st+1;k<=ed;k+=2)
                                course.weeks.push(k-0)
                    }
                    else
                    {
                        if(st%2==1)                 
                            for(let k=st+1;k<=ed;k+=2)
                                course.weeks.push(k-0) 
                        else
                            for(let k=st+1;k<=ed;k+=2)
                                course.weeks.push(k-0)
                    }
                    //判断之后还有没有课程
                    temp=temp.slice(temp.search('<br>')+4)
                    if(temp[0]=='<')//没有课程了
                    {
                        course.day=(j+1)
                        var time={}
                        time.section=i*2+1
                        time.startTime=''
                        time.endTime=''
                        course.sections[0]=time
                        var time2={}
                        time2.section=i*2+2
                        time2.startTime=''
                        time2.endTime=''
                        course.sections[1]=time2
                        result.push(course)
                        temp=temp.slice(temp.search('</td>')+5)
                        //('第',j+1,'星期','第',i+1,'节有课程：',course)
                    }
                    else//还有课程
                    {
                        var time={}
                        course.day=(j+1)//.toString
                        time.section=i*2+1
                        time.startTime=''
                        time.endTime=''
                        course.sections[0]=time
                        var time2={}
                        time2.section=i*2+2
                        time2.startTime=''
                        time2.endTime=''
                        course.sections[1]=time2
                        result.push(course)
                        //('第',j+1,'星期','第',i+1,'节有课程：',course)
                        j--  
                        flag=1                              
                    }
                }
                else
                {
                    var time={}
                    st=t_st.slice(0,t_st.search('-'))
                    ed=t_st.slice(t_st.search('-')+1)
                    for(let k=st;k<=ed;k++)
                        course.weeks.push(k-0)
                    course.day=(j+1)
                    time.section=i*2+1
                    time.startTime=''
                    time.endTime=''
                    course.sections[0]=time
                    var time2={}
                    time2.section=i*2+2
                    time2.startTime=''
                    time2.endTime=''
                    course.sections[1]=time2
                    result.push(course)
                    //('第',j+1,'星期','第',i+1,'节有课程：',course)
                    temp=temp.slice(temp.search('</td>')+5)
                }
                
            }    
        }
    }
    return { courseInfos: result }
}
