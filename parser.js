// 解析中文
function uncode(str) {
    return str.replace(/&#(x)?([^&]{1,5});?/g, function (a, b, c) {
        return String.fromCharCode(parseInt(c, b ? 16 : 10));
    })
}
// 获取课程持续周数组
function getWeek(str) {
    let weeks=[];
    if(str.search('-')==-1){
        weeks.push(str);
        return weeks
    }
    if(str.search('单')!=-1||str.search('双')!=-1){
        let start=parseInt(str.split('-')[0]);
        let end=parseInt(str.split('-')[1].split('(')[0]);
        for(let i=start;i<=end;i++) {
            if((str.search('单')!=-1&&i%2)||(str.search('双')!=-1&&i%2==0))
                weeks.push(i);
        }
    }else {
        for(let i=parseInt(str.split('-')[0]);i<=parseInt(str.split('-')[1]);i++) weeks.push(i);
    }
    return weeks;
}
// 获取课程所在节次
function getSection(str) {
    return str.split(',');
}
// 处理每日课程
function eachDayParser(row) {
    var classes=[];
    var eachDay=row.split('</td>')
    for(let i=1;i<=7;i++) {
        var oneDay=eachDay[i].replace('<td> ','');//星期i的课程
        oneDay=oneDay.split(/<br>|<\/br>|<br\/>/);
        //每三项构成一个课程
        for(let j=0;j<oneDay.length;j+=3) {
            if(oneDay[j]=='') continue;
            let addClass={};
            addClass['name']=oneDay[j];
            addClass['day']=i;
            if((oneDay[j]+oneDay[j+1]+oneDay[j+2]).search('@')!=-1){
                addClass['position']=oneDay[j+1].split(/ +/)[1].replace('@','');
                addClass['teacher']=oneDay[j+1].split(/ +/)[0];
                addClass['weeks']=getWeek(oneDay[j+2].split(/ +/)[0]);
                addClass['sections']=getSection(oneDay[j+2].split(/ +/)[1]);
            }else {//没有上课位置的课程
                addClass['teacher']=oneDay[j+1].split(/ +/)[0];
                addClass['weeks']=getWeek(oneDay[j+1].split(/ +/)[1]);
                addClass['sections']=getSection(oneDay[j+1].split(/ +/)[2]);
                j--;
            }
            classes.push(addClass);
        }
    } 
    return classes;
}
function scheduleHtmlParser(html) {
    // 返回课程列表 
    var course = []
    // 每行课程
    var row = [];
    $('tr').each(function (i, elem) {
        if (i != 0)
            row.push(uncode($(this).html().replace(/\n|\t/g, '')))
    })
    for(let i=0;i<row.length;i++)
        course=course.concat(eachDayParser(row[i])) 
    return course
}