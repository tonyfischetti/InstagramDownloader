chrome.runtime.onMessage.addListener(function (message) {
    if (message.user.includes("HuiBuh")) {
        if (message.type.includes("image"))
            // , filename: "image.jpg"
            chrome.downloads.download({url: message.url});
        else if (message.type.includes("video"))
            // , filename: "video.mp4"
            chrome.downloads.download({url: message.url});
        else if (message.type.includes("bulk"))
            downloadBulk(message.url);
    }
});


function downloadBulk(urls) {

    var zip = new JSZip();
    var count = 0;
    var zipFilename = "pictures.zip";

    urls.forEach(function (url) {
        // loading a file and add it in a zip file
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if (err) {
                throw err;
            }

            let filename = url.split('?')[0];
            filename = filename.split("/");
            filename = filename[filename.length - 1];

            zip.file(filename, data, {binary: true});
            count++;
            if (count === urls.length) {
                zip.generateAsync({type: 'blob'}).then(function (content) {
                    saveAs(content, zipFilename);
                });
            }
        });
    });

}