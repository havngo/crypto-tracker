import { LineChart } from "@mui/x-charts";

interface LineChartProps {
    data: (number | null)[];
    label: string;
    xLabels: string[];
    width?: number;
    height?: number;
}

interface HistoricalChartsProps {
    charts: LineChartProps[];
}

// Display coin charts
export default function HistoricalCharts({charts}: HistoricalChartsProps) {
    return  <>
        {charts.map(({data, label, xLabels, width, height}, i) => 
            <LineChart 
                key={i}
                series={[{data, label}]} 
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                width={width ?? 1500}
                height={height ?? 500}
            />
        )}
    </>
}