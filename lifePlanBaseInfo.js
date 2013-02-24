var Family = function() {
	var Worker = function(role) {
		this.income                = parseInt($('#' + role + '_income').val());
		this.age                   = parseInt($('#' + role + '_age').val());
		this.retire                = parseInt($('#' + role + '_retire_age').val());
		this.koyouEncho            = parseInt($('#' + role + '_koyou_enchou_age').val());
		this.enchoIncome           = parseInt($('#' + role + '_koyou_enchou_income').val());
		this.incomeUpType          = parseInt($("input:radio[name='radio_" + role + "_up_type']:checked").val());
		this.kigyouNenkin          = parseInt($('#' + role + '_kigyou_nenkin').val());
		this.kigyouNenkinRimawari  = parseInt($('#' + role + '_kigyou_rimawari').val()) / 100;
		this.kigyouNenkinTsumitate = parseInt($('#' + role + '_kigyou_tsumitate').val());
		this.nenkin                = parseInt($('#' + role + '_nenkin').val());
		this.nenkinAge             = parseInt($('#' + role + '_nenkin_age').val());
		(this.incomeUpType == 0) ? this.incomeUpValue = parseInt($('#' + role + '_income_up').val()) / 100 : this.incomeUpValue = parseInt($('#' + role + '_income_up').val());
	};
	var Child = function(no) {
		this.no      = no;
		this.age     = parseInt($('#child_' + no + '_age').val());
		this.isValid = $('#child_' + no + '_check').is(':checked');
	};
	var Setai = function() {
		var i;
		this.monthShishutsu = new Array();
		this.monthShishutsu['shokuhi']   = parseInt($('#shokuhi').val());
		this.monthShishutsu['suidou']    = parseInt($('#suidou').val());
		this.monthShishutsu['gasu']      = parseInt($('#gasu').val());
		this.monthShishutsu['denki']     = parseInt($('#denki').val());
		this.monthShishutsu['tsuushin']  = parseInt($('#tsuushin').val());
		this.monthShishutsu['keitai']    = parseInt($('#keitai').val());
		this.monthShishutsu['hukushoku'] = parseInt($('#hukushoku').val());
		this.monthShishutsu['rezya']     = parseInt($('#rezya').val());
		this.monthShishutsu['kozukai']   = parseInt($('#kozukai').val());
		this.monthShishutsu['goukei']    = 0;
		for (var keyString in this.monthShishutsu) {
			if (keyString == 'goukei') continue;
			this.monthShishutsu['goukei'] += this.monthShishutsu[keyString];
		}
		this.chokin = parseInt($('#chokin').val());
	};
	var Zyutaku = function() {
		this.yachin1_isValid = $('#yachin_check_1').is(':checked');
		this.yachin_1 = parseInt($('#yachin_1').val());
		this.yachin_sonota_1 = parseInt($('#yachin_sonota_1').val());
		this.yachin_start_1 = parseInt($('#yachin_start_1').val());
		this.yachin_end_1 = parseInt($('#yachin_end_1').val());
		this.yachin2_isValid = $('#yachin_check_2').is(':checked');
		this.yachin_2 = parseInt($('#yachin_2').val());
		this.yachin_sonota_2 = parseInt($('#yachin_sonota_2').val());
		this.yachin_start_2 = parseInt($('#yachin_start_2').val());
		this.yachin_end_2 = parseInt($('#yachin_end_2').val());
		this.yachin3_isValid = $('#yachin_check_3').is(':checked');
		this.yachin_3 = parseInt($('#yachin_3').val());
		this.yachin_sonota_3 = parseInt($('#yachin_sonota_3').val());
		this.yachin_start_3 = parseInt($('#yachin_start_3').val());
		this.yachin_end_3 = parseInt($('#yachin_end_3').val());
		this.yachin4_isValid = $('#yachin_check_4').is(':checked');
		this.yachin_4 = parseInt($('#yachin_4').val());
		this.yachin_sonota_4 = parseInt($('#yachin_sonota_4').val());
		this.yachin_start_4 = parseInt($('#yachin_start_4').val());
		this.yachin_end_4 = parseInt($('#yachin_end_4').val());
		
		this.mochiie_isValid = $('#mochiie_yotei').is(':checked');
		this.mochiie_ziki = parseInt($('#mochiie_ziki').val());
		this.mochiie_atamakin = parseInt($('#mochiie_atamakin').val());
		this.mochiie_kariirekin = parseInt($('#mochiie_kariirekin').val());
		this.mochiie_kariirekin_kikan = parseInt($('#mochiie_kariirekin_kikan').val());
		this.mochiie_kariirekin_ritsu = parseInt($('#mochiie_kariirekin_ritsu').val()) / 100;
		this.mochiie_izihi = parseInt($('#mochiie_izihi').val());
	}

	this.setainushi = new Worker('setainushi');
	this.haigusha   = new Worker('haigusha');
	this.child_1 = new Child(1);
	this.child_2 = new Child(2);
	this.child_3 = new Child(3);

	this.children = new Array();
	this.children.push(this.child_1);
	this.children.push(this.child_2);
	this.children.push(this.child_3);
	
	this.setai = new Setai();
	this.zyutaku = new Zyutaku();
}
