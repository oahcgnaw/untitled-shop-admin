import { useEffect, useState } from "react";
import { ajax } from "../lib/ajax";
import cross_icon from "../../assets/cross_icon.png";
import "./ListProduct.scss";

const ListProduct = () => {
  const [allProduct, setAllProduct] = useState<Product[]>([]);
  const fetchInfo = async () => {
    setAllProduct((await ajax.get("/product")).data);
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const removeItem = async (id: number) => {
    await ajax.delete(`/product/${id}`);
    await fetchInfo();
  };
  return (
    <div
      className="list-product flex flex-col items-center w-full h-[740px] p-[10px_50px] m-8 rounded-md bg-white space-y-8 
    max-md:w-[95%] max-md:h-full max-md:p-[10px_30px] max-md:m-[20px_auto]"
    >
      <h1 className="text-3xl font-semibold">All Products List</h1>
      <div className="format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="allProduct overflow-y-auto w-full">
        <hr className="h-1" />
        {allProduct.map((product, index) => {
          return (
            <div key={index}>
              <div className="format-main format-products items-center">
                <img
                  src={product.image}
                  alt=""
                  className="product-icon h-20
              max-md:h-14"
                />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  src={cross_icon}
                  alt=""
                  className="remove-icon cursor-pointer m-auto"
                  onClick={() => removeItem(product.id)}
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
