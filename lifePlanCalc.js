var Shushi = function(year) {
	var ShushiWorker = function() {
		this.age = 0;
		this.income = 0;
		this.kyuyoShotoku = 0;
		this.kenkouHoken = 0;
		this.kouseiNenkin = 0;
		this.koyouHoken = 0;
		this.kaigoHoken = 0;
		this.sonotaKouzyo = 0;
		this.kyoutsuKozyo = 0;
		this.kakuteikyoshutsu = 0;
		this.tenbiki = 0;
		this.shotokuzeiFuyouKouzyo = 0;
		this.shotokuzeiKisoKouzyo = 0;
		this.shotokuzeiKazeiShotoku = 0;
		this.shotokuzei = 0;
		this.zyuminzeiFuyouKouzyo = 0;
		this.zyuminzeiKisoKouzyo = 0;
		this.zyuminzeiKazeiShotoku = 0;
		this.zyuminzei = 0;
		this.tedori = 0;
		this.isWorking = false;
		this.isRetire = false;
		this.isKoyoEncho = false;
		this.hasChildren = new Array();
		this.tsumitate = 0;
		this.isNenkin = false;
	};
	var ShushiChild = function(no, age) {
		this.no = no;
		this.age = age;
		this.kyouikuhi = getKyoikuhi(no, age);
	};
	
	this.year = year;
	this.setainushi = new ShushiWorker();
	this.haigusha = new ShushiWorker();

	this.kodomo_teate = 0;
	this.shunyu_goukei = 0;
	
	this.seikatsu_hi = 0;
	this.kyoiku_hi = 0;
	this.zyutaku_hi = 0;
	this.shishutsu_goukei = 0;
	
	this.shushi = 0;
	this.chokin = 0;

	// 初期処理
	this.init = function(family, n) {
		this.setNewAge(family, n);
		this.setChildren(family, n);
		this.setIncome(family, n);
		this.setShisan(family, n);
		
			this.setKozyo("haigusha");
		if (this.haigusha.isWorking) {
			this.setKyuyoShotoku("haigusha");
			this.setShotokuzei("haigusha");
			this.setZyuminzei("haigusha");
			this.haigusha.tedori = this.haigusha.income - this.haigusha.tenbiki - this.haigusha.shotokuzei - this.haigusha.zyuminzei;
		}
			this.setKozyo("setainushi");
		if (this.setainushi.isWorking) {
			this.setKyuyoShotoku("setainushi");
			this.setShotokuzei("setainushi");
			this.setZyuminzei("setainushi");
			this.setainushi.tedori = this.setainushi.income - this.setainushi.tenbiki - this.setainushi.shotokuzei - this.setainushi.zyuminzei;
		}
		
		if (this.setainushi.isNenkin) {
			this.setNenkin('setainushi', family);
		}
		if (this.haigusha.isNenkin) {
			this.setNenkin('haigusha', family);
		}
		
		this.kodomo_teate = getKodomoTeate(this);
		this.shunyu_goukei = this.setainushi.tedori + this.haigusha.tedori + this.kodomo_teate;
		
		this.setSeikatsuhi(family);
		this.setKyouikuhiGoukei();
		this.setZyutakuhi(family);
		this.setShishutsuGoukei();
		this.setNenkanShushi();
	};
	this.setNenkin = function(role, family) {
		var worker = eval("this."+role);
		var family = eval("family." + role);
		var kazeiShotoku = 0;
		var shotokuzei = 0;
		var zyuuminzei = 0;
		var nenkanNenkin = family.nenkin * 12;
		
		worker.income += nenkanNenkin;

		kazeiShotoku = this.getNenkinKazeiShotou(nenkanNenkin, worker.age);
		
		if (role == 'setainushi') {
			shotokuzei = Math.round((kazeiShotoku - worker.kyoutsuKozyo - worker.shotokuzeiFuyouKouzyo - worker.shotokuzeiKisoKouzyo) * 0.05);
		} else {
			shotokuzei = Math.round((kazeiShotoku - worker.kyoutsuKozyo - worker.shotokuzeiKisoKouzyo) * 0.05);
		}
		worker.shotokuzei += shotokuzei = (shotokuzei > 0) ? shotokuzei : 0;
		
		if (role == 'setainushi') {
			kazeiShotoku = zyuuminzei = Math.round((kazeiShotoku - worker.kyoutsuKozyo - worker.zyuminzeiFuyouKouzyo - worker.zyuminzeiKisoKouzyo) * 0.1);
		} else {
			kazeiShotoku = zyuuminzei = Math.round((kazeiShotoku - worker.kyoutsuKozyo - worker.zyuminzeiKisoKouzyo) * 0.1);
		}
		worker.zyuminzei += zyuuminzei = (zyuuminzei > 0) ? zyuuminzei : 0;
		
		worker.tedori += nenkanNenkin - shotokuzei - zyuuminzei;
	};
	
	this.getNenkinKazeiShotou = function(nenkanNenkin, age) {
		var kazeiShotoku = 0;
		if (age < 65) {
			if (nenkanNenkin <= 700000) {
				kazeiShotoku = 0;
			} else if (nenkanNenkin >= 700001 && nenkanNenkin <= 1299999) {
				kazeiShotoku = nenkanNenkin * 1 - 700000;
			} else if (nenkanNenkin >= 1300000 && nenkanNenkin <= 4099999) {
				kazeiShotoku = Math.round(nenkanNenkin * 0.75) - 375000;
			} else if (nenkanNenkin >= 4100000 && nenkanNenkin <= 7699999) {
				kazeiShotoku = Math.round(nenkanNenkin * 0.85) - 785000;
			} else if (nenkanNenkin >= 7700000) {
				kazeiShotoku = Math.round(nenkanNenkin * 0.95) - 1555000;
			}
		} else {
			if (nenkanNenkin <= 1200000) {
				kazeiShotoku = 0;
			} else if (nenkanNenkin >= 1200001 && nenkanNenkin <= 3299999) {
				kazeiShotoku = nenkanNenkin * 1 - 1200000;
			} else if (nenkanNenkin >= 3300000 && nenkanNenkin <= 4099999) {
				kazeiShotoku = Math.round(nenkanNenkin * 0.75) - 375000;
			} else if (nenkanNenkin >= 4100000 && nenkanNenkin <= 7699999) {
				kazeiShotoku = Math.round(nenkanNenkin * 0.85) - 785000;
			} else if (nenkanNenkin >= 7700000) {
				kazeiShotoku = Math.round(nenkanNenkin * 0.95) - 1555000;
			}
		}
		return kazeiShotoku;
	};
	
	this.setShisan = function(family, n) {
		var i, tsumitate = 0;
		if (!this.setainushi.isRetire) {
			this.setainushi.kakuteikyoshutsu = family.setainushi.kigyouNenkin * 12;
			tsumitate = family.setainushi.kigyouNenkinTsumitate;
			for (i=0; i<=n; i++)
			{
				tsumitate = Math.round((tsumitate + this.setainushi.kakuteikyoshutsu) * (1 + family.setainushi.kigyouNenkinRimawari));
			}
			this.setainushi.tsumitate = tsumitate;
		}
		if (!this.haigusha.isRetire) {
			this.haigusha.kakuteikyoshutsu = family.haigusha.kigyouNenkin * 12;
			tsumitate = family.haigusha.kigyouNenkinTsumitate;
			for (i=0; i<=n; i++)
			{
				tsumitate = Math.round((tsumitate + this.haigusha.kakuteikyoshutsu) * (1 + family.haigusha.kigyouNenkinRimawari));
			}
			this.haigusha.tsumitate = tsumitate;
		}
	}
	// 家族に年齢をセット
	this.setNewAge = function(family, n) {
		this.setainushi.age = family.setainushi.age + n;
		this.haigusha.age = family.haigusha.age + n;
		
		if (this.setainushi.age >= family.setainushi.nenkinAge) {
			this.setainushi.isNenkin = true;
		}
		if (this.haigusha.age >= family.haigusha.nenkinAge) {
			this.haigusha.isNenkin = true;
		}
	};
	// 収入額をセット
	this.setIncome = function(family, n) {
		if (this.setainushi.age > family.setainushi.retire) {
			this.setainushi.isRetire = true;
			if (this.setainushi.age <= family.setainushi.koyouEncho) {
				this.setainushi.isWorking = true;
				this.setainushi.isKoyoEncho = true;
				this.setainushi.income = family.setainushi.enchoIncome;
			}
		} else {
			this.setainushi.isWorking = true;
			if (family.setainushi.incomeUpType == 0) {
				this.setainushi.income = Math.round(family.setainushi.income * Math.pow( (1 + family.setainushi.incomeUpValue), n));
			} else {
				this.setainushi.income = family.setainushi.income + (family.setainushi.incomeUpValue * n);
			}
		}
		
		if (this.haigusha.age > family.haigusha.retire) {
			this.haigusha.isRetire = true;
			if (this.haigusha.age <= family.haigusha.koyouEncho) {
				this.haigusha.isWorking = true;
				this.haigusha.isKoyoEncho = true;
				this.haigusha.income = family.haigusha.enchoIncome;
			}
		} else {
			this.haigusha.isWorking = true;
			if (family.haigusha.incomeUpType == 0) {
				this.haigusha.income = Math.round(family.haigusha.income * Math.pow( (1 + family.haigusha.incomeUpValue), n));
			} else {
				this.haigusha.income = family.haigusha.income + (family.haigusha.incomeUpValue * n);
			}
		}
	};
	// こどもをセット
	this.setChildren = function(family, n) {
		var i = 0;
		for (i=0; i<family.children.length; i++) {
			if (family.children[i].isValid && family.children[i].age + n >= 0) {
				this.setainushi.hasChildren.push(new ShushiChild(family.children[i].no, family.children[i].age + n))
			}
		}
	};
	// 給与所得をセット
	this.setKyuyoShotoku = function(role) {
		var kyuyoShotoku;
		var income = 0;
		var worker = eval("this."+role);
		income = worker.income;
		
		if (income < 650000) {
			kyuyoShotoku = 0;
		} else if (income >= 650000 && income <= 1800000) {
			kyuyoShotoku = income - (income * 0.4);
		} else if (income > 1800000 && income <= 3600000) {
			kyuyoShotoku = income - (income * 0.3) - 180000;
		} else if (income > 3600000 && income <= 6600000) {
			kyuyoShotoku = income - (income * 0.2) - 540000;
		} else if (income > 6600000 && income <= 10000000) {
			kyuyoShotoku = income - (income * 0.1) - 1200000;
		} else if (income > 10000000 && income <= 15000000) {
			kyuyoShotoku = income - (income * 0.05) - 1700000;
		} else if (income > 15000000) {
			kyuyoShotoku = income - 2450000;
		}
		kyuyoShotoku = Math.round(kyuyoShotoku);
		
		worker.kyuyoShotoku = kyuyoShotoku;
	};
	
	this.setKozyo = function(role) {
		var worker = eval("this."+role);
		setShakaihokenryou(worker);
		setSonotaKouzyo(worker);
		setKakuteikyoshutsu(worker);
		
		worker.tenbiki = worker.kenkouHoken 
		               + worker.kouseiNenkin 
		               + worker.koyouHoken 
		               + worker.kaigoHoken 
		               + worker.kakuteikyoshutsu;
		
		worker.kyoutsuKozyo = worker.tenbiki + worker.sonotaKozyo 
		
		if (role == "setainushi") {
			setShotokuzeiFuyouKouzyo(worker, this.haigusha);
			setZyuminzeiFuyouKouzyo(worker, this.haigusha);
		}
		setShotokuzeiKisoKouzyo(worker);
		setZyuminzeiKisoKouzyo(worker);
	};
	this.setShotokuzei = function(role) {
		var worker = eval("this."+role);
		var kouzyoGoShotoku = worker.kyuyoShotoku;
		kouzyoGoShotoku = kouzyoGoShotoku - worker.kyoutsuKozyo;
		kouzyoGoShotoku = kouzyoGoShotoku - worker.shotokuzeiFuyouKouzyo;
		kouzyoGoShotoku = kouzyoGoShotoku - worker.shotokuzeiKisoKouzyo;
		(kouzyoGoShotoku < 0) ? worker.shotokuzeiKazeiShotoku = 0 : worker.shotokuzeiKazeiShotoku = kouzyoGoShotoku;
		worker.shotokuzei = calcShotokuzei(worker.shotokuzeiKazeiShotoku);
	};
	this.setZyuminzei = function(role) {
		var worker = eval("this."+role);
		var kouzyoGoShotoku = worker.kyuyoShotoku;
		kouzyoGoShotoku = kouzyoGoShotoku - worker.kyoutsuKozyo;
		kouzyoGoShotoku = kouzyoGoShotoku - worker.zyuminzeiFuyouKouzyo;
		kouzyoGoShotoku = kouzyoGoShotoku - worker.zyuminzeiKisoKouzyo;
		(kouzyoGoShotoku < 0) ? worker.zyuminzeiKazeiShotoku = 0 : worker.zyuminzeiKazeiShotoku = kouzyoGoShotoku;
		worker.zyuminzei = calcZyuminzei(worker.zyuminzeiKazeiShotoku);
	};
	this.setSeikatsuhi = function(family) {
		this.seikatsu_hi = family.setai.monthShishutsu['goukei'] * 12;
	};
	this.setKyouikuhiGoukei = function() {
		var i, sum = 0;
		for (i=0; i<this.setainushi.hasChildren.length; i++) {
			sum += this.setainushi.hasChildren[i].kyouikuhi
		}
		this.kyoiku_hi = sum;
	};
	this.setZyutakuhi = function(family) {
		if (family.zyutaku.yachin1_isValid) {
			if (this.year >= family.zyutaku.yachin_start_1 && this.year <= family.zyutaku.yachin_end_1) {
				this.zyutaku_hi += family.zyutaku.yachin_1 * 12;
			}
			if (this.year == family.zyutaku.yachin_start_1) this.zyutaku_hi += family.zyutaku.yachin_sonota_1;
		}
		if (family.zyutaku.yachin2_isValid) {
			if (this.year >= family.zyutaku.yachin_start_2 && this.year <= family.zyutaku.yachin_end_2) {
				this.zyutaku_hi += family.zyutaku.yachin_2 * 12;
			}
			if (this.year == family.zyutaku.yachin_start_2) this.zyutaku_hi += family.zyutaku.yachin_sonota_2;
		}
		if (family.zyutaku.yachin3_isValid) {
			if (this.year >= family.zyutaku.yachin_start_3 && this.year <= family.zyutaku.yachin_end_3) {
				this.zyutaku_hi += family.zyutaku.yachin_3 * 12;
			}
			if (this.year == family.zyutaku.yachin_start_3) this.zyutaku_hi += family.zyutaku.yachin_sonota_3;
		}
		if (family.zyutaku.yachin4_isValid) {
			if (this.year >= family.zyutaku.yachin_start_4 && this.year <= family.zyutaku.yachin_end_4) {
				this.zyutaku_hi += family.zyutaku.yachin_4 * 12;
			}
			if (this.year == family.zyutaku.yachin_start_4) this.zyutaku_hi += family.zyutaku.yachin_sonota_4;
		}
		
		if (family.zyutaku.mochiie_isValid) {
			if (this.year >= family.zyutaku.mochiie_ziki) {
				if (this.year == family.zyutaku.mochiie_ziki) this.zyutaku_hi += family.zyutaku.mochiie_atamakin;
				if (this.year <= family.zyutaku.mochiie_ziki + family.zyutaku.mochiie_kariirekin_kikan) {
					this.zyutaku_hi += Math.round(family.zyutaku.mochiie_kariirekin * family.zyutaku.mochiie_kariirekin_ritsu / 12 * Math.pow((1 + family.zyutaku.mochiie_kariirekin_ritsu /12), family.zyutaku.mochiie_kariirekin_kikan * 12) / (Math.pow((1 + family.zyutaku.mochiie_kariirekin_ritsu / 12), family.zyutaku.mochiie_kariirekin_kikan * 12) - 1) * 12);
				}
				this.zyutaku_hi += family.zyutaku.mochiie_izihi;
			}
		}
	}
	this.setShishutsuGoukei = function() {
		this.shishutsu_goukei = this.seikatsu_hi + this.kyoiku_hi + this.zyutaku_hi;
	};
	this.setNenkanShushi = function() {
		this.shushi = this.shunyu_goukei - this.shishutsu_goukei;
	};
}

function getPlanData(family) {
	var i, year, nowYear = 2013;
	var plan = new Array();
	
	for (i=0; i<=60; ++i) {
		year = nowYear + i;

		var shushi = new Shushi(year);
		shushi.init(family, i);
		plan.push(shushi);
	}
	return plan;
}

// 共通控除計算式
function setShakaihokenryou(worker) {
	var hyouzyunGetsugaku = worker.income / 12;
	worker.kenkouHoken = getkenkouHoken(hyouzyunGetsugaku, worker.age);
	worker.kouseiNenkin = getKoseiNenkin(hyouzyunGetsugaku);
	worker.kaigoHoken = getKaigoHoken(worker.age);
	worker.koyouHoken = getKoyouHoken(worker.income);
}
// 健康保険料計算式
function getkenkouHoken(hyouzyunGetsugaku, age) {
	var kenkouHoken = 0;
	if (age < 40) {
		if (hyouzyunGetsugaku < 58000) { hyouzyunGetsugaku = 0;
		} else if (hyouzyunGetsugaku >=58000 && hyouzyunGetsugaku < 68000) { kenkouHoken = 2891;
		} else if (hyouzyunGetsugaku >=68000 && hyouzyunGetsugaku < 78000) { kenkouHoken = 3390;
		} else if (hyouzyunGetsugaku >=78000 && hyouzyunGetsugaku < 88000) { kenkouHoken = 3888;
		} else if (hyouzyunGetsugaku >=88000 && hyouzyunGetsugaku < 98000) { kenkouHoken = 4387;
		} else if (hyouzyunGetsugaku >=98000 && hyouzyunGetsugaku < 104000) { kenkouHoken = 4885;
		} else if (hyouzyunGetsugaku >=104000 && hyouzyunGetsugaku < 110000) { kenkouHoken = 5184;
		} else if (hyouzyunGetsugaku >=110000 && hyouzyunGetsugaku < 118000) { kenkouHoken = 5484;
		} else if (hyouzyunGetsugaku >=118000 && hyouzyunGetsugaku < 126000) { kenkouHoken = 5882;
		} else if (hyouzyunGetsugaku >=126000 && hyouzyunGetsugaku < 134000) { kenkouHoken = 6281;
		} else if (hyouzyunGetsugaku >=134000 && hyouzyunGetsugaku < 142000) { kenkouHoken = 6680;
		} else if (hyouzyunGetsugaku >=142000 && hyouzyunGetsugaku < 150000) { kenkouHoken = 7079;
		} else if (hyouzyunGetsugaku >=150000 && hyouzyunGetsugaku < 160000) { kenkouHoken = 7478;
		} else if (hyouzyunGetsugaku >=160000 && hyouzyunGetsugaku < 170000) { kenkouHoken = 7976;
		} else if (hyouzyunGetsugaku >=170000 && hyouzyunGetsugaku < 180000) { kenkouHoken = 8475;
		} else if (hyouzyunGetsugaku >=180000 && hyouzyunGetsugaku < 190000) { kenkouHoken = 8973;
		} else if (hyouzyunGetsugaku >=190000 && hyouzyunGetsugaku < 200000) { kenkouHoken = 9472;
		} else if (hyouzyunGetsugaku >=200000 && hyouzyunGetsugaku < 220000) { kenkouHoken = 9970;
		} else if (hyouzyunGetsugaku >=220000 && hyouzyunGetsugaku < 240000) { kenkouHoken = 10967;
		} else if (hyouzyunGetsugaku >=240000 && hyouzyunGetsugaku < 260000) { kenkouHoken = 11964;
		} else if (hyouzyunGetsugaku >=260000 && hyouzyunGetsugaku < 280000) { kenkouHoken = 12961;
		} else if (hyouzyunGetsugaku >=280000 && hyouzyunGetsugaku < 300000) { kenkouHoken = 13958;
		} else if (hyouzyunGetsugaku >=300000 && hyouzyunGetsugaku < 320000) { kenkouHoken = 14955;
		} else if (hyouzyunGetsugaku >=320000 && hyouzyunGetsugaku < 340000) { kenkouHoken = 15952;
		} else if (hyouzyunGetsugaku >=340000 && hyouzyunGetsugaku < 360000) { kenkouHoken = 16949;
		} else if (hyouzyunGetsugaku >=360000 && hyouzyunGetsugaku < 380000) { kenkouHoken = 17946;
		} else if (hyouzyunGetsugaku >=380000 && hyouzyunGetsugaku < 410000) { kenkouHoken = 18943;
		} else if (hyouzyunGetsugaku >=410000 && hyouzyunGetsugaku < 440000) { kenkouHoken = 20439;
		} else if (hyouzyunGetsugaku >=440000 && hyouzyunGetsugaku < 470000) { kenkouHoken = 21934;
		} else if (hyouzyunGetsugaku >=470000 && hyouzyunGetsugaku < 500000) { kenkouHoken = 23430;
		} else if (hyouzyunGetsugaku >=500000 && hyouzyunGetsugaku < 530000) { kenkouHoken = 24925;
		} else if (hyouzyunGetsugaku >=530000 && hyouzyunGetsugaku < 560000) { kenkouHoken = 26421;
		} else if (hyouzyunGetsugaku >=560000 && hyouzyunGetsugaku < 590000) { kenkouHoken = 27916;
		} else if (hyouzyunGetsugaku >=590000 && hyouzyunGetsugaku < 620000) { kenkouHoken = 29412;
		} else if (hyouzyunGetsugaku >=620000 && hyouzyunGetsugaku < 650000) { kenkouHoken = 30907;
		} else if (hyouzyunGetsugaku >=650000 && hyouzyunGetsugaku < 680000) { kenkouHoken = 32403;
		} else if (hyouzyunGetsugaku >=680000 && hyouzyunGetsugaku < 710000) { kenkouHoken = 33898;
		} else if (hyouzyunGetsugaku >=710000 && hyouzyunGetsugaku < 750000) { kenkouHoken = 35394;
		} else if (hyouzyunGetsugaku >=750000 && hyouzyunGetsugaku < 790000) { kenkouHoken = 37388;
		} else if (hyouzyunGetsugaku >=790000 && hyouzyunGetsugaku < 830000) { kenkouHoken = 39382;
		} else if (hyouzyunGetsugaku >=830000 && hyouzyunGetsugaku < 880000) { kenkouHoken = 41376;
		} else if (hyouzyunGetsugaku >=880000 && hyouzyunGetsugaku < 930000) { kenkouHoken = 43868;
		} else if (hyouzyunGetsugaku >=930000 && hyouzyunGetsugaku < 980000) { kenkouHoken = 46361;
		} else if (hyouzyunGetsugaku >=980000 && hyouzyunGetsugaku < 1030000) { kenkouHoken = 48853;
		} else if (hyouzyunGetsugaku >=1030000 && hyouzyunGetsugaku < 1090000) { kenkouHoken = 51346;
		} else if (hyouzyunGetsugaku >=1090000 && hyouzyunGetsugaku < 1150000) { kenkouHoken = 54337;
		} else if (hyouzyunGetsugaku >=1150000 && hyouzyunGetsugaku < 1210000) { kenkouHoken = 57328;
		} else if (hyouzyunGetsugaku >=1210000 && hyouzyunGetsugaku < 9999999) { kenkouHoken = 139392;	
		}
	} else {
		if (hyouzyunGetsugaku < 58000) { hyouzyunGetsugaku = 0;
		} else if (hyouzyunGetsugaku >=58000 && hyouzyunGetsugaku < 68000) { kenkouHoken = 3341;
		} else if (hyouzyunGetsugaku >=68000 && hyouzyunGetsugaku < 78000) { kenkouHoken = 3917;
		} else if (hyouzyunGetsugaku >=78000 && hyouzyunGetsugaku < 88000) { kenkouHoken = 4493;
		} else if (hyouzyunGetsugaku >=88000 && hyouzyunGetsugaku < 98000) { kenkouHoken = 5069;
		} else if (hyouzyunGetsugaku >=98000 && hyouzyunGetsugaku < 104000) { kenkouHoken = 5645;
		} else if (hyouzyunGetsugaku >=104000 && hyouzyunGetsugaku < 110000) { kenkouHoken = 5990;
		} else if (hyouzyunGetsugaku >=110000 && hyouzyunGetsugaku < 118000) { kenkouHoken = 6336;
		} else if (hyouzyunGetsugaku >=118000 && hyouzyunGetsugaku < 126000) { kenkouHoken = 6797;
		} else if (hyouzyunGetsugaku >=126000 && hyouzyunGetsugaku < 134000) { kenkouHoken = 7258;
		} else if (hyouzyunGetsugaku >=134000 && hyouzyunGetsugaku < 142000) { kenkouHoken = 7718;
		} else if (hyouzyunGetsugaku >=142000 && hyouzyunGetsugaku < 150000) { kenkouHoken = 8179;
		} else if (hyouzyunGetsugaku >=150000 && hyouzyunGetsugaku < 160000) { kenkouHoken = 8640;
		} else if (hyouzyunGetsugaku >=160000 && hyouzyunGetsugaku < 170000) { kenkouHoken = 9216;
		} else if (hyouzyunGetsugaku >=170000 && hyouzyunGetsugaku < 180000) { kenkouHoken = 9792;
		} else if (hyouzyunGetsugaku >=180000 && hyouzyunGetsugaku < 190000) { kenkouHoken = 10368;
		} else if (hyouzyunGetsugaku >=190000 && hyouzyunGetsugaku < 200000) { kenkouHoken = 10944;
		} else if (hyouzyunGetsugaku >=200000 && hyouzyunGetsugaku < 220000) { kenkouHoken = 11520;
		} else if (hyouzyunGetsugaku >=220000 && hyouzyunGetsugaku < 240000) { kenkouHoken = 12672;
		} else if (hyouzyunGetsugaku >=240000 && hyouzyunGetsugaku < 260000) { kenkouHoken = 13824;
		} else if (hyouzyunGetsugaku >=260000 && hyouzyunGetsugaku < 280000) { kenkouHoken = 14976;
		} else if (hyouzyunGetsugaku >=280000 && hyouzyunGetsugaku < 300000) { kenkouHoken = 16128;
		} else if (hyouzyunGetsugaku >=300000 && hyouzyunGetsugaku < 320000) { kenkouHoken = 17280;
		} else if (hyouzyunGetsugaku >=320000 && hyouzyunGetsugaku < 340000) { kenkouHoken = 18432;
		} else if (hyouzyunGetsugaku >=340000 && hyouzyunGetsugaku < 360000) { kenkouHoken = 19584;
		} else if (hyouzyunGetsugaku >=360000 && hyouzyunGetsugaku < 380000) { kenkouHoken = 20736;
		} else if (hyouzyunGetsugaku >=380000 && hyouzyunGetsugaku < 410000) { kenkouHoken = 21888;
		} else if (hyouzyunGetsugaku >=410000 && hyouzyunGetsugaku < 440000) { kenkouHoken = 23616;
		} else if (hyouzyunGetsugaku >=440000 && hyouzyunGetsugaku < 470000) { kenkouHoken = 25344;
		} else if (hyouzyunGetsugaku >=470000 && hyouzyunGetsugaku < 500000) { kenkouHoken = 27072;
		} else if (hyouzyunGetsugaku >=500000 && hyouzyunGetsugaku < 530000) { kenkouHoken = 28800;
		} else if (hyouzyunGetsugaku >=530000 && hyouzyunGetsugaku < 560000) { kenkouHoken = 30528;
		} else if (hyouzyunGetsugaku >=560000 && hyouzyunGetsugaku < 590000) { kenkouHoken = 32256;
		} else if (hyouzyunGetsugaku >=590000 && hyouzyunGetsugaku < 620000) { kenkouHoken = 33984;
		} else if (hyouzyunGetsugaku >=620000 && hyouzyunGetsugaku < 650000) { kenkouHoken = 35712;
		} else if (hyouzyunGetsugaku >=650000 && hyouzyunGetsugaku < 680000) { kenkouHoken = 37440;
		} else if (hyouzyunGetsugaku >=680000 && hyouzyunGetsugaku < 710000) { kenkouHoken = 39168;
		} else if (hyouzyunGetsugaku >=710000 && hyouzyunGetsugaku < 750000) { kenkouHoken = 40896;
		} else if (hyouzyunGetsugaku >=750000 && hyouzyunGetsugaku < 790000) { kenkouHoken = 43200;
		} else if (hyouzyunGetsugaku >=790000 && hyouzyunGetsugaku < 830000) { kenkouHoken = 45504;
		} else if (hyouzyunGetsugaku >=830000 && hyouzyunGetsugaku < 880000) { kenkouHoken = 47808;
		} else if (hyouzyunGetsugaku >=880000 && hyouzyunGetsugaku < 930000) { kenkouHoken = 50688;
		} else if (hyouzyunGetsugaku >=930000 && hyouzyunGetsugaku < 980000) { kenkouHoken = 53568;
		} else if (hyouzyunGetsugaku >=980000 && hyouzyunGetsugaku < 1030000) { kenkouHoken = 56448;
		} else if (hyouzyunGetsugaku >=1030000 && hyouzyunGetsugaku < 1090000) { kenkouHoken = 59328;
		} else if (hyouzyunGetsugaku >=1090000 && hyouzyunGetsugaku < 1150000) { kenkouHoken = 62784;
		} else if (hyouzyunGetsugaku >=1150000 && hyouzyunGetsugaku < 1210000) { kenkouHoken = 66240;
		} else if (hyouzyunGetsugaku >=1210000 && hyouzyunGetsugaku < 9999999) { kenkouHoken = 69696;
		}
	}
	return kenkouHoken * 12;
}
// 厚生年金計算式
function getKoseiNenkin(hyouzyunGetsugaku) {
	var kouseiNenkin = 0;
	if (hyouzyunGetsugaku < 58000) { kouseiNenkin = 0;
	} else if (hyouzyunGetsugaku >=58000 && hyouzyunGetsugaku < 68000) { kouseiNenkin = 0;
	} else if (hyouzyunGetsugaku >=68000 && hyouzyunGetsugaku < 78000) { kouseiNenkin = 0;
	} else if (hyouzyunGetsugaku >=78000 && hyouzyunGetsugaku < 88000) { kouseiNenkin = 0;
	} else if (hyouzyunGetsugaku >=88000 && hyouzyunGetsugaku < 98000) { kouseiNenkin = 0;
	} else if (hyouzyunGetsugaku >=98000 && hyouzyunGetsugaku < 104000) { kouseiNenkin = 8215;
	} else if (hyouzyunGetsugaku >=104000 && hyouzyunGetsugaku < 110000) { kouseiNenkin = 8718;
	} else if (hyouzyunGetsugaku >=110000 && hyouzyunGetsugaku < 118000) { kouseiNenkin = 9221;
	} else if (hyouzyunGetsugaku >=118000 && hyouzyunGetsugaku < 126000) { kouseiNenkin = 9892;
	} else if (hyouzyunGetsugaku >=126000 && hyouzyunGetsugaku < 134000) { kouseiNenkin = 10563;
	} else if (hyouzyunGetsugaku >=134000 && hyouzyunGetsugaku < 142000) { kouseiNenkin = 11233;
	} else if (hyouzyunGetsugaku >=142000 && hyouzyunGetsugaku < 150000) { kouseiNenkin = 11904;
	} else if (hyouzyunGetsugaku >=150000 && hyouzyunGetsugaku < 160000) { kouseiNenkin = 12575;
	} else if (hyouzyunGetsugaku >=160000 && hyouzyunGetsugaku < 170000) { kouseiNenkin = 13413;
	} else if (hyouzyunGetsugaku >=170000 && hyouzyunGetsugaku < 180000) { kouseiNenkin = 14251;
	} else if (hyouzyunGetsugaku >=180000 && hyouzyunGetsugaku < 190000) { kouseiNenkin = 15089;
	} else if (hyouzyunGetsugaku >=190000 && hyouzyunGetsugaku < 200000) { kouseiNenkin = 15928;
	} else if (hyouzyunGetsugaku >=200000 && hyouzyunGetsugaku < 220000) { kouseiNenkin = 16766;
	} else if (hyouzyunGetsugaku >=220000 && hyouzyunGetsugaku < 240000) { kouseiNenkin = 18443;
	} else if (hyouzyunGetsugaku >=240000 && hyouzyunGetsugaku < 260000) { kouseiNenkin = 20119;
	} else if (hyouzyunGetsugaku >=260000 && hyouzyunGetsugaku < 280000) { kouseiNenkin = 21796;
	} else if (hyouzyunGetsugaku >=280000 && hyouzyunGetsugaku < 300000) { kouseiNenkin = 23472;
	} else if (hyouzyunGetsugaku >=300000 && hyouzyunGetsugaku < 320000) { kouseiNenkin = 25149;
	} else if (hyouzyunGetsugaku >=320000 && hyouzyunGetsugaku < 340000) { kouseiNenkin = 26826;
	} else if (hyouzyunGetsugaku >=340000 && hyouzyunGetsugaku < 360000) { kouseiNenkin = 28502;
	} else if (hyouzyunGetsugaku >=360000 && hyouzyunGetsugaku < 380000) { kouseiNenkin = 30179;
	} else if (hyouzyunGetsugaku >=380000 && hyouzyunGetsugaku < 410000) { kouseiNenkin = 31855;
	} else if (hyouzyunGetsugaku >=410000 && hyouzyunGetsugaku < 440000) { kouseiNenkin = 34370;
	} else if (hyouzyunGetsugaku >=440000 && hyouzyunGetsugaku < 470000) { kouseiNenkin = 36885;
	} else if (hyouzyunGetsugaku >=470000 && hyouzyunGetsugaku < 500000) { kouseiNenkin = 39400;
	} else if (hyouzyunGetsugaku >=500000 && hyouzyunGetsugaku < 530000) { kouseiNenkin = 41915;
	} else if (hyouzyunGetsugaku >=530000 && hyouzyunGetsugaku < 560000) { kouseiNenkin = 44430;
	} else if (hyouzyunGetsugaku >=560000 && hyouzyunGetsugaku < 590000) { kouseiNenkin = 46945;
	} else if (hyouzyunGetsugaku >=590000 && hyouzyunGetsugaku < 620000) { kouseiNenkin = 49460;
	} else if (hyouzyunGetsugaku >=620000 && hyouzyunGetsugaku < 650000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=650000 && hyouzyunGetsugaku < 680000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=680000 && hyouzyunGetsugaku < 710000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=710000 && hyouzyunGetsugaku < 750000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=750000 && hyouzyunGetsugaku < 790000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=790000 && hyouzyunGetsugaku < 830000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=830000 && hyouzyunGetsugaku < 880000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=880000 && hyouzyunGetsugaku < 930000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=930000 && hyouzyunGetsugaku < 980000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=980000 && hyouzyunGetsugaku < 1030000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=1030000 && hyouzyunGetsugaku < 1090000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=1090000 && hyouzyunGetsugaku < 1150000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=1150000 && hyouzyunGetsugaku < 1210000) { kouseiNenkin = 51975;
	} else if (hyouzyunGetsugaku >=1210000 && hyouzyunGetsugaku < 9999999) { kouseiNenkin = 51975;
	}
	return kouseiNenkin * 12;
}
// 介護保険料計算式
function getKaigoHoken(age) {
	// TODO
	if (age >= 40) {
		return 50000;
	} else {
		return 0;
	}
}
// 雇用保険料計算式
function getKoyouHoken(income) {
	return Math.round(income * 0.005);
}
// その他控除計算式
function setSonotaKouzyo(worker) {
	// TODO
	worker.sonotaKozyo = 0;
}
// 確定拠出年金
function setKakuteikyoshutsu(worker) {
	// TODO
	return worker.kakuteikyoshutsu;
}

// 所得税控除計算式
function setShotokuzeiFuyouKouzyo(setainushi, haigusha) {
	// 扶養親族のうち、その年12月31日現在の年齢が16歳以上:38万円
	// 扶養親族のうち、その年12月31日現在の年齢が19歳以上23歳未満:63万
	var i, fuyouKozyo = 0;
	
	if (haigusha.income < 1030000) {
		fuyouKozyo += 380000;
	}
	
	// TODO 学部卒年齢までしか扶養対象にしていない
	for (i=0; i < setainushi.hasChildren.length; i++) {
		if (setainushi.hasChildren[i].age >= 19 && setainushi.hasChildren[i].age < 23) {
			fuyouKozyo += 630000;
		} else if (setainushi.hasChildren[i].age >= 16 && setainushi.hasChildren[i].age < 19) {
			fuyouKozyo += 380000;
		}
	}
	setainushi.shotokuzeiFuyouKouzyo = fuyouKozyo;
}
// 所得税基礎控除
function setShotokuzeiKisoKouzyo(worker) {
	worker.shotokuzeiKisoKouzyo = 380000;
}
// 所得税計算式
function calcShotokuzei(kouzyoGoShotoku) {
	var shotokuzei = 0;
	if (kouzyoGoShotoku <= 1950000) {
		shotokuzei = kouzyoGoShotoku * 0.05;
	} else if (kouzyoGoShotoku > 1950000 && kouzyoGoShotoku <= 3300000) {
		shotokuzei = kouzyoGoShotoku * 0.1 - 97500;
	} else if (kouzyoGoShotoku > 3300000 && kouzyoGoShotoku <= 6950000) {
		shotokuzei = kouzyoGoShotoku * 0.2 - 427500;
	} else if (kouzyoGoShotoku > 6950000 && kouzyoGoShotoku <= 9000000) {
		shotokuzei = kouzyoGoShotoku * 0.23 - 636000;
	} else if (kouzyoGoShotoku > 9000000 && kouzyoGoShotoku <= 18000000) {
		shotokuzei = kouzyoGoShotoku * 0.33 - 1536000;
	}
	return Math.round(shotokuzei);
}

// 住民税控除計算式
function setZyuminzeiFuyouKouzyo(setainushi, haigusha) {
	// 扶養親族のうち、その年12月31日現在の年齢が16歳以上70歳未満:33万
	var i, fuyouKozyo = 0;

	if (haigusha.age < 70 && haigusha.income < 1030000) {
		fuyouKozyo += 330000;
	}
	
	// TODO 学部卒年齢までしか扶養対象にしていない
	for (i=0; i < setainushi.hasChildren.length; i++) {
		if (setainushi.hasChildren[i].age >= 16 && setainushi.hasChildren[i].age < 23) {
			fuyouKozyo += 330000;
		}
	}
	setainushi.zyuminzeiFuyouKouzyo = fuyouKozyo;
}
// 住民税基礎控除
function setZyuminzeiKisoKouzyo(worker) {
	worker.zyuminzeiKisoKouzyo = 330000;
}
// 住民税計算式
function calcZyuminzei(kouzyoGoShotoku) {
	return Math.round(kouzyoGoShotoku * 0.1);
}
// 子ども手当
function getKodomoTeate(shushi) {
	var i,kodomoTeate = 0;
	
	for (i=0; i < shushi.setainushi.hasChildren.length; i++) {
		if  (shushi.setainushi.hasChildren[i].age >= 0 && shushi.setainushi.hasChildren[i].age < 3) {
			kodomoTeate += (15000 * 12);
		} else if (shushi.setainushi.hasChildren[i].age >= 3 && shushi.setainushi.hasChildren[i].age <= 12) {
			if (i < 2) {
				kodomoTeate += (10000 * 12);
			} else {
				kodomoTeate += (15000 * 12);
			}
		} else if (shushi.setainushi.hasChildren[i].age >= 13 && shushi.setainushi.hasChildren[i].age <= 15) {
			kodomoTeate += (10000 * 12);
		}
	}
	
	return kodomoTeate;
}
function getKyoikuhi(no, age) {
	var kyouikuhi = 0;
	var youchien   = parseInt($("input:radio[name='radio_child_" + no + "_youchien']:checked").val());
	var shougakkou = parseInt($("input:radio[name='radio_child_" + no + "_shougakkou']:checked").val());
	var chuugakkou = parseInt($("input:radio[name='radio_child_" + no + "_chuugakkou']:checked").val());
	var koukou     = parseInt($("input:radio[name='radio_child_" + no + "_koukou']:checked").val());
	var daigaku    = parseInt($("input:radio[name='radio_child_" + no + "_daigaku']:checked").val());
	var zitaku     = parseInt($("input:radio[name='radio_child_" + no + "_tsugaku']:checked").val()) == 0;
	// 幼稚園費用
	if (age >= 4 && age <= 6) {
		if (youchien == 1) {
			kyouikuhi = 131678 + 14932 + 83014;
		} else if (youchien == 2) {
			if (age == 4) kyouikuhi = 52298;
			kyouikuhi += 369786 + 27577 + 143863;
		}
	}
	// 小学校費用
	if (age >= 7 && age <= 12) {
		if (shougakkou == 1) {
			kyouikuhi = 56019 + 41536 + 210168;
		} else if (shougakkou == 2) {
			if (age == 7) kyouikuhi = 187615;
			kyouikuhi += 792604 + 35836 + 564300;
		}
	}
	// 中学校費用
	if (age >= 13 && age <= 15) {
		if (chuugakkou == 1) {
			kyouikuhi = 138042 + 37430 + 305009;
		} else if (chuugakkou == 2) {
			if (age == 13) kyouikuhi = 188376;
			kyouikuhi += 946594 + 590 + 289075;
		}
	}
	// 高校費用
	if (age >= 16 && age <= 18) {
		if (koukou == 1) {
			kyouikuhi = 356937 + 159249;
		} else if (koukou == 2) {
			if (age == 16) kyouikuhi = 166087;
			kyouikuhi += 782953 + 197898;
		}
	}
	// 大学費用
	if (age >= 19 && age <= 22) {
		if (daigaku == 1) {
			if (zitaku) {
				if (age == 19) kyouikuhi = 846000;
				kyouikuhi += 1089600;
			} else {
				if (age == 19) kyouikuhi = 1322000;
				kyouikuhi += 1743800;
			}
		} else if (daigaku == 2) {
			if (zitaku) {
				if (age == 19) kyouikuhi = 1144662;
				kyouikuhi += 1552738;
			} else {
				if (age == 19) kyouikuhi = 1620662;
				kyouikuhi += 2128738;
			}
		} else if (daigaku == 3) {
			if (zitaku) {
				if (age == 19) kyouikuhi = 1225416;
				kyouikuhi += 1852990;
			} else {
				if (age == 19) kyouikuhi = 1701416;
				kyouikuhi += 2428990;
			}
		}
	}
	if (age >= 19 && age <= 24) {
		if (daigaku == 4) {
			if (zitaku) {
				if (age == 19) kyouikuhi = 5451862;
				kyouikuhi += 3784456;
			} else {
				if (age == 19) kyouikuhi = 5927862;
				kyouikuhi += 4360456;
			}
		}
	}
	if (age >= 19 && age <= 20) {
		if (daigaku == 5) {
			if (zitaku) {
				if (age == 19) kyouikuhi = 895717;
				kyouikuhi += 1442657;
			} else {
				if (age == 19) kyouikuhi = 1371717;
				kyouikuhi += 1934057;
			}
		}
	}
	return kyouikuhi;
}
