
import { select_general_module } from "./components/nav_modules.js";


function change_a_nav(i) {
  let previous_active = $('.active_management');
  for (let j = 0; j < previous_active.length; j++) {
    previous_active.eq(j).removeClass('active_management');
  }
  $('#' + arr_ids_nav[i].id).addClass('active_management');
  select_general_module(i);
}


function init (){
  select_general_module(0);
  // cargarUsuarioGestion(); actualizarListadoSalas();
}


window.addEventListener('DOMContentLoaded', (event) => {
  init();
});
