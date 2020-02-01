function preparation() {
    document.getElementById('hi1').value = moment().format();
}

function encrypt(no) {
    document.getElementById('ka').value = getEncryptKey(parseInt(document.getElementById('ren').value));
    
    document.getElementById('an').value 
        = ((moment(document.getElementById('hi1').value)).valueOf()
            - parseInt(document.getElementById('ka').value));
}

function decrypt() {
    document.getElementById('ka').value = getEncryptKey(parseInt(document.getElementById('ren').value));
    
    document.getElementById('hi2').value 
        = moment(parseInt(document.getElementById('an').value) 
            + getEncryptKey(parseInt(document.getElementById('ren').value))).format();
}
