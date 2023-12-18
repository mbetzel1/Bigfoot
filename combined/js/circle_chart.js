//Either end of Viridis palette.
var circle_palette = ['#440154', '#FDE725']

//label arrays
// var radLabels = ['', '', '', '', '', 1985, '', '', '', '', 1990,
//  '', '', '', '', 1995, '', '', '', '', 2000,
//   '', '', '', '', 2005, '', '', '', '', 2010,
//    '', '', '', '', 2015, '', '', '']

var segLabels = ["January", "February", "March", "April", "May", "June",
 "July", "August", "September", "October", "November", "December"]

function circularHeatChart() {
    //set some constants
    var margin = {top: 10, right: 5, bottom: 5, left: 25},
    innerRadius = 7,
    numSegments = 12,
    segmentHeight = 7,
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
            var color = d3.scale.linear().domain(domain).range(range);
            if(autoDomain)
                domain = null;

            g.selectAll("path").data(data)
                .enter().append("path")
                .attr("d", d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
                .attr("fill", function(d) {return color(accessor(d));});

            // Unique id so that the text path defs are unique - is there a better way to do this?
            var id = d3.selectAll(".circular-heat")[0].length;

            //Radial labels
            // var lsa = 0.01; //Label start angle
            // var labels = svg.append("g")
            //     .classed("labels", true)
            //     .classed("radial", true)
            //     .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

            // //add the label paths
            // labels.selectAll("def")
            //     .data(radialLabels).enter()
            //     .append("def")
            //     .append("path")
            //     .attr("id", function(d, i) {return "radial-label-path-"+id+"-"+i;})
            //     .attr("d", function(d, i) {
            //         var r = innerRadius + ((i + 0.2) * segmentHeight);
            //         return "m" + r * Math.sin(lsa) + " -" + r * Math.cos(lsa) + 
            //                 " a" + r + " " + r + " 0 1 1 -1 0";
            //     })
            // //add the label text
            // labels.selectAll("text")
            //     .data(radialLabels).enter()
            //     .append("text")
            //     .append("textPath")
            //     .attr("xlink:href", function(d, i) {return "#radial-label-path-"+id+"-"+i;})
            //     .text(function(d) {return d;});

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
		d.year = d.Year
		d.month = d.Month
		d.value = +d.Value
		//return {"month": m, "value":v} ;
			 
	});


 
var chart = circularHeatChart()
	.innerRadius(7)
    .segmentHeight(7)
    .numSegments(12) // define the overall shape
    .range(circle_palette)
    //.radialLabels(radLabels)
    .segmentLabels(segLabels);
	
	chart.accessor(function(d) {return d.value;})
	
//add the chart to the parent
d3.select('#circle-div')
    .selectAll('svg')
    .data([data])
    .enter()
    .insert('svg', ".chart-title")
    .call(chart);

/* events */
d3.selectAll("#circle-div path").on('mouseover', function() {
	var d = d3.select(this).data()[0];
    d3.select("#info").text(segLabels[(d.month - 1)] + ' ' + d.year + ' had ' + d.value + ' bigfoot sightings');
});
d3.selectAll("#circle-div svg").on('mouseout', function() {
    d3.select("#info").text('');	
});

// d3.selectAll("#circle-div svg").on('click', function() {
//     alert('click!');	
// });

});

