let TargetTime = new Date("Aug 4, 2025 00:00:00").getTime();
setInterval(function(){
   let currDate = new Date().getTime();
   let countDownTime = TargetTime - currDate;

   let totalSec = countDownTime/1000;
   let day = totalSec / (60*60*24);
   totalSec = totalSec % (60*60*24);
   let hrs = totalSec / (60*60);
   totalSec = totalSec % (60*60);
   let min = totalSec /  60;
   let sec = totalSec % 60;

   document.getElementById("day").innerText = Math.floor(day);
   document.getElementById("hrs").innerText = Math.floor(hrs);
   document.getElementById("mins").innerText = Math.floor(min);
   document.getElementById("sec").innerText = Math.floor(sec); 

}, 1000);

setInterval(function(){
   let currDate = new Date().getTime();
   let countDownTime = TargetTime - currDate;
   let days = Math.floor(countDownTime / (1000 * 60 * 60 * 24));
   let week = Math.floor(days/7);
   let dayLeft = Math.floor(days%7);

   let weekLeft = document.getElementById("week-left-h3");
   let currWeek = document.getElementById("curr-week");
   let sun = document.getElementById("sun");
   let mon = document.getElementById("mon");
   let tue = document.getElementById("tue");
   let wed = document.getElementById("wed");
   let thu = document.getElementById("thu");
   let fri = document.getElementById("fri");
   let sat = document.getElementById("sat");

   weekLeft.innerText = `Week Left : ${week}`;
   currWeek.innerText = `Day Left : ${dayLeft}`;
   if(dayLeft == 0)
      currWeek.innerText = `Day Left : 7`;

   if(dayLeft == 1){
      sun.style.opacity = "0.5";
      mon.style.opacity = "0.5";
      tue.style.opacity = "0.5";
      wed.style.opacity = "0.5";
      thu.style.opacity = "0.5";
      fri.style.opacity = "0.5";
   }
   else if(dayLeft == 2){
      sun.style.opacity = "0.5";
      mon.style.opacity = "0.5";
      tue.style.opacity = "0.5";
      wed.style.opacity = "0.5";
      thu.style.opacity = "0.5";
   }
   else if(dayLeft == 3){
      sun.style.opacity = "0.5";
      mon.style.opacity = "0.5";
      tue.style.opacity = "0.5";
      wed.style.opacity = "0.5";
   }
   else if(dayLeft == 4){
      sun.style.opacity = "0.5";
      mon.style.opacity = "0.5";
      tue.style.opacity = "0.5";
   }
   else if(dayLeft == 5){
      sun.style.opacity = "0.5";
      mon.style.opacity = "0.5";
   }
   else if(dayLeft == 6){
      sun.style.opacity = "0.5";
   }
      
}, 1000);