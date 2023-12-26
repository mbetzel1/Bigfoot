//parameters for chart
var innerRadius = 75;
var segmentHeight = 5;
var outerRadius = 50 + segmentHeight * 38;
var numSegments = 12;
var arcLength = 2*Math.PI/numSegments;
var transright = 150;
var transdown = 155;

//parameters for legend
var scaleWidth = 200;
var scaleHeight = 25;
var leftPad = 25;
var nColors = palette.length;
var swatchWidth = scaleWidth/nColors;
var startYear = 1980;
var legendFontSize = 24;


//Either end of Viridis palette.
var circlePalette = ['#440154', '#FDE725']
var segLabels = ["January", "February", "March", "April", "May", "June",
 "July", "August", "September", "October", "November", "December"];
var monthAbbrevs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
 var palette = ["#440154","#440256","#450457","#450559","#46075a","#46085c","#460a5d","#460b5e","#470d60","#470e61","#471063","#471164","#471365",
 "#481467","#481668","#481769","#48186a","#481a6c","#481b6d","#481c6e","#481d6f","#481f70","#482071","#482173","#482374","#482475","#482576",
 "#482677","#482878","#482979","#472a7a","#472c7a","#472d7b","#472e7c","#472f7d","#46307e","#46327e","#46337f","#463480","#453581","#453781",
 "#453882","#443983","#443a83","#443b84","#433d84","#433e85","#423f85","#424086","#424186","#414287","#414487","#404588","#404688","#3f4788",
 "#3f4889","#3e4989","#3e4a89","#3e4c8a","#3d4d8a","#3d4e8a","#3c4f8a","#3c508b","#3b518b","#3b528b","#3a538b","#3a548c","#39558c","#39568c",
 "#38588c","#38598c","#375a8c","#375b8d","#365c8d","#365d8d","#355e8d","#355f8d","#34608d","#34618d","#33628d","#33638d","#32648e","#32658e",
 "#31668e","#31678e","#31688e","#30698e","#306a8e","#2f6b8e","#2f6c8e","#2e6d8e","#2e6e8e","#2e6f8e","#2d708e","#2d718e","#2c718e","#2c728e",
 "#2c738e","#2b748e","#2b758e","#2a768e","#2a778e","#2a788e","#29798e","#297a8e","#297b8e","#287c8e","#287d8e","#277e8e","#277f8e","#27808e",
 "#26818e","#26828e","#26828e","#25838e","#25848e","#25858e","#24868e","#24878e","#23888e","#23898e","#238a8d","#228b8d","#228c8d","#228d8d",
 "#218e8d","#218f8d","#21908d","#21918c","#20928c","#20928c","#20938c","#1f948c","#1f958b","#1f968b","#1f978b","#1f988b","#1f998a","#1f9a8a",
 "#1e9b8a","#1e9c89","#1e9d89","#1f9e89","#1f9f88","#1fa088","#1fa188","#1fa187","#1fa287","#20a386","#20a486","#21a585","#21a685","#22a785",
 "#22a884","#23a983","#24aa83","#25ab82","#25ac82","#26ad81","#27ad81","#28ae80","#29af7f","#2ab07f","#2cb17e","#2db27d","#2eb37c","#2fb47c",
 "#31b57b","#32b67a","#34b679","#35b779","#37b878","#38b977","#3aba76","#3bbb75","#3dbc74","#3fbc73","#40bd72","#42be71","#44bf70","#46c06f",
 "#48c16e","#4ac16d","#4cc26c","#4ec36b","#50c46a","#52c569","#54c568","#56c667","#58c765","#5ac864","#5cc863","#5ec962","#60ca60","#63cb5f",
 "#65cb5e","#67cc5c","#69cd5b","#6ccd5a","#6ece58","#70cf57","#73d056","#75d054","#77d153","#7ad151","#7cd250","#7fd34e","#81d34d","#84d44b",
 "#86d549","#89d548","#8bd646","#8ed645","#90d743","#93d741","#95d840","#98d83e","#9bd93c","#9dd93b","#a0da39","#a2da37","#a5db36","#a8db34",
 "#aadc32","#addc30","#b0dd2f","#b2dd2d","#b5de2b","#b8de29","#bade28","#bddf26","#c0df25","#c2df23","#c5e021","#c8e020","#cae11f","#cde11d",
 "#d0e11c","#d2e21b","#d5e21a","#d8e219","#dae319","#dde318","#dfe318","#e2e418","#e5e419","#e7e419","#eae51a","#ece51b","#efe51c","#f1e51d",
 "#f4e61e","#f6e620","#f8e621","#fbe723","#fde725"]

 //narrow down the palette to something manageable
 var selectedPalette = palette.filter(function(item, index) {
     return index % 7 === 0;
 });
var categories = []
for (var i = 0; i<= 36; i++) {
    categories.push(i)
}
// our color scale
var color = d3.scale.ordinal().domain(categories).range(selectedPalette);



function circularHeatChart() {
    //set some constants
    var margin = {top: 10, right: 5, bottom: 5, left: 25},
    domain = null,
    accessor = function(d) {return d;},
    radialLabels = segmentLabels = [];

    function chart(selection) {
        selection.each(function(data) {


            var svg = d3.select(this);
            var offset =  5 + innerRadius + Math.ceil(data.length / numSegments) * (segmentHeight);
            g = svg.append("g")
                .classed("circular-heat", true)
                .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

            var autoDomain = false;
            if (domain === null) {
                domain = d3.extent(data, accessor);
                autoDomain = true;
            }
    
            if(autoDomain)
                domain = null;
            
             //draw legend
             var legendContainer = d3.select("#circle-legend");
             var legend = legendContainer.append("svg").attr("width", 300).attr("height", 50);
             var colorIndex = 0;
 
             palette.forEach(function (color) {
                 legend.append("rect")
                 .attr("width", swatchWidth)
                 .attr("height", scaleHeight)
                 .attr("x", leftPad + colorIndex)
                 .attr("y", 20)
                 .attr('fill', color)
                 .attr('stroke', "none")
                 .attr('stroke-width', 0)
                 .attr("class", "color-swatch")
                 colorIndex += swatchWidth
             })
 
             // Add text for min and max values
             legend.append("text")
                 .attr("class", "circle-tool")
                 .style("font-size", legendFontSize)
                 .attr("x", 0)
                 .attr("y", 40)
                 .text(0);
             
             legend.append("text")
                 .attr("class", "circle-tool")
                 .style("font-size", legendFontSize)
                 .attr("x", leftPad + scaleWidth + leftPad/2)
                 .attr("y", 40)
                 .text(selectedPalette.length);
 
             var triangleX =25;
             var triangleWidth = 7;
             var triangleY = 20;
             var triangleHeight = -12;
             var scaleLength = 200;
             //triangle

             trianglePath = [
                 {x: triangleX, y: triangleY},
                 {x: triangleX + triangleWidth, y: triangleY + triangleHeight},
                 {x: triangleX - triangleWidth, y: triangleY + triangleHeight}
             ];
             var lineFunction = d3.svg.line()
                 .x(function(d) { return d.x; })
                 .y(function(d) {return d.y; })
                 .interpolate("linear-closed");
 
             triangle = legend.append("path")
                 .attr("d", lineFunction(trianglePath))
                 .attr("fill", "none")
                 .attr("stroke", "none")
                 .attr("id", "triangle")


            var tooltip = d3.select("#tooltip")
                    .style("display", "none")

            var date = d3.select("#date").text("DATE")
            var sightings = d3.select("#sightings").text("SIGHTINGS")

            //segments
            g.selectAll("path").data(data)
                .enter().append("path")
                .each(function(d) {
                    d.outerRadius = innerRadius + ((d.Year - startYear + 1) * segmentHeight)
                    d.innerRadius = innerRadius + ((d.Year - startYear) * segmentHeight)
                    d.startAngle = (d.Month - 1) * arcLength
                    d.endAngle = (d.Month) * arcLength
                    })
                .attr("d", d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
                .attr("fill", function(d) {return color(accessor(d));})
                .attr("data-index", function(d, i) { return i; })
                //bigger and border on mouseover
                .on("mouseover", function(d){
        
                })
                .on("mousemove", function(d) {
                    d3.select(this).moveToFront()
                    d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("d", d3.svg.arc().innerRadius(d.innerRadius - 0.2 * segmentHeight)
                        .outerRadius(d.outerRadius + 0.3 * segmentHeight)
                        .startAngle(d.startAngle - 0.02 * arcLength)
                        .endAngle(d.endAngle + 0.02 * arcLength))
                    .attr("stroke", "black")
                    .attr("stroke-width", 0.5)
                    tooltip.style("display", "block")
                    date.text(monthAbbrevs[d.Month - 1] +  " "  + d.Year );
                    sightings.html("</b><p>Sightings: " + "<b>" + d.Value + "</b></p>");
                    
                    //tooltip
                    xNudge = 50
                    yNudge = 100
                    month = parseInt(d.Month)

                    if ((month > 9) || (month < 4)) {
                        yNudge = 25
                    } else {
                        yNudge = -100
                    }

                    if (month < 7) {
                        xNudge = -175
                    } else {
                        xnudge = 0
                    }
                    tooltip.style("left", (d3.event.pageX + xNudge) + "px").style("top",(d3.event.pageY + yNudge + "px"))

                    triangle.attr("transform", "translate(" + (d.Value * 200/37) + ",0)")
                        .attr("stroke", "black")
                        .attr("fill", "black")
                    
                })
                //smaller and no border on mouseout
                .on("mouseout", function(d) {
                    d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("fill", function(d) { return color(accessor(d))})
                    .attr("d", d3.svg.arc().innerRadius(d.innerRadius).outerRadius(d.outerRadius).startAngle(d.startAngle).endAngle(d.endAngle))
                    .attr("stroke", "none")
                    .attr("stroke-width", 0)

                    tooltip.style("display", "none")
                    triangle.attr("stroke", "none")
                        .attr("fill", "none")
                })

                var drag = d3.behavior.drag()
                .on("dragstart", function(d) {
                })
                .on("drag", function(d) {
                    angle = Math.atan(((d3.event.y - transdown)*Math.PI/180)/((d3.event.x - transright)*Math.PI/180))
                })
                .on("dragend", function(d) {
                });
                
            svg.call(drag);

            //this is used for the mouseover behavior
                d3.selection.prototype.moveToFront = function() {
                    return this.each(function(){
                    this.parentNode.appendChild(this);
                    });
                };

            // Unique id so that the text path defs are unique - is there a better way to do this?
            var id = d3.selectAll(".circular-heat")[0].length;

            //Segment labels
            var segmentLabelOffset = 2;
            var r = innerRadius + Math.ceil(data.length / numSegments) * segmentHeight + segmentLabelOffset;
            labels = svg.append("g")
                .classed("labels", true)
                .classed("segment", true)
                .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

            labels.append("def")
                .append("path")
                .attr("id", "segment-label-path-"+id)
                .attr("d", "m0 -" + r + " a" + r + " " + r + " 0 1 1 -1 0");

            labels.selectAll("text")
                .data(segmentLabels).enter()
                .append("text")
                .append("textPath")
                .attr("xlink:href", "#segment-label-path-"+id)
                .attr("startOffset", function(d, i) {return i * 100 / numSegments + "%";})
                .text(function(d) {return d;});

            svg.selectAll("*").attr("transform", "translate(" + transright + "," + transdown + ")")
        });
    
    }

    /* Arc functions */
    ir = function(d, i) {
        return innerRadius + Math.floor(i/numSegments) * segmentHeight;
    }
    or = function(d, i) {
        return innerRadius + segmentHeight + Math.floor(i/numSegments) * segmentHeight;
    }
    sa = function(d, i) {
        return (i * 2 * Math.PI) / numSegments;
    }
    ea = function(d, i) {
        return ((i + 1) * 2 * Math.PI) / numSegments;
    }

    // Configuration getters/setters 
    chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };
    chart.innerRadius = function(_) {
        if (!arguments.length) return innerRadius;
        innerRadius = _;
        return chart;
    };
    chart.numSegments = function(_) {
        if (!arguments.length) return numSegments;
        numSegments = _;
        return chart;
    };
    chart.segmentHeight = function(_) {
        if (!arguments.length) return segmentHeight;
        segmentHeight = _;
        return chart;
    };
    chart.domain = function(_) {
        if (!arguments.length) return domain;
        domain = _;
        return chart;
    };
    chart.range = function(_) {
        if (!arguments.length) return range;
        range = _;
        return chart;
    };
    chart.radialLabels = function(_) {
        if (!arguments.length) return radialLabels;
        if (_ == null) _ = [];
        radialLabels = _;
        return chart;
    };
    chart.segmentLabels = function(_) {
        if (!arguments.length) return segmentLabels;
        if (_ == null) _ = [];
        segmentLabels = _;
        return chart;
    };
    chart.accessor = function(_) {
        if (!arguments.length) return accessor;
        accessor = _;
        return chart;
    };
    return chart;
}


//PROCESSING

data = [];
d3.csv("data/bf_months_final.csv", function(error, data) {
	  
	//go through each line, can modify contents as need be
	data.forEach(function(d){
			
		//sets the specfic values in the data array
		d.Year = parseInt(d.Year)
		d.Month = parseInt(d.Month)
		d.Value = +d.Value
		//return {"month": m, "value":v} ;
			 
	});

    var chart = circularHeatChart()
        .innerRadius(innerRadius)
        .segmentHeight(segmentHeight)
        .numSegments(numSegments) // define the overall shape
        .range(circlePalette)
        //.radialLabels(radLabels)
        .segmentLabels(segLabels);
        
        chart.accessor(function(d) {return d.Value;})

    //add the chart to the parent
    d3.select('#circle-div')
        .selectAll('svg')
        .data([data])
        .enter()
        .insert('svg', ".chart-title")
        .call(chart);

    currentIndex = null



    /* events */
    d3.selectAll("#circle-div path").on('mouseover', function() {
        // d3.select(this)
        // .transition()
        // .duration(200)
        // .attr("d", arcOver);
        
        var d = d3.select(this).data()[0];
        d3.select("#info").text(segLabels[(d.Month - 1)] + ' ' + d.Year + ' had ' + d.Value + ' bigfoot sightings');
        
    });
    d3.selectAll("#circle-div svg").on('mouseout', function() {
        d3.select("#info").text('');
        // d3.select(this)
        //   .transition()
        //   .duration(200)
        //   .attr("d", d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
    });
});





