function generate_pay_id(id) {
  // Generate own hash from id
  let hash = "";
  id = id.replace("-", "");
  for (let i = 0; i < id.length; i++) {
    // sumar dígitos
    let sum = 0;
    let digit = id.charCodeAt(i).toString();
    digit.split("").forEach((x) => (sum += parseInt(x)));

    let sum2 = 0;
    sum
      .toString()
      .split("")
      .forEach((x) => (sum2 += parseInt(x)));

    let sum3 = 0;
    sum2
      .toString()
      .split("")
      .forEach((x) => (sum3 += parseInt(x)));

    let sum4 = 0;
    sum3
      .toString()
      .split("")
      .forEach((x) => (sum4 += parseInt(x)));

    hash += sum4;
  }
  hash = hash.match(/.{1,2}(.$)?/g);
  let newHash = "";
  hash.forEach((x) => {
    let sum5 = 0;
    x.toString()
      .split("")
      .forEach((y) => (sum5 += parseInt(y)));

    let sum6 = 0;
    sum5
      .toString()
      .split("")
      .forEach((y) => (sum6 += parseInt(y)));
    let sum7 = 0;
    sum6
      .toString()
      .split("")
      .forEach((y) => (sum7 += parseInt(y)));
    newHash += sum7;
  });
  newHash = newHash.match(/.{1,2}(.$)?/g);

  let result = "";
  newHash.forEach((x) => {
    let sum8 = 0;
    x.toString()
      .split("")
      .forEach((y) => (sum8 += parseInt(y)));

    let sum9 = 0;
    sum8
      .toString()
      .split("")
      .forEach((y) => (sum9 += parseInt(y)));

    let sum10 = 0;
    sum9
      .toString()
      .split("")
      .forEach((y) => (sum10 += parseInt(y)));
    result += sum10;
  });

  console.log(result);
  return result;
}

module.exports = {
  generate_pay_id,
};
