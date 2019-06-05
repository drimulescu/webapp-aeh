import React,{Component} from 'react'
import CanvasJSReact from '../../../assets/canvasjs.react'
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dataPoints =[];
class DisplayHumidity extends Component {

    componentDidMount(){
        const humidityList = this.props.humidityList;
        const chart = this.chart;
        humidityList.forEach(function(humidity){
            console.log(new Date(humidity.timeStamp));
            dataPoints.push({
                x: new Date(humidity.timeStamp),
                y: parseInt(humidity.value)
            });
        });

        console.log(dataPoints);
        chart.render();
    }

    render() {
        const options = {
            theme: "light2",
            title: {
                text: "Humidity"
            },
            axisY: {
                title: "Humidity values",
                includeZero: false
            },
            data: [{
                type: "line",
                xValueFormatString: "DD MMM YYYY HH:mm:ss",
                yValueFormatString: "#,##0",
                dataPoints: dataPoints
            }]
        };

        return (
            <div>
                <CanvasJSChart options = {options} onRef={ref => this.chart = ref}/>
            </div>
        );
    }
}

export default DisplayHumidity