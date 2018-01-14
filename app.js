let myOutput = document.getElementById('myOutput');
let myInput = document.getElementById('myInput');
let listGroupItems = document.querySelectorAll('.list-group-item');
let modalContainer = document.getElementById('outter-modal');


let listActions = {
  addItem: function() {
    if (myInput.value === '') {
      console.log('Field is empty!');
    } else {
      let li = document.createElement('li');
      let inputValue = document.createTextNode(myInput.value);

      li.innerHTML = '<i class="fa fa-times-circle-o float-right" aria-hidden="true" onClick="listActions.removeItem(this)"></i> <i class="fa fa-pencil-square-o float-right" aria-hidden="true" onClick="modalControls.editModal(this)"></i>';
      li.className = 'list-group-item';
      myOutput.appendChild(li);
      li.appendChild(inputValue);
    }
    myInput.value = '';
  },

  editItem: function(item) {
    console.log(item);
  },

  toggleItem: function(e) {
    let selectedItem = e.target;
    let checkMark = document.createElement('i');
    checkMark.classList.add('fa', 'fa-check-circle', 'float-left');


    if (selectedItem.classList.contains('bg-success') && selectedItem.classList.contains('list-group-item')) {
      selectedItem.classList.remove('bg-success');
      selectedItem.classList.remove('text-white');
      let iconIndex = '';

      for (let i = 0; i < selectedItem.childNodes.length; i++) {
        if (selectedItem.childNodes[i].className === "fa fa-check-circle float-left") {
          iconIndex = i;
        }
      }
      selectedItem.removeChild(selectedItem.childNodes[iconIndex]);
    } else if (!selectedItem.classList.contains('bg-success') && selectedItem.classList.contains('list-group-item')) {
      selectedItem.classList.add('bg-success');
      selectedItem.classList.add('text-white');
      selectedItem.appendChild(checkMark);
    }
  },

  removeItem: function(deleteBtn) {
    //when the <i> tag is created for the X button (inside the addItem function) the onClick property passes in (this). The parameter of removeItem (item) is = to (this)
    deleteBtn.parentNode.remove();
  }
};

// function addItem() {
//   if (myInput.value === '') {
//     console.log('Field is empty!');
//   } else {
//     let li = document.createElement('li');
//     let inputValue = document.createTextNode(myInput.value);
//
//     li.innerHTML = '<i class="fa fa-times-circle-o float-right" aria-hidden="true" onClick="removeItem(this)"></i> <i class="fa fa-pencil-square-o float-right" aria-hidden="true" onClick="modalControls.editModal(this)"></i>';
//     li.className = 'list-group-item';
//     myOutput.appendChild(li);
//     li.appendChild(inputValue);
//   }
//   myInput.value = '';
// }

// function editItem(item) {
//   console.log(item);
// }

// function toggleItem(e) {
//   let selectedItem = e.target;
//   let checkMark = document.createElement('i');
//   checkMark.classList.add('fa', 'fa-check-circle', 'float-left');
//
//
//   if (selectedItem.classList.contains('bg-success') && selectedItem.classList.contains('list-group-item')) {
//     selectedItem.classList.remove('bg-success');
//     selectedItem.classList.remove('text-white');
//     let iconIndex = '';
//
//     for (let i = 0; i < selectedItem.childNodes.length; i++) {
//       if (selectedItem.childNodes[i].className === "fa fa-check-circle float-left") {
//         iconIndex = i;
//       }
//     }
//     selectedItem.removeChild(selectedItem.childNodes[iconIndex]);
//   } else if (!selectedItem.classList.contains('bg-success') && selectedItem.classList.contains('list-group-item')) {
//     selectedItem.classList.add('bg-success');
//     selectedItem.classList.add('text-white');
//     selectedItem.appendChild(checkMark);
//   }
// }

// function removeItem(deleteBtn) {
//   //when the <i> tag is created for the X button (inside the addItem function) the onClick property passes in (this). The parameter of removeItem (item) is = to (this)
//   deleteBtn.parentNode.remove();
// }


let modalControls = {
  editModal: function()  {
    modalContainer.style.display = 'block';
  },
  closeModal: function(e) {
    if(e.target === modalContainer) {
      modalContainer.style.display = 'none';
    }
  }
};

myOutput.addEventListener('click', listActions.toggleItem);
modalContainer.addEventListener('click', modalControls.closeModal);
