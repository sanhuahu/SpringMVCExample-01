$(document).ready(function () {
    $("#detailContains").css("display", "none");
    //新規の場合
    $("#selCreate").on('click', function () {
        $(':input', '#frmDetail')
            .not(':button, :submit, :reset, :hidden')
            .val(''); 
        $("#detailContains").css("display", "block");
        $("#queryContainer").css("display", "none");
        $("#addBtn").css("display", "block");
		$("#updateBtn").css("display", "none");
		$("#delBtn").css("display", "none");
		$("#queryInput").val('');
		// 新規画面初期化
		$("#countryid").val('');
		$("#countrynanme").val('');
    });

    // 更新
    $("#selUpdate").on('click', function () {
        $("#queryContainer").css("display", "block");
        $("#detailContains").css("display", "none");
        $("#frmDetail").attr("action", "/UpdateCountry");
        $("#addBtn").css("display", "none");
		$("#updateBtn").css("display", "block");
		$("#delBtn").css("display", "none");
		$("#queryInput").val('');
    });
    
    // 削除
    $("#selDelete").on('click', function () {
        $("#queryContainer").css("display", "block");
        $("#detailContains").css("display", "none");
        $("#frmDetail").attr("action", "/UpdateCountry");
        $("#addBtn").css("display", "none");
		$("#updateBtn").css("display", "none");
		$("#delBtn").css("display", "block");
		$("#queryInput").val('');
    });

    // when click the return button, hide the detailContains
    $("#returnBtn").on('click', function () {
        // show the queryContainer
        // $("#queryContainer").css("display", "block");
        // hide the detailContains
        $("#detailContains").css("display", "none");
    });

	//検索
    $("#queryBtn").on('click', function () {
        // use ajax to post data to controller
        // recived the data from controller with json
        // show the data in the detailContains
        $.ajax({
            type: "POST",
            url: "/country/getCountry",        //  <- controller function name
            data: $("#frmSearch").serialize(),
            dataType: 'json',
            success: function (data) {
                $("#detailContains").css("display", "block");
                $("#countryid").val(data.mstcountrycd);
                $("#countrynanme").val(data.mstcountrynanme);
            },
            error: function (e) {
                alert(e.responseJSON.message);
            }
        });
    });
    
    //新規の場合
    $("#addBtn").on('click', function () {
        $.ajax({
            type: "POST",
            url: "/country/addCountry",        //  <- controller function name
            data: $("#frmDetail").serialize(),
            dataType: 'json',
            success: function (data) {
                alert("success");
            },
            error: function (e) {
                alert(e.responseJSON.message);
            }
        });
    });
    
     
    //更新の場合
    $("#updateBtn").on('click', function () {
        $.ajax({
            type: "POST",
            url: "/country/updateCountry",        //  <- controller function name
            data: $("#frmDetail").serialize(),
            dataType: 'json',
            success: function (data) {
                alert("success");
            },
            error: function (e) {
                alert(e.responseJSON.message);
            }
        });
    });
    
      
    //削除の場合
    $("#delBtn").on('click', function () {
        $.ajax({
            type: "POST",
            url: "/country/delete",        //  <- controller function name
            data: $("#frmDetail").serialize(),
            dataType: 'json',
            success: function (data) {
                alert("success");
            },
            error: function (e) {
                alert(e.responseJSON.message);
            }
        });
    });
});