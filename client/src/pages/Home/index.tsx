import * as React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import ProductCard from '../../components/Card/Card';
import { ICategory, IProduct } from '@aaecomm/common';
import Paginate from '../../components/Paginate/Paginate';
import { useQueryString } from '../../hooks/useQueryString';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProducts } from '../../api/products/getProducts';
import LoadingCard from '../../components/Card/LoadingCard';
import { getCategories } from '../../api/categories/getCategories';
import { addItemToCart } from '../../api/cart/addItemToCart';
import { toast } from 'react-toastify';
import { queryClient } from '../../main';
import { useNavigate } from 'react-router-dom';

interface IHomeProps {
}


const Home: React.FunctionComponent<IHomeProps> = (props) => {

  const [search, setSearch] = React.useState("")
  const navigate = useNavigate()



  const { data, isLoading, refetch, isRefetching } = useQuery<any>(["products/get"], () => getProducts(getQuery()), { 
    refetchOnWindowFocus: false,

  })
  const { data: categories } = useQuery<any>(["categories/get"], () => getCategories("?page=1&pageSize=999"), { refetchOnWindowFocus: false })
  console.log(data);

  const { mutate: addItem, isLoading: isAdding } = useMutation(addItemToCart, {
    onSuccess: async (data) => {
      toast.success('Item added', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      await queryClient.refetchQueries(["cart/get"])
    },
    onError(err: any) {
      err.response.data.errors.map((err: any) => {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
    },
  })


  const { filters, onFilterChange, getQuery } = useQueryString({
    load: refetch,
  });

  const onClickHandler = (id: string) => {
    navigate(`/products/${id}`)
  }
  const onAddToCartHandler = (id: string) => {
    addItem(id);
  }


  return (
    <>
      <Form className="mb-3">
        <Row>
          <Col xs={12} sm={6} md={4} lg={3} xl={2}>
            <Form.Control
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onFilterChange({ name: 'search', value: search })
                }
              }}
            />
          </Col>
          <Col xs={6} sm={3} md={2} lg={2} xl={2}>
            <Form.Control
              as="select"
              value={filters.category || ''}
              onChange={(e) => onFilterChange({ name: 'category', value: e.target.value })}
            >
              <option value="">All Categories</option>
              {categories?.categories.map((category: ICategory) =>
                <option key={category.id} value={category.id}>{category.name}</option>
              )}

            </Form.Control>
          </Col>
          <Col xs={6} sm={3} md={2} lg={2} xl={2}>
            <Form.Control
              as="select"
              value={filters.sortBy || ''}
              onChange={(e) => onFilterChange({ name: 'sortBy', value: e.target.value })}
            >
              <option value="">Sort By</option>
              <option value="asc">Price &uarr;</option>
              <option value="desc">Price &darr;</option>
            </Form.Control>
          </Col>
          <Col xs={6} sm={3} md={2} lg={2} xl={2}>
            <Form.Control
              as="select"
              value={filters.pageSize || ''}
              onChange={(e) => onFilterChange({ name: 'pageSize', value: e.target.value })}
            >
              <option value="16">Page Size</option>
              <option value="16">16</option>
              <option value="32">32</option>
              <option value="64">64</option>
            </Form.Control>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className="row-gap-3 mb-5">
        {!isLoading && !isRefetching && data?.products ? data.products?.map((product: IProduct) => <Col key={product.id}>
          <ProductCard product={product} onClickHandler={onClickHandler} onAddToCart={onAddToCartHandler} />
        </Col>)
          :
          <>
            <Col>
              <LoadingCard />
            </Col>
            <Col>
              <LoadingCard />
            </Col>
            <Col>
              <LoadingCard />
            </Col>
            <Col>
              <LoadingCard />
            </Col>

          </>}

      </Row>
      {data && <Paginate
        onPageChange={(event) => onFilterChange({ name: "page", value: (event.selected + 1).toString() })}
        {...(data?.metadata || {})}
        total={data.metadata.totalProducts}
        pageCount={data.metadata.totalPages}
      />}
    </>
  );


};

export default Home;
