
export async function select_general_module(id_nav){
  try {
    const arr_nav = await fetch('../../json/navTabs.json')
      .then(function(response) {
        return response.json();
      });
    const nav_tab_module = arr_nav.find(nav_tab => nav_tab.id === id_nav);
    load_general_module(nav_tab_module.path_html);
  } catch (err) {
    console.error('error occured: ', err.message)
  }
}


function load_general_module (path_html){
  $.ajax(
    {
    'type' : 'GET',
    'url' : `./../modules/${path_html}`,
    'async' : true
    }).done(
    function(data){
    $('#div_main_management').html(data);
    }
  );
}
