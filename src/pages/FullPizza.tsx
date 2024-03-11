import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://82322d706a51e4fa.mokky.dev/pizzas/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Не удалось получить данные пиццы. Возвращаемся на главную!");
        navigate("/");
        console.error(error);
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container fullPizza">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} руб.</h4>
    </div>
  );
};
