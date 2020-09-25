$(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDE0Nb2sVXsR-uidm7A9VTveKCk5D_ZW2c",
        authDomain: "hexo-3fdb4.firebaseapp.com",
        databaseURL: "https://hexo-3fdb4.firebaseio.com",
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var oriUrl = window.location.host;
    var curUrl = oriUrl + window.location.pathname;
    function readVisits(url, selector) {
    var db_key = decodeURI(url.replace(new RegExp('\\/|\\.', 'g'), "_"));
        database.ref(db_key).once("value").then(function (result) {
            var coune = parseInt(result.val() || 0) + 1;
            database.ref(db_key).set(count);
            if (selector.length > 0) {
                selector.html(count);
            };
        });
    }

    database.ref('/').set({a:123});

    readVisits(oriUrl, $("#visits .count"));
    if (curUrl && curUrl != "_") {
        readVisits("page/" + curUrl, $("#pageviews .count"));
    }
});
