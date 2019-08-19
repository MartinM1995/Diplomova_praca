import $ from "jquery";

export async function getData() {
  return fetch("/api/data")
    .then(res => res.json())
    .catch(err => console.error(err));
}

export async function getDataById(id) {
  return fetch(`/api/data/${id}`)
    .then(res => res.json())
    .catch(err => console.error(err));
}

// export function renderTable(fileId) {
//   $("")
// }
