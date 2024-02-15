import Head from "next/head";
import { useState } from "react";
import { IOptions } from "tailwind-datepicker-react/types/Options";
import Header from "../app/ui/header";
import RentabilidadForm from "../app/ui/rentabilidad-form";
import SimulatedCosts from "../app/ui/simulated-costs";
import SimulatedRentabilidad from "../app/ui/simulated-rentabilidad";


const options: IOptions = {
  title: "",
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  maxDate: new Date(),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "mt-8",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "p-3.5 ps-14 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-skin-500 focus:border-skin-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-skin-500 dark:focus:border-skin-500",
    inputIcon: "",
    selected: "bg-skin-500 hover:bg-skin-600",

  },
  icons: {
    prev: () => <span>&lt;</span>,
    next: () => <span>&gt;</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "ES",
  disabledDates: [],
  weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Selecciona una fecha",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric"
  }
}

export default function PagesRoot() {

  const [percentage, setPercentage] = useState('');
  const [amount, setAmount] = useState('');
  const [amountUF, setAmountUF] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isButtonSubmited, setButtonSubmited] = useState(false);
  const [show, setShow] = useState(false);
  const [showFraccion, setShowFraccion] = useState(false);
  const [valorUFCompraFraccion, setValorUFCompraFraccion] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonSubmited(true);

  }


  const handleChangeDatePicker = (selectedDate: Date) => {
    setSelectedDate(selectedDate);
  }
  const handleClose = (state: boolean) => {
    setShow(state)
  }

  const handleCloseFraccion = (state: boolean) => {
    setShowFraccion(state)
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != '') {
      let limitedValue = Math.min(100, parseFloat(e.target.value));
      setPercentage(limitedValue.toString());
      habilitarContinuar(amount, amountUF, limitedValue.toString(), rentPrice);

    } else {
      setPercentage('');
      setButtonDisabled(true);

    }
  };

  const habilitarContinuar = (amount: string, amountUF: string, percentage: string, rentPrice: string) => {
    if (amount != '' && amountUF != '' && percentage != '' && rentPrice != '') {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let modifiedAmount = e.target.value.replace(/[^\d,-]/g, '').replace(',', '.');
    setAmount(Number(modifiedAmount).toLocaleString('es-CL'));
    habilitarContinuar(modifiedAmount, amountUF, percentage, rentPrice);
  };

  const handleChangeAmountUF = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeUF(e, 'propertyPrice');
  };

  const handleChangeRentPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeUF(e, 'rentPrice');
  };

  const handleChangeUF = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    let modifiedAmount = e.target.value.replace(/[^\d,-]/g, '').replace(',', '.');
    if (type == 'rentPrice') {
      setRentPrice(Number(modifiedAmount).toLocaleString('es-CL'));
      habilitarContinuar(amount, amountUF, percentage, modifiedAmount);

    } else if (type == 'propertyPrice') {
      setAmountUF(Number(modifiedAmount).toLocaleString('es-CL'));
      habilitarContinuar(amount, modifiedAmount, percentage, rentPrice);

    }

  };


  const calculateEarnings = (amount: string, percentage: string, quarters: number) => {
    const earningsData = [];

    for (let quarter = 0; quarter <= quarters; quarter++) {
      const cleanedAmount = parseFloat(amount.replace(/[^\d,-]/g, '').replace(',', '.'));

      const cleanedAmountUF = parseFloat(amountUF.replace(/[^\d,-]/g, '').replace(',', '.'));

      const earningsPlus =
        cleanedAmount *
        Math.pow(1 + parseFloat(percentage) / 100, quarter) - cleanedAmount;

      const cleanedPrice = parseFloat(rentPrice.replace(/[^\d,-]/g, '').replace(',', '.'));

      const earningsRent = ((cleanedAmount / cleanedAmountUF) * Number((cleanedPrice).toFixed(2))) * 12 * quarter;

      const valueUFFraccion = Number((parseFloat(amount.replace(/[^\d,-]/g, '').replace(',', '.')))) / valorUFCompraFraccion;

      const totalCosts = earningsRent / 10.0 + (cleanedAmount * ((valueUFFraccion / Number((parseFloat(amountUF.replace(/[^\d,-]/g, '').replace(',', '.')))) < 5 / 100) ? 3 / 100.0 : 2 / 100.0));

      const totalEarnings = earningsPlus + earningsRent - totalCosts;

      const earningsRentMinusCosts = earningsRent - totalCosts;

      earningsData.push({ quarter, earningsPlus, earningsRentMinusCosts, totalEarnings, totalCosts: totalCosts });
    }

    return earningsData;
  };

  const cleanedAmount = parseFloat(amount.replace(/[^\d,-]/g, '').replace(',', '.'));

  const totalEarningsFraccionData = calculateEarnings(Number((cleanedAmount / valorUFCompraFraccion).toFixed(2)).toLocaleString('es-CL'), percentage, 5);

  const formatEarnings = (value: number) => {

    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} MM`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} M`;
    } else {
      return value.toFixed(2);
    }


  };

  return (
    <main className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-black flex-1">
      <Head>
        <title>Simulador de rentabilidad Fraccional!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="mx-auto w-full max-w-3xl py-32 px-4">
        <Header />
        <div>
          <p className="mt-10 text-base sm:text-xl text-gray-500 dark:text-gray-500">
            Para simular la rentabilidad de tu fracción, ingresa los siguientes datos:
          </p>
          <RentabilidadForm
            amount={amount} setAmount={setAmount} handleChangeAmount={handleChangeAmount}
            amountUF={amountUF} setAmountUF={setAmountUF} handleChangeAmountUF={handleChangeAmountUF}
            rentPrice={rentPrice} setRentPrice={setRentPrice} handleChangeRentPrice={handleChangeRentPrice}
            percentage={percentage} setPercentage={setPercentage}
            isButtonSubmited={isButtonSubmited} setButtonSubmited={setButtonSubmited}
            isButtonDisabled={isButtonDisabled} setButtonDisabled={setButtonDisabled}
            habilitarContinuar={habilitarContinuar}
            handleChange={handleChange}
            options={options}
            handleSubmit={handleSubmit}
            showFraccion={showFraccion} setShowFraccion={setShowFraccion} show={show}
            handleChangeDatePicker={handleChangeDatePicker}
            handleCloseFraccion={handleCloseFraccion}
            handleClose={handleClose}
            setValorUFCompraFraccion={setValorUFCompraFraccion}
          />
          <SimulatedRentabilidad
            valorUFCompraFraccion={valorUFCompraFraccion}
            isButtonSubmited={isButtonSubmited}
            selectedDate={selectedDate!}
            setButtonSubmited={setButtonSubmited}
            isButtonDisabled={isButtonDisabled}
            setButtonDisabled={setButtonDisabled}
            totalEarningsFraccionData={totalEarningsFraccionData}
            formatEarnings={formatEarnings}
            amount={amount} />
          <SimulatedCosts
            isButtonSubmited={isButtonSubmited}
            setButtonSubmited={setButtonSubmited}
            isButtonDisabled={isButtonDisabled}
            setButtonDisabled={setButtonDisabled}
            totalEarningsFraccionData={totalEarningsFraccionData}
            formatEarnings={formatEarnings}
            amount={amount}
            valorUFCompraFraccion={valorUFCompraFraccion}
            amountUF={amountUF} />
        </div>
      </section>
    </main>
  );
}
