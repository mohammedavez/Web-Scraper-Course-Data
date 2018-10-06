var rp = require('request-promise');
var cheerio = require('cheerio');
var all_course_link = require('./course_links')
fs = require('fs')
let scope = []  
let course_data = []
all_course_link.course_links('https://www.careers360.com/list-of-engineering-courses-in-india?page=13')  

setTimeout(function(){
    console.log(all_course_link.links.length)
    for(let i=0;i<all_course_link.links.length;i++){
    var options = {
    uri: all_course_link.links[i],
    transform: function (body) {
        return cheerio.load(body);
    }
}
rp(options)
    .then(function ($) {
       let course_name = $(".clg-name-review .college-name") 
       let branch = $('.info-left .similar-courses:nth-child(1) ')
       let similar_courses = $('.info-left .similar-courses:nth-child(2)')
       let img_url = $('.img-block img')
       let course_def =$('#course-name .fixSectionShowHide')
       let eligibility= $('#eligiblity-crieteria .fixSectionShowHide')
       let scope_length = $('#scope-of-course .fixSectionShowHide ul li').length
        for(let j=0;j<scope_length;j++){
       scope[j] = $('#scope-of-course .fixSectionShowHide ul li:nth-child('+ (j+1) +')').text()
        }
        course_data[i]={courseName:course_name.text(),
                        Branch:branch.contents().not(branch.children()).text(),
                        SimilarCourses:similar_courses.contents().not(similar_courses.children()).text(),
                        ImgURL:img_url.attr('src'),
                        CourseDef:course_def.text(),
                        Eligibility:eligibility.text(),
                        Scope:scope}
        scope = []

    //    console.log(course_name.text())
    //     console.log(branch.contents().not(branch.children()).text())
    //     console.log(similar_courses.contents().not(similar_courses.children()).text())
    //     console.log(img_url.attr('src'))
    //     console.log(course_def.text()+'\n')
    //     console.log(eligibility.text())
    //     for(k=0;k<scope_length;k++){
    //     console.log(scope[k].text())
    //     }
       })
    .catch(function (err) {
        console.log(err)
    });
    }
},3000)

setTimeout(function(){
    fs.appendFileSync('./Course_data.json',JSON.stringify(course_data,null,2),'utf-8')
},10000)