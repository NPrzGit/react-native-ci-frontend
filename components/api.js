

const API = 'http://192.168.1.23:3000'

/*export const getUsers = async () => {
    const response = await fetch('http://10.0.2.2:3000/user/:usuario/:contrasena',{
        method: 'POST',
        body: JSON.stringify(users)
    })
    return await response.json()
   }*/
   
export const getUsers = async (userName, password) => {
    try{
        let usuario_sucursal = userName
    let contrasena_sucursal = password
    //const response = await fetch(`http://192.168.1.13:3000/user/:usuario/:contrasena`)
    //const response = await fetch(`http://192.168.1.6:3000/user/${usuario_sucursal}/${contrasena_sucursal}`)
    const response = await fetch(`${API}/user/${usuario_sucursal}/${contrasena_sucursal}`)
    const data = await response.json()
    return  data
      }catch(e){
        console.log(e);
      }
   }


   export const addProduct = async (allData) => {
    try{
    //console.log('(==================================================)')
    //console.log(allData.idProducto)
    //let usuario_sucursal = userName
    //let contrasena_sucursal = password
    //var _data = JSON.parse([allData]);
    //console.log(_data)
    //console.log(allData)
    //console.log(allData)
    const response = await fetch(`${API}/addProduct/${allData.nombre}/${allData.precio}/${allData.stock}`)
    const data = await response.json()
    return  data
      }catch(e){
        console.log(e);
      }
   }

   export const putSendOrder = async (allData) => {
    try{
    //console.log('(==================================================)')
    //console.log(allData.idProducto)
    //let usuario_sucursal = userName
    //let contrasena_sucursal = password
    //var _data = JSON.parse([allData]);
    //console.log(_data)
    //console.log(allData)
    const response = await fetch(`${API}/putorder/${allData.idProducto}/${allData.producto}/${allData.sucursal}`)
    const data = await response.json()
    return  data
      }catch(e){
        console.log(e);
      }
   }

   export const putSendDetailOrder = async (allData) => {
    try{
    //  console.log(allData)
    //console.log('(==================================================)')
    //console.log(allData.idProducto)
    //let usuario_sucursal = userName
    //let contrasena_sucursal = password
    //var _data = JSON.parse([allData]);
    //console.log(_data)
    console.log(allData)
    const response = await fetch(`${API}/putdetailorder/${allData.idOrden}/${allData.idProducto}/${allData.cantidad}/${allData.sucursal}`)
    return response;
      }catch(e){
        console.log(e);
      }
   }

   export const getAllSucursales = async () => {
    const response = await fetch(`${API}/allsucursales`)
    return await response.json()
   }

   export const getAllUsers = async () => {
    const response = await fetch(`${API}/allusers`)
    return await response.json()
   }

   export const getAllProductsStock = async () => {
    const response = await fetch(`${API}/allproductstock`)
    return await response.json()
   }

   export const getAllOrders = async () => {
    const response = await fetch(`${API}/allorders`)
    return await response.json()
   }

   export const getAllOrdersAlmacen = async () => {
    const response = await fetch(`${API}/allordersalmacen`)
    return await response.json()
   }

   export const getAllOrdersRepartidor = async () => {
    const response = await fetch(`${API}/allordersrepartidor`)
    return await response.json()
   }

   export const getAllProducts = async () => {
    const response = await fetch(`${API}/allproducts`)
    return await response.json()
   }

   export const getOrder = async (noorder) => {
    let order = noorder
    const response = await fetch(`${API}/order/${order}`)
    return await response.json()
   }

   export const getProduct = async (idproduct) => {
    let id = idproduct
    const response = await fetch(`${API}/product/${id}`)
    return await response.json()
   }

   export const acceptOrder = async (noorder) => {
    let order = noorder
    //console.log('update ' + order)
    const response = await fetch(`${API}/acceptorder/${order}`)
    return response;
   }

   export const shipOrder = async (noorder) => {
    let order = noorder
    //console.log('update ' + order)
    const response = await fetch(`${API}/shiporder/${order}`)
    return response;
   }

   export const atendOrder = async (noorder) => {
    let order = noorder
    //console.log('update ' + order)
    const response = await fetch(`${API}/atendorder/${order}`)
    return response;
   }

   export const denyOrder = async (noorder) => {
    let order = noorder
    //console.log('update ' + order)
    const response = await fetch(`${API}/denyorder/${order}`)
    return response;
   }