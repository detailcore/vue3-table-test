import { mockDB } from './index'

/**
 * Изменяем данные, для связывания
 * diets, tariff и dates
 * ! Лучше это делать на бекенде в базе данных
 */
const data = mockDB.map(
  ({
    o_id,
    client_name,
    diets,
    tariff,
    address,
    phone,
    dates,
    discount,
    order_sum,
    order_payed,
    pay_status,
    courier_comment,
    inner_comment,
  }) => {
    return {
      o_id,
      client_name,
      address,
      phone,
      discount,
      order_sum,
      order_payed,
      pay_status,
      courier_comment,
      inner_comment,
      diets: diets.map((item, idx) => {
        return {
          diet: item,
          tariff: tariff[idx],
          date: {
            start_date: dates[idx].start_date,
            end_date: dates[idx].end_date,
          },
        }
      }),
    }
  },
)

export { data }
