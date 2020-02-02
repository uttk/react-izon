import * as React from 'react';
import * as palette from 'google-palette';
import { Dependencies } from '@react-izon/core';
import { ChartOptions } from 'chart.js';
import { AppContext, getUsedTimes } from '../util';

interface DataSet {
  data: number[];
  backgroundColor?: string[];
  hoverBackgroundColor?: string[];
}

interface MyChartData {
  labels: string[];
  datasets: DataSet[];
}


const createData = (dependencies: Dependencies): MyChartData => {
  const datasets: DataSet = { data: [] };
  const data: MyChartData = { labels: [], datasets: [datasets] };

  Object.values(dependencies).forEach((dep) => {
    if (dep) {
      const times = getUsedTimes(dep);

      data.labels.push(dep.name);
      datasets.data.push(times + 1);
    }
  });

  const colors: string[] = palette('mpn65', data.labels.length);

  data.datasets[0].backgroundColor = colors
    .slice(0, data.labels.length)
    .map((hex) => `#${hex}`);
  data.datasets[0].hoverBackgroundColor = colors
    .slice(0, data.labels.length)
    .map((hex) => `#${hex}`);

  return data;
};

const options: ChartOptions = {
  maintainAspectRatio: false,

  responsive: true,

  responsiveAnimationDuration: 1000,

  legend: {
    position: 'bottom',
  },

  tooltips: {
    callbacks: {

      title: (items, data) => {
        return items.map((item) => data.labels[item.index].toString());
      },

      label: (i, d) => {
        const item = d.datasets[i.datasetIndex];
        const times = item.data[i.index];

        return `${times} times`;
      },
    },
  },
};

export const useDependencyDoughnut = () => {
  const {
    store: { dependencies },
  } = React.useContext(AppContext);
  const [data, setData] = React.useState<MyChartData>({
    labels: [],
    datasets: [],
  });

  React.useEffect(() => {
    setData(createData(dependencies));
  }, [dependencies]);

  return {
    data,
    options,
  };
};
