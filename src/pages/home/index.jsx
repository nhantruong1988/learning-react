import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Checkbox,
  Divider,
  Pagination,
  Card,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import { callCategory, callProducts } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Carousel } from 'antd';

const HomePage = () => {
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [form] = Form.useForm();
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  useEffect(() => {
    const initCategory = async () => {
      const res = await callCategory();
      if (res.data) {
        const data = res.data.map((item) => {
          return { code: item.code, name: item.name, imageUrl: item.imageUrl };
        });
        setListCategory(data);
      }
    };
    initCategory();

    const initProductList = async () => {
      const res = await callProducts();
      if (res.data) {
        const data = res.data.data.map((item) => {
          return {
            price: item.price,
            id: item.id,
            name: item.name,
            imageUrls: item.imageUrls[0],
            description: item.description,
            soldCount: item.soldCount,
            discountPercentage: item.discountPercentage,
            category: item.category.code,
          };
        });
        const categories = [
          ...new Set(res.data.data.map((item) => item.category.code)),
        ];
        setProductList(data);
        setFilteredProducts(data);
      }
    };
    initProductList();


  }, []);

  const handleChangeFilter = (changedValues) => {
    const selectedCategories = changedValues.category;
    setSelectedCategory(selectedCategories);
    const data =
      selectedCategories.length > 0
        ? productList.filter((product) =>
            selectedCategories.includes(product.category)
          )
        : productList;
    setFilteredProducts(data);
  };

  const handleViewDetail = (product) => {
    navigate(`/product/${product.id}`);
  };

  // Filter products by selected category

  const items = [
    {
      key: "1",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "2",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "3",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "4",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8justify-items-center" >
<div class="grid gap-4 grid-cols-6 grid-rows-1  content-center pt-10">

      {listCategory?.map((item, index) => {
        return (
            <div className="circle positive rounded-full overflow-hidden">
              <img src={item.imageUrl} className="w-100 h-100"/>
            <div className="text-center uppercase "><b>{item.name}</b></div>
            </div>


        );
      })}
      </div>

      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-0">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 pt-10">
          SẢN PHẨM
        </h1>

        <div className="flex items-center">
          <button
            type="button"
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <span className="sr-only">Filters</span>
            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <form className="hidden lg:block">
            <h3 className="sr-only">Categories</h3>
            <ul
              role="list"
              className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
            >
              <Form
                form={form}
                onValuesChange={(changedValues) =>
                  handleChangeFilter(changedValues)
                }
              >
                <Form.Item
                  name="category"
                  label="Danh mục sản phẩm"
                  labelCol={{ span: 24 }}
                >
                  <Checkbox.Group>
                    <Row>
                      {listCategory?.map((item, index) => {
                        return (
                          <Col
                            span={24}
                            key={`index-${index}`}
                            style={{ padding: "7px 0" }}
                          >
                            <Checkbox value={item.code}>{item.name}</Checkbox>
                          </Col>
                        );
                      })}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </Form>
            </ul>
          </form>

          {/* Product grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {filteredProducts?.map((item, index) => {
                return (
                  <a
                    key={`index-${index}`}
                    className="group"
                    onClick={() => handleViewDetail(item)}
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={item.imageUrls}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {item.price}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default HomePage;
