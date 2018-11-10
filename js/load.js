
String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
        return (typeof args[number] != 'undefined' ? args[number] : match);
    });
};

class MenuItem{
    constructor(title, url){
        this.title = title;
        this.id = title.toLowerCase().replace(/\s+/, '');
        this.url = url!==undefined ? url:(this.id+'.html');
    }
}

menu = [
    new MenuItem('Introduction'),
    new MenuItem('Methodology', 'concepts.html'),
    new MenuItem('About Us'),
    new MenuItem('Schedule'),
    new MenuItem('Downloads'),
    new MenuItem('GitHub &#8599;', 'https://github.com/tikyau/HKUCS-Project---Deep-Learning-for-Text-Classification')
]

function load(current='index'){
    loadHeader(current);
    loadMenu();
    loadFooter();
    loadProfile();
}


function loadHeader(current='index') {
    header = "<div class='logo'><a href='index.html'><img src='images/home.png' alt=''/></a></div>"+
        "<div class='buttonBar'>";
    for (var i=0; i<menu.length; i++){
        m = menu[i];
        header += "<a id='{0}' class='button trans {1}' href='{2}'>{3}</a>".format(
            m.id, (m.id==current?'current':''), m.url, m.title);
    }
    header += "</div>"+
        "<a class='menuButton {0}' href='#menu'>Menu</a>".format(current=='index'?'':'fixed');
	
    $('#header').append(header);
	$('#'+current).css("color", "rgba(255, 255, 255, 0.65)");
    if (current != 'index'){
        $("#header").css("background-color", "#000");
    }
}

function loadMenu(){
    sidebar = "<ul id='sidebar' class='links'>";
    for (var i=0; i<menu.length; i++){
        m = menu[i];
        sidebar += "<li><a href='{0}'>{1}</a></li>".format(m.url, m.title);
    }
    sidebar += "</ul>";

    $('#menu').append(sidebar);
}

function loadFooter(){
    $('#footer').append(
        // "<div class='container'>"+
        //     "<ul class='icons'>"+
        //         "<li><a href='' class='icon fa-twitter'><span class='label'>Twitter</span></a></li>"+
        //         "<li><a href='' class='icon fa-facebook'><span class='label'>Facebook</span></a></li>"+
        //         "<li><a href='' class='icon fa-instagram'><span class='label'>Instagram</span></a></li>"+
        //         "<li><a href='' class='icon fa-envelope-o'><span class='label'>Email</span></a></li>"+
        //     "</ul>"+
        // "</div>"+
        "<div class='copyright'>"+
            "<p>Copyright &copy; FYP17005</p>"+
            "<p style='margin-top:-0.5rem'>"+
                "Department of Computer Science, The University of Hong Kong"+
            "</p>"+
        "</div>");
}

function loadProfile(){
    $("#chen").append("<img src='https://avatars1.githubusercontent.com/u/14873179?s=400&v=4' alt='' />")
    $("#wang").append("<img src='https://avatars2.githubusercontent.com/u/9819235?s=400&v=4' alt=''/>")
    $("#yan").append("<img src='https://avatars0.githubusercontent.com/u/26273095?s=400&v=4' alt='' />")
}


function loadSubheader(subpage){
    submenu = [
        new MenuItem('Concepts'),
        new MenuItem('Datasets'),
        new MenuItem('Models'),
        new MenuItem('Experiments')
    ];
    subheader = "<div class='inner buttonBar2'>";
    for (var i=0; i<submenu.length; i++){
        s = submenu[i];
        subheader += "<a id='{0}' class='button alt sub' href='{1}'>{2}</a>".format(s.id, s.url, s.title);
    }
    subheader += "</div>";

    $('#subheader').append(subheader);
    $('.button.alt.sub').css("color", "#ffffff")
    $('#'+subpage).css("color", "rgba(255, 255, 255, 0.65)")
    $('#methodology').css("color", "rgba(255, 255, 255, 0.65)")
}


function loadDocuments(){
    class Document {
        constructor(title, filename, date, avaliable){
            this.title = title
            this.filename = filename
            this.date = date
            this.avaliable = avaliable
        }
        line(){
            if (this.avaliable){
                return ("<tr>"+
                    "<th>"+
                        "<li class='link enabled'><a href='documents/{0}'>{1} - <i>{2}</i></a></li>"+
                    "</th>"+
                    "<th enabled>{3}</th>"+
                "</tr>").format(this.filename, this.title, this.filename, this.date);
            } else {
                return ("<tr>"+
                    "<th>"+
                        "<li class='link'>{0} - <i>{1}</i></li>"+
                    "</th>"+
                    "<th class='disabled'>To be released</th>"+
                "</tr>").format(this.title, this.filename)
            }
        }
    }

    documents = [
        new Document('Project Plan','project-plan.pdf','30 September, 2017',true),
        new Document('Interim Presentation Slides','interim-presentation-slides.pdf','9 January, 2018',true),
        new Document('Interim Report','interim-report.pdf','21 January, 2018',true),
        new Document('Final Presentation Slides','final-presentation-slides.pdf','16 April, 2017',true),
        new Document('Project Poster','fyp17005.jpg','3 May, 2017', true),
        new Document('Final Report','final-report.pdf','8 May, 2017',false),
    ]

    for (var i=0; i<documents.length; i++){
        $('#documents').append(documents[i].line())
    }
}


function loadTimetable(start=0, end){
    class Event {
        constructor(date, milestone, task){
            this.date = date
            this.milestone = milestone
            this.task = task
        }
        get_M(){
            return (this.milestone > 0) ? "M"+this.milestone : ""
        }
        get_Milestone(){
            return (this.milestone > 0) ? " - Milestone"+this.milestone : ""
        }
    }

    events = [
        new Event('October 1, 2017',0,'Complete Detailed Project Plan.'),
        new Event('October 15, 2017',0,'Negotiate with Microsoft to decide the domain of focus. Fetch data from Microsoft.'),
        new Event('November 19, 2017',1,'Research on NLP topic. Complete data preprocessing pipeline. Get familiar with Microsoft CNTK. Design, implement and train the first prototype using existing model.'),
        new Event('January 9, 2018',2,'Interim presentation and report. Implement the first satisfactory model.'),
        new Event('January 21, 2018',0,'Get access to Microsoft Azure. Complete benchmarking of several existing models.'),
        new Event('February 18, 2018',3,'Design and implement the final model.'),
        new Event('March 11, 2018',0,'Complete hyperparameter tuning. Deploy the model on Azure.'),
        new Event('March 25, 2018',0,'Complete the final experiments and analyze the result.'),
        new Event('April 1, 2018',4,'Integration testing. Prepare for the final report and presentation.'),
        new Event('April 15, 2018',0,'Submission of the final report.'),
        new Event('April 16, 2018',0,'Final presentation for the project.'),
        new Event('April 23, 2018',0,'Get poster prepared for project exhibition.'),
        new Event('May 3, 2018',0,'Project poster exhibition.')
    ]

    end = (end!==undefined) ? end : events.length;

    large_table = "<table class='ttable large'>"
    small_table = "<table class='ttable small'>"
    for (var i=start; i<end; i++){
        e = events[i];
        large_table += ("<tr>"+
                "<th><li>{0}</li></th>"+
                "<th>{1}</th>"+
                "<th>{2}</th>"+
            "</tr>").format(e.date, e.get_M(), e.task);

        small_table += ("<tr>"+
                "<th><li>{0}{1}</li></th>"+
            "</tr>"+          
            "<tr>"+
                "<th>{2}</th>"+
            "</tr>").format(e.date, e.get_Milestone(), e.task)
    }
    large_table += "</table>"
    small_table += "</table>"

    $("#timetable").append(large_table+small_table)

    progress1 = "<div id='progress1'>"
    for (var i=start; i<end; i++){
        e = events[i];
        progress1 += "<li>{0}{1}</li><p>{2}</p>".format(e.date, e.get_Milestone(), e.task);
    }
    progress1 += "</div>"
    progress2 = "<div id='progress2'>"+large_table+small_table+"</div>"
    $("#progress").append(progress1+progress2)
    
}




function showall(index){
    button = "#showall-"+index;
    box = "#"+index;
    if ($(button).text() == "READ MORE"){
        $(button).text("HIDE");
        $(box).animate({height:'100%'},0)
        $(box).animate({maxHeight:'2000px'},'slow')
    } else {
        $(button).text("READ MORE");
        $(box).animate({height:'290px',maxHeight:'290px'},'slow')
        $('html, body').animate({scrollTop:$(box).offset().top+290},'slow')
    }
}


$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({scrollTop: $(hash).offset().top}, 800);
        }
    });

});