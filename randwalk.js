/*console.log('fel');
const arr1=[2,3,4];
console.log(arr1[1]);
arr1[3]=7;
console.log(arr1);*/

const canvas=document.getElementById('mycanvas');
const ctx=canvas.getContext("2d");



ctx.beginPath();
function aniline_twopoints(x1,y1,x2,y2){
    if (x1===x2){
     dx=0;
     dy=1*(y2-y1)/Math.abs(y2-y1);
    }
    else{
     slope=(y2-y1)/(x2-x1);
     dx=1*((x2-x1)/Math.abs(x2-x1));
     dy=slope*dx;}
     ctx.moveTo(x1,y1);
    let x=x1;
    let y=y1;
    let id;
    function drawani() {
      if(Math.abs(x-x2)<1e-6 ) {
        cancelAnimationFrame(id);
        return;
       }
      
      ctx.clearRect(0,0,canvas.width,canvas.height);
      
      ctx.beginPath();
      ctx.moveTo(x1,y1);
      ctx.lineTo(x,y);
      ctx.strokeStyle='red';
      ctx.stroke();
      x+=dx;
      y+=dy;
      
      id=requestAnimationFrame(drawani);

    } 
    drawani();
    
}


function aniline_distance(x1,y1,d){
  return new Promise((resolve)=>{

  function randomise_slope(x,y){
   angle=Math.random()*Math.PI*2;
   slope=Math.tan(angle);

   if(x+Math.cos(angle)*d>canvas.width||x+Math.cos(angle)*d<0||y+Math.sin(angle)*d>canvas.width||y+Math.sin(angle)*d<0){
    randomise_slope(x,y);}

   let dl=1; 
   let dx=Math.cos(angle)*dl;
   let dy=Math.sin(angle)*dl;
   return [dx,dy];}

  dc=randomise_slope(x1,y1)
  let dx=dc[0];
  let dy=dc[1];
  let x=x1;
  let y=y1;
  let id;
  let i=0;
  
 
  function drawani2(){
      if (x>canvas.width||x<0||y>canvas.height||y<0){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(id);
        aniline_distance(x1,y1,d);
        return;
      }
      if(Math.sqrt((x1-x)**2+(y1-y)**2)>=d && i==4 ){
        resolve([x,y])
        return;
       }
      if(Math.sqrt((x1-x)**2+(y1-y)**2)>=d && i<4 ){
            cancelAnimationFrame(id);
            //lines.push({X1:x1,Y1:y1,X2:x,Y2:y});
            /*resolve([x,y]);*/
            dc=randomise_slope(x,y);
            dx=dc[0];
            dy=dc[1];
            x1=x;
            y1=y;
            i++;
            //return;
        }
      ctx.clearRect(0,0,canvas.width,canvas.height);

      /*lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = 'red';
        ctx.stroke();
      });*/

      //ctx.beginPath();
      //ctx.moveTo(x1,y1);
      ctx.lineTo(x,y);
      ctx.strokeStyle='red';
      ctx.stroke();

      x+=dx;
      y+=dy;
      
      id=requestAnimationFrame(drawani2);

    }
  drawani2();
  //lines.push({X1:x1,Y1:y1,X2:x,Y2:y})
  });

}

//aniline_twopoints(100,100,200,300);
/*let lines=[]
 X=canvas.width/2,Y=canvas.height/2
for(let i=0;i<5;i++){*/
 
 aniline_distance(canvas.width/2,canvas.height/2,70).then((p) => {
 /* X=p[0]
  Y=p[1]
  //aniline_distance(X,Y,80)*/
  console.log(p);
});


