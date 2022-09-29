import React from 'react';
import Spinner from './Spinner';

type LoadingButtonProps = {
  loading: boolean;
  btnColor?: string;
  textColor?: string;
  children: React.ReactNode;
  onClick: () => void
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  textColor = 'text-white',
  btnColor = 'bg-[#d47fff]',
  children,
  loading = false,
  onClick
}) => {
  return (
    <button
      className={`${btnColor} font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${
        loading ? 'bg-[#ccc]' : ''
      }`}
      onClick={() => onClick()}
    >
      {loading ? (
        <div className='flex items-center gap-3'>
          <Spinner />
          <span className='text-slate-500 inline-block'>Loading...</span>
        </div>
      ) : (
        <span className={`${textColor}`}>{children}</span>
      )}
    </button>
  );
};
