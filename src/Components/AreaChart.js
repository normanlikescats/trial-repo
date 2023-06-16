import { useEffect } from "react";
import ApexCharts from "react-apexcharts";

function AreaChart (props){
  useEffect(()=>{
    console.log(props.timeframe)
  },[props.timeframe])

  let formattedData;
  if(props.timeframe==='3M'){
    if(props.data.length >= 90){
      formattedData = props.data.slice(props.data.length-90)
    } else{
      formattedData = props.data
    }
  } else if(props.timeframe==='6M'){
    if(props.data.length >= 90){
      formattedData = props.data.slice(props.data.length-180)
    } else{
      formattedData = props.data
    }
  } else {
    if(props.data.length >= 365){
      formattedData = props.data.slice(props.data.length-365)
    } else{
      formattedData = props.data
    }
  }

  let series= [{
    name: "",
    data: formattedData
  }];
  let options= {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      },
      toolbar:{
        show: false
      },
    },
    colors:['#B1E1B8'],
    fill: {
      type: 'solid',
      opacity:1
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    xaxis: {
      labels: {
        show: false,
      },
      crosshairs: {
        show: false,
        opacity: 0
      },
      tooltip:{
        enabled: false
      },
      axisTicks:{
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false,
      }
    },
    grid: {
      show: false
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        let arr = w.globals.labels
        let date = new Date(arr[dataPointIndex])
        let formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.toLocaleString('default', { day: 'numeric' })}, ${date.toLocaleString('default', { year: 'numeric' })}`
        return (
          '<div class="d-flex flex-column align-items-start arrow-box p-1">' +
          '<div class="fw-semibold">' + formattedDate +
          "</div> <div>" +
          `${series[seriesIndex][dataPointIndex]}%` +
          "</div>" +
          "</div>"
        );
      }
    }        
  };

  return (
    <div id='chart'>
      <ApexCharts options={options} series={series} type='area' height={350} />
    </div>);
  }
  
    


export default AreaChart;