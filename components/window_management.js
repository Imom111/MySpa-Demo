
export async function show_window(id_nav, status_edit) {
  try {
    await fetch('./json/modules.json')
      .then(function (response) {
        return response.json();
      })
      .then((arr_module) => {
        const module_selected = arr_module.find(module => module.id === id_nav);
        for (var index = 0; index < Object.keys(module_selected.attributes).length; index++) {
          // module_selected.attributes[index].show_name
        }
    });
  } catch (err) {
    console.error('error occured: ', err.message)
  }
}