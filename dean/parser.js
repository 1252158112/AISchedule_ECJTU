function scheduleHtmlParser(providerRes) {
  if (providerRes === '') {
    const courseInfos = []
    for (let week = 1; week <= 1; week += 1) {
      for (let section = 1; section <= 12; section += 1) {
        for (let day = 1; day <= 7; day += 1) {
          const courseTemp = {
            name: `a`,
            teacher: '',
            position: '',
            weeks: [week],
            day: day,
            sections: [{
              section: section,
            }]
          }
          courseInfos.push(courseTemp)
        }
      }
    }
    return courseInfos
  }
  return JSON.parse(providerRes)
}