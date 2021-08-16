function getDataItemValues(ids, formatCallback) {
    const path = '/api/engine/dataitems?ids=' + ids.join();
    const request = new Request(path);
    fetch(request)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            updateDocument(ids, data, formatCallback);
        });
}

function updateDocument(ids, data, formatCallback) {
    console.log(ids.length);

    for (var i = 0; i < ids.length; i++) {
        let list = document.getElementsByClassName(ids[i]);
        if(list) {
            Array.from(list).forEach(function(e) {
                if(formatCallback == null) {
                    e.innerHTML = data[ids[i]];
                }
                else {
                    var fmt = formatCallback(ids[i], data[ids[i]]);
                    if(fmt != null) {
                        e.innerHTML = formatCallback(ids[i], data[ids[i]]);
                    }
                    else {
                        e.innerHTML = data[ids[i]];
                    }
                }
            });
        }
    }
}

function monitorDataItems(ids, period = 1000, formatCallback = null) {
    // call immediately
    getDataItemValues(ids, formatCallback);
    //and then periodically
    setInterval(function() {
        getDataItemValues(ids, formatCallback);
    }, period);    
}
