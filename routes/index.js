import error from "#middlewares/error";
import customerRoute from "#routes/customer.routes";
import productRoute from "#routes/product.routes";
import orderRoute from "#routes/order.routes";

const routes = (app , type) => {
  app.use(error);

  if(type == "Customer")
  {
   //customerRoute
   app.use("/api", customerRoute); 
  }
  else if(type == "Product")
  {
  //productRoute
  app.use("/api", productRoute);
  }
  else if(type == "Order")
  {
 //orderRoute
 app.use("/api", orderRoute);
  
  }
  
  
 
  
  
};
export default routes;
