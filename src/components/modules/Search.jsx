import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoApi";
import styles from "./Search.module.css";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();

    if (!text) {
      setCoins([]); // 👈 پاک کردن نتایج قبلی
      return;
    }
    const timer = setTimeout(() => {
      const search = async () => {
        try {
          const res = await fetch(searchCoin(text), {
            signal: controller.signal,
          });
          const json = await res.json();
          if (json.coins) {
            setIsloading(false);
            setCoins(json.coins);
          } else {
            alert(json.status.error_message);
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            alert(error.message);
          }
        }
      };
      setIsloading(true);
      search();
    }, 500);
    return () => {
      clearTimeout(timer); // حذف تایمر قبلی
      controller.abort(); // لغو درخواست قبلی
    };
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(isLoading || coins.length > 0) && (
        <div className={styles.searchResult}>
          {isLoading && <ClipLoader color="#fff" />}
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
