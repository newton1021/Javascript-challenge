// from data.js
//		var data = [{
//			datetime: "1/1/2010",
//			city: "benton",
//			state: "ar",
//			country: "us",
//			shape: "circle",
//			durationMinutes: "5 mins.",
//			comments: "4 bright green circles high in the sky going in circles then one bright green light at my front door."
//		},



var tbody = d3.select("tbody");
var filterBtn = d3.select("#filter");
var clearBtn = d3.select("#clear");




var tableData = data; //loaded from data.js
//filterBtn.on("click", changeFilter)
clearBtn.on("click", showAllData)


//This "function grabs all the data from the data.js file and adds to the table
//data.forEach(ufo => {
//	var row = tbody.append('tr');
//	Object.entries(ufo).forEach(([key, value]) => {
//		row.append('td').text(value);
//	});
//	
//});

//run the filter when pushed.


filterData = {
	"datetime": new Set(),
	'city': new Set(),
	'state': new Set(),
	'country': new Set(),
	'shape': new Set()
}



function filterSetup(id) {
	var selector = d3.select('#' + id)
	var vals = [...filterData[id]]
	
	vals.sort((a,b) => a > b).forEach(x => {
		selector.append('option')
		.text(x)
		.property('value', x)
	});	
	selector.property('value', "")
}



function init() {
		
	data.forEach(ufo => {
		Object.entries(ufo).forEach(([key, value]) => {
			if(key != 'durationMinutes' && key != 'comments' ) {
				filterData[key].add(value)
			}
		});
		
	});
	
	filterSetup('datetime');
	filterSetup('city');
	filterSetup('state');
	filterSetup('country');
	filterSetup('shape');
}



function showAllData () {
	
	tbody.selectAll("tr").remove();
	
	data.forEach(ufo => {
		var row = tbody.append('tr');
		Object.entries(ufo).forEach(([key, value]) => {
			row.append('td').text(value);
		});
		
	});
	
}



function changeFilter(filter){
	//d3.event.preventDefault();
	
	
	filteredData = tableData.filter(ufo => ufo[filter.id] == filter.value);
	//filteredData = tableData.filter(ufo => ufo['state'] == "ma");
	tbody.selectAll("tr").remove();
	
	console.log(filteredData);
	
	
	filteredData.forEach(ufo => {
		var row = tbody.append('tr');
		Object.entries(ufo).forEach(([key, value]) => {
			row.append('td').text(value);
		})
		
	});
	
	
}

init();
showAllData();