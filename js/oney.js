$(function(){
	
	var amount = $.urlParam('amount');
	
	var monthly = ['1', '3', '4', '5', '10', '15', '20'];
	
	$("#cb_solution_glyph").hide();
	$("#cash_solution_glyph").hide();
	
	$("#oney-solution").click(function() {
		choseOneySolution();
		$("#oney-slider").slider('setValue', 6);
	});
	
	$("#cb-solution").click(function() {
		choseCBSolution();
		$("#oney-slider").slider('setValue', 2);
	});
	
	$("#cash-solution").click(function() {
		choseCashSolution();
		$("#oney-slider").slider('setValue', 0);
	});
	
	
	var increaseSlider = function() {
		var value = getSliderValue(true);
		$("#oney-slider").slider('setValue', value);
		choseSolution(value);
	}

	var decreaseSlider = function() {
		var value = getSliderValue(false);
		$("#oney-slider").slider('setValue', value);
		choseSolution(value);
	}
	
	// Instantiate a slider
	$("#oney-slider").slider({
		id: "oney-slider-internal",
		ticks: [0, 1, 2, 3, 4, 5, 6],
		ticks_labels: monthly,
		min: 0,
		max: 6,
		step: 1,
		value: 6,
		formatter: function(value) {
			return 'Mensualié : ' + getMonthly(value);
		},
		tooltip: 'always'
		
	});
	
	$("#oney-slider-internal").on("slide", function(slideEvt) {
		choseSolution(slideEvt.value);
	});
	
	$("#oney-slider-internal").on("change", function(changeEvt) {
		choseSolution(changeEvt.value.newValue);
	});
	
	function getMonthly(value){
		return amount / monthly[value];
	}

	//Slider management
	$("#increase_slider").mousehold(increaseSlider);
	$("#decrease_slider").mousehold(decreaseSlider);

	//Focus management
	$("#increase_slider").mouseup(function(){
		$(this).blur();
	});
	
	$("#decrease_slider").mouseup(function(){
		$(this).blur();
	});
	
	//Keyboard management
	$(document).bind('keypress.+', increaseSlider);
	$(document).bind('keypress.-', decreaseSlider);
	
	$(document).bind('keypress.38', increaseSlider);
	$(document).bind('keypress.39', decreaseSlider);
	
});

function choseOneySolution(){
	$("#oney_solution_glyph").show();
	$("#cb_solution_glyph").hide();
	$("#cash_solution_glyph").hide();
	$("#oney-solution").addClass('solution-chosed');
	$("#cb-solution").removeClass('solution-chosed');
	$("#cash-solution").removeClass('solution-chosed');
}

function choseCBSolution(){
	$("#cb_solution_glyph").show();
	$("#oney_solution_glyph").hide();
	$("#cash_solution_glyph").hide();
	$("#cb-solution").addClass('solution-chosed');
	$("#oney-solution").removeClass('solution-chosed');
	$("#cash-solution").removeClass('solution-chosed');
}

function choseCashSolution(){
	$("#cash_solution_glyph").show();
	$("#cb_solution_glyph").hide();
	$("#oney_solution_glyph").hide();
	$("#cash-solution").addClass('solution-chosed');
	$("#oney-solution").removeClass('solution-chosed');
	$("#cb-solution").removeClass('solution-chosed');
}

function choseSolution(value){
	switch(value){
		case 0: choseCashSolution();
			break;
		case 1: 
		case 2: choseCBSolution(); 
			break;
		case 3:
		case 4:
		case 5:
		case 6: choseOneySolution();
			break;
		default : break;
	}
}

function getSliderValue(isIncreasing){
	var currentValue = $("#oney-slider").slider('getValue');
	var step = $("#oney-slider").slider('getAttribute').step;
	
	var newValue;
	
	if(isIncreasing){
		newValue = currentValue+step;
	}
	else {
		newValue = currentValue-step;
	}
	return newValue;
}

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

$(function () {
	$.material.init();
	$("#oney-connect-slider").noUiSlider({
		start: [2],
		connect: "lower",
		tooltips: true,
		orientation: 'horizontal',
		step: 1,
		range: {
			min: 0,
			max: 6
		}
		
	});
});
