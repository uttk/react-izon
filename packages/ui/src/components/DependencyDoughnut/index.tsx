import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDependencyDoughnut } from './use';


export const DependencyDoughnut = () => {
  const { data, options } = useDependencyDoughnut();

  if (!data.labels.length) {
    return <div />;
  }

  return (
    <Doughnut data={data} options={options} />
  );
};
