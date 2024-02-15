import React from 'react';
import { VictoryStack, VictoryArea, VictoryAxis } from 'victory';

interface SimulatedCostsProps {
  amount: string;
  valorUFCompraFraccion: number;
  amountUF: string;
  isButtonSubmited: boolean;
  setButtonSubmited: React.Dispatch<React.SetStateAction<boolean>>;
  isButtonDisabled: boolean;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  totalEarningsFraccionData: any[];
  formatEarnings: (value: number) => string;
}

const SimulatedCosts: React.FC<SimulatedCostsProps> = ({
  amount,
  amountUF,
  valorUFCompraFraccion,
  isButtonDisabled,
  totalEarningsFraccionData,
  formatEarnings,
}) => {

  const axisStyle = {
    backgroundColor: '#EFEFEF',
    padding: '30px',
    marginTop: '20px',
    borderRadius: '10px',
  };

  const initialCost = Number((parseFloat(totalEarningsFraccionData![0].totalCosts)).toFixed(2)).toLocaleString('es-CL');
  const anualCost = Number((parseFloat(((totalEarningsFraccionData![1].totalCosts - totalEarningsFraccionData![0].totalCosts)).toFixed(2)))).toLocaleString('es-CL');
  const valueUFFraccion = Number((parseFloat(amount.replace(/[^\d,-]/g, '').replace(',', '.')))) / valorUFCompraFraccion;

  const feeFraccion = (valueUFFraccion / Number((parseFloat(amountUF.replace(/[^\d,-]/g, '').replace(',', '.')))) < 5 / 100) ? '3%' : '2%';

  return (
    <div className={` ${!isButtonDisabled ? 'mt-20 visible' : 'hidden'}`}>
      <h2 className="mt-20 text-center mt-5 text-3xl font-semibold">Detalle de costos</h2>
      <h3 className="text-center mt-5 text-2xl font-semibold">
        <span className="text-skin-500">Fracción</span> en UF
      </h3>
      <div className="mt-1">
        <ul className="mt-10 pl-2 text-sm text-gray-500 dark:text-gray-400"><li className="flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" color="#ffb92f" className="mr-1 w-4 h-4 inline">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd">
            </path></svg> Costos anuales totales </li><li className="flex flex-row items-center"></li></ul></div>
      <div style={axisStyle}>
        <VictoryStack colorScale={["#ffb92f", "#ffb92f"]}>
          <VictoryArea
            name="area-3"
            x="quarter"
            y="totalCosts"
            data={totalEarningsFraccionData}
            labels={({ data, index }) => formatEarnings(data[index].totalCosts)}
          />
          <VictoryAxis
            tickValues={[0, 1, 2, 3, 4, 5]}
            tickFormat={(tick) => (tick == 0 ? 'Inversión inicial' : tick == 5 ? 'Año 5' : tick.toString())}
            offsetY={25}
          />
        </VictoryStack></div>
      <p className="mt-10 text-sm text-gray-800 dark:text-gray-300">Con un costo inicial de la comisión por compra de {initialCost} UF equivalente al {feeFraccion} del valor de la fracción, se tienen costos anuales de {anualCost} UF fijos por comisiones de un 10% del valor del arriendo.</p>
    </div>
  );
};

export default SimulatedCosts;
