function apiSearch() {
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
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog();
        })
        .fail(function () {
            alert('error');
        });
}

// call API search when search button is clicked
document.getElementById("searchButton").addEventListener("click", function () {
    apiSearch();
});

// array of background images
const backgroundImages = [
    '/images/fall_pond.jpg',
    '/images/fall_railroad.jpeg',
    '/images/fall_road.jpeg',
    '/images/fall_trees.jpeg',
    '/images/fall_tunnel.jpeg'
]
// set default
document.body.style.backgroundImage = `url('${backgroundImages[0]}')`;

// change background image when search engine name clicked
document.getElementById("engineName").addEventListener("click", function () {
    const idx = Math.floor(Math.random() * backgroundImages.length);
    const imgUrl = backgroundImages[idx];
    document.body.style.backgroundImage = `url('${imgUrl}')`;
})

// get/display current time on click of time button
function displayTime() {

}