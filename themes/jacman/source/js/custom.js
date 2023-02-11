$(function () {
    // Initialize Firebase
    var config = {
        authDomain: 'hexo-3fdb4.firebaseapp.com',
        databaseURL: 'https://hexo-3fdb4.firebaseio.com',
        projectId: 'hexo-3fdb4',
        storageBucket: 'hexo-3fdb4.appspot.com',
        messagingSenderId: '306104109190',
        appId: '1:306104109190:web:499f2ebcc235bf3f79a907',
    }
    firebase.initializeApp(config)

    var database = firebase.database()
    var oriUrl = window.location.host
    var curUrl = oriUrl + window.location.pathname

    function readVisits(url, selector) {
        console.log(url);
        var db_key = decodeURI(url.replace(new RegExp('\\/|\\.', 'g'), '_'))
        database
            .ref(db_key)
            .once('value')
            .then(function (result) {
                var count = parseInt(result.val() || 0) + 1
                database.ref(db_key).set(count)
                if (selector.length > 0) {
                    selector.html(count)
                }
            })
    }
    readVisits(oriUrl, $('.article-view-count .count'))
    if (curUrl && curUrl != '_') {
        readVisits('page/' + curUrl, $('.article-view-count .count'))
    }
})
