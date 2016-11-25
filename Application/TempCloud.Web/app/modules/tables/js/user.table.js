
/* Icon Alerts With confirm Button */
document.querySelector('.confirm-sweet-1').onclick = function(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this imaginary file!",
    type: "error",
    showCancelButton: true,
    confirmButtonClass: 'btn-danger',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: false,
          //closeOnCancel: false
      },
      function(){
        swal("Deleted!", "Your imaginary file has been deleted!", "success");
      });
};
