import axios from 'axios';

const url = '/api/orders/';

class OrderService {
  // GET Orders
  static getOrders() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const { data } = res;
        resolve(
          data.map(order => ({
            ...order,
            createdAt: new Date(order.createdAt),
          })),
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  // GET Pizzas

  static getPizzas(){
    return axios.get('/api/items')
      .then(response => response.data)
  }

  // POST Orders
  static insertOrder(customerName, itemId) {
    return axios.post(url, {
      customerName,
      itemId,
    });
  }

  // DELETE Orders
  static deleteOrder(id) {
    return axios.delete(`${url}${id}`);
  }

  // PUT Orders

  static updateOrder(id, updatedOrder) {
    return axios.put(`${url}${id}`, updatedOrder);
  }
}

export default OrderService;
