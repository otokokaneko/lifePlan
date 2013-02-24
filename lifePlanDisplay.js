(function($) {
	$('#tabs').tabs();
	$(':radio').button();
	$('#btnCalc').button();
    $("#btnCalc").click(function () { 
    	showPlans(getPlanData(new Family()));
    });
	$('#btnShowDetail').button();
    $("#btnShowDetail").click(function () { 
    	$('.detailInfo').toggleClass('hideDetail');
    });
    $('input:text').click(function () {
    	$(this).val("");
    });
	setAgeSelectBox();
})(jQuery);

function showPlans(shushi) {
	var i, row;
	
	$('.dataRow').each(function () {
		if($(this).attr('id') == 'dataRow_head' || $(this).attr('id') == 'dataRow_0') {
			return;
		}
		$(this).remove();
	});
	
	for (i=0; i<shushi.length; i++) {
		row = $('#dataRow_0').clone();
		row.attr('id','dataRow_'+shushi[i].year);
		row.attr('title','世帯主' + shushi[i].setainushi.age + '歳');
		$('<td/>').text(shushi[i].year).appendTo(row);
		$('<td/>').text(shushi[i].setainushi.age).appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.income)).appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.kyuyoShotoku)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.kenkouHoken)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.kouseiNenkin)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.koyouHoken)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.kaigoHoken)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.sonotaKouzyo)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.kakuteikyoshutsu)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.shotokuzeiFuyouKouzyo)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.shotokuzeiKisoKouzyo)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.shotokuzei)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.zyuminzeiFuyouKouzyo)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.zyuminzeiKisoKouzyo)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.zyuminzei)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].setainushi.tedori)).appendTo(row);
		$('<td/>').text(shushi[i].haigusha.age).appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.income)).appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.kyuyoShotoku)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.kenkouHoken)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.kouseiNenkin)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.koyouHoken)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.kaigoHoken)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.sonotaKouzyo)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.kakuteikyoshutsu)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.shotokuzeiFuyouKouzyo)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.shotokuzeiKisoKouzyo)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.shotokuzei)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.zyuminzeiFuyouKouzyo)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.zyuminzeiKisoKouzyo)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.zyuminzei)).attr('class', 'detailInfo').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.tedori)).appendTo(row);
		$('<td/>').text(addFigure(shushi[i].kodomo_teate)).appendTo(row);
		$('<td/>').text(addFigure(shushi[i].shunyu_goukei)).appendTo(row);
		$('<td/>').text(shushi[i].setainushi.hasChildren[0] && shushi[i].setainushi.hasChildren[0].age >=0 ? shushi[i].setainushi.hasChildren[0].age : "").attr('class', 'child1Info').appendTo(row);
		$('<td/>').text(shushi[i].setainushi.hasChildren[0] && shushi[i].setainushi.hasChildren[0].age >=0 ? addFigure(shushi[i].setainushi.hasChildren[0].kyouikuhi) : "").attr('class', 'child1Info').appendTo(row);
		$('<td/>').text(shushi[i].setainushi.hasChildren[1] && shushi[i].setainushi.hasChildren[1].age >=0 ? shushi[i].setainushi.hasChildren[1].age : "").attr('class', 'child2Info').appendTo(row);
		$('<td/>').text(shushi[i].setainushi.hasChildren[1] && shushi[i].setainushi.hasChildren[1].age >=0 ? addFigure(shushi[i].setainushi.hasChildren[1].kyouikuhi) : "").attr('class', 'child2Info').appendTo(row);
		$('<td/>').text(shushi[i].setainushi.hasChildren[2] && shushi[i].setainushi.hasChildren[2].age >=0 ? shushi[i].setainushi.hasChildren[2].age : "").attr('class', 'child3Info').appendTo(row);
		$('<td/>').text(shushi[i].setainushi.hasChildren[2] && shushi[i].setainushi.hasChildren[2].age >=0 ? addFigure(shushi[i].setainushi.hasChildren[2].kyouikuhi) : "").attr('class', 'child3Info').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].seikatsu_hi)).attr('class','shishutsu').appendTo(row);
		$('<td/>').text(addFigure(shushi[i].zyutaku_hi)).appendTo(row);
		$('<td/>').text(addFigure("000000")).appendTo(row);
		$('<td/>').text(addFigure("000000")).appendTo(row);
		$('<td/>').text(addFigure(shushi[i].shishutsu_goukei)).appendTo(row);
		changeColor($('<td/>').text(addFigure(shushi[i].shushi)).appendTo(row).attr('id', 'shushi_' + i));
		$('<td/>').text('').appendTo(row).attr('id', 'chokin_' + i);
		$('<td/>').text(addFigure(shushi[i].setainushi.tsumitate)).appendTo(row);
		$('<td/>').text(addFigure(shushi[i].haigusha.tsumitate)).appendTo(row);
		$('#tblPlan').append(row);
		
		(shushi[i].setainushi.hasChildren[0]) ? $('.child1Info').css('display','') : $('.child1Info').css('display','none');
		(shushi[i].setainushi.hasChildren[1]) ? $('.child2Info').css('display','') : $('.child2Info').css('display','none');
		(shushi[i].setainushi.hasChildren[2]) ? $('.child3Info').css('display','') : $('.child3Info').css('display','none');
	}
	calcChokin(shushi,i);
	bindEvent();
	drawChart(shushi);
}
function calcChokin(shushi,n) {
	var i, chokin;
	for (i=0; i<n; i++) {
		chokin = 0;
		if (i == 0) {
			chokin = parseInt($('#chokin').val())  + parseInt($('#shushi_' + i).text().replace(/[,]/g,'')); 
		} else {
			chokin = parseInt($('#chokin_' + (i-1)).text().replace(/[,]/g,'')) + parseInt($('#shushi_' + i).text().replace(/[,]/g,''));
		}
		$('#chokin_' + i).text(addFigure(chokin));
		changeColor($('#chokin_' + i));
		shushi[i].chokin = chokin;
	}
}
function removeRows() {
	if($(this).attr('id') == 'dataRow_head' || $(this).attr('id') == 'dataRow_0') {
		return;
	}
	$(this).remove();
}
function addFigure(str) {
　var num = new String(str).replace(/,/g, "");
　while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
　return num;

}
function changeColor(row) {
	if($(row).text().search('-') == 0) $(row).css('color','red');
}
function setAgeSelectBox(){
	var i = 0;
	for (i=20;i<=40;i++) {
		if (i==30) {
			$('#setainushi_age').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"歳"));
			$('#haigusha_age').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"歳"));
		} else {
			$('#setainushi_age').append($('<option>').attr({ value: i }).text(i+"歳"));
			$('#haigusha_age').append($('<option>').attr({ value: i }).text(i+"歳"));
		}
	}
	for (i=-15;i<=15;i++) {
		if (i==0) {
			$('#child_1_age').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"歳"));
			$('#child_2_age').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"歳"));
			$('#child_3_age').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"歳"));
		} else {
			$('#child_1_age').append($('<option>').attr({ value: i }).text(i+"歳"));
			$('#child_2_age').append($('<option>').attr({ value: i }).text(i+"歳"));
			$('#child_3_age').append($('<option>').attr({ value: i }).text(i+"歳"));
		}
	}
	for (i=40;i<=80;i++) {
		if (i==60) {
			$('#setainushi_retire_age').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"歳"));
			$('#haigusha_retire_age').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"歳"));
		} else {
			$('#setainushi_retire_age').append($('<option>').attr({ value: i }).text(i+"歳"));
			$('#haigusha_retire_age').append($('<option>').attr({ value: i }).text(i+"歳"));
		}
		if (i==65) {
			$('#setainushi_koyou_enchou_age').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"歳"));
			$('#haigusha_koyou_enchou_age').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"歳"));
		} else {
			$('#setainushi_koyou_enchou_age').append($('<option>').attr({ value: i }).text(i+"歳"));
			$('#haigusha_koyou_enchou_age').append($('<option>').attr({ value: i }).text(i+"歳"));
		}
	}
	for (i=2013;i<=2080;i++) {
		
		if (i==2080) {
			$('#yachin_end_1').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"年"));
			$('#yachin_end_2').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"年"));
			$('#yachin_end_3').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"年"));
			$('#yachin_end_4').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"年"));
		} else {
			$('#yachin_end_1').append($('<option>').attr({ value: i }).text(i+"年"));
			$('#yachin_end_2').append($('<option>').attr({ value: i }).text(i+"年"));
			$('#yachin_end_3').append($('<option>').attr({ value: i }).text(i+"年"));
			$('#yachin_end_4').append($('<option>').attr({ value: i }).text(i+"年"));
		}
		$('#yachin_start_1').append($('<option>').attr({ value: i }).text(i+"年"));
		$('#yachin_start_2').append($('<option>').attr({ value: i }).text(i+"年"));
		$('#yachin_start_3').append($('<option>').attr({ value: i }).text(i+"年"));
		$('#yachin_start_4').append($('<option>').attr({ value: i }).text(i+"年"));
		$('#mochiie_ziki').append($('<option>').attr({ value: i }).text(i+"年"));
	}
	for (i=60;i<=80;i++) {
		if (i==65) {
			$('#setainushi_nenkin_age').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"歳"));
			$('#haigusha_nenkin_age').append($('<option>').attr({ value: i, selected:'selected' }).text(i+"歳"));
		} else {
			$('#setainushi_nenkin_age').append($('<option>').attr({ value: i }).text(i+"歳"));
			$('#haigusha_nenkin_age').append($('<option>').attr({ value: i }).text(i+"歳"));
		}
	}
}
function bindEvent() {
	$('.dataRow').hover(function() {$(this).css('backgroundColor','#e6f3d8');},
	                    function() {$(this).css('backgroundColor','');
	});
}

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
function drawChart(shushi) {
	
	if (jQuery.isArray(shushi) == false) return;
	
	var i, j, kyouikuGoukei;
	var dataArray1 = new Array();
	var dataArray2 = new Array();
	
	dataArray1.push(['Year','社会保険料','税金','確定拠出年金','生活費','その他費用','車費用','住宅関連費','教育費','年収']);
	dataArray2.push(['Year','貯蓄']);
	for (i=0; i < shushi.length; i++) {
		kyouikuGoukei = 0;
		for (j=0; j < shushi[i].setainushi.hasChildren.length; j++) {
			kyouikuGoukei += shushi[i].setainushi.hasChildren[j].kyouikuhi;
		}
		dataArray1.push([shushi[i].year 
		                ,shushi[i].setainushi.kenkouHoken + shushi[i].setainushi.kouseiNenkin + shushi[i].setainushi.koyouHoken + shushi[i].setainushi.kaigoHoken +
		                 shushi[i].haigusha.kenkouHoken + shushi[i].haigusha.kouseiNenkin + shushi[i].haigusha.koyouHoken + shushi[i].haigusha.kaigoHoken
		                ,shushi[i].setainushi.shotokuzei + shushi[i].setainushi.zyuminzei + shushi[i].haigusha.shotokuzei + shushi[i].haigusha.shotokuzei
		                ,shushi[i].setainushi.kakuteikyoshutsu + shushi[i].haigusha.kakuteikyoshutsu
		                ,shushi[i].seikatsu_hi
		                ,0
		                ,0
		                ,shushi[i].zyutaku_hi
		                ,kyouikuGoukei
		                ,shushi[i].setainushi.income + shushi[i].haigusha.income + shushi[i].kodomo_teate
		               ]);
		dataArray2.push([shushi[i].year,shushi[i].chokin]);
	}
    // Create the data table.
	var data1 = google.visualization.arrayToDataTable(dataArray1);
    // Set chart options
    var options1 = {'title':'ライフプラン 年度別収支グラフ'
                   ,'height':500
                   ,'width':1045
                   ,vAxis: {title: "金額"}
                   ,hAxis: {title: "年"}
                   ,seriesType: "bars"
                   ,series: {8: {type: "line"}}
                   ,'isStacked':true
                   };

    // Instantiate and draw our chart, passing in some options.
    var chart1 = new google.visualization.ComboChart(document.getElementById('chart_div1'));
    chart1.draw(data1, options1);
    
    var data2 = google.visualization.arrayToDataTable(dataArray2);
    var options2 = {'title':'年度別金融資産残高グラフ'
                   ,'heiht':500
                   ,'width':900
                   ,vAxis: {title: "残高", 'baselineColor':'red'}
                   ,hAxis: {title: "年"}
                   ,seriesType: "bars"
                   ,series: {1: {type: "line"}}
    			   };
    var chart2 = new google.visualization.ComboChart(document.getElementById('chart_div2'));
    chart2.draw(data2, options2);
    
}
