
import { select_general_module } from "../components/nav_modules.js";


function change_a_nav(id_nav) {
  document.querySelectorAll('.active_management')[0].classList.remove("active_management");
  document.getElementById(id_nav).classList.add('active_management');
  select_general_module(id_nav);
}


function init (){
  select_general_module("a_nav_employees");
  // cargarUsuarioGestion(); actualizarListadoSalas();
}


document.addEventListener('click', (evt) => {
  if (evt.target.matches('.nav_management a'))
    change_a_nav(evt.target.id);
});


window.addEventListener('DOMContentLoaded', () => {
  init();
});
