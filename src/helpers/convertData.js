// const convertData = (date , type) => {
//    const convertedData = date[type].map(item => {
//     return {
//         date: item[0],
//         [type]: item[1],

//     };
//    });
//    return convertedData;
// }
// export {convertData}
const convertData = (data, type) => {
  if (!data || !data[type]) return [];

  return data[type].map((item) => ({
    date: new Date(item[0]).toLocaleDateString(),
    [type]: item[1],
  }));
};

export { convertData };
