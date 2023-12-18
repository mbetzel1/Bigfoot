//colors
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
//fontsize

var fs = 24
// MAP

google.charts.load('current', {
    'packages': ['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });



google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var options = {
        region: 'US',
        displayMode: 'regions',
        resolution: 'provinces',
        colorAxis: {colors: palette},
        backgroundColor: '#FFFFFF',
        datalessRegionColor: '#000000',
        defaultColor: '#000000',
        width: "100%",
        height: "100%",
        legend: {
         position: "right",
         textStyle: {
            fontSize: fs,
         }
      },
        tooltip: {textStyle: {fontSize: fs}}
    };
    var data = google.visualization.arrayToDataTable([
        ['State', 'Select'],
        ['US-AL', 91],
        ['US-AK', 20],
        ['US-AR', 84],
        ['US-AZ', 95],
        ['US-CA', 402],
        ['US-CT', 15],
        ['US-CO', 121],
        ['US-DE', 5],
        ['US-FL', 292],
        ['US-GA', 120],
        ['US-HI', 0],
        ['US-IN', 75],
        ['US-IL', 232],
        ['US-IA', 56],
        ['US-KS', 42],
        ['US-KY', 112],
        ['US-MI', 208],
        ['US-MO', 141],
        ['US-MS', 21],
        ['US-MT', 45],
        ['US-ME', 14],
        ['US-MA', 27],
        ['US-MN', 69],
        ['US-MT', 45],
        ['US-NE', 15],
        ['US-NJ', 63],
        ['US-NM', 40],
        ['US-NY', 101],
        ['US-NC', 79],
        ['US-ND', 4],
        ['US-NH', 13],
        ['US-NV', 7],
        ['US-OH', 276],
        ['US-OK', 85],
        ['US-OR', 241],
        ['US-PA', 111],
        ['US-RI', 5],
        ['US-SC', 38],
        ['US-SD', 11],
        ['US-TX', 215],
        ['US-TN', 91],
        ['US-UT', 57],
        ['US-VA', 72],
        ['US-VT', 9],
        ['US-WA', 563],
        ['US-WV', 100],
        ['US-WY', 27],
        ['US-WI', 27],
        ['US-ID', 81],
        ['US-LA', 40],
        ['US-MD', 34],
    ]);

    var chart = new google.visualization.GeoChart(document.getElementById('map-div'));

    chart.draw(data, options);
  }

//LINE CHART

google.load('visualization', '1', { packages: ['corechart', 'controls'] });

function drawVisualization() {
    $.get("data/bf_years.csv", function(csvString) {
       // transform the CSV string into a 2-dimensional array
       var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
       var years = arrayData.map(function(value,index) { return new Date(value[0], 1, 1); })
       
       // this should probably be somewhere else but I don't have time
       function combineColumns(array1, array2) {

          // Combine columns from array1 and array2 into a new array
          var combinedArray = array1.map(function (value, index) {
       
             return [array2[index], value[1]];
          });

          return combinedArray;
       }
       combinedArray = combineColumns(arrayData, years)

       // this new DataTable object holds all the data
       var data = new google.visualization.arrayToDataTable(combinedArray);


       var line_chart = new google.visualization.ChartWrapper({
          chartType: 'LineChart',
          containerId: 'line-div',
          dataTable: data,
          options:{
             width: "100%", 
             height: "100%",
             colors: palette,
             tooltip: {textStyle: {fontSize: fs}},
             vAxis: {
               title: 'Encounters',
               titleTextStyle: {
                  fontSize: fs,
                  italic: false,
               }
            },
             hAxis: {
               title: 'Year',
               titleTextStyle: {
                  fontSize: fs,
                  italic: false,
               }
            },
             
            legend: {
               //position: 'top',
               position: 'none',
               textStyle: {
                  fontSize: fs,
               },
            },
          }
       });
       line_chart.draw();
    });
 }
 google.setOnLoadCallback(drawVisualization)
