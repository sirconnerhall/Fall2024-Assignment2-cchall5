function apiSearch(callback) {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '3c892121a2b64339aaf0d5c890acdc37'
        }
    })
        .done(function (data) {
            if (callback) {
                callback(data);
            }
            else {
                var len = data.webPages.value.length;
                var results = '';
                for (i = 0; i < len; i++) {
                    results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                }

                $('#searchResults').html(results);
                $('#searchResults').dialog();
            }
        })
        .fail(function () {
            alert('error');
        });
}

// call API search when search button is clicked
document.getElementById("searchButton").addEventListener("click", function () {
    // call API search
    apiSearch();
});

// array of background images
const backgroundImages = [
    '/images/fall_pond.jpg',
    '/images/fall_railroad.jpeg',
    '/images/fall_road.jpeg',
    '/images/fall_trees.jpg',
    '/images/fall_tunnel.jpg'
]
// set default
document.body.style.backgroundImage = `url('${backgroundImages[0]}')`;
var idx = 0;

// change background image when search engine name clicked
document.getElementById("searchName").addEventListener("click", function () {

    // get next image from array
    idx = (idx + 1) % backgroundImages.length;
    const imgUrl = backgroundImages[idx];

    // change background to image
    document.body.style.backgroundImage = `url('${imgUrl}')`;

});

// get/display current time on click of time button
document.getElementById("timeButton").addEventListener("click", function () {

    // get time
    const d = new Date();
    let hr = d.getHours();
    let min = d.getMinutes();

    // format properly
    const timeString = `${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;

    // load result into time div
    document.getElementById("time").textContent = timeString;

    // display time div as jQuery UI window
    $('#time').dialog({
        title: "Current Time",
        modal: true
    });

});

// "I'm Feeling Lucky" Feature
document.getElementById("luckyButton").addEventListener("click", function () {

    // use callback from apiSearch
    apiSearch(function (data) {
        window.location.href = data.webPages.value[0].url;
    });

});