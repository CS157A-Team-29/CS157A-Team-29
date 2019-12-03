const $tableID = $("#table");
const $BTN = $("#export-btn");
const $EXPORT = $("#export");

const newTr = `
<tr class="hide">
  <td class="pt-3-half" contenteditable="true">Example</td>
  <td class="pt-3-half" contenteditable="true">Example</td>
  <td>
    <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 glyphicon glyphicon-trash waves-effect waves-light"></button></span>
  </td>
</tr>`;

$(".table-add").on("click", "i", () => {
  const $clone = $tableID
    .find("tbody tr")
    .last()
    .clone(true)
    .removeClass("hide table-line");

  if ($tableID.find("tbody tr").length === 0) {
    $("tbody").append(newTr);
  }

  $tableID.find("table").append($clone);
});

$tableID.on("click", ".table-remove", function() {
  $(this)
    .parents("tr")
    .detach();
});

var dataArray = [];

$(".save-data").on("click", () => {
  dataArray = [];
  $("table#termsDefs tr").each(function() {
    var arrayOfThisRow = [];
    var tableData = $(this).find("td");
    console.log(tableData);

    if (tableData.length > 0) {
      tableData.each(function() {
        arrayOfThisRow.push($(this).text());
      });
      // Remove Trash icon
      arrayOfThisRow.pop();
      dataArray.push(arrayOfThisRow);
    }
  });
  // Remove empty data row
  dataArray.pop();
  alert(dataArray); // alerts the entire array
  console.log(dataArray);

  let nameSet = document.getElementById("studySetName").value;
  console.log(nameSet);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/createStudySet");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let studySetData = {
    setID: Math.round(Math.random() * 10000),
    setName: nameSet,
    data: dataArray
  };
  console.log(studySetData);
  xhr.send(JSON.stringify(studySetData));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.on("click", () => {
  const $rows = $tableID.find("tr:not(:hidden)");
  const headers = [];
  const data = [];

  // Get the headers (add special header logic here)
  $($rows.shift())
    .find("th:not(:empty)")
    .each(function() {
      headers.push(
        $(this)
          .text()
          .toLowerCase()
      );
    });

  // Turn all existing rows into a loopable array
  $rows.each(function() {
    const $td = $(this).find("td");
    const h = {};

    // Use the headers from earlier to name our hash keys
    headers.forEach((header, i) => {
      h[header] = $td.eq(i).text();
    });

    data.push(h);
  });

  // Output the result
  $EXPORT.text(JSON.stringify(data));
});
