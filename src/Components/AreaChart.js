import React, { useEffect } from "react";
import ApexCharts from "react-apexcharts";

function AreaChart (props){
    useEffect(()=>{
      console.log(props.timeframe)
    },[props.timeframe])

    let formattedData;
    if(props.timeframe==='3M'){
      if(props.data.length >= 90){
        formattedData = props.data.slice(0,90)
      } else{
        formattedData = props.data
      }
    } else if(props.timeframe==='6M'){
      if(props.data.length >= 90){
        formattedData = props.data.slice(0,180)
      } else{
        formattedData = props.data
      }
    } else {
      if(props.data.length >= 365){
        formattedData = props.data.slice(0,365)
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
          x: {
            formatter: function(value){
              let formattedDate = new Date(value)
              return `${formattedDate.toLocaleString('default', { month: 'short' })} ${formattedDate.toLocaleString('default', { day: 'numeric' })}, ${formattedDate.toLocaleString('default', { year: 'numeric' })}`
            }
          },
          y: {
            formatter: function(value){
              return `${(Math.round(value * 100) / 100).toFixed(2).toString()}%`
            }
          },
          theme: false,
          marker:{
            show:false
          }
        }          
      };
  
  

    return (
      <div id="chart">
        <ApexCharts options={options} series={series} type="area" height={350} />
      </div>);
    }
  
    


export default AreaChart;