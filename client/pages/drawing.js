Template.drawpanel.rendered = function() {
     mycanvas.height = window.innerHeight;
     mycanvas.width = window.innerWidth;
     context = mycanvas.getContext("2d");
     defaultcolor = "#ff0000";
     ismousedown = false;
     mycanvas.onmousedown = function(e) {
          ismousedown = true;
          context.beginPath();
          context.arc(e.pageX-mycanvas.offsetLeft, e.pageY-mycanvas.offsetTop, 10, 0, 2 * Math.PI);
          context.fillStyle = defaultcolor;
          context.fill();
     }
     mycanvas.onmousemove = function(e) {
          if (ismousedown === true) {
               context.beginPath();
               context.arc(e.pageX-mycanvas.offsetLeft, e.pageY-mycanvas.offsetTop, 10, 0, 2 * Math.PI);
               context.fillStyle = defaultcolor;
               context.fill();
          }
     }
     mycanvas.onmouseup = function(e) {
          ismousedown = false;
     }
     mycanvas.onmouseout = function(e) {
          ismousedown = false;
     }
}

Template.drawpanel.events({
     'click #btnred': function(event) {
          defaultcolor = "#ff0000";
     },
     'click #btngreen': function(event) {
          defaultcolor = "#00ff00";
     },
     'click #btnblue': function(event) {
          defaultcolor = "#0000ff";
     },
     'click #btnyellow': function(event) {
          defaultcolor = "#ffff00";
     },
     'click #btnwhite': function(event) {
          defaultcolor = "#ffffff";
     },
     'click #btnclear': function(event) {
          context.clearRect(0, 0, mycanvas.width, mycanvas.height);
     }
});
