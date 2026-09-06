
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    ctx.scale(0.35,0.35);

    const tail = document.createElement("img");
    const body = document.createElement("img");
    const head = document.createElement("img");
    const arm = document.createElement("img");

    tail.src = "tail.webp";
    body.src = "body.webp";
    head.src = "head.webp";
    arm.src  = "arm.webp";

window.addEventListener("load", function() {

    ctx.drawImage(tail, -50, 0);
    ctx.drawImage(body, -50, 0);
    ctx.drawImage(head, -50, 0);
    ctx.drawImage(arm, -50, 0);


    function animate(){
        ctx.clearRect(0, 0, canvas.width/0.35, canvas.height/0.35);
        tailRotate(-11);
        ctx.drawImage(body, -50, 0);
        ctx.drawImage(head, -50, 15);
        armRotate(12);

        setTimeout(function(){

            ctx.clearRect(0, 0, canvas.width/0.35, canvas.height/0.35);
            ctx.drawImage(tail, -50, 0);
            ctx.drawImage(body, -50, 0);
            ctx.drawImage(head, -50, 0);
            ctx.drawImage(arm, -50, 0);
            setTimeout(animate, 900);

        }, 900);

    }

    animate();

    function tailRotate(x){

        ctx.save(canvas);
        ctx.clearRect(0, 0, canvas.width/0.35, canvas.height/0.35);
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(x*Math.PI/180);
        ctx.drawImage(tail, -270, -canvas.height/(2/0.35));
        ctx.restore();
    }

    function armRotate(x){

        ctx.save(canvas);
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(x*Math.PI/180);
        ctx.drawImage(arm, -106, -135);
        ctx.restore();
    }

})