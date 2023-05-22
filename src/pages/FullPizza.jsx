import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://6458ad9e4eb3f674df7a0c6e.mockapi.io/items/'+id);
        setPizza(data);
      } catch (error) {
          alert('Error 404');
          navigate('/')
      }
    }
    fetchPizza();
  }, []);
  if(!pizza){
    return 'load'
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};
export default FullPizza;
