
const convertToPeso = (amount) => {
    if (isNaN(amount)) {
      return 'Invalid amount';
    }
  
    const formattedAmount = new Intl.NumberFormat('en-PH', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  
    return `₱${formattedAmount}`;
  };

export { convertToPeso };