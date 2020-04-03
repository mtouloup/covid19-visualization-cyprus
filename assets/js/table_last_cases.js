$( document ).ready(function() {

var data = [];

// Last (24h) confirmed cases
var today_confirmed = {
           "async": false,
           "crossDomain": true,
           "url": "https://data.humdata.org/hxlproxy/api/data-preview.csv?url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_covid19_confirmed_global.csv&filename=time_series_covid19_confirmed_global.csv",
           "method": "GET"
         }

        $.ajax(today_confirmed).done(function (response) {
        obj_data = csvJSON(response);
        var myArr = JSON.parse(obj_data);
        
        for (var i=0; i < myArr.length; i++){
            if (myArr[i]['Country/Region'] == 'Cyprus'){
              cyprus_obj = myArr[i];
            }
        }
        var cy_obj_keys = Object.keys(cyprus_obj);

        // total Confirmed Cases info today
        var cy_obj_keys_length = cy_obj_keys.length;      
        var total_confirmed_today_key_name = cy_obj_keys[cy_obj_keys_length - 1];       
        var total_confirmed_today_key_value = cyprus_obj[total_confirmed_today_key_name]; 

        // total Confirmed Cases info yesterday
        var cy_obj_keys_length = cy_obj_keys.length;      
        var total_confirmed_yesterday_key_name = cy_obj_keys[cy_obj_keys_length - 2];       
        var total_confirmed_yesterday_key_value = cyprus_obj[total_confirmed_yesterday_key_name]; 
        var current_date = total_confirmed_today_key_name;
        var new_confirmed_today = total_confirmed_today_key_value - total_confirmed_yesterday_key_value;
        $("#new_confirmed").append(new_confirmed_today);

        data.push(total_confirmed_today_key_value);

      });

// Last (24h) recoveries 
var today_recoveries = {
           "async": false,
           "crossDomain": true,
           "url": "https://data.humdata.org/hxlproxy/api/data-preview.csv?url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_covid19_recovered_global.csv&filename=time_series_covid19_recovered_global.csv",
           "method": "GET"
         }

        $.ajax(today_recoveries).done(function (response) {
        obj_data = csvJSON(response);
        var myArr = JSON.parse(obj_data);
        
        for (var i=0; i < myArr.length; i++){
            if (myArr[i]['Country/Region'] == 'Cyprus'){
              cyprus_obj = myArr[i];
            }
        }
        var cy_obj_keys = Object.keys(cyprus_obj);

        // total Confirmed Cases info today
        var cy_obj_keys_length = cy_obj_keys.length;      
        var total_recoveries_today_key_name = cy_obj_keys[cy_obj_keys_length - 1];       
        var total_recoveries_today_key_value = cyprus_obj[total_recoveries_today_key_name]; 

        // total Confirmed Cases info yesterday
        var cy_obj_keys_length = cy_obj_keys.length;      
        var total_recoveries_yesterday_key_name = cy_obj_keys[cy_obj_keys_length - 2];       
        var total_recoveries_yesterday_key_value = cyprus_obj[total_recoveries_yesterday_key_name]; 
        var new_recoveries_today = total_recoveries_today_key_value - total_recoveries_yesterday_key_value;
        $("#new_recoveries").append(new_recoveries_today);

        data.push(total_recoveries_today_key_value);

      });

// Last (24h) deaths 
var today_deaths = {
           "async": false,
           "crossDomain": true,
           "url": "https://data.humdata.org/hxlproxy/api/data-preview.csv?url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_covid19_deaths_global.csv&filename=time_series_covid19_deaths_global.csv",
           "method": "GET"
         }

        $.ajax(today_deaths).done(function (response) {
        obj_data = csvJSON(response);
        var myArr = JSON.parse(obj_data);
        
        for (var i=0; i < myArr.length; i++){
            if (myArr[i]['Country/Region'] == 'Cyprus'){
              cyprus_obj = myArr[i];
            }
        }
        var cy_obj_keys = Object.keys(cyprus_obj);

        // total Confirmed Cases info today
        var cy_obj_keys_length = cy_obj_keys.length;      
        var total_deaths_today_key_name = cy_obj_keys[cy_obj_keys_length - 1];       
        var total_deaths_today_key_value = cyprus_obj[total_deaths_today_key_name]; 

        // total Confirmed Cases info yesterday
        var cy_obj_keys_length = cy_obj_keys.length;      
        var total_deaths_yesterday_key_name = cy_obj_keys[cy_obj_keys_length - 2];       
        var total_deaths_yesterday_key_value = cyprus_obj[total_deaths_yesterday_key_name]; 
        var new_deaths_today = total_deaths_today_key_value - total_deaths_yesterday_key_value;
        $("#new_deaths").append(new_deaths_today);

        data.push(total_deaths_today_key_value);

      });

      // active cases
      var active_cases = data[0] - data[1] - data[2]
      $("#active_cases").append(active_cases);


});

function csvJSON(csv){

  var lines=csv.split("\n");
  var result = [];
  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step 
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}