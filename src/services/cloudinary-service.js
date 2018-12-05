const CLOUD_NAME = "dbjzb1fts"

var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();

    return doUploadImg(elForm);
}

function doUploadImg(elForm) {
    var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    var formData = new FormData();
    formData.append('file', elForm[0].files[0])
    formData.append('upload_preset', 'ocdd5tzq');

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            return response.json()
        })
}

export default {
    uploadImg
}