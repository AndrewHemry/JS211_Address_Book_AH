const url = "https://randomuser.me/api/"
let bulkRequestURL = "https://randomuser.me/api/?results="
let queryParamValue = 0;
let element = document.querySelector('.populateAPIFetch')


// This is to take in the entered value from the HTML input and store the value for the JS function to use
function bulkPostValue(element) {

    if (element > 5000) {
        console.log("Please enter a value less than 5001")
        prompt("Please enter a value less than 5001")
    } else {
        queryParamValue = element.value
        console.log(queryParamValue)
    }

}

// This is to Fetch a SPECIFIC amount not utilizing the bulk API endpoint
function getPosts() {

    let promiseArray = [];
    for (let i = 1; i <= 5; i++) {
      promiseArray.push(fetch(url).then(response => response.json()));
    }
    console.log(promiseArray)
    verifyData()
    return Promise.all(promiseArray);
}

// This is a continuation from line 6 which actually utilizes the FETCH Bulk API URL then calls back to log a message
function getBulkPosts() {

    removeElementsByClass()

    fetch(bulkRequestURL+queryParamValue)
        .then((response) => response.json())
        .then((data) => {

            console.log(data)

            for (let i = 0; i < data.results.length; i++) {
                console.log(data.results[i].name.first + " " + data.results[i].name.last)
                console.log(data.results[i].picture.large)

                let liTag = document.createElement('li')
                liTag.className = "removeMe"
                liTag.innerText = data.results[i].name.first + " " + data.results[i].name.last
                element.appendChild(liTag)

                let imageTag = document.createElement('img')
                imageTag.className = "removeMe"
                imageTag.src = data.results[i].picture.large
                element.appendChild(imageTag)
            }

        });
        verifyData()

}

// This is just to log a message as a test case
function verifyData() {

    console.log('This has been ran')

}


// The "removeMe" class is to reset the HTML page whenever the FETCH is ran
function removeElementsByClass(className){

    const elements = document.getElementsByClassName("removeMe");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }

  }