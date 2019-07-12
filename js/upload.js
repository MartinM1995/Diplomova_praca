registerUploadFile = () => {
    $("#but_upload").click(function() {
        var fd = new FormData();
        var files = $('#file')[0].files[0];
        fd.append('file', files);

        $.ajax({
            url: 'upload',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                if(response != 0){
                    console.log('response: ', response);
                    // $('#resultdiv').html($('#resultdiv').html() + response.data[0].name + " " + response.data[0].surname);
                    alert('File successful uploaded! ', response);
                }
                else{
                    alert('File not uploaded!');
                }
            },
        });
    });
};
