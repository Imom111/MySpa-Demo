
export async function select_general_module(id_nav) {
  try {
    await fetch('./../json/modules.json')
      .then(function (response) {
        return response.json();
      })
      .then((arr_module) => {
        const module_selected = arr_module.find(module => module.id === id_nav);
        return module_selected;
      })
      .then((module_selected) => {
        load_general_module(module_selected);
        load_table_module(module_selected);
        load_records_table(module_selected.json_file_name);
    });
  } catch (err) {
    console.error('error occured: ', err.message)
  }
}


function load_general_module(module_selected) {
  const select_search = document.getElementById("select_search_by");
  let content_html = "";
  content_html += '<option selected value="0" disabled>Buscar por...</option>';
  for (var index = 0; index < Object.keys(module_selected.attributes).length; index++) {
    if (module_selected.attributes[index].search)
      content_html += `<option value="${module_selected.attributes[index].real_name}">${module_selected.attributes[index].show_name}</option>`;
  }
  select_search.innerHTML = content_html;
  // fetch(`./../modules/${module_selected.path_html}`)
  //   .then(response => response.text() )
  //   .then(data => {
  //     document.getElementById("div_main_management").innerHTML = data;
  //   })
  //   .then(() => {
  //     const select_search = document.getElementById("select_search_by");
  //     let content_html = "";
  //     content_html += '<option selected value="0" disabled>Buscar por...</option>';
  //     for (var index = 0; index < Object.keys(module_selected.attributes).length; index++) {
  //       if (module_selected.attributes[index].search)
  //         content_html += `<option value="${module_selected.attributes[index].real_name}">${module_selected.attributes[index].show_name}</option>`;
  //     }
  //     select_search.innerHTML = content_html;
  //   })
  //   .catch (err => console.log(err));
}


function load_table_module(module_selected) {
  const div_title_table_records = document.getElementById("head_table");
  let content_head_html = '';
  content_head_html += "<tr>";
  for (let i = 0; i < module_selected.attributes.length; i++) {
    if (module_selected.attributes[i].show_in_table) {
      content_head_html += `
      <th>
        ${(module_selected.attributes[i].show_name).toUpperCase()}
      </th>
      `;
    }
  }
  content_head_html += `
  <th>
    ACTIONS
  </th>
  `;
  content_head_html += "</tr>"; 
  div_title_table_records.innerHTML = content_head_html;
}


async function load_records_table(json_file_name){
  try {
    await fetch('./../../json/' + json_file_name)
      .then(function (response) {
        return response.json();
      })
      .then((arr_records) => {
        const body_table = document.getElementById("records");
        let content_body_html = '';
        content_body_html += '<tr>';
        for (let i = 0; i < arr_records.length; i++) {
          content_body_html += `
            <th scope="row">${arr_records[i].identificador}</th>
            <td>${arr_records[i].name}</td>
            <td>${arr_records[i].father_last_name}</td>
            <td>${arr_records[i].mother_last_name}</td>
            <td>${arr_records[i].email}</td>
            <td>${arr_records[i].tel}</td>
            <td><a type="button" class="btn btn-danger delete_record" data-id="${arr_records[i].id}">Delete</a></td>
            <td><a type="button" class="btn btn-info edit_record" data-id="${arr_records[i].id}">Edit</a></td>
          `;
        }
        content_body_html += '</tr>';
        body_table.innerHTML = content_body_html;
    });
  } catch (err) {
    console.error('error occured: ', err.message)
  }
}


export async function change_input_search(id_module_selected, value_option) {
  try {
    const arr_module = await fetch('./../../json/modules.json')
      .then(function (response) {
        return response.json();
      });
    const module_selected = (arr_module).find(module => module.id === id_module_selected);
    const attribute_selected = (module_selected.attributes).find(attribute => attribute.real_name === value_option);
    const div_input_search = document.getElementById('div_input_search');
    let content_html = '';
    switch (attribute_selected.type) {
      case "text":
        content_html += `<input type="${attribute_selected.type}" class="form-control col-12"
        placeholder="${attribute_selected.placeholder}..." aria-describedby="${attribute_selected.show_name}">`;
        break;
      case "number":
        content_html += `<input type="${attribute_selected.type}" class="form-control col-12"
        placeholder="${attribute_selected.placeholder}..." aria-describedby="${attribute_selected.show_name}"
        min="0" pattern="^[0-9]+" step="1">`;
        break;
      case "email":
        content_html += `<input type="${attribute_selected.type}" class="form-control col-12"
        placeholder="${attribute_selected.placeholder}..." aria-describedby="${attribute_selected.show_name}">`;
        break;
      case "tel":
        content_html += `<input type="${attribute_selected.type}" class="form-control col-12"
        placeholder="${attribute_selected.placeholder}..." aria-describedby="${attribute_selected.show_name}">`;
        break;
      case "select":
        content_html += '<select class="form-select">';
        content_html += '<option selected value="0" disabled>Indica el género...</option>';
        for (var i = 0; i < attribute_selected.options.length; i++) {
          content_html += `<option value="${attribute_selected.options[i].value}">${attribute_selected.options[i].name}</option>`;
        }
        content_html += '</select>';
        break;
      case "radio":
        content_html += '<div class="text-center">';
        for (var i = 0; i < attribute_selected.options.length; i++) {
          content_html += `<div class="form-check form-check-inline">`;
          content_html += `<input class="form-check-input" type="${attribute_selected.type}" name="${attribute_selected.real_name}" id="${attribute_selected.real_name + "_" + attribute_selected.show_name}" value="${attribute_selected.options[i].value}"></input>`;
          content_html += `<label class="form-check-label" for="inlineRadio1">${attribute_selected.options[i].name}</label>`;
          content_html += '</div>';
        }
        content_html += '</div>';
        break;
      case "range":

        content_html += '';
        break;
      default:
        break;
    }
    div_input_search.innerHTML = content_html;
  } catch (err) {
    console.error('error occured: ', err.message)
  }
}


