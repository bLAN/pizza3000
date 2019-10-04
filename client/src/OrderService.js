import axios from 'axios';

const url = 'http://localhost:5000/api/orders/';

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

  // POST Orders
  static insertOrder(name, pizza) {
    return axios.post(url, {
      name,
      pizza,
    });
  }

  // DELETE Orders
  static deleteOrder(id) {
    return axios.delete(`${url}${id}`);
  }

  // PUT Orders

  static updateOrder(id, newStatusID) {
    return axios.put(`${url}${id}`, {
      statusID: newStatusID,
    });
  }
}

export default OrderService;
