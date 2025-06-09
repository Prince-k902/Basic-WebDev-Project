let rect = document.querySelector("#container");

rect.addEventListener("mousemove", function(event){
   let rectangleLocation = rect.getBoundingClientRect();
   // console.log("clientX:", event.clientX);
   // console.log("rectangleLocation",Math.floor(rectangleLocation.left));
   // event.clientX => mouse pointer ka x-coordinate.
   // rectangleLocation.left => rctngl ki left edge ka distance from screen.

   let mouseInRect = event.clientX - Math.floor(rectangleLocation.left);
   // mouseInRect => pointer's x-coordinate from left edge.
   
   //left side in rectangle
   if(mouseInRect < rectangleLocation.width/2){
      let redClr = Math.floor(gsap.utils.mapRange(0,rectangleLocation.width/2,255,0,mouseInRect));
      gsap.to(rect, {
         backgroundColor : `rgb(${redClr},0,0)`,
         ease : Power3
      })
      // console.log(redClr);
   }
   else{  //right side in the rectangle
      let blueClr = gsap.utils.mapRange(rectangleLocation.width/2, rectangleLocation.width, 0, 255, mouseInRect);
      gsap.to(rect, {
         backgroundColor : `rgb(0,0,${blueClr})`,
         ease : Power3 
      })
   }
});

rect.addEventListener("mouseout", function(){
   gsap.to(rect, {
      backgroundColor : "black",
   });
   
});
