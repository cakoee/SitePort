
    score = 0;

    window.addEventListener("load", function(event) { 
        document.getElementById("rabbit2").classList.add("hide");
        document.getElementById("rabbit3").classList.add("hide");
        document.getElementById("rabbit4").classList.add("hide");
        document.getElementById("noeggs").classList.add("hide");
        document.getElementById("slow").classList.add("hide");

        document.getElementById("rabbit1").addEventListener("mouseenter", function(event){

            document.getElementById("rabbit1").classList.add("hide");
            document.getElementById("rabbit2").classList.remove("hide");
            scoreUpdate()
        })

        document.getElementById("rabbit2").addEventListener("mouseenter", function(event){

            document.getElementById("rabbit2").classList.add("hide");
            document.getElementById("rabbit3").classList.remove("hide");
            scoreUpdate()
        })

        document.getElementById("rabbit3").addEventListener("mouseenter", function(event){

            document.getElementById("rabbit3").classList.add("hide");
            document.getElementById("rabbit4").classList.remove("hide");
            scoreUpdate()
        })

        document.getElementById("rabbit4").addEventListener("mouseenter", function(event){

            document.getElementById("rabbit4").classList.add("hide");
            document.getElementById("rabbit1").classList.remove("hide");
            scoreUpdate()
        })

        function scoreUpdate(){
            score ++
            if (score == 4){
                document.getElementById("noeggs").classList.remove("hide");
            }

            if (score == 20){
                document.getElementById("slow").classList.remove("hide");
            }
        }
});

