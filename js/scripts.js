
import { select_general_module, change_input_search } from "./../components/modules.js";
import { validate_positive } from "./validate.js";
import { show_window } from "./../components/window_management.js";


function change_a_nav(id_nav) {
  document.querySelectorAll('.active_management')[0].classList.remove("active_management");
  document.getElementById(id_nav).classList.add('active_management');
  select_general_module(id_nav);
}


function init (){
  select_general_module("a_nav_employees");
}


// document.getElementById("txtBusquedaId").addEventListener('keypress', (evt) => {
//   return evt.charCode >= 48 && evt.charCode <= 57;
// });


document.addEventListener('change', (evt => {
  if (evt.target.matches('#select_search_by')){
    const module_selected = document.querySelectorAll('.active_management')[0].id;
    change_input_search(module_selected, evt.target.value);
    document.getElementById("btn_search").removeAttribute("disabled");
    document.getElementById("div_close_search").setAttribute("hidden", true);
  }
}));


document.addEventListener('click', (evt) => {
  if (evt.target.matches('.nav_management a'))
    change_a_nav(evt.target.id);
  if (evt.target.matches('#btn_search'))
    document.getElementById("div_close_search").removeAttribute("hidden");
  if (evt.target.matches('#btn_close_search')){
    document.getElementById("div_close_search").setAttribute("hidden", true);
    document.getElementById("select_search_by").value = 0;
    document.getElementById("div_input_search").innerHTML = "";
  }
  if (evt.target.matches('#btn_add')){
    const module_selected = document.querySelectorAll('.active_management')[0].id;
    show_window(module_selected, false);
  }
  if (evt.target.matches('.edit_record')){
    const module_selected = document.querySelectorAll('.active_management')[0].id;
    show_window(module_selected, true);
  }
  if (evt.target.matches('.delete_record'))
    console.log("borrar registro " + evt.target.dataset.id);
});


window.addEventListener('DOMContentLoaded', () => {
  init();
});
