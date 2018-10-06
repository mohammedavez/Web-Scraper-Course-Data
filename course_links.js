var rp = require('request-promise');
var cheerio = require('cheerio');
var links= [];
var course_links = function(url){
    
    var course_link = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    }
    rp(course_link)
    .then(function ($) {
        $('.title a').each(function(){
            links.push($(this).attr('href'))
        })
       
    })
    .catch(function (err) {
        console.log(err)
    });
}
// course_links('https://www.careers360.com/list-of-engineering-courses-in-india')

// setTimeout(function(){
//     console.log(links.length)
// },3000)
module.exports.course_links=course_links;
module.exports.links=links;