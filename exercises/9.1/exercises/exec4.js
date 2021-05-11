const messageDelay = () => Math.floor(Math.random() * 5000);

const getMarsTemperature = () => {
  const maxTemperature = 58;
  return Math.floor(Math.random() * maxTemperature);
};

// crie a função sendMarsTemperature abaixo
const sendMarsTemperature = () => {
  setTimeout(() => {
    const temp = getMarsTemperature();
    console.log(`Mars temperature is: ${temp} degree Celsius`);
  }, 5000);
}

sendMarsTemperature(); // imprime "Mars temperature is: 20 degree Celsius", por exemplo