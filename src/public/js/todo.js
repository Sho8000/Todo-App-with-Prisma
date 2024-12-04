$(function () {
    var postData = function (url, method, data) {
        $.ajax({
            url: url,
            method: method,
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
                window.location.reload();
            },
            error: function (xhr, status, error) {
                console.log("Request failed. Status: " + status);
                console.log("Error: " + error);
                console.log("Response text: " + xhr.responseText);
            }
        });
    };
    var deleteData = function (url, method) {
        $.ajax({
            url: url,
            method: method,
            success: function (response) {
                window.location.reload();
            },
            error: function (xhr, status, error) {
                console.log("Request failed. Status: " + status);
                console.log("Error: " + error);
                console.log("Response text: " + xhr.responseText);
            }
        });
    };
    //check or notCheck
    $('.checkBtn').on('click', function (e) {
        var getParentId = $(e.currentTarget).parent().data("itemId");
        var clickedId = "item" + getParentId;
        $("#".concat(clickedId)).children('.todoTitle').toggleClass("deleteLine");
        if ($("#".concat(clickedId)).children('.todoTitle').hasClass('deleteLine')) {
            $("#".concat(clickedId)).children('p').text('Complete');
        }
        else {
            $("#".concat(clickedId)).children('p').text('Incomplete');
        }
    });
    //Edit
    $('.edit').on('click', function (e) {
        var inputData = '';
        var getParentId = $(e.currentTarget).parent().data("itemId");
        var getParentDescription = $(e.currentTarget).parent().data("itemDescription");
        var clickedId = "item" + getParentId;
        var editSwitch = $("#".concat(clickedId)).children(".editTask");
        var newInput = $("#".concat(clickedId)).children(".inputNewTask");
        editSwitch.toggleClass("hideForEdit");
        newInput.val("");
        newInput.on('keypress', function (e) {
            if (e.which == 13) {
                inputData = newInput.val();
                postData("/api/v1/projects/".concat(getParentId), "PUT", { title: inputData, description: getParentDescription });
            }
        });
        console.log(getParentId + "EDITTTT");
    });
    //Delete
    $('.delete').on('click', function (e) {
        var getParentId = $(e.currentTarget).parent().data("itemId");
        deleteData("/api/v1/projects/".concat(getParentId), "DELETE");
    });
});
