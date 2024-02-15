import React from 'react';
import { VictoryStack, VictoryArea, VictoryAxis } from 'victory';

interface SimulatedRentabilidadProps {
    amount: string;
    valorUFCompraFraccion: number;
    isButtonSubmited: boolean;
    setButtonSubmited: React.Dispatch<React.SetStateAction<boolean>>;
    isButtonDisabled: boolean;
    setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    totalEarningsFraccionData: any[];
    formatEarnings: (value: number) => string;
    selectedDate: Date;
}

const SimulatedRentabilidad: React.FC<SimulatedRentabilidadProps> = ({
    amount,
    valorUFCompraFraccion,
    isButtonDisabled,
    totalEarningsFraccionData,
    formatEarnings,
    selectedDate,
}) => {

    const axisStyle = {
        backgroundColor: '#EFEFEF',
        padding: '30px',
        marginTop: '20px',
        borderRadius: '10px',
    };

    const valueUFFraccion = Number((parseFloat(amount.replace(/[^\d,-]/g, '').replace(',', '.')))) / valorUFCompraFraccion;

    const valueTotalEarningYear5 = totalEarningsFraccionData![5].totalEarnings;

    return (
        <div className={` ${!isButtonDisabled ? 'mt-20 visible' : 'hidden'}`}>
            <h2 className="mt-20 text-center mt-5 text-3xl font-semibold">Simulación de Rentabilidad</h2>
            <h3 className="text-center mt-5 text-2xl font-semibold">
                <span className="text-skin-500">Fracción</span> en UF
            </h3>
            <div className="mt-1"><p className="mt-10 text-sm text-gray-800 dark:text-gray-300 line-clamp-1">Tasas estimadas de retorno anual</p>
                <ul className="pl-2 mt-1 text-sm text-gray-500 dark:text-gray-400"><li className="flex flex-row items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" color="#ffe357" className="mr-1 w-4 h-4 inline">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd">
                        </path></svg> Arriendo menos costos</li><li className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" color="#ffb92f" className="mr-1 w-4 h-4 inline">
                            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd">
                            </path></svg> Plusvalía </li><li className="flex flex-row items-center"></li></ul></div>
            <div style={axisStyle}>
                <VictoryStack colorScale={["#ffb92f", "#ffe357"]}>
                    <VictoryArea name="area-1" x="quarter" y="earningsPlus" data={totalEarningsFraccionData} />
                    <VictoryArea
                        name="area-2"
                        x="quarter"
                        y="earningsRentMinusCosts"
                        data={totalEarningsFraccionData}
                        labels={({ data, index }) => formatEarnings(data[index].totalEarnings)}
                    />
                    <VictoryAxis
                        tickValues={[0, 1, 2, 3, 4, 5]}
                        tickFormat={(tick: number) => (tick == 0 ? 'Inversión inicial' : tick == 5 ? 'Año 5' : tick.toString())}
                        offsetY={25}

                    />
                </VictoryStack>
            </div>
            <p className="mt-10 text-sm text-gray-800 dark:text-gray-300">Con una inversión inicial de {Number((parseFloat(amount.replace(/[^\d,-]/g, '').replace(',', '.'))).toFixed(2)).toLocaleString('es-CL', {
                style: 'currency',
                currency: 'CLP',
            })}, equivalente a {Number(valueUFFraccion.toFixed(2)).toLocaleString('es-CL')} UF en la fecha de compra de la fracción, se espera una rentabilidad de {Number(valueTotalEarningYear5.toFixed(2)).toLocaleString('es-CL')} UF, equivalente al {Number((valueTotalEarningYear5 / valueUFFraccion * 100).toFixed(2)).toLocaleString('es-CL')}% para el año {selectedDate?.getFullYear() + 5}. </p>
        </div>
    );
};

export default SimulatedRentabilidad;
