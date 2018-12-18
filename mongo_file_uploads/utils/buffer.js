    var objeto = {"name":"juan pablo", "age":"25"};
  console.log(JSON.stringify(objeto));
  var buf = Buffer.from(JSON.stringify(objeto));
  console.log(buf)
  // console.log('buffer')
  // console.log(buf);
  // console.log('------------------')
  // console.log(buf.toString());