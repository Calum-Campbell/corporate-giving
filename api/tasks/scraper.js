var serialize = require("../helpers/serialize");
var rp        = require("request-promise");
var base_url  = "https://api.globalgiving.org"
var path      = "/api/public/projectservice/all/projects/active"

var themePath = "/api/public/projectservice/themes"

var initialParams = {
  api_key: "a310a8b0-2e3a-4c23-aedf-ec13bf0e00a3",
}

var Theme = require("../models/theme");

var url = createUrl(base_url, path, initialParams);
var themeUrl = createUrl(base_url, themePath, initialParams);

// scrape(url);
themeScrape(themeUrl);

function themeScrape(Url) {
  return rp({
    method: "get",
    url: url,
    headers: {
      'Accept': 'application/json'
    }
  }).then(function(res){
    var themes = JSON.parse(res).themes;

    themes.theme.forEach(function(theme){
      var newTheme = new Theme(theme)
      console.log(newTheme)
      newTheme.save(Theme,function(err){
       if (err) return res.status(500).json({message: "Something went wrong!"});
       res.status(201).json({message: 'Theme successfully added.', theme: theme});
     })
    })
  })
}


function scrape(url) {
  return rp({
    method: "get",
    url: url,
    headers: {
      'Accept': 'application/json'
    }
  }).then(function(res){
    var projects = JSON.parse(res).projects;

    projects.project.forEach(function(project){
      console.log(project.title);

      // { id: 898,
      //   organization: 
      //    { id: 349,
      //      name: 'The Nyaka AIDS Orphans Project',
      //      ein: '35-2153719',
      //      addressLine1: '2970 E. Lake Lansing Rd',
      //      addressLine2: '2970 E. Lake Lansing Rd.',
      //      city: 'East Lansing',
      //      state: 'MI',
      //      postal: '48823',
      //      iso3166CountryCode: 'US',
      //      url: 'http://www.nyakaschool.org/',
      //      logoUrl: 'https://dpqe0zkrjo0ak.cloudfront.net/pfil/organ/349/orglogo.jpg',
      //      mission: 'The Nyaka AIDS Orphans Project is working on behalf of HIV/AIDS orphans in rural Uganda to end systemic deprivation, poverty and hunger through a holistic approach to community development, education, and healthcare.',
      //      totalProjects: 2,
      //      activeProjects: 2,
      //      themes: { theme: [Object] },
      //      countries: { country: [Object] },
      //      country: 'United States' },
      //   active: true,
      //   title: 'Provide Education to AIDS Orphans in Rural Uganda',
      //   summary: 'The Nyaka AIDS Orphans Project (NAOP) is working to free orphans from the cycle of poverty by providing a high-quality, free education, both formal and informal, to children who have been orphaned due to HIV/AIDS in order to counteract pervasive hunger, poverty, and systemic deprivation. Your donation will help provide a student with a uniform, meals, medicine, and supplies for one school year. For your secondary students, your donation will also include transportation to their school.',
      //   contactName: 'Twesigye Kaguri',
      //   contactTitle: 'Founder/ Director',
      //   contactAddress: '2970 E. Lake Lansing Rd',
      //   contactCity: 'East Lansing',
      //   contactState: 'MI',
      //   contactPostal: '48823',
      //   contactCountry: 'United States',
      //   contactPhone: '517 525 6623',
      //   contactUrl: 'http://nyakaschool.org/',
      //   projectLink: 'http://www.globalgiving.co.uk/projects/help-educate-aids-orphans-in-africa/',
      //   progressReportLink: 'http://www.globalgiving.co.uk/projects/help-educate-aids-orphans-in-africa/updates/',
      //   themeName: 'Children',
      //   country: 'Uganda',
      //   iso3166CountryCode: 'UG',
      //   region: 'Africa',
      //   goal: 175865,
      //   funding: 160954,
      //   remaining: 14911,
      //   numberOfDonations: 182,
      //   status: 'active',
      //   need: 'Hundreds of thousands of families in southwestern Uganda have lost breadwinners to HIV/AIDS, and are stuck in systemic poverty cycles where children lack access to healthcare, education, food, and shelter.  Your support helps fight poverty by empowering these children, especially girls, through free, quality education, healthcare, and basic needs. A girl student, Irene, says, "We were suffering in the villages...I am very happy to be in secondary school where I forget about being an orphan."',
      //   longTermImpact: 'The Nyaka Secondary and Vocational School opened to educate your students in 2015. In 2015, the very first class of students from Nyaka will be attending university, and they will graduate in 2018. Starting in 2017, you will be supporting over 900 students, from young nursery students to passionate university students, on an annual basis. Each year, as students graduate from university, they will be replaced by 60 new nursery students, and the cycle of empowerment will continue.',
      //   activities: 'You and your love help operate two free primary schools for over 465 vulnerable children that provide meals, clothes, medical care, vocational training, community potable water, and a HIV/AIDS prevention program.  Your love also provides scholarships to over 191 secondary school students. These scholarships cover their tuition, supplies, transportation, health care, and other services.',
      //   additionalDocumentation: 'https://d3lmeboybbrqpp.cloudfront.net/pfil/898/projdoc.pdf',
      //   imageLink: 'https://d3lmeboybbrqpp.cloudfront.net/pfil/898/pict.jpg',
      //   imageGallerySize: 24,
      //   videos: { video: [ [Object] ] },
      //   longitude: 32.6953125,
      //   latitude: 0.5273360013961792,
      //   approvedDate: '2005-01-15T15:43:43-05:00',
      //   donationOptions: 
      //    { donationOption: 
      //       [ [Object],
      //         [Object],
      //         [Object],
      //         [Object],
      //         [Object],
      //         [Object],
      //         [Object],
      //         [Object],
      //         [Object] ] },
      //   image: 
      //    { title: 'Provide Education to AIDS Orphans in Rural Uganda',
      //      id: 0,
      //      imagelink: [ [Object], [Object], [Object], [Object], [Object], [Object] ] } }



    });

if (projects.hasNext) {
  var newParams = initialParams;
  initialParams.nextProjectId = projects.nextProjectId;
  var url = createUrl(base_url, path, newParams);
  return scrape(url);
} else {
  return process.exit();
};
});
};

function createUrl(base_url, path, params){
  return url = base_url + path + "?" + serialize(params)

}