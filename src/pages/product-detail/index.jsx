import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { getProductById } from '../../services/api';

const { Title, Text } = Typography;

const ProductDetailPage = () => {
  const [product, setProductDetail] = useState([]);

  let params = window.location.pathname;
  const parts = params.split("/");
  const id = parts[parts.length - 1];

  useEffect(() => {
     fectProductById(id);
  }, [id]);


  const fectProductById = async (id) => {
    if(id) {
      const res = await getProductById(id);
      console.log(res);
      if (res && res.data) {
        const data = res.data;
        setProductDetail(data);
      }
    }

   }
  return (
    <div className="bg-white">
    <div className="pt-6">

    {product.imageUrls ?

      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          <img
            src={product.imageUrls[0]}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              src={product.imageUrls[1]}
              className="h-full w-full object-cover object-center"
            />
          </div>

        </div>

      </div>
: ''}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900"><b>$ {product.price}</b></p>
          <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
        </div>


        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          <div>
            <h3 className="sr-only">Details</h3>

            <div className="space-y-6">
              <p className="text-base text-gray-900">{product.description}</p>
            </div>
          </div>



        </div>
      </div>
    </div>
  </div>
  );
};

export default ProductDetailPage;
