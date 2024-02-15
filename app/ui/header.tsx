import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LetterProps {
  letter: string;
  index: number;
}

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const letters = "Fraccional.cl";

const Letter: React.FC<LetterProps> = ({ letter, index }) => (
  <motion.span
    variants={letterVariants}
    initial="hidden"
    animate="visible"
    transition={{
      type: 'spring',
      stiffness: 500,
      damping: 30,
      delay: 0.05 * index,
    }}
  >
    {letter}
  </motion.span>
);

const variants = {
  visible: (custom: number) => ({
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

const Header: React.FC = () => (
  <header className="flex flex-col items-center">
    <Link className="flex flex-row items-end" aria-disabled="false" href="/">
      <svg viewBox="0 0 512 512" fill="none" className="h-20 w-auto">
        <motion.path
          animate="visible"
          initial={{ opacity: 0 }}
          variants={variants}
          custom={1}
          d="M10 35C10 21.1929 21.1929 10 35 10H133V133H10V35Z"
          fill="currentColor"
        ></motion.path>
        <motion.rect
          animate="visible"
          initial={{ opacity: 0 }}
          variants={variants}
          custom={1.5}
          x="133"
          y="133"
          width="123"
          height="123"
          fill="currentColor"
        ></motion.rect>
        <motion.rect
          animate="visible"
          initial={{ opacity: 0 }}
          variants={variants}
          custom={2}
          x="256"
          y="256"
          width="123"
          height="123"
          fill="currentColor"
        ></motion.rect>
        <motion.rect
          animate="visible"
          initial={{ opacity: 0 }}
          variants={variants}
          custom={2.5}
          x="133"
          y="379"
          width="123"
          height="123"
          fill="currentColor"
        ></motion.rect>
        <motion.rect
          animate="visible"
          initial={{ opacity: 0 }}
          variants={variants}
          custom={3}
          x="256"
          y="10"
          width="246"
          height="123"
          fill="currentColor"
        ></motion.rect>
      </svg>
      <span className="ml-0 text-xl leading-none font-bold text-gray-700 dark:text-gray-300">
        {' '}
        {letters.split('').map((letter, index) => (
          <Letter key={index} letter={letter} index={index} />
        ))}
      </span>
    </Link>
    <h1 className="text-center mt-5 text-6xl font-semibold">
      Simulador de <span className="text-skin-500">Rentabilidad</span>
    </h1>
  </header>
);

export default Header;
