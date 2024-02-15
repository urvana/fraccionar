import React, { FormEvent, ChangeEvent, useState } from 'react';
import Datepicker from "tailwind-datepicker-react"
import { IOptions } from 'tailwind-datepicker-react/types/Options';
import { useQuery, gql } from '@apollo/client';
import client from '../lib/apollo-client';

interface RentabilidadFormProps {
    amount: string;
    setAmount: React.Dispatch<React.SetStateAction<string>>;
    setValorUFCompraFraccion: React.Dispatch<React.SetStateAction<number>>;
    amountUF: string;
    setAmountUF: React.Dispatch<React.SetStateAction<string>>;
    rentPrice: string;
    setRentPrice: React.Dispatch<React.SetStateAction<string>>;
    percentage: string;
    setPercentage: React.Dispatch<React.SetStateAction<string>>;
    isButtonSubmited: boolean;
    setButtonSubmited: React.Dispatch<React.SetStateAction<boolean>>;
    isButtonDisabled: boolean;
    setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    habilitarContinuar: (
        amount: string,
        amountUF: string,
        percentage: string,
        year: string,
        rentPrice: string
    ) => void;
    handleChangeAmountUF: (e: ChangeEvent<HTMLInputElement>) => void;
    handleChangeRentPrice: (e: ChangeEvent<HTMLInputElement>) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleChangeAmount: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    options: IOptions;
    handleChangeDatePicker: (selectedDate: Date) => void;
    showFraccion: boolean;
    setShowFraccion: React.Dispatch<React.SetStateAction<boolean>>;
    show: boolean;
    handleCloseFraccion: (state: boolean) => void;
    handleClose: (state: boolean) => void;
}

const RentabilidadForm: React.FC<RentabilidadFormProps> = ({
    amountUF,
    rentPrice,
    percentage,
    handleChangeAmount,
    handleChangeAmountUF,
    handleChangeRentPrice,
    handleChange,
    handleSubmit,
    setValorUFCompraFraccion,
    options,
    handleChangeDatePicker,
    handleClose,
    handleCloseFraccion,
    showFraccion,
    show,
    amount,
}) => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleChangeDatePickerFraccion = (selectedDate: Date) => {
        setSelectedDate(selectedDate);
    };

    const GET_DATA = gql`
        query FraccionalChallenge($first: Int = 20, $pairAt: DateTime) {
            exchange_rates: exchange_ratesCollection(
            first: $first
            filter: { pair_left: { eq: CLF }, pair_right: { eq: CLP }, pair_at: { eq: $pairAt } }
            orderBy: { pair_at: DescNullsLast }
            ) {
            edges {
                node {
                id
                pair_at # Datetime (ISO)
                pair_left
                pair_right
                pair_numeric
                }
            }
            }
        }
        `;

    interface RentabilidadForData {
        exchange_rates: {
            edges: {
                node: {
                    id: string;
                    pair_at: string;
                    pair_left: string;
                    pair_right: string;
                    pair_numeric: number;
                };
            }[];
        };
    }

    const { loading, error, data } = useQuery<RentabilidadForData>(GET_DATA, {
        client,
        variables: {
            first: 20,
            pairAt: selectedDate?.toISOString(),
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (data && data.exchange_rates.edges.length > 0) {

        const firstPairNumeric = data.exchange_rates.edges[0]?.node.pair_numeric;

        console.log('First pair_numeric value:', firstPairNumeric);

        setValorUFCompraFraccion(firstPairNumeric!);

        return (
            <form className="mt-10  max-w-full mx-auto"
                onSubmit={handleSubmit}>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio de la propiedad en UF:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                <p>UF</p>
                            </div>
                            <input type="text"
                                value={amountUF}
                                onChange={handleChangeAmountUF}
                                id="fraccion-input" aria-describedby="helper-text-explanation" className="ps-14 p-3.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-skin-500 focus:border-skin-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-skin-500 dark:focus:border-skin-500" placeholder="Precio de la propiedad" required />
                        </div>
                    </div>
                    <div className="relative mb-6">
                        <label htmlFor="steps-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de compra de la propiedad:</label>

                        <Datepicker options={options} onChange={handleChangeDatePicker} show={show} setShow={handleClose} ></Datepicker>
                    </div>
                    <div>
                        <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio de compra de la fracción en pesos:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                <p>CLP</p>
                            </div>
                            <input type="text"
                                value={amount}
                                onChange={handleChangeAmount}
                                id="fraccion-input" aria-describedby="helper-text-explanation" className="ps-14 p-3.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-skin-500 focus:border-skin-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-skin-500 dark:focus:border-skin-500" placeholder="Precio de fracción" required />
                        </div>
                    </div>
                    <div className="relative mb-6">
                        <label htmlFor="steps-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de compra de la fracción:</label>
                        <Datepicker options={options} onChange={handleChangeDatePickerFraccion} value={selectedDate!} show={showFraccion} setShow={handleCloseFraccion} ></Datepicker>
                    </div>
                    <div>
                        <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio del arriendo de la propiedad en UF:</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                <p>UF</p>
                            </div>
                            <input type="text"
                                value={rentPrice}
                                onChange={handleChangeRentPrice}
                                id="fraccion-input" aria-describedby="helper-text-explanation" className="ps-14 p-3.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-skin-500 focus:border-skin-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-skin-500 dark:focus:border-skin-500" placeholder="Precio de arriendo propiedad" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plusvalía anual de la propiedad (en porcentaje %):</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                <p>%</p>
                            </div>
                            <input type="number" id="plusvalia-input" value={percentage}

                                onChange={handleChange} aria-describedby="helper-text-explanation" className="ps-14 p-3.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-skin-500 focus:border-skin-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-skin-500 dark:focus:border-skin-500" placeholder="Plusvalía" required />
                        </div>
                    </div>
                </div>
            </form>
        );
    } else {
        return <p></p>;
    }
};


export default RentabilidadForm;
