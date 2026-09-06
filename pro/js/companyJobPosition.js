window.addEventListener("load", function () {

    document.getElementById("submitButton").addEventListener("click", function () {
        const jobTitle = document.getElementById("jobTitle").value;
        const positionType = document.getElementById("positionType").value;
        const positionPay = document.getElementById("positionPay").value;
        const jobDescription = document.getElementById("jobDescription").value;
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        // construct the parameter string
        let params = 
            "jobTitle=" + jobTitle +
            "&positionType=" + positionType +
            "&positionPay=" + positionPay +
            "&jobDescription=" + jobDescription +
            "&startDate=" + startDate +
            "&endDate=" + endDate;
        const config = {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        };
        // console.log(params); // debug

        // do the fetch
        fetch("companyCreateNewJob.php", config)
            .then(response => response.json())
            .then(submissionReturned)
            .catch(error => {
                console.error('Error: ', error);
            });

    });


    function submissionReturned(response) {
        const responseDiv = document.getElementById("response");

        if (response.success) {
            responseDiv.innerHTML = '<p style="color: green;">Job posted successfully!</p>';
        } else {
            responseDiv.innerHTML = '<p style="color: red;">Errors: ' + response.errors + '</p>';
        }
    }
    
    document.getElementById("goBackButton").addEventListener("click", function () {
        location.href='companyHome.php';
    });

});