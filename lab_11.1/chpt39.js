
        window.addEventListener("load", function(){

            const submitButton = document.getElementById("submit");
            const min1 = document.getElementById("min");
            const max1 = document.getElementById("max");
            const loading = document.getElementById("loading");


            submitButton.addEventListener("click", function(e){

                e.preventDefault(); // stops the form from reloading the page

                 submitButton.disabled = true;
                 min1.disabled = true;
                 max1.disabled = true;
                 loading.style.visibility = "visible";

                setTimeout(function(){
                    loading.style.visibility = "hidden";
                    submitButton.disabled = false;
                    min1.disabled = false;
                    max1.disabled = false;

                    }, 3000);

                //Form max/min input to run through PHP
                const sendData = {
                    min: document.getElementById("min").value,
                    max: document.getElementById("max").value,
                };

                fetch('chpt39JSON.php', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(sendData)
                })
                .then(response => response.json())
                .then(data => {
                    print(data);
                })
                .catch(error => {
                    console.log("Error: ", error);
                })

                //Print all cities

                    //Add new div for each city
                    // @param {Element} cityName
                    function newCity(cityName){

                        let tag = "<div>";
                        tag += "<h3>" + cityName.Name + "</h3>";
                        tag += "</div>";
                        return tag;
                    }

                    //Print each new div per city
                    //@param {Array} cities
                    function print(JSONcities){

                        let citiesOutput = "Cities: ";
                        for (let i = 0; i < JSONcities.length; i++){

                            citiesOutput += newCity(JSONcities[i]);

                        }

                        console.log("response: " + citiesOutput);

                        const output = document.getElementById("output");
                        output.innerHTML = citiesOutput;

                    }

            })
        })
