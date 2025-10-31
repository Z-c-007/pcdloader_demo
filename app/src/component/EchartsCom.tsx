import ReactECharts from 'echarts-for-react';
const option = { xAxis: { data: ['Mon', 'Tue', 'Wed'] }, yAxis: {}, series: [{ data: [120, 200, 150], type: 'bar' }] };

const EchartsCom = () => (
  <ReactECharts
    option={option}
    style={{ height: 400 }}
    notMerge   // 可选：不合并配置
    lazyUpdate // 可选：懒更新
  />
  
);
export default EchartsCom;