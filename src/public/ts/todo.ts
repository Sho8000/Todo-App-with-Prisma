$(()=>{
  const postData = (url: string, method: string,data:any) => {
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

  const deleteData = (url: string, method: string) => {
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
  $('.checkBtn').on('click',(e)=>{
    const getParentId = $(e.currentTarget).parent().data("itemId");
    const clickedId = "item"+ getParentId

    $(`#${clickedId}`).children('.todoTitle').toggleClass("deleteLine")

    if($(`#${clickedId}`).children('.todoTitle').hasClass('deleteLine')){
      $(`#${clickedId}`).children('p').text('Completed')
    } else {
      $(`#${clickedId}`).children('p').text('Incompleted')
    }
  });

    //Edit
    $('.edit').on('click',(e)=>{
      let inputData = '';
      const getParentId = $(e.currentTarget).parent().data("itemId");
      const getParentDescription = $(e.currentTarget).parent().data("itemDescription");
      const clickedId = "item"+ getParentId;
      const editSwitch = $(`#${clickedId}`).children(`.editTask`);
      const newInput = $(`#${clickedId}`).children(`.inputNewTask`);

      editSwitch.toggleClass(`hideForEdit`);
      newInput.val("");
      newInput.on('keypress',function(e) {
        if(e.which == 13) {
          inputData = newInput.val() as string;

          postData(`/api/v1/projects/${getParentId}`, "PUT",{title:inputData,description:getParentDescription});
        }
      });
      
      console.log(getParentId+"EDITTTT")
    });
  
    //Delete
    $('.delete').on('click',(e)=>{
      const getParentId = $(e.currentTarget).parent().data("itemId") as number;

      deleteData(`/api/v1/projects/${getParentId}`, "DELETE");
    });
})

