buildings= [{
 "Rank": "1",
 "Name": "Apple",
 "MarketCap": 2143,
 "Price": 13476,
 "Today": "+1.01%",
 "CEO":"Tim Cook"
},
{
 "Rank": "2",
 "Name": "Saudi Aramco",
 "MarketCap": 1881,
 "Price": 855,
 "Today": "-0.16%",
 "CEO":"Amin H. Nasser"
 },
 {
 "Rank": "3",
 "Name": "Microsoft",
 "MarketCap": 4783,
 "Price": 21923,
 "Today": "+5.30%",
 "CEO":"Satya Nadella"
 },
 {
 "Rank": "4",
 "Name": "Alphabet (Google)",
 "MarketCap": 3195,
 "Price": 9280,
 "Today": "+5.30%",
 "CEO":"Sundar Pichai"
 },
 {
 "Rank": "5",
 "Name": "Amazon",
 "MarketCap": 4000,
 "Price": 3812,
 "Today": "+5.30%",
 "CEO":"Andy Jassy"
 },
 {
 "Rank": "6",
 "Name": "Berkshire Hathaway",
 "MarketCap": 50057,
 "Price": 11764,
 "Today": "+5.30%",
 "CEO":"Warren Buffett"
 },
 {
 "Rank": "7",
 "Name": "VISA",
 "MarketCap": 40235,
 "Price": 20306,
 "Today": "+5.30%",
 "CEO":"Ryan McInerney"
 },
 {
 "Rank": "8",
 "Name": "Exxon Mobil",
 "MarketCap": 46598,
 "Price": 11315,
 "Today": "+5.30%",
 "CEO":"Darren Woods"
 },
 {
 "Rank": "9",
 "Name": "Tencent",
 "MarketCap": 45831,
 "Price": 4780,
 "Today": "+5.30%",
 "CEO":"Ma Huateng"
 },
 {
 "Rank": "10",
 "Name": "UnitedHealth",
 "MarketCap": 45742,
 "Price": 4780,
 "Today": "+5.30%",
 "CEO":"Andrew Witty"
 },
]







 function drawGraph(data) {
 var X = "";
 var Y = "";
 for (var i = 0; i < data.getElementsByTagName("input").length; i++) {
 	if (data.getElementsByTagName("input")[i].checked == true){
 		if ((i == 0)||(i == 1)){
 			X = data.getElementsByTagName("input")[i].value;
 		} else{
 			Y = data.getElementsByTagName("input")[i].value;
 		}
 	}
 }
 // формируем массив для построения диаграммы
 //let arrGraph = getArrGraph(buildings, "Страна", "Высота")
 let arrGraph = buildings;
 let marginX = 50;
 let marginY = 50;
 let height = 400;
 let width = 800;

 let margin = 50;

 let svg = d3.select("#graph")
 .attr("height", height)
 .attr("width", width);


 // очищаем svg перед построением
 svg.selectAll("*").remove();
 // определяем минимальное и максимальное значение по оси OY
 //let min = d3.min(arrGraph.map(d => d.MarketCap)) * 0.5;
 let min = 0;
 let max = d3.max(arrGraph.map(d => d[Y])) * 1.05;
 let xAxisLen = width - 2 * marginX;
 let yAxisLen = height - 2 * marginY;

 // определяем шкалы для осей
 let scaleX = d3.scaleBand()
 .domain(arrGraph.map(function(d) {
 return d[X];
 })
 )
 .range([0, xAxisLen],1);

 let scaleY = d3.scaleLinear()
 .domain([min, max])
 .range([yAxisLen, 0]);
 // создаем оси
 let axisX = d3.axisBottom(scaleX); // горизонтальная

 let axisY = d3.axisLeft(scaleY);// вертикальная

 // отображаем ось OX, устанавливаем подписи оси ОX и угол их наклона
 svg.append("g")
 .attr("transform", `translate(${marginX}, ${height - marginY})`)
 .call(axisX)
 .attr("class", "x-axis")
 .selectAll("text")
 .style("text-anchor", "end")
 .attr("dx", "-.8em")
 .attr("dy", ".15em")
 .attr("transform", function (d) {
 return "rotate(-45)";
 });

 // отображаем ось OY
 svg.append("g")
 .attr("transform", `translate(${marginX}, ${marginY})`)
 .attr("class", "y-axis")
 .call(axisY);

 // создаем набор вертикальных линий для сетки
 d3.selectAll("g.x-axis g.tick")
 .append("line") // добавляем линию
 .classed("grid-line", true) // добавляем класс
 .attr("x1", 0)
 .attr("y1", 0)
 .attr("x2", 0)
 .attr("y2", - (yAxisLen));

 // создаем горизонтальные линии сетки
 d3.selectAll("g.y-axis g.tick")
 .append("line")
 .classed("grid-line", true)
 .attr("x1", 0)
 .attr("y1", 0)
 .attr("x2", xAxisLen)
 .attr("y2", 0);

 // отображаем данные в виде точечной диаграммы

 svg.selectAll(".dot")
	 .data(arrGraph)
	 .enter()
	 .append("rect")
	 .attr("width", 40)
	 .attr("height", function(d) { return yAxisLen - scaleY(d[Y]); })
	 .attr("x", function(d) { 
	 	return scaleX(d[X])-20; })
	 .attr("y", function(d) { return scaleY(d[Y]); })
	 .attr("transform",
	 `translate(${margin + scaleX.bandwidth()/2}, ${marginY})`)
	 .style("fill", "grey")
}
