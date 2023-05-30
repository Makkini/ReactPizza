import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPizzas } from '../redux/pizza/asyncActions';
import { SearchPizzaParams } from '../redux/pizza/types';
import { selectPizzaData } from '../redux/pizza/selectors';

import { list } from '../components/Sort';
import Pagination from '../components/Pagination';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;
  const isMounted = React.useRef(false);
  //useSelector теперь любой компонент, который использует хук useSelector(), может получить доступ к состоянию фильтра, импортировав его из Redux store

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  };

  //условие на вшивку параметров url, не вшивает при первом рендере
  //   React.useEffect(() => {
  //     if (isMounted.current) {
  //       const queryString = qs.stringify({
  //         sortProperty: sort.sortProperty,
  //         categoryId,
  //         currentPage,
  //       });
  //       navigate(`/?${queryString}`);
  //     }
  //     isMounted.current = true;
  //   }, [categoryId, sortType, currentPage]);
  //   //первый рендер то прояверяем параметры url и сохраняем в редакс
  //   React.useEffect(() => {
  //     if (window.location.search) {
  //       const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

  //       const sort = list.find((obj) => obj.sortProperty === params.sortBy);

  //       dispatch(
  //         setFilters({
  //           searchValue: params.search,
  //           categoryId: Number(params.category),
  //           currentPage: Number(params.currentPage),
  //           sort: sort || list[0],
  //         }),
  //       );
  //     }
  //   }, []);

  //если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Технические шоколадки 🍫</h2>
          <p>Приносим свои извинения. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <>
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </>
      )}
    </div>
  );
};

export default Home;
