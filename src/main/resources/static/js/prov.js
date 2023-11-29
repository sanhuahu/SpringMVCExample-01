let table;
let selected;
let currentRow;
let selectedRow;
let tableData;

$(document).ready(function () {
  bindTable();

  $("#searchBtn").on("click", function () {
    // show table
    getTableDatas();
  });

  // event handler for submit button
  $("#btnExec").on("click", function () {
    selected = table.rows({ selected: true }).data().toArray();
    currentRow = 0;
    selectedRow = selected.length;
    $("#currSpan").text(currentRow + 1);
    $("#totalSpan").text(selectedRow);
    getRecord();
  });

 /* // event handler for previous button
  $("#oprateBtn").on("click", function () {
    if (currentRow < selectedRow) {
      var rowData = table.rows({ selected: true }).ids();
      // 选中行的数据, 处理成功后, 修改状态
      var row = table.row("#" + rowData[currentRow]);
      var data = row.data();
      data.sts = "已处理";
      row.data(data).draw();
      // 设置该行不可选
      row.nodes().to$().addClass("disabled");

      currentRow++;
      if (currentRow == selectedRow) {
        // close modal
        $("#closeModalBtn").click();
      }
      $("#currSpan").text(currentRow + 1);
      getRecord();
    } else {
      // close modal
    }
  });*/
  
  $("#oprateBtn").on("click", function() {
		$.ajax({
			type: "POST",
			url: "/prov/updateRecord",
			data: $("#detailForm").serialize(),
			datatype: "json",
			success: function(dataForm) {
				var dataFormJson = JSON.parse(dataForm);
				if (currentRow+1 <= selectedRow) {
					var rowData = table.rows({ selected: true }).ids();
					// 选中行的数据, 处理成功后, 修改状态
					var row = table.row("#" + rowData[currentRow]);
					var data = row.data();
					data.sts = "処理済";
					data.mstcountrycd = dataFormJson.mstcountrycd;
					data.provcode = dataFormJson.provcode;
					data.provname = dataFormJson.provname;
					row.data(data).draw();

					row.nodes().to$().addClass("disabled");
					currentRow++;
					
					if (currentRow == selectedRow) {
						$("#closeModalBtn").click();
					} else {
						$("#currSpan").text(currentRow + 1);
					    getRecord();
					}
				}
			},
			error: function(e) {
				data.sts = "エラー";
				alert("Error: " + e);
			},
		});
	});
});

// get record
function getRecord() {
  // ajax call to get record
  var row = selected[currentRow];
  $.ajax({
    type: "GET",
    url: "/prov/getRecord/" + row.mstcountrycd + "/" + row.provcode,
    datatype: "json",
    success: function (data) {
      var item = $.parseJSON(data);
      $("#mstcountrycd").val(item.mstcountrycd);
      $("#provcode").val(item.provcode);
      $("#provname").val(item.provname);
    },
    error: function (e) {
		alert("Error: ");
      //alert("Error: " + e);
    },
  });
  return;
}

// set table data
function bindTable() {
  // set up table
  let option = {
    columnDefs: [
      {
        targets: ["_all"],
        className: "mdc-data-table__cell",
      },
      {
        orderable: false,
        className: "select-checkbox",
        targets: 0,
      },
    ],
    rowId: "provcode",
    columns: [
      {
        data: null,
        defaultContent: "",
        orderable: false,
        className: "select-checkbox",
      },
      { data: "sts", defaultContent: "未处理", orderable: false },
      { data: "mstcountrycd" },
      { data: "provcode" },
      { data: "provname", className: "text-right" },
    ],
    data: tableData,
    order: [4, "asc"],
    select: {
      style: "multi",
    },
  };

  table = $("#prefecture_table").DataTable(option);
}

// get table data with country id
function getTableDatas() {
  // show table
  $.ajax({
    type: "GET",
    url: "/prov/search/" + $("#countryInput").val(),
    datatype: "json",
    success: function (data) {
      // 文字对象 转换 javaScript对象
      var nodes = $.parseJSON(data);

      table.clear();
      table.rows.add(nodes).draw();
    },
    error: function (e) {
      alert(e.responseJSON.message);
    },
  });
}
